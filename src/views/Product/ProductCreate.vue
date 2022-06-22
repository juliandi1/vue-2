<template>
    <div class="row mb-1">
        <div v-if="(alert.message)" class="col d-flex align-items-end">
            <strong>
                <i :class="alert.class"></i>
                {{ alert.message }}
            </strong>
        </div>
        <div class="col-md text-right">
            <button v-on:click="createProduct()" class="btn btn-icon btn-primary mr-1" id="btn-save">
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

export default {
    setup() {
        let alert = ref({});
        const product = reactive({
            name: null,
            price: null,
            description: null
        });

        onMounted(() => {
            tooltipInitiation();
        });

        async function createProduct() {
            showAlert('loading', 'Data is saving, please wait...')
            .then(res => {
                alert.value = res;
            })
            .finally(() => {
                storeProduct();
            });
        }

        async function storeProduct() {
            let data = {
                name: product.name,
                price: product.price,
                description: product.description
            }
            await axios.postForm(`${API_URL}/products/create`, data)
            .then(() => {
                showAlert('success', 'Data saved successfully')
                .then(res => {
                    alert.value = res;
                })
                .finally(() => {
                    product.name = null,
                    product.price = null,
                    product.description = null
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
            createProduct
        }
    }
}
</script>