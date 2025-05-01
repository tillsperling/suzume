<script lang="ts" setup>
import Logo from '~/components/Logo.vue';


const blogposts = [
    {
        title: 'Post 1',
        slug: 'post-1',
        image: 'https://via.placeholder.com/150',
        description: 'This is the first post',
    },
    {
        title: 'Post 2',
        slug: 'post-2',
        image: 'https://via.placeholder.com/150',
        description: 'This is the second post',
    },
    {
        title: 'Post 3',
        slug: 'post-3',
        image: 'https://via.placeholder.com/150',
        description: 'This is the third post',
    },
];
</script>
<template>
    <Logo />
    <div class="link-wrapper">
        <div v-for="post in blogposts">
            <nuxt-link :to="`/${post.slug}`" class="link">
                <h2 class="title">{{ post.title }}</h2>
            </nuxt-link>
        </div>
    </div>
</template>
<style></style>