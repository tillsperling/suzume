import { useQuery } from '@pinia/colada';
import PocketBase from 'pocketbase';

const config = useRuntimeConfig();

const pb = new PocketBase(config.public.backendUrl);

export async function fetchImages() {
    try {
        const images = await pb.collection('images').getFullList();
        return images;
    } catch (error) {
        console.error('Error fetching images:', error);
        throw error;
    }
}

export const useImages = () => {
    const {
        data: images,
        isLoading,
        error,
    } = useQuery({
        key: ['images'],
        query: fetchImages,
    });

    return { images, isLoading, error };
};
