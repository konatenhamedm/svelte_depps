export async function handle({ event, resolve }) {
    const response = await resolve(event, {
        transformOrigin: true
    });
    return response;
}
