<script lang="ts" setup>
import Logo from '~/components/Logo.vue';

import { usePosts } from '~/composables/posts';

const { posts, isLoading } = usePosts();

watch(posts, (newPosts) => {
    console.log('Posts updated:', newPosts);
});
</script>

<template>
    <div class="container">
        <Logo />
        <div class="link-wrapper">
            <div v-for="post in posts" :key="post" class="link-item">
                <nuxt-link
                    :to="`/${post.slug}`"
                    class="link"
                    :class="{ active: post.active }"
                >
                    <p class="title">{{ post.title }}</p>
                </nuxt-link>
            </div>
        </div>
    </div>
</template>

<style>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}
.link-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.link-item {
    margin-bottom: 1rem;
}
.link {
    text-decoration: none;
    color: #d3c8b9;
    font-size: 1rem;
}

.active {
    color: #000;
}
</style>
