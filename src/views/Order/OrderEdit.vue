<template>
    <div class="row mb-1">
        <div v-if="(alert.message)" class="col d-flex align-items-end">
            <strong>
                <i :class="alert.class"></i>
                {{ alert.message }}
            </strong>
        </div>
        <div class="col-md text-right">
            <button v-on:click="editOrder()" class="btn btn-icon btn-primary mr-1" id="btn-save">
                <i class="fas fa-fw fa-save"></i>
            </button>
            <router-link :to="{name: 'order.index'}" class="btn btn-icon btn-primary" id="btn-list">
                <i class="fas fa-list fa-fw"></i>
            </router-link>
        </div>
    </div>
    <div class="row">
        <div class="col-md">
            <div class="card card-primary">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md">
                            <div class="form-group">
                                <label>Status</label>
                                <select class="form-control" v-model="order.status_id">
                                    <option v-for="status in statuses" :key="status.id" :value="status.id">{{ status.name }}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* VueJS */
import { ref, reactive } from 'vue';

/* Public Depedencis */
import axios from 'axios';

import { onMounted } from '@vue/runtime-core';
/* My Package */
import { showToolTip, showAlert } from './../../constant/function.js';
import { API_URL } from './../../constant/variable.js';
import { useRoute } from 'vue-router';

export default {
    setup() {
        let alert = ref({});
        const order = reactive({
            status_id: null
        });
        const router = useRoute();
        let statuses = ref([]);

        onMounted(() => {
            tooltipInitiation();
            showAlert('loading', 'Data is loading, please wait...')
            .then(res => {
                alert.value = res;
            })
            .finally(() => {
                getOrder();
                getStatus();
            });
        });

        async function getOrder() {
            let id = router.params.id;
            await axios.get(`${API_URL}/orders/show/${id}`)
            .then(res => {
                order.status_id = res.data.status_id;
            })
            .finally(() => {
                showAlert('success', 'Data loaded successfully.')
                .then(res => {
                    alert.value = res;
                })
            });
        }

        async function getStatus() {
            await axios.get(`${API_URL}/statuses`)
            .then(res => {
                statuses.value = res.data;
            })
            .finally(() => {
                showAlert('success', 'Data loaded successfully.')
                .then(res => {
                    alert.value = res;
                })
            });
        }

        async function editOrder() {
            showAlert('loading', 'Data is saving, please wait...')
            .then(res => {
                alert.value = res;
            })
            .finally(() => {
                updateOrder();
            });
        }

        async function updateOrder() {
            let id = router.params.id;
            let data = {
                status_id: order.status_id
            }
            await axios.postForm(`${API_URL}/orders/update/${id}`, data)
            .then(() => {
                showAlert('success', 'Data updated successfully')
                .then(res => {
                    alert.value = res;
                });
            })
            .catch(err => {
                showAlert('error', err.toString())
                .then(res => {
                    alert.value = res;
                })
            });
        }

        async function tooltipInitiation() {
            let btn_save = document.getElementById('btn-save');
            let btn_list = document.getElementById('btn-list');
            showToolTip(btn_list, 'Order List');
            showToolTip(btn_save, 'Save Order');
        }

        return {
            order,
            alert,
            statuses,
            editOrder
        }
    }
}
</script>