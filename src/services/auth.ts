import { cookies } from 'next/headers';

interface Session {
  userId: string;
  email: string;
}

export async function verifySession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('session');

  if (!sessionToken) {
    return null;
  }

  try {
    // Verify session token with your backend
    const response = await fetch(`${process.env.API_URL}/auth/verify`, {
      headers: {
        'Authorization': `Bearer ${sessionToken.value}`,
      },
    });

    if (!response.ok) {
      return null;
    }

    const session = await response.json();
    return session;
  } catch (error) {
    console.error('Error verifying session:', error);
    return null;
  }
} 