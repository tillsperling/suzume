import { useQuery } from '@pinia/colada';
import PocketBase from 'pocketbase';

const config = useRuntimeConfig();

const pb = new PocketBase(config.public.backendUrl);

export async function fetchPosts() {
    try {
        const posts = await pb.collection('posts').getFullList();
        return posts;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
}

export const usePosts = () => {
    const {
        data: posts,
        isLoading,
        error,
    } = useQuery({
        key: ['posts'],
        query: fetchPosts,
    });

    return { posts, isLoading, error };
};
