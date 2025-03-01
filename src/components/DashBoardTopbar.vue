<template>
  <div class="topbar">
    <div class="left-section">
      <div class="logos">
        <img src="../assets/uic-logo-3.svg" alt="UIC Logo" class="logo" />
        <img src="../assets/CCS-logo.svg" alt="CCS Logo" class="logo" />
      </div>
      <h1>Dashboard</h1>
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
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.left-section {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.logos {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo {
  height: 32px;
  width: auto;
}

.left-section h1 {
  font-size: 1.25rem;
  color: #E91E63;
  margin: 0;
  font-weight: 500;
}

.right-section {
  display: flex;
  align-items: center;
}

.user-menu {
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  padding: 0.5rem;
  gap: 0.75rem;
}

.user-icon {
  color: #E91E63;
  font-size: 1.1rem;
}

.username {
  font-size: 0.9rem;
  color: #E91E63;
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
  color: #E91E63;
  font-size: 0.9rem;
  text-align: left;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.menu-item:hover {
  background-color: rgba(233, 30, 99, 0.1);
}

.menu-item i {
  font-size: 1rem;
  color: #E91E63;
}
</style>