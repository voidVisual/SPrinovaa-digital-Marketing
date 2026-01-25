import type { Service } from './types';
import {
  Code,
  TrendingUp,
  PenTool,
  DollarSign,
  Bot,
  Users,
  Palette,
  Film,
} from 'lucide-react';

export const services: Service[] = [
  {
    icon: Code,
    title: 'Web Development',
    description: 'Modern, responsive, and user-friendly websites that convert visitors into customers.',
  },
  {
    icon: TrendingUp,
    title: 'Growth & Performance',
    description: 'Data-driven strategies to accelerate your growth and improve performance.',
  },
  {
    icon: PenTool,
    title: 'Content & SEO',
    description: 'High-quality content and SEO strategies to improve rankings and drive organic traffic.',
  },
  {
    icon: DollarSign,
    title: 'Paid Media',
    description: 'Targeted advertising campaigns on platforms like Google, Facebook, and LinkedIn.',
  },
  {
    icon: Bot,
    title: 'Marketing Automation',
    description: 'Automate marketing tasks to nurture leads and engage customers effectively.',
  },
  {
    icon: Users,
    title: 'Social Media',
    description: 'Engaging content and strategic campaigns to grow your social media presence.',
  },
  {
    icon: Palette,
    title: 'Branding',
    description: 'Create a strong brand identity that resonates with your target audience.',
  },
  {
    icon: Film,
    title: 'Audiovisual Production',
    description: 'Professional video and photo content to showcase your brand and products.',
  },
];
