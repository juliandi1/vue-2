<template>
<section class="section">
    <div class="container mt-5">
        <div class="page-error">
            <div class="page-inner">
                <h1>500</h1>
                <div class="page-description">
                    Whoopps, something went wrong.
                </div>
                <div class="page-search">
                    <div class="mt-3">
                        <router-link :to="{name: 'dashboard.index'}">Back to Home</router-link>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="simple-footer mt-5">
            Copyright © Stisla 2018
        </div> -->
    </div>
</section>
</template>

<script>
export default {

}
</script>

<style>

</style>
