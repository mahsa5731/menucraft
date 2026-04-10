import {ProfileForm} from '@/components/profile/ProfileForm';

export default function RestaurantProfilePage() {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 p-4">
      <div>
        <h1 className="text-3xl font-bold">Restaurant Profile</h1>
        <p className="text-base-content/70 mt-2">Manage the core identity of your digital menus.</p>
      </div>
      <ProfileForm />
    </section>
  );
}
