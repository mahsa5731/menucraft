import {notFound} from 'next/navigation';
import {MapPin, Phone, UtensilsCrossed} from 'lucide-react';
import {adminDb} from '@/libs/firebaseAdmin';
import type {RestaurantProfile} from '@/types/schema';

export const revalidate = 60;

async function getRestaurantMenu(id: string): Promise<RestaurantProfile | null> {
  try {
    const doc = await adminDb.collection('restaurantProfiles').doc(id).get();
    if (!doc.exists) return null;
    return doc.data() as RestaurantProfile;
  } catch {
    return null;
  }
}

// 1. Change the type of params to be a Promise
export default async function PublicMenuPage({params}: {params: Promise<{id: string}>}) {
  // 2. Await the params before using them
  const resolvedParams = await params;
  const profile = await getRestaurantMenu(resolvedParams.id);

  if (!profile) {
    notFound();
  }

  const hasMenu = profile.menuSections && profile.menuSections.length > 0;

  return (
    <div className="bg-base-200 min-h-screen pb-24">
      {profile.coverImage ? (
        <div className="relative h-64 w-full md:h-80 lg:h-96">
          <img src={profile.coverImage} alt={`${profile.name} cover`} className="h-full w-full object-cover" />
          <div className="from-base-200 absolute inset-0 bg-gradient-to-t to-transparent" />
        </div>
      ) : (
        <div className="bg-primary/10 h-32 w-full" />
      )}

      <main className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className={`relative ${profile.coverImage ? '-mt-24' : '-mt-16'}`}>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center p-8 text-center">
              <h1 className="text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">{profile.name}</h1>

              <div className="text-base-content/70 mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6">
                {profile.phone && (
                  <a
                    href={`tel:${profile.phone}`}
                    className="hover:text-primary flex items-center gap-2 transition-colors"
                  >
                    <Phone className="size-4 shrink-0" />
                    <span>{profile.phone}</span>
                  </a>
                )}
                {profile.address && (
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(profile.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-primary flex items-center gap-2 text-left transition-colors"
                  >
                    <MapPin className="size-4 shrink-0" />
                    <span>{profile.address}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          {!hasMenu ? (
            <div className="border-base-300 flex flex-col items-center justify-center rounded-3xl border-2 border-dashed py-20 text-center opacity-60">
              <UtensilsCrossed className="mb-4 size-10" />
              <p className="text-lg font-medium">This menu is currently being updated.</p>
              <p className="text-sm">Please check back soon.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-12">
              {profile.menuSections.map((section) => {
                if (!section.dishes || section.dishes.length === 0) return null;

                return (
                  <section key={section.id} className="scroll-mt-8">
                    <div className="mb-6 flex items-center gap-4">
                      <h2 className="text-primary text-2xl font-bold tracking-tight sm:text-3xl">{section.title}</h2>
                      <div className="bg-base-300 h-0.5 grow rounded-full" />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      {section.dishes.map((dish) => (
                        <div
                          key={dish.id}
                          className="card bg-base-100 border-base-300/50 hover:border-primary/30 border shadow-sm transition-all hover:shadow-md"
                        >
                          <div className="card-body p-5">
                            <div className="flex items-start justify-between gap-4">
                              <h3 className="text-lg leading-tight font-bold">{dish.name}</h3>
                              {dish.price !== undefined && dish.price > 0 && (
                                <span className="badge badge-ghost badge-lg shrink-0 font-semibold">
                                  ${Number(dish.price).toFixed(2)}
                                </span>
                              )}
                            </div>

                            {dish.description && (
                              <p className="text-base-content/70 mt-2 text-sm leading-relaxed">{dish.description}</p>
                            )}

                            {dish.ingredients && dish.ingredients.length > 0 && (
                              <div className="mt-4 flex flex-wrap gap-1.5">
                                {dish.ingredients.map((ingredient, i) => (
                                  <span key={i} className="badge badge-sm badge-outline text-xs opacity-70">
                                    {ingredient}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <footer className="border-base-300 text-base-content/50 mt-20 border-t py-8 text-center text-sm">
        <p>
          Powered by <span className="font-bold">Menucraft</span>
        </p>
      </footer>
    </div>
  );
}
