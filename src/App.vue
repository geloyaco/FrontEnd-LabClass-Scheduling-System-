// App.vue
<template>
  <div class="app-container">
    <template v-if="!isDashboardRoute">
      <Sidebar />
      <div class="main-content">
        <Topbar />
        <router-view />
      </div>
    </template>
    <template v-else>
      <router-view />
    </template>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue';
import Topbar from './components/Topbar.vue';

export default {
  components: { Sidebar, Topbar },
  computed: {
    isDashboardRoute() {
      return this.$route.path.startsWith('/dashboard') ||
             this.$route.path.startsWith('/notifications') ||
             this.$route.path.startsWith('/schedule') ||
             this.$route.path.startsWith('/users');
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
}

html, body {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.app-container {
  height: 100vh;
  width: 100vw;
  display: flex;
  overflow: hidden;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>