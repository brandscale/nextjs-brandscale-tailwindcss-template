import { Button } from '@/components/ui/button';
import { auth, signIn, signOut } from '@/lib/auth';
import { getUsers } from '@/lib/brandscale';

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string; offset: string };
}) {
  const session = await auth();
  const user = session?.user;

  const search = searchParams.q ?? '';
  const offset = searchParams.offset ?? 0;
  const { users, newOffset } = await getUsers(search, Number(offset));

  return (
    <main className="flex flex-1 flex-col p-4 md:p-6">
      <div className="flex items-center mb-8">
        <h1 className="font-semibold text-lg md:text-2xl">Welcome!</h1>
      </div>

      <div className="w-full mb-4">
        Sign up to get started!

        <form
          action={async () => {
            'use server';
            await signIn('github');
          }}
        >
          <Button variant="outline">Sign In</Button>
        </form>
      </div>
    </main>
  );
}
