<template>
    <div class="row">
        <div class="col-lg-3 col-md-6 col-sm-6 col-12">
            <div class="card card-statistic-1">
                <div class="card-icon bg-primary">
                    <i v-if="(loading)" class="fas fa-cog fa-spin"></i>
                    <i v-else class="fas fa-users"></i>
                </div>
                <div class="card-wrap">
                    <div class="card-header">
                        <h4>User</h4>
                    </div>
                    <div class="card-body">
                        {{ dashboard_data.user_count }}
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-3 col-md-6 col-sm-6 col-12">
            <div class="card card-statistic-1">
                <div class="card-icon bg-danger">
                    <i v-if="(loading)" class="fas fa-cog fa-spin"></i>
                    <i v-else class="fas fa-box"></i>
                </div>
                <div class="card-wrap">
                    <div class="card-header">
                        <h4>Product</h4>
                    </div>
                    <div class="card-body">
                        {{ dashboard_data.product_count }}
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-3 col-md-6 col-sm-6 col-12">
            <div class="card card-statistic-1">
                <div class="card-icon bg-warning">
                    <i v-if="(loading)" class="fas fa-cog fa-spin"></i>
                    <i v-else class="fas fa-comment"></i>
                </div>
                <div class="card-wrap">
                    <div class="card-header">
                        <h4>Status</h4>
                    </div>
                    <div class="card-body">
                        {{ dashboard_data.status_count }}
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-3 col-md-6 col-sm-6 col-12">
            <div class="card card-statistic-1">
                <div class="card-icon bg-success">
                    <i v-if="(loading)" class="fas fa-cog fa-spin"></i>
                    <i v-else class="fas fa-clipboard"></i>
                </div>
                <div class="card-wrap">
                    <div class="card-header">
                        <h4>Order</h4>
                    </div>
                    <div class="card-body">
                        {{ dashboard_data.order_count }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* VueJS */
import { ref, onMounted } from 'vue';

/* Public Depedencis */
import axios from 'axios';

/* My Package */
import { API_URL } from './../../constant/variable.js';

export default {
    setup() {
        let loading = ref(false);
        let dashboard_data = ref({});

        
        onMounted(() => {
            getData();
        });

        async function getData() {
            loading.value = true;
            await axios.get(`${API_URL}/dashboard`)
            .then(res => {
                dashboard_data.value = res.data;
            })
            .finally(() => {
                loading.value = false;
            });
        }

        return {
            dashboard_data,
            loading
        }
    }
}
</script>

<style>

</style>
