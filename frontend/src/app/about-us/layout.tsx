import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Faisal Hills Islamabad Developer | Project Details",
  description: "Learn about Faisal Hills Islamabad — a CDA-approved society by Zedem International. Discover our story, vision, team & investor commitment since 2012.",
  keywords: "About Faisal Hills Islamabad, Faisal Hills Islamabad Developer, Zedem International developer Pakistan, Faisal Hills Islamabad developer history, CDA approved housing society Islamabad, Faisal Hills Islamabad real estate company, Zedem International track record, Faisal Hills gated community, housing society developer Rawalpindi, Faisal Hills investment company, Zedem International Chaudhry Abdul Majeed, trusted property developer Pakistan, Faisal Hills NOC verified society, real estate developer GT Road Taxila",
  alternates: {
    canonical: "https://faisalhillsislamabadfh.com/about-us/",
  }
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
