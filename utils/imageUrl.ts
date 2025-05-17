const config = useRuntimeConfig();

export function createImageUrl(
    img: string,
    collection: string,
    album: string
): string {
    const apiUrl = config.public.backendUrl;
    const urlString = `${apiUrl}api/files/`;
    return urlString + collection + '/' + album + '/' + img;
}
