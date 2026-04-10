import {AccountOverview} from '@/components/account/AccountOverview';
import {PasswordResetCard} from '@/components/account/PasswordResetCard';
import {DeleteAccountCard} from '@/components/account/DeleteAccountCard';

export default function AccountPage() {
  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col gap-8 p-4">
      <div>
        <h1 className="text-3xl font-bold">Account Settings</h1>
        <p className="text-base-content/70 mt-2">Manage your credentials and system data.</p>
      </div>

      <div className="flex flex-col gap-6">
        <AccountOverview />
        <PasswordResetCard />

        <div className="divider mt-4">Danger Zone</div>

        <DeleteAccountCard />
      </div>
    </section>
  );
}
