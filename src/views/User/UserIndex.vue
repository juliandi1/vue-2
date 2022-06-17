<template>
    <div class="row mb-1">
        <div v-if="(alert.message)" class="col d-flex align-items-end">
            <strong>
                <i :class="alert.class"></i>
                {{ alert.message }}
            </strong>
        </div>
        <div v-if="first_opened == false" class="col text-right">
            <button class="btn btn-primary btn-icon mr-1" data-toggle="modal" data-target="#filterModal" id="btn-filter">
                <i class="fas fa-fw fa-filter"></i>
            </button>
            <router-link :to="{name: 'user.create'}" class="btn btn-icon btn-primary" id="btn-create">
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
                                <th class="text-center">Name</th>
                                <th class="text-center">Email</th>
                                <th class="text-center">Role</th>
                                <th class="text-center">Join</th>
                                <th class="text-center">Status</th>
                                <th class="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in users" :key="item.id">
                                <td>{{ item.name }}</td>
                                <td>{{ item.email }}</td>
                                <td class="text-center">
                                    <h6>
                                        <span v-if="item.id == 8" class="badge badge-warning badge-sm">Super User</span>
                                        <span v-else-if="item.id == 2" class="badge badge-success badge-sm">Admin</span>
                                        <span v-else class="badge badge-primary badge-sm">User</span>
                                    </h6>
                                </td>
                                <td class="text-center">{{ item.join }}</td>
                                <td class="text-center">
                                    <i v-if="item.id == 12" class="fas fa-fw fa-times text-danger">
                                        <span class="d-none">status off</span>
                                    </i>
                                    <i v-else-if="item.id == 9" class="fas fa-ban fa-fw text-warning">
                                        <span class="d-none">status banned</span>
                                    </i>
                                    <i v-else class="fas fa-check fa-fw text-success">
                                        <span class="d-none">status on</span>
                                    </i>
                                </td>
                                <td class="text-center">
                                    <a v-on:click="confirmDelete($event, item.id)" href="#">
                                        <i class="text-danger cursor-pointer fas fa-trash"></i>
                                    </a>
                                    <i class="text-success mx-2 fas fa-pen"></i>
                                    <router-link :to="{name: 'user.detail', params: {id: item.id}}">
                                        <i class="text-info fas fa-info"></i>
                                    </router-link>
                                </td>
                            </tr>
                        </tbody>
                    </table> 
                </div>
            </div>
        </div>
    </div>
    
<!-- Modal -->
<div class="modal fade" id="filterModal" role="dialog" aria-labelledby="filterModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="filterModalLabel">Filter</h5>
            </div>
            <div class="modal-body">
                <div class="date-range-input bg-light rounded"></div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary btn-icon" data-dismiss="modal">
                    <i class="fas fa-fw fa-times"></i>
                </button>
                <button type="button" class="btn btn-primary btn-icon">
                    <i class="fas fa-fw fa-check"></i>
                </button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
/* Vue */
import { onMounted, ref, onUnmounted } from 'vue';

/* Public Depedencis */
import $ from 'jquery';
import { faker } from '@faker-js/faker';
import JSAlert from 'js-alert';
import DateRangeInput from '@equipmentshare/date-range-input';
import jsZip from 'jszip';
import pdfMake from 'pdfmake/build/pdfmake.min.js';
import pdfFonts from "pdfmake/build/vfs_fonts.js";
import 'datatables.net/js/jquery.dataTables.min.js';
import 'datatables.net-responsive/js/dataTables.responsive.min.js';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'datatables.net-responsive-dt/css/responsive.dataTables.min.css';
import 'datatables.net-buttons/js/dataTables.buttons.js';
import 'datatables.net-buttons/js/buttons.print.min.js';
import 'datatables.net-buttons/js/buttons.html5.min.js';
import 'datatables.net-buttons/js/buttons.flash.min.js';
import 'datatables.net-buttons-dt/css/buttons.dataTables.min.css';

/* My Function */
import { showToolTip, showAlert, clearAllModal } from './../../constant/function.js';

export default {
    setup() {
        let users = ref([]);
        let alert = ref({});
        let first_opened = ref(true);

        onUnmounted(() => {
            clearAllModal();
        });
        
        onMounted(() => {
            $('#filterModal').appendTo('body');
            listUser();
            dateRangeInitiation();
        });

        async function getUser() {
            return new Promise(resolve => {
                setTimeout(() => {
                    let fakse_users = [];
                    for (let i = 1; i <= 12; i++) {
                        fakse_users.push({
                            id: i,
                            name: faker.name.findName(),
                            email: faker.internet.email(),
                            phone: faker.phone.phoneNumber(),
                            join: faker.date.past().toISOString().slice(0, 10),
                            address: faker.address.city(),
                        });
                    }
                    resolve(fakse_users);
                }, 1000);
            });
        }

        async function deleteUser(element, id) {
            return new Promise(resolve => {
                setTimeout(() => {
                    users.value = users.value.filter(user => user.id != id);
                    let table = $('table').DataTable();
                    let removing_row = $(element).parent().parent().parent().closest('tr');
                    table.row(removing_row).remove().draw();
                    resolve(true);
                }, 1000);
            });
        }

        async function listUser() {
            showAlert('loading', 'Data is loading, please wait...')
            .then(res => {
                alert.value = res;
            });

            getUser().then((res) => {
                users.value = res;
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
                        deleteUser(event.target, id)
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
            window.JSZip = jsZip;
            pdfMake.vfs = pdfFonts.pdfMake.vfs;
            let options = {
                columns: [0, 1, 2, 3, 4]
            }
            $('table').DataTable({
                dom: 'Bfrtip',
                buttons: [
                    {
                        extend: 'copy',
                        exportOptions: options
                    },
                    {
                        extend: 'csv',
                        exportOptions: options
                    },
                    {
                        extend: 'excel',
                        exportOptions: options
                    },
                    {
                        extend: 'pdf',
                        exportOptions: options
                    },
                    {
                        extend: 'print',
                        exportOptions: options
                    },
                ]
            });
        }

        async function tooltipInitiation() {
            let btn_create = document.getElementById('btn-create');
            let btn_filter = document.getElementById('btn-filter');
            showToolTip(btn_create, 'Add New User');
            showToolTip(btn_filter, 'Filter User');
        }

        async function dateRangeInitiation() {
            let html = $('.date-range-input');
            if (html.length <= 1) {
                const dateRangeInput = new DateRangeInput({
                    target: document.querySelector('div.date-range-input')
                });
                dateRangeInput.$on('change', event => console.log(event.detail));
            }
        }

        return {
            users,
            alert,
            first_opened,
            confirmDelete,
        }
    }
}
</script>
