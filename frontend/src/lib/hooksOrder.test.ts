/**
 * Guard against hooks declared after a top-level early return.
 *
 * `AdminLoginPage` renders the login screen and the whole dashboard from a
 * single function: it returns early when `!isAuthenticated` and otherwise falls
 * through to the dashboard. Two hooks had been added below that early return,
 * so the signed-out render ran fewer hooks than the signed-in render. Signing
 * in then threw "Rendered more hooks than during the previous render" and the
 * error boundary replaced the entire dashboard.
 *
 * This project has no ESLint configuration, so `react-hooks/rules-of-hooks`
 * cannot catch it. The production build does not catch it either: the dashboard
 * is client-only, so SSR never renders the signed-in branch. The bug is only
 * reachable by logging in, which is why it survived a green build and a green
 * test run.
 *
 * This test encodes the rule statically. It walks each function that actually
 * calls a hook, tracks brace depth to find that function's own top level, and
 * flags any hook declared below a conditional return there. Functions with no
 * hooks are ignored, and returns nested inside callbacks or `.map()` bodies do
 * not count because they are not at the function's top level.
 */

import * as fs from 'fs';
import * as path from 'path';

const SRC_ROOT = path.resolve(__dirname, '..');

/** Directories whose files can declare a React component. */
const SCAN_DIRS = ['app', 'components', 'lib'];

const HOOK_NAMES =
  'useState|useEffect|useLayoutEffect|useMemo|useCallback|useRef|useContext|' +
  'useReducer|useDebouncedValue|useDebouncedCallback|useContactChannels|' +
  'useRouter|useSearchParams|usePathname|useParams|useImperativeHandle';

/** Matches a hook call at all, used to decide whether a function is a candidate. */
const ANY_HOOK = new RegExp(`\\b(?:React\\.)?(?:${HOOK_NAMES})\\s*\\(`);

/**
 * Strip string and comment content so brace counting is not confused by
 * literals like `'{'` or a `// }` comment.
 */
