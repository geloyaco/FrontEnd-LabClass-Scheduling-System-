<template>
  <div class="sidebar" :class="{ expanded: isExpanded }" @mouseenter="expand" @mouseleave="collapse">
    <div class="logo-section">
      <img src="../assets/Logo-100px-white.png" alt="LabClass Logo" class="logo" />
      <span class="logo-text" v-show="isExpanded">LabClass</span>
    </div>

    <nav class="nav-links">
      <router-link to="/dashboard" class="nav-link" :class="{ active: $route.path === '/dashboard' }">
        <i class="fas fa-home"></i>
        <span v-show="isExpanded">Dashboard</span>
      </router-link>

      <router-link to="/notifications" class="nav-link" :class="{ active: $route.path === '/notifications' }">
        <i class="fas fa-bell"></i>
        <span v-show="isExpanded">Notifications</span>
      </router-link>

      <router-link to="/schedule" class="nav-link" :class="{ active: $route.path === '/schedule' }">
        <i class="fas fa-calendar"></i>
        <span v-show="isExpanded">Schedule</span>
      </router-link>

      <router-link to="/users" class="nav-link" :class="{ active: $route.path === '/users' }">
        <i class="fas fa-user"></i>
        <span v-show="isExpanded">User</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'DashBoardSidebar',
  data() {
    return {
      isExpanded: false
    }
  },
  methods: {
    expand() {
      this.isExpanded = true
    },
    collapse() {
      this.isExpanded = false
    }
  }
}
</script>

<style scoped>
.sidebar {
  background-color: #DD385A;
  height: 100vh;
  width: 70px;
  position: fixed;
  left: 0;
  top: 0;
  transition: width 0.3s ease;
  overflow: hidden;
  z-index: 1000;
  font-family: 'Inter', sans-serif;
}

.sidebar.expanded {
  width: 250px;
}

.logo-section {
  padding: 2rem 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.logo {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.logo-text {
  color: white;
  font-size: 1.5rem;
  font-weight: 500;
  white-space: nowrap;
}

.nav-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  color: white;
  text-decoration: none;
  transition: background-color 0.2s;
  white-space: nowrap;
  font-size: 1rem;
  font-family: 'Inter', sans-serif;
}

.nav-link:hover, .nav-link.active {
  background-color: rgba(255, 255, 255, 0.2);
}

.nav-link i {
  font-size: 1.25rem;
  width: 24px;
  text-align: center;
}

.nav-link span {
  margin-left: 1.25rem;
  font-weight: 400;
}
</style>