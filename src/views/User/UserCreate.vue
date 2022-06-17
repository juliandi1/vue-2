<template>
    <div class="row mb-1">
        <div class="col-md text-right">
            <button class="btn btn-icon btn-primary mr-1">
                <i class="fas fa-fw fa-save"></i>
            </button>
            <router-link :to="{name: 'user.index'}" class="btn btn-icon btn-primary">
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
                                <input type="text" class="form-control">
                            </div>
                        </div>
                        <div class="col-md">
                            <div class="form-group">
                                <label>Email</label>
                                <input type="text" class="form-control">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md">
                            <div class="form-group">
                                <label>Role</label>
                                <select class="form-control">
                                    <option>Super User</option>
                                    <option>Admin</option>
                                    <option>User</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md">
                            <div class="form-group">
                                <label>Status</label>
                                <select class="form-control">
                                    <option>Active</option>
                                    <option>Banned</option>
                                    <option>Not Active</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md">
                            <div class="form-group">
                                <label>Join</label>
                                <input type="date" class="form-control">
                            </div>
                        </div>
                        <div class="col-md">
                            <div class="form-group">
                                <label>Avatar <sup class="text-danger">Optional</sup></label>
                                <input type="file" class="form-control">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md">
                            <div class="form-group">
                                <label>Description <sup class="text-danger">Optional</sup></label>
                                <QuillEditor theme="snow"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* Public Depedencis */
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

export default {
    components: {
        QuillEditor
    }
}
</script>