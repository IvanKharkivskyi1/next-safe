import { GetServerSidePropsContext } from 'next';
import { getCsrfToken } from 'next-auth/react';
import Link from 'next/link';

export default function SignIn({ csrfToken }: { csrfToken: string | null }) {
  return (
    <div>
      <h1>Sign In</h1>
      <form method="post" action="/api/auth/callback/credentials">
        <input name="csrfToken" type="hidden" defaultValue={csrfToken || ''} />
        <div>
          <label>Email:</label>
          <input name="email" type="email" required />
        </div>
        <div>
          <label>Password:</label>
          <input name="password" type="password" required />
        </div>
        <button type="submit">Sign In</button>
      </form>
      <p>
        Don't have an account? <Link href="/auth/register">Register here</Link>
      </p>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
