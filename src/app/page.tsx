import Link from 'next/link';
import {
  CheckCircle2,
  ImageIcon,
  BookOpen,
  PhoneCall,
  Share2,
  Store,
  BookMarked,
  BookOpen as MenuBook,
} from 'lucide-react';

const features = [
  {
    title: 'Restaurant Profile',
    description: 'Add your restaurant name, address, phone number, and cover image in one place.',
    icon: Store,
  },
  {
    title: 'Menu Builder',
    description: 'Create menu sections, dishes, and ingredients with a simple and clean workflow.',
    icon: BookOpen,
  },
  {
    title: 'Image Upload',
    description: 'Upload a restaurant cover image to make your menu feel more branded and professional.',
    icon: ImageIcon,
  },
  {
    title: 'Share and Access',
    description: 'Keep your menu ready to share with customers whenever you need.',
    icon: Share2,
  },
];

const steps = [
  'Create your account',
  'Set up your restaurant details',
  'Build your first menu',
  'Share it with your customers',
];

const highlights = [
  {
    label: 'Restaurant Name',
    value: 'Menucraft Bistro',
  },
  {
    label: 'Phone',
    value: '+1 (204) 000-0000',
  },
  {
    label: 'Address',
    value: '123 Main Street, Winnipeg',
  },
];

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-6 md:px-6 md:py-10">
      <section className="hero border-base-300 bg-base-200 overflow-hidden rounded-[2rem] border">
        <div className="hero-content flex-col gap-10 px-6 py-12 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-16">
          <div className="max-w-3xl text-center lg:text-left">
            <div className="badge badge-primary badge-outline mb-5">Digital Menu Builder</div>

            <h1 className="text-4xl leading-tight font-bold md:text-5xl xl:text-6xl">
              Build beautiful restaurant menus with Menucraft
            </h1>

            <p className="text-base-content/70 mt-6 max-w-2xl text-lg leading-8">
              Create, manage, edit, and share restaurant menus through a clean dashboard designed for restaurant owners.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Link href="/register" className="btn btn-primary btn-lg">
                Get Started
              </Link>
              <Link href="/dashboard" className="btn btn-outline btn-lg">
                View Dashboard
              </Link>
            </div>

            <div className="mt-8 grid gap-3 text-left sm:grid-cols-2">
              {steps.map((step) => (
                <div key={step} className="rounded-box bg-base-100 flex items-center gap-3 px-4 py-3 shadow-sm">
                  <CheckCircle2 className="text-primary size-5" />
                  <span className="text-sm font-medium">{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full max-w-xl">
            <div className="border-base-300 bg-base-100 rounded-[2rem] border p-4 shadow-xl">
              <div className="bg-base-200 rounded-[1.5rem] p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-lg font-semibold">Menu Preview</p>
                    <p className="text-base-content/60 text-sm">A simple preview of your restaurant profile</p>
                  </div>
                  <div className="bg-primary/10 text-primary rounded-full p-3">
                    <Store className="size-5" />
                  </div>
                </div>

                <div className="space-y-4">
                  {highlights.map((item) => (
                    <div key={item.label} className="rounded-box bg-base-100 p-4 shadow-sm">
                      <p className="text-base-content/60 text-sm">{item.label}</p>
                      <p className="text-base-content mt-1 font-semibold">{item.value}</p>
                    </div>
                  ))}

                  <div className="rounded-box bg-base-100 p-4 shadow-sm">
                    <div className="mb-3 flex items-center gap-2">
                      <MenuBook className="text-primary size-5" />
                      <p className="font-semibold">Today’s Menu</p>
                    </div>

                    <div className="space-y-3">
                      <div className="bg-base-200 flex items-center justify-between rounded-xl px-3 py-2">
                        <div>
                          <p className="font-medium">Margherita Pizza</p>
                          <p className="text-base-content/60 text-sm">Tomato, mozzarella, basil</p>
                        </div>
                        <span className="badge badge-primary badge-outline">$18</span>
                      </div>

                      <div className="bg-base-200 flex items-center justify-between rounded-xl px-3 py-2">
                        <div>
                          <p className="font-medium">Chicken Alfredo</p>
                          <p className="text-base-content/60 text-sm">Cream sauce, parmesan, pasta</p>
                        </div>
                        <span className="badge badge-primary badge-outline">$22</span>
                      </div>

                      <div className="bg-base-200 flex items-center justify-between rounded-xl px-3 py-2">
                        <div>
                          <p className="font-medium">House Lemonade</p>
                          <p className="text-base-content/60 text-sm">Fresh lemon and mint</p>
                        </div>
                        <span className="badge badge-primary badge-outline">$6</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Link href="/dashboard" className="btn btn-primary mt-5 w-full">
                  Open Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div key={feature.title} className="card border-base-300 bg-base-100 border shadow-sm">
              <div className="card-body">
                <div className="bg-primary/10 text-primary mb-3 flex h-12 w-12 items-center justify-center rounded-full">
                  <Icon className="size-5" />
                </div>
                <h2 className="card-title">{feature.title}</h2>
                <p className="text-base-content/70">{feature.description}</p>
              </div>
            </div>
          );
        })}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="border-base-300 bg-base-200 rounded-[2rem] border p-6 md:p-8">
          <div className="badge badge-outline mb-4">Why Menucraft</div>
          <h2 className="text-3xl font-bold md:text-4xl">Everything restaurant owners need in one dashboard</h2>
          <p className="text-base-content/70 mt-4 max-w-2xl text-base leading-8">
            Menucraft helps you organize restaurant details, manage menu items, and keep your digital menu ready for
            updates and sharing.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-box bg-base-100 p-5 shadow-sm">
              <p className="text-base-content/60 text-sm">Faster workflow</p>
              <p className="mt-2 text-xl font-semibold">Edit menus anytime without starting again</p>
            </div>

            <div className="rounded-box bg-base-100 p-5 shadow-sm">
              <p className="text-base-content/60 text-sm">Cleaner presentation</p>
              <p className="mt-2 text-xl font-semibold">Show restaurant information in a more professional way</p>
            </div>

            <div className="rounded-box bg-base-100 p-5 shadow-sm md:col-span-2">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 text-primary mt-1 rounded-full p-3">
                  <PhoneCall className="size-5" />
                </div>
                <div>
                  <p className="text-base-content/60 text-sm">Customer-ready details</p>
                  <p className="mt-2 text-xl font-semibold">
                    Keep phone number, address, and menu details easy to find
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card border-base-300 bg-base-100 border shadow-sm">
          <div className="card-body">
            <h2 className="card-title">Ready to create your first menu?</h2>
            <p className="text-base-content/70">
              Start building your restaurant profile and launch a clean digital menu experience for your customers.
            </p>

            <div className="divider" />

            <div className="space-y-3">
              <div className="rounded-box bg-base-200 flex items-center justify-between px-4 py-3">
                <span className="font-medium">Create account</span>
                <span className="badge badge-success badge-outline">Step 1</span>
              </div>
              <div className="rounded-box bg-base-200 flex items-center justify-between px-4 py-3">
                <span className="font-medium">Add restaurant details</span>
                <span className="badge badge-warning badge-outline">Step 2</span>
              </div>
              <div className="rounded-box bg-base-200 flex items-center justify-between px-4 py-3">
                <span className="font-medium">Build menu items</span>
                <span className="badge badge-info badge-outline">Step 3</span>
              </div>
            </div>

            <div className="card-actions mt-6">
              <Link href="/register" className="btn btn-primary w-full">
                Start Now
              </Link>
              <Link href="/login" className="btn btn-outline w-full">
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
