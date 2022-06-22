<template>
    <div class="row mb-1">
        <div v-if="(alert.message)" class="col d-flex align-items-end">
            <strong>
                <i :class="alert.class"></i>
                {{ alert.message }}
            </strong>
        </div>
        <div v-if="first_opened == false" class="col text-right">
            <router-link :to="{name: 'product.create'}" class="btn btn-icon btn-primary" id="btn-create">
                <i class="fas fa-plus fa-fw"></i>
            </router-link>
        </div>
    </div>
    <div v-if="first_opened == false" class="row">
        <div class="col-md">
            <div class="card card-primary">
                <div class="card-body">
                    <table class="display compact stripe cell-border responsive nowrap" style="width:100%">
                        <thead>
                            <tr>
                                <th class="text-center">ID</th>
                                <th class="text-center">Name</th>
                                <th class="text-center">Price</th>
                                <th class="text-center">Description</th>
                                <th class="text-center">Created At</th>
                                <th class="text-center">Updated At</th>
                                <th class="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in products" :key="item.id">
                                <td>{{ item.id }}</td>
                                <td>{{ item.name }}</td>
                                <td>{{ moneyFormat(item.price) }}</td>
                                <td>{{ item.description }}</td>
                                <td class="text-center">{{ dateTime(item.created_at.date) }}</td>
                                <td class="text-center">{{ dateTime(item.updated_at.date) }}</td>
                                <td class="text-center">
                                    <a v-on:click="confirmDelete($event, item.id)" href="#" class="mr-1">
                                        <i class="text-danger cursor-pointer fas fa-trash"></i>
                                    </a>
                                    <router-link :to="{name: 'product.edit', params: {id: item.id}}">
                                        <i class="text-info fas fa-pen"></i>
                                    </router-link>
                                </td>
                            </tr>
                        </tbody>
                    </table> 
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* Vue */
import { onMounted, ref } from 'vue';

/* Public Depedencis */
import $ from 'jquery';
import axios from 'axios';
import JSAlert from 'js-alert';
import moment from 'moment';
// import jsZip from 'jszip';
// import pdfMake from 'pdfmake/build/pdfmake.min.js';
// import pdfFonts from "pdfmake/build/vfs_fonts.js";
import 'datatables.net/js/jquery.dataTables.min.js';
import 'datatables.net-responsive/js/dataTables.responsive.min.js';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'datatables.net-responsive-dt/css/responsive.dataTables.min.css';
// import 'datatables.net-buttons/js/dataTables.buttons.js';
// import 'datatables.net-buttons/js/buttons.print.min.js';
// import 'datatables.net-buttons/js/buttons.html5.min.js';
// import 'datatables.net-buttons/js/buttons.flash.min.js';
// import 'datatables.net-buttons-dt/css/buttons.dataTables.min.css';

/* My Package */
import { showToolTip, showAlert, moneyFormat } from './../../constant/function.js';
import { API_URL } from './../../constant/variable.js';

export default {
    setup() {
        let products = ref([]);
        let alert = ref({});
        let first_opened = ref(true);
        
        onMounted(() => {
            listProduct();
        });

        async function getProduct() {
            let response = await axios.get(`${API_URL}/products`);
            return response.data
        }

        async function deleteProduct(element, id) {
            await axios.postForm(`${API_URL}/products/delete/${id}`)
            .then(() => {
                products.value = products.value.filter(product => product.id != id);
                let table = $('table').DataTable();
                let removing_row = $(element).parent().parent().parent().closest('tr');
                table.row(removing_row).remove().draw();
            })
            .catch(err => {
                showAlert('success', err.message.toString())
                .then(res => {
                    alert.value = res;
                })
            })
            .finally(() => {
                return true;
            });
        }

        async function listProduct() {
            showAlert('loading', 'Data is loading, please wait...')
            .then(res => {
                alert.value = res;
            });

            getProduct().then((res) => {
                products.value = res;
            })
            .finally(() => {
                showAlert('success', 'Data loaded successfully.')
                .then(res => {
                    alert.value = res;
                    first_opened.value = false;
                })
                .finally(() => {
                    tooltipInitiation();
                    tableInitiation();
                });
            });
        }

        async function confirmDelete(event, id) {
            JSAlert.confirm('Data will be deleted, are you sure ?')
            .then((confirmed) => {
                if (confirmed) {
                    showAlert('loading', 'Data is deleting, please wait...')
                    .then(res => {
                        alert.value = res;
                    })
                    .finally(() => {
                        deleteProduct(event.target, id)
                        .then(() => {
                            showAlert('success', 'Data deleted successfully.')
                            .then(res => {
                                alert.value = res;
                            })
                        });
                    });
                }
            });
        }

        async function tableInitiation () {
            $('table').DataTable();
        }

        async function tooltipInitiation() {
            let btn_create = document.getElementById('btn-create');
            showToolTip(btn_create, 'Add New Product');
        }

        function dateTime(value) {
            return moment(value).format('YYYY-MM-DD');
        }

        return {
            products,
            alert,
            first_opened,
            confirmDelete,
            dateTime,
            moneyFormat
        }
    }
}
</script>
