import {Code2, UserCircle, ExternalLink, Briefcase} from 'lucide-react';

export function AboutProjectSection() {
  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_2fr]">
      <div className="card border-base-300 bg-primary text-primary-content border shadow-sm">
        <div className="card-body">
          <UserCircle className="mb-2 size-10 opacity-80" />
          <h2 className="card-title text-2xl">Created by Mahsa</h2>
          <p className="mt-2 opacity-80">
            Software Developer passionate about building clean, scalable, and user-centric web applications.
          </p>
          <div className="card-actions mt-4">
            <a href="https://bymahsa.com" target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm">
              Visit bymahsa.com <ExternalLink className="size-3" />
            </a>
          </div>
        </div>
      </div>

      <div className="card border-base-300 bg-base-100 border shadow-sm">
        <div className="card-body">
          <Briefcase className="text-primary mb-2 size-8" />
          <h2 className="card-title text-2xl">About This Project</h2>
          <p className="text-base-content/70 mt-2 leading-relaxed">
            Menucraft is an open-source portfolio application designed to showcase a complete, production-ready
            full-stack architecture. It solves a real-world problem for restaurant owners by allowing them to transition
            from static menus to dynamic, QR-ready digital experiences.
          </p>
          <p className="text-base-content/70 mt-2 leading-relaxed">
            The project demonstrates expertise in authentication flows, complex form state management, server-side
            rendering, secure database operations, and modern UI/UX design principles.
          </p>
          <div className="mt-4 flex gap-3">
            <a
              href="https://github.com/mahsa5731/menucraft"
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary flex items-center gap-2 text-sm font-medium transition-colors"
            >
              <Code2 className="size-4" /> Source Code Available
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
