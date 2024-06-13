import { Button } from '@/components/ui/button';
import { auth, signIn, signOut } from '@/lib/auth';
import { getUsers } from '@/lib/brandscale';

export default async function IndexPage() {
  const session = await auth();
  const user = session?.user;

  return (
    <main className="flex flex-1 flex-col p-4 md:p-6">
      <div className="flex items-center mb-8">
        <h1 className="font-semibold text-lg md:text-2xl">Welcome!</h1>
      </div>

      <div className="w-full flex flex-col gap-y-6 items-center justify-center">
        <div>Sign up to get started!</div>

        <form
          action={async () => {
            'use server';
            await signIn('github');
          }}
        >
          <Button variant="outline">Sign Up</Button>
        </form>
      </div>
    </main>
  );
}
