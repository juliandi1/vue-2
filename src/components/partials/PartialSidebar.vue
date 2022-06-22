<template>
<div class="main-sidebar sidebar-style-2">
    <aside id="sidebar-wrapper">
        <div class="sidebar-brand">
            <a href="#">
                <i class="fas fa-shopping-cart mr-1"></i>
                <span>ONLINE SHOP</span>
            </a>
        </div>
        <div class="sidebar-brand sidebar-brand-sm">
            <a href="#">
                <i class="fas fa-shopping-cart"></i>
            </a>
        </div>
        <ul class="sidebar-menu">
            <li class="menu-header">Dashboard</li>
            <li class="dropdown" :class="[{'active': $route.name === 'dashboard.index'}]">
                <router-link class="nav-link" :to="{name: 'dashboard.index'}">
                    <i class="fas fa-home"></i><span>Dashboard</span>
                </router-link>
            </li>
            <li class="menu-header">Master</li>
            <li :class="[{'active': $route.meta.parent === 'user'}]">
                <router-link class="nav-link" :to="{name: 'user.index'}">
                    <i class="fas fa-users"></i>
                    <span>User</span>
                </router-link>
            </li>
            <li :class="[{'active': $route.meta.parent === 'product'}]">
                <router-link class="nav-link" :to="{name: 'product.index'}">
                    <i class="fas fa-box"></i>
                    <span>Product</span>
                </router-link>
            </li>
            <li :class="[{'active': $route.meta.parent === 'status'}]">
                <router-link class="nav-link" :to="{name: 'status.index'}">
                    <i class="fas fa-comment"></i>
                    <span>Status</span>
                </router-link>
            </li>
            <li class="menu-header">Main</li>
            <li :class="[{'active': $route.meta.parent === 'order'}]">
                <router-link class="nav-link" :to="{name: 'order.index'}">
                    <i class="fas fa-clipboard"></i>
                    <span>Order</span>
                </router-link>
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
