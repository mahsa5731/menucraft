import Link from 'next/link';
import {ArrowRight, Code2, Store} from 'lucide-react';

export function HeroSection() {
  return (
    <section className="hero border-base-300 bg-base-200 mt-6 overflow-hidden rounded-[2rem] border">
      <div className="hero-content flex-col gap-10 px-6 py-12 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-16">
        <div className="max-w-3xl text-center lg:text-left">
          <div className="badge badge-primary badge-outline mb-5 font-medium">Open Source Portfolio Project</div>

          <h1 className="text-4xl leading-tight font-bold md:text-5xl xl:text-6xl">
            Build beautiful restaurant menus with Menucraft
          </h1>

          <p className="text-base-content/70 mt-6 max-w-2xl text-lg leading-8">
            A full-stack digital menu builder created to demonstrate modern web development practices. Create, manage,
            and share responsive restaurant menus.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <Link href="/register" className="btn btn-primary btn-lg">
              Try the Live Demo <ArrowRight className="size-4" />
            </Link>
            <a
              href="https://github.com/mahsa5731/menucraft"
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline btn-lg"
            >
              <Code2 className="size-5" /> View on GitHub
            </a>
          </div>
        </div>

        <div className="w-full max-w-xl">
          <div className="border-base-300 bg-base-100 rounded-[2rem] border p-4 shadow-xl">
            <div className="bg-base-200 rounded-[1.5rem] p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold">Live Preview</p>
                  <p className="text-base-content/60 text-sm">Dashboard rendering example</p>
                </div>
                <div className="bg-primary/10 text-primary rounded-full p-3">
                  <Store className="size-5" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="rounded-box bg-base-100 p-4 shadow-sm">
                  <p className="text-base-content/60 text-sm">Restaurant</p>
                  <p className="text-base-content mt-1 font-semibold">Menucraft Bistro</p>
                </div>

                <div className="rounded-box bg-base-100 p-4 shadow-sm">
                  <p className="mb-3 font-semibold">Active Menu Items</p>
                  <div className="space-y-2">
                    <div className="bg-base-200 flex items-center justify-between rounded-xl px-3 py-2">
                      <p className="font-medium">Truffle Burger</p>
                      <span className="badge badge-primary badge-outline">$24</span>
                    </div>
                    <div className="bg-base-200 flex items-center justify-between rounded-xl px-3 py-2">
                      <p className="font-medium">House Lemonade</p>
                      <span className="badge badge-primary badge-outline">$6</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
