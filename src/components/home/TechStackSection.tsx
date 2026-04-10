import {Database, Layout, Server, ShieldCheck, Paintbrush, Zap} from 'lucide-react';

const technologies = [
  {
    category: 'Frontend Core',
    name: 'Next.js 16 & React 19',
    description: 'App Router, Server Components, and the latest React features for optimal performance.',
    icon: Layout,
  },
  {
    category: 'Styling & UI',
    name: 'Tailwind CSS v4 & DaisyUI',
    description: 'Utility-first styling with pre-built, themeable semantic components.',
    icon: Paintbrush,
  },
  {
    category: 'Backend & Database',
    name: 'Firebase & Firestore',
    description: 'NoSQL database with secure Admin SDK routing and cloud storage for image handling.',
    icon: Database,
  },
  {
    category: 'Authentication',
    name: 'Firebase Auth & Turnstile',
    description: 'Secure credential management paired with Cloudflare Turnstile bot protection.',
    icon: ShieldCheck,
  },
  {
    category: 'State & Data Fetching',
    name: 'TanStack Query',
    description: 'Robust asynchronous state management, caching, and cache invalidation.',
    icon: Server,
  },
  {
    category: 'Validation',
    name: 'Zod & React Hook Form',
    description: 'Strict TypeScript schema validation shared across client inputs and server APIs.',
    icon: Zap,
  },
];

export function TechStackSection() {
  return (
    <section className="flex flex-col gap-6">
      <div>
        <h2 className="text-3xl font-bold">The Technology Stack</h2>
        <p className="text-base-content/70 mt-2">
          Built with modern, industry-standard tools for scalability and speed.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {technologies.map((tech) => {
          const Icon = tech.icon;
          return (
            <div
              key={tech.name}
              className="card border-base-300 bg-base-100 hover:border-primary/40 border shadow-sm transition-colors"
            >
              <div className="card-body p-5">
                <div className="mb-2 flex items-center gap-3">
                  <div className="bg-base-200 text-primary rounded-lg p-2.5">
                    <Icon className="size-5" />
                  </div>
                  <span className="text-base-content/50 text-xs font-bold tracking-wider uppercase">
                    {tech.category}
                  </span>
                </div>
                <h3 className="text-lg leading-tight font-bold">{tech.name}</h3>
                <p className="text-base-content/70 mt-1 text-sm">{tech.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
