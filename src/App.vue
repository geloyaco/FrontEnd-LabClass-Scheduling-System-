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
      <div class="dashboard-layout">
        <router-view />
      </div>
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
             this.$route.path.startsWith('/all-schedules') ||
             this.$route.path.startsWith('/user-management') ||
             this.$route.path.startsWith('/account-management') ||
             this.$route.path.startsWith('/user-profile') ||
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
  background-color: #f5f5f5;
}

.app-container {
  height: 100vh;
  width: 100vw;
  display: flex;
  overflow: hidden;
  background-color: #f5f5f5;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 0; /* Prevent flex item from overflowing */
  background-color: #f5f5f5;
}

/* Dashboard routes specific styles */
.dashboard-layout {
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #f5f5f5;
}

.dashboard-layout .main-content {
  flex: 1;
  margin-left: 70px;
  width: calc(100vw - 70px);
  min-width: 0;
}
</style>