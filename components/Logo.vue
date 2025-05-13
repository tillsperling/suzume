<script lang="ts" setup></script>
<template>
    <div class="logo-wrapper">
        <img src="~/public/birb_smol.png" alt="Logo" class="logo" />
        <span class="logo-text">suzume.</span>
    </div>
</template>
<style>
.logo-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.logo {
    width: 50px;
    height: 50px;
}
.logo-text {
    font-size: 3rem;
    color: #333;
    font-family: 'Timmana', sans-serif;
    margin-top: -10px;
}
</style>
