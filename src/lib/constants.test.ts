import { Service } from '@/lib/types';

// Mock lucide-react to avoid ESM import issues
jest.mock('lucide-react', () => ({
  Code: jest.fn(),
  TrendingUp: jest.fn(),
  PenTool: jest.fn(),
  DollarSign: jest.fn(),
  Bot: jest.fn(),
  Users: jest.fn(),
  Palette: jest.fn(),
  Film: jest.fn(),
}));

// Import after mocking
import { services } from '@/lib/constants';

describe('Constants - services', () => {
  it('should have 8 services defined', () => {
    expect(services).toHaveLength(8);
  });

  it('should have required properties for each service', () => {
    services.forEach((service: Service) => {
      expect(service).toHaveProperty('title');
      expect(service).toHaveProperty('description');
      expect(service).toHaveProperty('icon');
      expect(typeof service.title).toBe('string');
      expect(typeof service.description).toBe('string');
      expect(service.title.length).toBeGreaterThan(0);
      expect(service.description.length).toBeGreaterThan(0);
    });
  });

  it('should contain Web Development service', () => {
    const webDev = services.find(s => s.title === 'Web Development');
    expect(webDev).toBeDefined();
    expect(webDev?.description).toContain('responsive');
  });

  it('should contain Growth & Performance service', () => {
    const growth = services.find(s => s.title === 'Growth & Performance');
    expect(growth).toBeDefined();
    expect(growth?.description.toLowerCase()).toContain('data-driven');
  });

  it('should contain Content & SEO service', () => {
    const seo = services.find(s => s.title === 'Content & SEO');
    expect(seo).toBeDefined();
    expect(seo?.description).toContain('SEO');
  });

  it('should contain Paid Media service', () => {
    const paid = services.find(s => s.title === 'Paid Media');
    expect(paid).toBeDefined();
    expect(paid?.description).toContain('advertising');
  });

  it('should contain Marketing Automation service', () => {
    const automation = services.find(s => s.title === 'Marketing Automation');
    expect(automation).toBeDefined();
    expect(automation?.description.toLowerCase()).toContain('automate');
  });

  it('should contain Social Media service', () => {
    const social = services.find(s => s.title === 'Social Media');
    expect(social).toBeDefined();
    expect(social?.description).toContain('social media');
  });

  it('should contain Branding service', () => {
    const branding = services.find(s => s.title === 'Branding');
    expect(branding).toBeDefined();
    expect(branding?.description).toContain('brand');
  });

  it('should contain Audiovisual Production service', () => {
    const audiovisual = services.find(s => s.title === 'Audiovisual Production');
    expect(audiovisual).toBeDefined();
    expect(audiovisual?.description).toContain('video');
  });

  it('should have valid icon components for each service', () => {
    services.forEach((service: Service) => {
      expect(typeof service.icon).toBe('function');
    });
  });
});