function stripLiterals(line: string): string {
  return line
    .replace(/\\./g, '')
    .replace(/'(?:[^'\\]|\\.)*'/g, "''")
    .replace(/"(?:[^"\\]|\\.)*"/g, '""')
    .replace(/`(?:[^`\\]|\\.)*`/g, '``')
    .replace(/\/\/.*$/, '')
    .replace(/\/\*.*?\*\//g, '');
}

/**
 * Net brace depth contributed by a line, ignoring literals and comments.
 */
function depthDelta(line: string): number {
  const clean = stripLiterals(line);
  let delta = 0;
  for (const char of clean) {
    if (char === '{') delta += 1;
    else if (char === '}') delta -= 1;
  }
  return delta;
}

/** True when the line opens a named function or an arrow function body. */
function isFunctionStart(trimmed: string): boolean {
  return (
    /^(?:export\s+)?(?:default\s+)?(?:async\s+)?function\s+\w+/.test(trimmed) ||
    /^(?:export\s+)?const\s+\w+\s*(?::[^=]+)?=\s*(?:async\s*)?(?:\([^)]*\)|[\w$]+)\s*(?::[^=]*)?=>\s*\{/.test(
      trimmed
    )
  );
}

type Offender = {
  file: string;
  hookLine: number;
  hookText: string;
  guardLine: number;
  guardText: string;
};

/**
 * Find hooks that sit below a top-level conditional return inside a function.
 *
 * Scans with a running brace depth so that only statements in the function's
 * own body (depth 1 relative to its opening brace) are considered.
 */
function findOffenders(filePath: string): Offender[] {
  const source = fs.readFileSync(filePath, 'utf8');
  const lines = source.split(/\r?\n/);
  const offenders: Offender[] = [];

  let depth = 0;
  /** Body depth at which the current function's statements live. */
  let bodyDepth: number | null = null;
  /** Line index of this function's first top-level conditional return. */
  let guardIndex = -1;
  let guardText = '';

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const trimmed = line.trim();
    const before = depth;

    if (bodyDepth === null && isFunctionStart(trimmed)) {
      // The body opens on this line or the one after it; its statements live at
      // whatever depth the opening brace establishes.
      bodyDepth = before + depthDelta(line);
      if (bodyDepth <= before) bodyDepth = before + 1;
      guardIndex = -1;
      guardText = '';
    }

    const atBodyTop = bodyDepth !== null && before === bodyDepth;

    if (atBodyTop && /^(if|switch)\b.*\{\s*$/.test(trimmed)) {
      const next = lines[i + 1];
      if (next !== undefined && next.trim().startsWith('return')) {
        guardIndex = i;
        guardText = trimmed;
      }
    }

    if (
      atBodyTop &&
      guardIndex !== -1 &&
      i > guardIndex &&
      trimmed.startsWith('return') &&
      !ANY_HOOK.test(line)
    ) {
      // This return ends the function on some branch. Any hook below it belongs
      // to the fall-through path only.
      // (Recorded but not flagged here; the hook check below does the flagging.)
    }

    if (
      atBodyTop &&
      guardIndex !== -1 &&
      i > guardIndex &&
      ANY_HOOK.test(line) &&
      !trimmed.startsWith('//')
    ) {
      offenders.push({
        file: path.relative(SRC_ROOT, filePath).replace(/\\/g, '/'),
        hookLine: i + 1,
        hookText: trimmed,
        guardLine: guardIndex + 1,
        guardText,
      });
    }

    depth += depthDelta(line);

    // The function ended once we closed back past its body.
    if (bodyDepth !== null && depth < bodyDepth) {
      bodyDepth = null;
      guardIndex = -1;
    }
  }

  return offenders;
}

function collectComponentFiles(): string[] {
  const found: string[] = [];

  for (const dir of SCAN_DIRS) {
    const walk = (current: string) => {
      let entries: fs.Dirent[];
      try {
        entries = fs.readdirSync(current, { withFileTypes: true });
      } catch {
        return;
      }

      for (const entry of entries) {
        const full = path.join(current, entry.name);
        if (entry.isDirectory()) {
          if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
          walk(full);
        } else if (/\.tsx$/.test(entry.name) && !/\.test\.tsx$/.test(entry.name)) {
          found.push(full);
        }
      }
    };

    walk(path.join(SRC_ROOT, dir));
  }

  return found;
}

describe('hook ordering', () => {
  const files = collectComponentFiles();

  it('scans a non-trivial number of component files', () => {
    // Guards against the walk silently returning nothing, which would make the
    // real assertion below pass vacuously.
    expect(files.length).toBeGreaterThan(20);
  });

  it('declares no hooks below a top-level early return', () => {
    const offenders = files.flatMap(findOffenders);

    const report = offenders
      .map(
        (o) =>
          `${o.file}:${o.hookLine} calls a hook after the early return at ` +
          `${o.file}:${o.guardLine} (\`${o.guardText}\`)\n    -> ${o.hookText}`
      )
      .join('\n');

    expect(report).toBe('');
  });

  it('detects the bug it is meant to prevent', () => {
    // A hook below a top-level early return is the exact shape that broke the
    // dashboard. This asserts the detector still recognises it, so the test
    // above cannot rot into always passing.
    const fixture = [
      'export default function Widget() {',
      '  const [a, setA] = useState(0);',
      '',
      '  if (!ready) {',
      '    return null;',
      '  }',
      '',
      '  const debounced = useDebouncedValue(a, 200);',
      '  return <div>{debounced}</div>;',
      '}',
    ].join('\n');

    const written = path.join(SRC_ROOT, 'lib', '__hookOrderFixture.tsx');
    fs.writeFileSync(written, fixture, 'utf8');

    try {
      const found = findOffenders(written);
      expect(found).toHaveLength(1);
      expect(found[0].hookLine).toBe(8);
    } finally {
      fs.unlinkSync(written);
    }
  });
});