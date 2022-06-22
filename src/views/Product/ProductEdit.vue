<template>
    <div class="row mb-1">
        <div v-if="(alert.message)" class="col d-flex align-items-end">
            <strong>
                <i :class="alert.class"></i>
                {{ alert.message }}
            </strong>
        </div>
        <div class="col-md text-right">
            <button v-on:click="editProduct()" class="btn btn-icon btn-primary mr-1" id="btn-save">
                <i class="fas fa-fw fa-save"></i>
            </button>
            <router-link :to="{name: 'product.index'}" class="btn btn-icon btn-primary" id="btn-list">
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
                                <label>Name</label>
                                <input type="text" class="form-control" v-model="product.name">
                            </div>
                        </div>
                        <div class="col-md">
                            <div class="form-group">
                                <label>Price</label>
                                <input type="text" class="form-control" v-model="product.price">
                            </div>
                        </div>
                        <div class="col-md">
                            <div class="form-group">
                                <label>Description</label>
                                <input type="text" class="form-control" v-model="product.description">
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
        const product = reactive({
            name: null,
            price: null,
            description: null
        });
        const router = useRoute();

        onMounted(() => {
            tooltipInitiation();
            showAlert('loading', 'Data is loading, please wait...')
            .then(res => {
                alert.value = res;
            })
            .finally(() => {
                getProduct();
            });
        });

        async function getProduct() {
            let id = router.params.id;
            await axios.get(`${API_URL}/products/show/${id}`)
            .then(res => {
                product.name = res.data.name;
                product.price = res.data.price;
                product.description = res.data.description;
            })
            .finally(() => {
                showAlert('success', 'Data loaded successfully.')
                .then(res => {
                    alert.value = res;
                })
            });
        }

        async function editProduct() {
            showAlert('loading', 'Data is saving, please wait...')
            .then(res => {
                alert.value = res;
            })
            .finally(() => {
                updateProduct();
            });
        }

        async function updateProduct() {
            let id = router.params.id;
            let data = {
                name: product.name,
                price: product.price,
                description: product.description
            }
            await axios.postForm(`${API_URL}/products/update/${id}`, data)
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
            showToolTip(btn_list, 'Product List');
            showToolTip(btn_save, 'Save Product');
        }

        return {
            product,
            alert,
            editProduct
        }
    }
}
</script>