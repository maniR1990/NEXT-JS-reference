import { randomUUID } from 'crypto';

export type Plan = {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  defaultWorkspaceId: string;
  workspaceIds: string[];
};

export type Workspace = {
  id: string;
  name: string;
  slug: string;
  planId: string;
  memberIds: string[];
};

export type Project = {
  id: string;
  workspaceId: string;
  name: string;
  status: 'on-track' | 'at-risk' | 'delayed';
  updatedAt: string;
};

export type Report = {
  id: string;
  workspaceId: string;
  title: string;
  status: 'draft' | 'scheduled' | 'completed';
  createdAt: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  publishedAt: string;
  author: string;
};

export type Testimonial = {
  author: string;
  company: string;
  quote: string;
};

const plans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 12,
    description: 'Perfect for early teams validating collaboration.',
    features: ['Up to 2 workspaces', 'Realtime dashboards', 'Email support'],
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 38,
    description: 'Scaling companies with multiple products.',
    features: ['Unlimited workspaces', 'Audit trails', 'Priority support'],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 89,
    description: 'Advanced security and compliance needs.',
    features: ['SAML/SSO', 'Dedicated success', 'Custom limits'],
  },
];

const blogPosts: BlogPost[] = [
  {
    slug: 'launching-workspace-analytics',
    title: 'Launching Workspace Analytics',
    excerpt: 'We built the fastest way to understand how your teams collaborate.',
    body:
      '## Why we built it\n\nTeams need a live pulse on collaboration. Workspace Analytics combines event streams, project health, and billing in one space.\n\n### What\'s inside\n- Tenant aware dashboards\n- Real-time segmentation\n- Report scheduling with email delivery',
    publishedAt: '2023-12-01',
    author: 'Sam Ortega',
  },
  {
    slug: 'designing-multi-tenant-systems',
    title: 'Designing Multi-Tenant Systems',
    excerpt: 'A pragmatic approach to isolation, routing, and auth in Next.js.',
    body:
      'Isolating tenants requires both routing and data separation. In this post we show how middleware, dynamic segments, and strong typing keep customers safe.\n\nWe cover: caching boundaries, param validation, and how to hydrate client charts with server data.',
    publishedAt: '2024-02-12',
    author: 'Priya Chen',
  },
  {
    slug: 'shipping-faster-with-server-components',
    title: 'Shipping Faster with Server Components',
    excerpt: 'Streaming dashboards while keeping bundles small.',
    body:
      'Server Components allow us to fetch expensive analytics on the server and stream charts progressively. We defer hydration to the few widgets that truly need it.',
    publishedAt: '2024-05-04',
    author: 'Cleo Patrick',
  },
];

const testimonials: Testimonial[] = [
  {
    author: 'Alana Cooper',
    company: 'Acme Robotics',
    quote: 'Workspace Analytics let us ship weekly insights to every leader without engineers writing SQL.',
  },
  {
    author: 'Miguel Sandoval',
    company: 'Globex Retail',
    quote: 'The multi-tenant model keeps our franchises isolated while sharing a common platform.',
  },
  {
    author: 'Reese Park',
    company: 'Initech',
    quote: 'Auth, billing, and analytics all in one starter template for our product team.',
  },
];

let users: User[] = [
  {
    id: 'user-1',
    name: 'Demo User',
    email: 'demo@workspace.dev',
    password: 'demo',
    defaultWorkspaceId: 'ws-acme',
    workspaceIds: ['ws-acme', 'ws-globex'],
  },
];

let workspaces: Workspace[] = [
  {
    id: 'ws-acme',
    name: 'Acme Robotics',
    slug: 'acme',
    planId: 'growth',
    memberIds: ['user-1'],
  },
  {
    id: 'ws-globex',
    name: 'Globex Retail',
    slug: 'globex',
    planId: 'starter',
    memberIds: ['user-1'],
  },
];

let projects: Project[] = [
  {
    id: 'proj-1',
    workspaceId: 'ws-acme',
    name: 'Checkout rewrite',
    status: 'on-track',
    updatedAt: '2024-06-01T12:00:00Z',
  },
  {
    id: 'proj-2',
    workspaceId: 'ws-acme',
    name: 'Robotics dashboard',
    status: 'at-risk',
    updatedAt: '2024-06-05T08:00:00Z',
  },
  {
    id: 'proj-3',
    workspaceId: 'ws-globex',
    name: 'Store analytics',
    status: 'on-track',
    updatedAt: '2024-06-08T18:30:00Z',
  },
];

