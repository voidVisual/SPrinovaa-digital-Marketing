import type { Service } from './types';
import {
  Presentation,
  Search,
  BarChart3,
  Linkedin,
  Store,
  PenTool,
  Mail,
  AppWindow,
  Code,
  Landmark,
} from 'lucide-react';

export const services: Service[] = [
  {
    icon: Presentation,
    title: 'Social Media Handling',
    description: 'Engaging content and strategic campaigns to grow your social media presence.',
  },
  {
    icon: Search,
    title: 'SEO',
    description: 'Improve your search engine rankings and drive organic traffic to your website.',
  },
  {
    icon: BarChart3,
    title: 'Google Analytics',
    description: 'In-depth analysis of your website data to make informed business decisions.',
  },
  {
    icon: Linkedin,
    title: 'LinkedIn Growth',
    description: 'Specialized strategies to expand your professional network and generate leads.',
  },
  {
    icon: Store,
    title: 'Google Business Profile',
    description: 'Optimize your local search presence and attract more customers.',
  },
  {
    icon: PenTool,
    title: 'Content Creation',
    description: 'High-quality content that resonates with your audience and builds your brand.',
  },
  {
    icon: Mail,
    title: 'Email Marketing',
    description: 'Nurture leads and retain customers with effective email campaigns.',
  },
  {
    icon: AppWindow,
    title: 'App Development',
    description: 'Custom mobile applications to provide value and convenience to your users.',
  },
  {
    icon: Code,
    title: 'Web Development',
    description: 'Modern, responsive, and user-friendly websites that convert visitors into customers.',
  },
  {
    icon: Landmark,
    title: 'Financial Accounting',
    description: 'Support with financial accounting to ensure your business runs smoothly.',
  },
];
