import {BookOpen, ImageIcon, Share2, Store} from 'lucide-react';

const features = [
  {
    title: 'Centralized Identity',
    description: 'Manage core restaurant details, contact info, and branding from a single source of truth.',
    icon: Store,
  },
  {
    title: 'Dynamic Menu Builder',
    description: 'Create categories, dishes, and prices instantly using a drag-and-drop feeling interface.',
    icon: BookOpen,
  },
  {
    title: 'Cloud Image Hosting',
    description: 'Seamlessly upload and serve high-quality restaurant cover images via Firebase Storage.',
    icon: ImageIcon,
  },
  {
    title: 'Public QR Links',
    description: 'Generate instant, read-only public links to share with customers via QR code or web.',
    icon: Share2,
  },
];

export function FeatureSection() {
  return (
    <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {features.map((feature) => {
        const Icon = feature.icon;
        return (
          <div key={feature.title} className="card border-base-300 bg-base-100 border shadow-sm">
            <div className="card-body p-6">
              <div className="bg-primary/10 text-primary mb-3 flex h-12 w-12 items-center justify-center rounded-full">
                <Icon className="size-5" />
              </div>
              <h2 className="card-title text-lg">{feature.title}</h2>
              <p className="text-base-content/70 text-sm">{feature.description}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
}