let reports: Report[] = [
  {
    id: 'rep-1',
    workspaceId: 'ws-acme',
    title: 'Executive weekly',
    status: 'completed',
    createdAt: '2024-05-30T09:00:00Z',
  },
  {
    id: 'rep-2',
    workspaceId: 'ws-acme',
    title: 'Incident review',
    status: 'draft',
    createdAt: '2024-06-02T16:00:00Z',
  },
  {
    id: 'rep-3',
    workspaceId: 'ws-globex',
    title: 'Store performance',
    status: 'completed',
    createdAt: '2024-06-06T11:45:00Z',
  },
];

export const getPlans = () => plans;
export const getTestimonials = () => testimonials;
export const getFeatures = () => [
  {
    title: 'Streaming dashboards',
    description: 'Server Components fetch analytics and stream widgets instantly.',
  },
  {
    title: 'Tenant isolation',
    description: 'Dynamic routes, middleware, and RBAC utilities keep data scoped.',
  },
  {
    title: 'Composable reports',
    description: 'Generate paginated reports and schedule delivery with search params.',
  },
];

export const getBlogPosts = () => blogPosts.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
export const getBlogPostBySlug = (slug: string) => blogPosts.find((post) => post.slug === slug);

export const getWorkspaceBySlug = (slug: string) => workspaces.find((workspace) => workspace.slug === slug);
export const getWorkspaceById = (id: string) => workspaces.find((workspace) => workspace.id === id);

export const getUserByEmail = (email: string) => users.find((user) => user.email === email);
export const getUserById = (id: string) => users.find((user) => user.id === id);

export const getUserWorkspaces = (userId: string) => workspaces.filter((workspace) => workspace.memberIds.includes(userId));

export const getProjectsForWorkspace = (workspaceId: string) =>
  projects.filter((project) => project.workspaceId === workspaceId);

export const getProjectById = (projectId: string) =>
  projects.find((project) => project.id === projectId);

export const getReportsForWorkspace = (workspaceId: string) =>
  reports.filter((report) => report.workspaceId === workspaceId);

export function createWorkspace({ name, ownerId }: { name: string; ownerId: string }) {
  const slug = name.toLowerCase().replace(/\s+/g, '-');
  const newWorkspace: Workspace = {
    id: `ws-${randomUUID()}`,
    name,
    slug,
    planId: 'starter',
    memberIds: [ownerId],
  };

  workspaces = [...workspaces, newWorkspace];
  return newWorkspace;
}

export function registerUser({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  if (getUserByEmail(email)) {
    throw new Error('Email already registered');
  }

  const workspace = createWorkspace({ name: `${name}'s workspace`, ownerId: `user-${randomUUID()}` });
  const user: User = {
    id: workspace.memberIds[0],
    name,
    email,
    password,
    defaultWorkspaceId: workspace.id,
    workspaceIds: [workspace.id],
  };

  users = [...users, user];
  return user;
}

export function createProject(workspaceId: string, name: string) {
  const project: Project = {
    id: `proj-${randomUUID()}`,
    workspaceId,
    name,
    status: 'on-track',
    updatedAt: new Date().toISOString(),
  };

  projects = [project, ...projects];
  return project;
}

export function updateWorkspacePlan(workspaceId: string, planId: string) {
  workspaces = workspaces.map((workspace) =>
    workspace.id === workspaceId
      ? {
          ...workspace,
          planId,
        }
      : workspace,
  );
}

export function createReport(workspaceId: string, title: string, status: Report['status']) {
  const report: Report = {
    id: `rep-${randomUUID()}`,
    workspaceId,
    title,
    status,
    createdAt: new Date().toISOString(),
  };

  reports = [report, ...reports];
  return report;
}

export function getAnalytics(workspaceId: string) {
  const workspaceProjects = getProjectsForWorkspace(workspaceId);
  const workspaceReports = getReportsForWorkspace(workspaceId);

  return {
    totals: {
      projects: workspaceProjects.length,
      reports: workspaceReports.length,
      activeMembers: getWorkspaceById(workspaceId)?.memberIds.length ?? 0,
    },
    trend: workspaceProjects.map((project) => ({
      label: project.name,
      value: project.status === 'on-track' ? 92 : project.status === 'at-risk' ? 71 : 54,
    })),
  };
}

export function createDefaultWorkspaceForUser(user: User) {
  const workspace = createWorkspace({ name: `${user.name}'s workspace`, ownerId: user.id });
  const workspaceIds = [...user.workspaceIds, workspace.id];
  users = users.map((item) => (item.id === user.id ? { ...item, defaultWorkspaceId: workspace.id, workspaceIds } : item));
  return workspace;
}
