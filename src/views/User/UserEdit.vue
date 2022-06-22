<template>
    <div class="row mb-1">
        <div v-if="(alert.message)" class="col d-flex align-items-end">
            <strong>
                <i :class="alert.class"></i>
                {{ alert.message }}
            </strong>
        </div>
        <div class="col-md text-right">
            <button v-on:click="editUser()" class="btn btn-icon btn-primary mr-1" id="btn-save">
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
import { useRoute } from 'vue-router';

export default {
    setup() {
        let alert = ref({});
        const user = reactive({
            username: null,
            email: null,
            password: null,
            avatar: 'default.png'
        });
        const router = useRoute();

        onMounted(() => {
            tooltipInitiation();
            showAlert('loading', 'Data is loading, please wait...')
            .then(res => {
                alert.value = res;
            })
            .finally(() => {
                getUser();
            });
        });

        async function getUser() {
            let id = router.params.id;
            await axios.get(`${API_URL}/users/show/${id}`)
            .then(res => {
                user.username = res.data.username;
                user.email = res.data.email;
            })
            .finally(() => {
                showAlert('success', 'Data loaded successfully.')
                .then(res => {
                    alert.value = res;
                })
            });
        }

        async function editUser() {
            showAlert('loading', 'Data is saving, please wait...')
            .then(res => {
                alert.value = res;
            })
            .finally(() => {
                updateUser();
            });
        }

        async function updateUser() {
            let id = router.params.id;
            let data = {
                username: user.username,
                email: user.email,
                password: user.password,
                avatar: user.avatar
            }
            await axios.postForm(`${API_URL}/users/update/${id}`, data)
            .then(() => {
                showAlert('success', 'Data updated successfully')
                .then(res => {
                    alert.value = res;
                })
                .finally(() => {
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
            editUser
        }
    }
}
</script>