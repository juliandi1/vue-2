<template>
    <div class="row mb-1">
        <div v-if="(alert.message)" class="col d-flex align-items-end">
            <strong>
                <i :class="alert.class"></i>
                {{ alert.message }}
            </strong>
        </div>
        <div class="col-md text-right">
            <button v-on:click="createUser()" class="btn btn-icon btn-primary mr-1" id="btn-save">
                <i class="fas fa-fw fa-save"></i>
            </button>
            <router-link :to="{name: 'user.index'}" class="btn btn-icon btn-primary" id="btn-list">
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
                                <label>Username</label>
                                <input type="text" class="form-control" v-model="user.username">
                            </div>
                        </div>
                        <div class="col-md">
                            <div class="form-group">
                                <label>Email</label>
                                <input type="text" class="form-control" v-model="user.email">
                            </div>
                        </div>
                        <div class="col-md">
                            <div class="form-group">
                                <label>Password</label>
                                <input type="password" class="form-control" v-model="user.password">
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
        const user = reactive({
            username: null,
            email: null,
            password: null,
            avatar: 'default.png'
        });

        onMounted(() => {
            tooltipInitiation();
        });

        async function createUser() {
            showAlert('loading', 'Data is saving, please wait...')
            .then(res => {
                alert.value = res;
            })
            .finally(() => {
                storeUser();
            });
        }

        async function storeUser() {
            let data = {
                username: user.username,
                email: user.email,
                password: user.password,
                avatar: user.avatar
            }
            await axios.postForm(`${API_URL}/users/create`, data)
            .then(() => {
                showAlert('success', 'Data saved successfully')
                .then(res => {
                    alert.value = res;
                })
                .finally(() => {
                    user.username = null,
                    user.email = null,
                    user.password = null
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
            showToolTip(btn_list, 'User List');
            showToolTip(btn_save, 'Save User');
        }

        return {
            user,
            alert,
            createUser
        }
    }
}
</script>