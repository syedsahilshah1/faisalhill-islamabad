import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import TextReveal from './TextReveal';

describe('TextReveal - Component Tests', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders text split into words', () => {
    render(<TextReveal text="Hello World" />);
    
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('World')).toBeInTheDocument();
  });

  it('renders with custom component', () => {
    render(<TextReveal text="Test" as="h1" />);
    
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(<TextReveal text="Test" className="custom-class" />);
    
    const container = screen.getByText('Test').parentElement;
    expect(container).toHaveClass('custom-class');
  });

  it('applies staggerDelay to word styles', () => {
    render(<TextReveal text="Hello World" staggerDelay={100} />);
    
    const words = screen.getAllByText(/Hello|World/);
    expect(words[0]).toHaveStyle({ transitionDelay: '0ms' });
    expect(words[1]).toHaveStyle({ transitionDelay: '100ms' });
  });

  it('applies direction left styles', () => {
    render(<TextReveal text="Hello World" direction="left" />);
    
    const words = screen.getAllByText(/Hello|World/);
    // Words should be rendered
    expect(words.length).toBe(2);
  });

  it('applies direction up styles', () => {
    render(<TextReveal text="Hello World" direction="up" />);
    
    const words = screen.getAllByText(/Hello|World/);
    // Words should be rendered
    expect(words.length).toBe(2);
  });

  it('handles empty text', () => {
    const { container } = render(<TextReveal text="" />);
    
    // Empty text results in one empty span
    const spans = container.querySelectorAll('span');
    expect(spans.length).toBe(1);
    expect(spans[0].textContent).toBe('');
  });

  it('handles single word', () => {
    render(<TextReveal text="Hello" />);
    
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('handles special characters in text', () => {
    render(<TextReveal text="Hello, World! @#$%" />);
    
    expect(screen.getByText('Hello,')).toBeInTheDocument();
    expect(screen.getByText('World!')).toBeInTheDocument();
    expect(screen.getByText('@#$%')).toBeInTheDocument();
  });
});