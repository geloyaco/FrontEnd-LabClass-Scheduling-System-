<template>
  <div class="profile">
    <DashBoardSidebarSysAd />
    <div class="main-content">
      <header>
        <h1>My Profile</h1>
      </header>

      <div class="profile-container">
        <div class="profile-header">
          <div class="profile-avatar">
            <img src="../../assets/avatar-placeholder.png" alt="Profile Avatar" />
            <button class="change-avatar">
              <i class="fas fa-camera"></i>
              Change Photo
            </button>
          </div>
          <div class="profile-info">
            <h2>System Administrator</h2>
            <p class="email">admin@labclass.com</p>
          </div>
        </div>

        <div class="profile-details">
          <div class="section">
            <h3>Personal Information</h3>
            <div class="form-grid">
              <div class="form-group">
                <label>First Name</label>
                <input type="text" v-model="profile.firstName" placeholder="Enter first name" />
              </div>
              <div class="form-group">
                <label>Last Name</label>
                <input type="text" v-model="profile.lastName" placeholder="Enter last name" />
              </div>
              <div class="form-group">
                <label>Email</label>
                <input type="email" v-model="profile.email" placeholder="Enter email" />
              </div>
              <div class="form-group">
                <label>Phone</label>
                <input type="tel" v-model="profile.phone" placeholder="Enter phone number" />
              </div>
            </div>
          </div>

          <div class="section">
            <h3>Security</h3>
            <div class="form-grid">
              <div class="form-group">
                <label>Current Password</label>
                <input type="password" v-model="security.currentPassword" placeholder="Enter current password" />
              </div>
              <div class="form-group">
                <label>New Password</label>
                <input type="password" v-model="security.newPassword" placeholder="Enter new password" />
              </div>
              <div class="form-group">
                <label>Confirm Password</label>
                <input type="password" v-model="security.confirmPassword" placeholder="Confirm new password" />
              </div>
            </div>
          </div>

          <div class="actions">
            <button class="save-btn" @click="saveChanges">
              <i class="fas fa-save"></i>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashBoardSidebarSysAd from '../../components/DashBoardSidebarSysAd.vue'

export default {
  name: 'UserProfile',
  components: {
    DashBoardSidebarSysAd
  },
  data() {
    return {
      profile: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'admin@labclass.com',
        phone: '+1 234 567 8900'
      },
      security: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    saveChanges() {
      // TODO: Implement save changes functionality
      console.log('Saving changes...', {
        profile: this.profile,
        security: this.security
      })
    }
  }
}
</script>

<style scoped>
.profile {
  display: flex;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.main-content {
  flex: 1;
  margin-left: 280px;
  padding: 2rem;
}

header {
  margin-bottom: 2rem;
}

header h1 {
  color: #2C3E50;
  margin: 0;
}

.profile-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 2rem;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e5e7eb;
}

.profile-avatar {
  text-align: center;
}

.profile-avatar img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 1rem;
}

.change-avatar {
  background: none;
  border: none;
  color: #DD385A;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.profile-info h2 {
  margin: 0 0 0.5rem 0;
  color: #2C3E50;
}

.email {
  color: #6B7280;
  margin: 0;
}

.section {
  margin-bottom: 2rem;
}

.section h3 {
  color: #2C3E50;
  margin: 0 0 1rem 0;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  color: #4B5563;
  font-size: 0.875rem;
}

.form-group input {
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 0.875rem;
}

.form-group input:focus {
  outline: none;
  border-color: #DD385A;
}

.actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
}

.save-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #DD385A;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.save-btn:hover {
  background-color: #c4314f;
}
</style>
