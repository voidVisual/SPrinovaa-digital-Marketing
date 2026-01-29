import React from 'react';
import { render, screen } from '@testing-library/react';

// Mock next/navigation first
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Mock lucide-react
jest.mock('lucide-react', () => ({
  Menu: jest.fn(() => <svg data-testid="menu-icon" />),
}));

// Import after mocking
import { Header } from '@/components/header';

describe('Header Component', () => {
  it('should render the header', () => {
    render(<Header />);
    expect(screen.getByText(/SPrinova-Digital Marketing/i)).toBeInTheDocument();
  });

  it('should render navigation links on desktop', () => {
    render(<Header />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
  });

  it('should render Contact Us button', () => {
    render(<Header />);
    const contactButtons = screen.getAllByText('Contact Us');
    expect(contactButtons.length).toBeGreaterThan(0);
  });

  it('should render mobile menu button', () => {
    render(<Header />);
    const mobileMenuButton = screen.getByRole('button', { name: /toggle navigation menu/i });
    expect(mobileMenuButton).toBeInTheDocument();
  });

  it('should render logo image', () => {
    render(<Header />);
    const logo = screen.getByAltText(/SPrinova Digital Marketing Logo/i);
    expect(logo).toBeInTheDocument();
  });

  it('should have correct href for logo link', () => {
    render(<Header />);
    const logoLinks = screen.getAllByRole('link').filter(link => link.getAttribute('href') === '/#home');
    expect(logoLinks.length).toBeGreaterThan(0);
  });

  it('should have correct href for navigation links', () => {
    render(<Header />);
    const homeLink = screen.getAllByRole('link').find(link => link.getAttribute('href') === '/#home');
    const aboutLink = screen.getAllByRole('link').find(link => link.getAttribute('href') === '/#about');
    const servicesLink = screen.getAllByRole('link').find(link => link.getAttribute('href') === '/#services');

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(servicesLink).toBeInTheDocument();
  });

  it('should render with border and background styles', () => {
    const { container } = render(<Header />);
    const header = container.querySelector('header');
    expect(header).toHaveClass('border-b', 'border-border/40', 'bg-background/95');
  });
});
