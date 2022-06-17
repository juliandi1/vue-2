<template>
  <div id="app">
    <div v-if="$route.meta.parent != 'error'" class="main-wrapper main-wrapper-1">
      <!-- Topbar -->
      <PartialTopbar></PartialTopbar>
      <!-- Sidebar -->
      <PartialSidebar></PartialSidebar>
      <!-- Main Content -->
      <div class="main-content">
        <section class="section">
          <div class="section-header">
            <h1>{{ $route.meta.title }}</h1>
            <div class="section-header-breadcrumb">
              <div v-if="$route.meta.main_menu" class="breadcrumb-item">
                <span>{{ $route.meta.main_menu }}</span>
              </div>
              <div v-if="$route.meta.sub_menu" class="breadcrumb-item">
                <span>{{ $route.meta.sub_menu }}</span>
              </div>
            </div>
          </div>
          <div class="section-body">
            <router-view></router-view>
          </div>
        </section>
      </div>
    </div>
    <router-view v-else></router-view>
  </div>
</template>

<script>
import { PartialTopbar, PartialSidebar } from './components/partials';

export default {
  components: {
    PartialTopbar: PartialTopbar,
    PartialSidebar: PartialSidebar
  }
}
</script>

<style>
  th {
    border-top: 1px solid #dddddd;
    border-bottom: 1px solid #dddddd;
    border-right: 1px solid #dddddd;
  }

  th:first-child {
    border-left: 1px solid #dddddd;
  }
</style>