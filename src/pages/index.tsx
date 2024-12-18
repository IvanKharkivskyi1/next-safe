import { getSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

interface CustomSession {
  user: {
    id: string;
    email: string;
  };
}

export default function Home({ session }: { session: CustomSession }) {
  const router = useRouter();

  if (!session) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>You are not signed in</h1>
        <button
          onClick={() => router.push('/auth/signin')}
          style={{ padding: '10px 20px', cursor: 'pointer' }}
        >
          Go to Sign In
        </button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to the protected area!</h1>
      <p>You are signed in as {session.user.email}</p>
      <p>Your ID is {session.user.id}</p>
      <button
        onClick={() => signOut({ callbackUrl: '/' })}
        style={{ padding: '10px 20px', cursor: 'pointer' }}
      >
        Sign Out
      </button>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
