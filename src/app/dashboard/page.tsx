'use client';

import Link from 'next/link';
import {BookOpen, PencilLine, Plus} from 'lucide-react';
import {useAuth} from '@/context/AuthContext';

const recentMenus = [
  {
    id: '1',
    title: 'Main Menu',
    updatedAt: 'Updated recently',
    status: 'Draft',
  },
  {
    id: '2',
    title: 'Drinks Menu',
    updatedAt: 'Updated recently',
    status: 'Published',
  },
  {
    id: '3',
    title: 'Dessert Menu',
    updatedAt: 'Updated recently',
    status: 'Draft',
  },
];

export default function DashboardPage() {
  const {user} = useAuth();

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <div className="border-base-300 bg-base-200 rounded-[2rem] border p-6 md:p-8">
        <div className="badge badge-primary badge-outline mb-4">Dashboard</div>

        <h1 className="text-3xl font-bold md:text-4xl">
          Welcome back{user?.displayName ? `, ${user.displayName}` : ''}.
        </h1>

        <p className="text-base-content/70 mt-4 max-w-2xl text-base leading-7">
          Create a new menu, manage your existing menus, and keep your restaurant content organized in one place.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href="/dashboard/menus/new" className="btn btn-primary">
            <Plus className="size-4" />
            Create New Menu
          </Link>

          <Link href="/dashboard/menus" className="btn btn-outline">
            <BookOpen className="size-4" />
            View All Menus
          </Link>
        </div>
      </div>

      <div className="card border-base-300 bg-base-100 border shadow-sm">
        <div className="card-body">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="card-title">Recent Menus</h2>
              <p className="text-base-content/70 text-sm">Quick access to your latest menus.</p>
            </div>

            <Link href="/dashboard/menus" className="btn btn-ghost btn-sm">
              See all
            </Link>
          </div>

          <div className="mt-2 space-y-3">
            {recentMenus.map((menu) => (
              <div
                key={menu.id}
                className="rounded-box border-base-300 bg-base-200 flex flex-col gap-4 border p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <h3 className="font-semibold">{menu.title}</h3>
                  <p className="text-base-content/60 text-sm">{menu.updatedAt}</p>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className={`badge ${menu.status === 'Published' ? 'badge-success badge-outline' : 'badge-warning badge-outline'}`}
                  >
                    {menu.status}
                  </div>

                  <Link href={`/dashboard/menus/${menu.id}/edit`} className="btn btn-sm btn-outline">
                    <PencilLine className="size-4" />
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {recentMenus.length === 0 ? (
            <div className="rounded-box bg-base-200 p-8 text-center">
              <h3 className="text-lg font-semibold">No menus yet</h3>
              <p className="text-base-content/70 mt-2 text-sm">Start by creating your first restaurant menu.</p>
              <Link href="/dashboard/menus/new" className="btn btn-primary mt-4">
                Create First Menu
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

// 'use client';

// import Link from 'next/link';
// import {ArrowRight, BookOpen, Eye, Image as ImageIcon, PencilLine, Share2, Store, Users} from 'lucide-react';
// import {useAuth} from '@/context/AuthContext';

// const quickActions = [
//   {
//     href: '/dashboard/restaurant',
//     title: 'Restaurant Profile',
//     description: 'Add your restaurant name, address, phone number, and cover image.',
//     icon: Store,
//   },
//   {
//     href: '/dashboard/menus/new',
//     title: 'Create New Menu',
//     description: 'Start a new menu and add dishes, ingredients, and pricing details.',
//     icon: PencilLine,
//   },
//   {
//     href: '/dashboard/menus',
//     title: 'Manage Menus',
//     description: 'View your previous menus, update them, or prepare them for sharing.',
//     icon: BookOpen,
//   },
// ];

// const stats = [
//   {
//     label: 'Total Menus',
//     value: '0',
//     icon: BookOpen,
//   },
//   {
//     label: 'Published Menus',
//     value: '0',
//     icon: Share2,
//   },
//   {
//     label: 'Menu Views',
//     value: '0',
//     icon: Eye,
//   },
//   {
//     label: 'Team Members',
//     value: '1',
//     icon: Users,
//   },
// ];

// const setupSteps = [
//   {
//     title: 'Complete restaurant profile',
//     description: 'Add your brand information so your menu looks professional.',
//     icon: Store,
//   },
//   {
//     title: 'Upload a restaurant image',
//     description: 'Use a cover image to make the top section of your menu more attractive.',
//     icon: ImageIcon,
//   },
//   {
//     title: 'Add your first menu',
//     description: 'Create sections, dishes, and ingredients for your restaurant.',
//     icon: BookOpen,
//   },
//   {
//     title: 'Share your menu',
//     description: 'Publish your menu and send it to customers or download it later.',
//     icon: Share2,
//   },
// ];

// export default function DashboardPage() {
//   const {user} = useAuth();

//   return (
//     <section className="mx-auto flex w-full max-w-7xl flex-col gap-6">
//       <div className="hero rounded-box bg-base-200 px-6 py-10">
//         <div className="hero-content w-full max-w-none justify-between gap-8 px-0 lg:flex-row">
//           <div className="max-w-2xl">
//             <div className="badge badge-primary badge-outline mb-4">Dashboard</div>
//             <h1 className="text-3xl font-bold text-base-content md:text-4xl">
//               Welcome back{user?.displayName ? `, ${user.displayName}` : ''}.
//             </h1>
//             <p className="mt-4 max-w-xl text-base text-base-content/70 md:text-lg">
//               Build, manage, and share restaurant menus from one dashboard. Start by setting up your restaurant
//               profile and creating your first menu.
//             </p>

//             <div className="mt-6 flex flex-col gap-3 sm:flex-row">
//               <Link href="/dashboard/menus/new" className="btn btn-primary">
//                 Create Menu
//               </Link>
//               <Link href="/dashboard/restaurant" className="btn btn-outline">
//                 Edit Restaurant Profile
//               </Link>
//             </div>
//           </div>

//           <div className="stats stats-vertical border border-base-300 bg-base-100 shadow-sm md:stats-horizontal">
//             <div className="stat">
//               <div className="stat-title">Account</div>
//               <div className="stat-value text-lg text-base-content">{user?.email ? 'Active' : 'Guest'}</div>
//               <div className="stat-desc">Owner dashboard access</div>
//             </div>
//             <div className="stat">
//               <div className="stat-title">Next goal</div>
//               <div className="stat-value text-lg text-base-content">First Menu</div>
//               <div className="stat-desc">Set up your menu and publish it</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
//         {stats.map((stat) => {
//           const Icon = stat.icon;

//           return (
//             <div key={stat.label} className="card border border-base-300 bg-base-100 shadow-sm">
//               <div className="card-body gap-3">
//                 <div className="flex items-center justify-between">
//                   <div className="rounded-full bg-primary/10 p-3 text-primary">
//                     <Icon className="size-5" />
//                   </div>
//                   <span className="text-sm text-base-content/60">{stat.label}</span>
//                 </div>
//                 <div className="text-3xl font-bold text-base-content">{stat.value}</div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       <div className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
//         <div className="card border border-base-300 bg-base-100 shadow-sm">
//           <div className="card-body">
//             <div className="mb-2 flex items-center justify-between gap-4">
//               <div>
//                 <h2 className="card-title text-base-content">Quick Actions</h2>
//                 <p className="text-sm text-base-content/70">Start with the essentials for your restaurant.</p>
//               </div>
//             </div>

//             <div className="grid gap-4 md:grid-cols-3">
//               {quickActions.map((action) => {
//                 const Icon = action.icon;

//                 return (
//                   <Link
//                     key={action.href}
//                     href={action.href}
//                     className="rounded-box border border-base-300 bg-base-200 p-4 transition hover:border-primary hover:bg-base-300"
//                   >
//                     <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-content">
//                       <Icon className="size-5" />
//                     </div>
//                     <h3 className="font-semibold text-base-content">{action.title}</h3>
//                     <p className="mt-2 text-sm leading-6 text-base-content/70">{action.description}</p>
//                     <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary">
//                       <span>Open</span>
//                       <ArrowRight className="size-4" />
//                     </div>
//                   </Link>
//                 );
//               })}
//             </div>
//           </div>
//         </div>

//         <div className="card border border-base-300 bg-base-100 shadow-sm">
//           <div className="card-body">
//             <h2 className="card-title text-base-content">Getting Started</h2>
//             <p className="text-sm text-base-content/70">A simple path to launch your restaurant menu.</p>

//             <ul className="timeline timeline-vertical mt-4">
//               {setupSteps.map((step, index) => {
//                 const Icon = step.icon;

//                 return (
//                   <li key={step.title}>
//                     {index > 0 ? <hr className="bg-base-300" /> : null}
//                     <div className="timeline-middle">
//                       <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-content">
//                         <Icon className="size-4" />
//                       </div>
//                     </div>
//                     <div className="timeline-end timeline-box mb-6 border border-base-300 bg-base-200">
//                       <h3 className="font-semibold text-base-content">{step.title}</h3>
//                       <p className="mt-1 text-sm text-base-content/70">{step.description}</p>
//                     </div>
//                     {index < setupSteps.length - 1 ? <hr className="bg-base-300" /> : null}
//                   </li>
//                 );
//               })}
//             </ul>
//           </div>
//         </div>
//       </div>

//       <div className="grid gap-6 lg:grid-cols-2">
//         <div className="card border border-base-300 bg-base-100 shadow-sm">
//           <div className="card-body">
//             <h2 className="card-title text-base-content">Restaurant Overview</h2>
//             <p className="text-sm text-base-content/70">This section will help you keep your business information up to date.</p>

//             <div className="mt-2 grid gap-4 sm:grid-cols-2">
//               <div className="rounded-box bg-base-200 p-4">
//                 <p className="text-sm text-base-content/60">Restaurant Name</p>
//                 <p className="mt-2 font-medium text-base-content">Not added yet</p>
//               </div>
//               <div className="rounded-box bg-base-200 p-4">
//                 <p className="text-sm text-base-content/60">Phone Number</p>
//                 <p className="mt-2 font-medium text-base-content">Not added yet</p>
//               </div>
//               <div className="rounded-box bg-base-200 p-4 sm:col-span-2">
//                 <p className="text-sm text-base-content/60">Address</p>
//                 <p className="mt-2 font-medium text-base-content">Not added yet</p>
//               </div>
//             </div>

//             <div className="card-actions mt-4 justify-end">
//               <Link href="/dashboard/restaurant" className="btn btn-primary btn-sm">
//                 Update Profile
//               </Link>
//             </div>
//           </div>
//         </div>

//         <div className="card border border-base-300 bg-base-100 shadow-sm">
//           <div className="card-body">
//             <h2 className="card-title text-base-content">Menus Status</h2>
//             <p className="text-sm text-base-content/70">Track your menu progress and publish when ready.</p>

//             <div className="mt-3 overflow-x-auto">
//               <table className="table">
//                 <thead>
//                   <tr>
//                     <th>Menu</th>
//                     <th>Status</th>
//                     <th>Updated</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td>Starter Menu</td>
//                     <td>
//                       <div className="badge badge-warning badge-outline">Draft</div>
//                     </td>
//                     <td>Not available</td>
//                   </tr>
//                   <tr>
//                     <td>Main Menu</td>
//                     <td>
//                       <div className="badge badge-ghost">Empty</div>
//                     </td>
//                     <td>Not available</td>
//                   </tr>
//                   <tr>
//                     <td>Drinks Menu</td>
//                     <td>
//                       <div className="badge badge-ghost">Empty</div>
//                     </td>
//                     <td>Not available</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>

//             <div className="card-actions mt-4 justify-end">
//               <Link href="/dashboard/menus" className="btn btn-outline btn-sm">
//                 View All Menus
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
