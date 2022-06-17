<template>
<div class="main-sidebar sidebar-style-2">
    <aside id="sidebar-wrapper">
        <div class="sidebar-brand">
            <a href="#">
                <i class="fas fa-code mr-1"></i>
                <span>Z Code</span>
            </a>
        </div>
        <div class="sidebar-brand sidebar-brand-sm">
            <a href="#">
                <i class="fas fa-code mr-1"></i>
            </a>
        </div>
        <ul class="sidebar-menu">
            <li class="menu-header">Dashboard</li>
            <li class="dropdown" :class="[{'active': $route.name === 'dashboard.index'}]">
                <router-link class="nav-link" :to="{name: 'dashboard.index'}">
                    <i class="fas fa-fire"></i><span>Dashboard</span>
                </router-link>
            </li>
            <li class="menu-header">Master</li>
            <li class="dropdown" :class="[{'active': $route.meta.parent === 'user'}]">
                <a href="#" class="nav-link has-dropdown" data-toggle="dropdown">
                    <i class="fas fa-users"></i>
                    <span>User</span>
                </a>
                <ul class="dropdown-menu">
                    <li :class="[{'active': $route.name === 'user.index'}]">
                        <router-link class="nav-link" :to="{name: 'user.index'}">
                            <span>List</span>
                        </router-link>
                    </li>
                    <li :class="[{'active': $route.name === 'user.create'}]">
                        <router-link class="nav-link" :to="{name: 'user.create'}">
                            <span>Create</span>
                        </router-link>
                    </li>
                </ul>
            </li>
        </ul>
    </aside>
</div>
</template>

<script>
export default {
    name: 'TemplateSidebar'
}
</script>

<style>

</style>
