export interface Slide {
  id: number;
  title: string;
  subtitle?: string;
  type: 'cover' | 'intro' | 'use-cases' | 'how-works' | 'materials' | 'manufacturing' | 'testing' | 'gantt' | 'simulator';
  speakerNotes: string[];
}

export interface Ingredient {
  name: string;
  source: string;
  description: string;
  role: string;
  ecoFeature: string;
  color: string;
}

export interface UseCase {
  title: string;
  items: string[];
  icon: string;
}

export interface ManufacturingStep {
  stepNumber: number;
  title: string;
  description: string;
  details: string[];
  equipment: string;
}

export interface TestDetail {
  title: string;
  category: 'lab' | 'function';
  description: string;
  method: string;
  status: string;
}

export interface GanttTask {
  id: number;
  activity: string;
  startMonth: number; // 1 = Ene, 12 = Dic
  endMonth: number;
  color: string;
  milestones: string[];
}
