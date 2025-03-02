<template>
  <div class="topbar">
    <div class="left-section">
      <div class="logos">
        <img src="../assets/uic-logo-3.svg" alt="UIC Logo" class="logo" />
        <img src="../assets/CCS-logo.svg" alt="CCS Logo" class="logo" />
      </div>
      <h1>{{ currentPage }}</h1>
    </div>
    <div class="right-section">
      <div class="user-menu" @click="toggleDropdown">
        <i class="fas fa-user user-icon"></i>
        <span class="username">John Doe</span>
        <div class="dropdown-menu" v-show="showDropdown">
          <button class="menu-item">
            <i class="fas fa-cog"></i>
            Settings
          </button>
          <button @click="logout" class="menu-item">
            <i class="fas fa-sign-out-alt"></i>
            Log Out
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashBoardTopbar',
  data() {
    return {
      showDropdown: false
    }
  },
  computed: {
    currentPage() {
      const route = this.$route.name;
      if (route === 'Notifications') return 'Notifications';
      if (route === 'Schedule') return 'Schedule';
      return 'Dashboard';
    }
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown
    },
    logout() {
      this.$router.push('/login')
    }
  },
  mounted() {
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.$el.contains(e.target)) {
        this.showDropdown = false
      }
    })
  }
}
</script>

<style scoped>
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 2rem;
  background: white;
  width: 100%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  font-family: 'Inter', sans-serif;
}

.left-section {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.logos {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo {
  height: 32px;
  width: auto;
}

h1 {
  font-size: 1.75rem;
  font-weight: 500;
  color: #DD385A;
  margin: 0;
  font-family: 'Inter', sans-serif;
}

.right-section {
  display: flex;
  align-items: center;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  position: relative;
  padding: 0.5rem;
}

.user-icon {
  color: #DD385A;
  font-size: 1.1rem;
}

.username {
  color: #DD385A;
  font-size: 0.9rem;
  font-weight: 500;
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  min-width: 150px;
  z-index: 1000;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  width: 100%;
  border: none;
  background: none;
  cursor: pointer;
  color: #DD385A;
  font-size: 0.9rem;
  text-align: left;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.menu-item:hover {
  background-color: rgba(221, 56, 90, 0.1);
}

.menu-item i {
  font-size: 1rem;
  color: #DD385A;
  margin-right: 8px;
}

.user-menu:hover {
  background-color: rgba(221, 56, 90, 0.1);
}
</style>