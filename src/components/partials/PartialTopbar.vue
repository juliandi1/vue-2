<template>
<div>
    <div class="navbar-bg"></div>
    <nav class="navbar navbar-expand-lg main-navbar">
        <form class="form-inline mr-auto">
            <ul class="navbar-nav mr-3">
                <li><a href="#" data-toggle="sidebar" class="nav-link nav-link-lg"><i class="fas fa-bars"></i></a></li>
            </ul>
        </form>
        <ul class="navbar-nav navbar-right">
            <li class="dropdown">
                <div class="nav-link nav-link-lg nav-link-user">
                    <img alt="image" :src="`${public_path}assets/img/avatar/avatar-1.png`" class="rounded-circle mr-1">
                    <div class="d-sm-none d-lg-inline-block">Administrator</div>
                </div>
            </li>
        </ul>
    </nav>
</div>
</template>

<script>
import { ref } from 'vue';

export default {
    setup() {
        const public_path = ref(process.env.BASE_URL);

        return {
            public_path
        }
    }
}
</script>

<style>

</style>
