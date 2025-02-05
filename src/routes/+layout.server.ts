import type { Cookies } from '@sveltejs/kit';

export function load({ cookies }: { cookies: Cookies }) {
    const authCookie = cookies.get('auth');
    const user = authCookie ? JSON.parse(authCookie) : null;

    return { user };
}
