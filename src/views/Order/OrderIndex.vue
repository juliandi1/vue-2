<template>
    <div class="row mb-1">
        <div v-if="(alert.message)" class="col d-flex align-items-end">
            <strong>
                <i :class="alert.class"></i>
                {{ alert.message }}
            </strong>
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
                                <th class="text-center">User</th>
                                <th class="text-center">Product</th>
                                <th class="text-center">Qty</th>
                                <th class="text-center">Total</th>
                                <th class="text-center">Status</th>
                                <th class="text-center">Created At</th>
                                <th class="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in orders" :key="item.id">
                                <td>{{ item.id }}</td>
                                <td>{{ item.user_name }}</td>
                                <td>{{ item.product_name }}</td>
                                <td>{{ item.qty }}</td>
                                <td>{{ moneyFormat(item.total) }}</td>
                                <td>{{ item.status_name }}</td>
                                <td class="text-center">{{ dateTime(item.created_at.date) }}</td>
                                <td class="text-center">
                                    <a v-on:click="confirmDelete($event, item.id)" href="#" class="mr-1">
                                        <i class="text-danger cursor-pointer fas fa-trash"></i>
                                    </a>
                                    <router-link :to="{name: 'order.edit', params: {id: item.id}}">
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
        let orders = ref([]);
        let alert = ref({});
        let first_opened = ref(true);
        
        onMounted(() => {
            listOrder();
        });

        async function getOrder() {
            let response = await axios.get(`${API_URL}/orders`);
            return response.data
        }

        async function deleteOrder(element, id) {
            await axios.postForm(`${API_URL}/orders/delete/${id}/`)
            .then(() => {
                orders.value = orders.value.filter(order => order.id != id);
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

        async function listOrder() {
            showAlert('loading', 'Data is loading, please wait...')
            .then(res => {
                alert.value = res;
            });

            getOrder().then((res) => {
                orders.value = res;
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
                        deleteOrder(event.target, id)
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
            showToolTip(btn_create, 'Add New Order');
        }

        function dateTime(value) {
            return moment(value).format('YYYY-MM-DD');
        }

        return {
            orders,
            alert,
            first_opened,
            confirmDelete,
            dateTime,
            moneyFormat
        }
    }
}
</script>
