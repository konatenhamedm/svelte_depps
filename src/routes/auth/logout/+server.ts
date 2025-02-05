import type { RequestEvent } from '@sveltejs/kit';

export function POST({ cookies }: RequestEvent) {
    // Supprimer le cookie en définissant une date d'expiration passée
    cookies.set('auth', '', {
        path: '/',
        expires: new Date(0),
        httpOnly: true,
        secure: true, // Mettez `false` si vous êtes en développement (http)
        sameSite: 'strict'
    });

    return new Response(null, { status: 200 });
}
