<script lang="ts" setup>
import type { CurrentPost } from '~/interfaces/posts';
import type { ImageCollection } from '~/interfaces/imageCollection';

import { useRoute } from 'vue-router';
import { usePosts } from '~/composables/posts';
import { useImages } from '~/composables/images';
import { createImageUrl } from '~/utils/imageUrl';

const route = useRoute();
const postSlug = route.params.post as string;
const { posts, postsLoading } = usePosts();
const currentPost = ref<CurrentPost>();

const { images, isLoading } = useImages();
const image = ref();
const imageArray = ref();

const isScrolledTop = ref<boolean>();

watch(
    () => postsLoading.value,
    (loading) => {
        if (!loading && posts.value) {
            currentPost.value = posts.value.find(
                (post) => post.slug === postSlug
            ) as CurrentPost | undefined;
        }
    },
    { immediate: true }
);

watch(
    [currentPost, images],
    ([post, imageList]) => {
        if (post && imageList) {
            image.value = imageList.find(
                (img) => img.id === currentPost.value?.images
            );
        }
    },
    { immediate: true }
);

watch(image, (image) => {
    imageArray.value = generateImageArrayWithUrls(image);
});

onMounted(() => {
    const handleScroll = () => {
        isScrolledTop.value = window.scrollY === 0;
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);

    onBeforeUnmount(() => {
        window.removeEventListener('scroll', handleScroll);
    });
});

const generateImageArrayWithUrls = (imageCollection: ImageCollection) => {
    const array = [];
    const collectionId = imageCollection.collectionId;
    const id = imageCollection.id;
    for (let i = 0; i < imageCollection.album.length; i++) {
        const image = imageCollection.album[i];
        const imageUrl = createImageUrl(image, collectionId, id);
        array.push(imageUrl);
    }
    return array;
};

const setFullScreen = () => {
    const carousel = document.querySelectorAll('.corousel-item');
    if (carousel) {
        for (let i = 0; i < carousel.length; i++) {
            const item = carousel[i];
            if (item.classList.contains('full-screen')) {
                item.classList.remove('full-screen');
            } else {
                item.classList.add('full-screen');
            }
        }
    }
};
</script>
<template>
    <UCarousel
        v-slot="{ item }"
        :items="imageArray"
        loop
        :class="{ 'scroll-top': isScrolledTop }"
    >
        <img
            :src="item as string"
            height="100"
            class="corousel-item"
            @click="setFullScreen"
        />
    </UCarousel>
    <div class="m-12 md:mx-38 lg:mx-60 xl:mx-96 2xl:mx-96">
        <h1 class="mb-8">
            {{ currentPost?.title }}
        </h1>
        <p v-html="currentPost?.text"></p>
    </div>
    <Logo class="positionBottom" />
</template>

<style scoped lang="scss">
.positionBottom {
    padding: 1rem;
    text-align: center;
    z-index: 1000;
}

.corousel-item {
    height: 20vh;
    width: 100%;
    object-fit: cover;
    object-position: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    display: block;
    transition: all 0.3s ease;
}

.full-screen {
    width: 100%;
    height: 90vh;
    z-index: 9999;
}

h1 {
    text-align: center;
    font-size: 1.5rem;
    @media screen and (min-width: 768px) {
        font-size: 2rem;
    }
}

p {
    text-align: left;
    font-size: 1rem;
    @media screen and (min-width: 768px) {
        font-size: 1rem;
    }
}
</style>
