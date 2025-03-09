<template>
  <div class="dashboard-layout">
    <DashBoardSidebarSysAd />
    <div class="main-content">
      <DashBoardTopbar />
      <div class="dashboard-content">
        <div class="profile-container">
          <div class="profile-header">
            <div class="profile-avatar">
              <i class="fas fa-user"></i>
            </div>
            <div class="profile-info">
              <h2>John Doe</h2>
              <span class="role-badge system-admin">System Administrator</span>
              <p class="email">jdoe@uic.edu.ph</p>
            </div>
          </div>

          <div class="profile-details">
            <div class="detail-section">
              <h3>Personal Information</h3>
              <div class="detail-grid">
                <div class="detail-item">
                  <label>ID Number</label>
                  <p>2200001843</p>
                </div>
                <div class="detail-item">
                  <label>Full Name</label>
                  <p>John Doe</p>
                </div>
                <div class="detail-item">
                  <label>Email</label>
                  <p>jdoe@uic.edu.ph</p>
                </div>
                <div class="detail-item">
                  <label>Role</label>
                  <p>System Administrator</p>
                </div>
                <div class="detail-item">
                  <label>Permission Level</label>
                  <p>System Management</p>
                </div>
              </div>
            </div>

            <div class="detail-section">
              <h3>Account Settings</h3>
              <div class="settings-buttons">
                <button class="edit-button">
                  <i class="fas fa-edit"></i>
                  Edit Profile
                </button>
                <button class="password-button">
                  <i class="fas fa-key"></i>
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashBoardSidebarSysAd from '../../components/DashBoardSidebarSysAd.vue'
import DashBoardTopbar from '../../components/DashBoardTopbar.vue'

export default {
  name: 'UserProfileSysAd',
  components: {
    DashBoardSidebarSysAd,
    DashBoardTopbar
  }
}
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.main-content {
  flex: 1;
  margin-left: 70px;
  width: calc(100vw - 70px);
  transition: margin-left 0.3s ease;
}

.dashboard-content {
  padding: 24px;
  min-height: calc(100vh - 60px);
  font-family: 'Inter', sans-serif;
}

.profile-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  padding: 24px;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(221, 56, 90, 0.1);
}

.profile-avatar {
  width: 80px;
  height: 80px;
  background: rgba(221, 56, 90, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-avatar i {
  font-size: 32px;
  color: #DD385A;
}

.profile-info h2 {
  font-size: 24px;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
}

.role-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.role-badge.system-admin {
  background-color: #DD385A;
  color: white;
}

.email {
  color: #666;
  font-family: 'Roboto Mono', monospace;
  font-size: 12px;
}

.detail-section {
  margin-top: 24px;
}

.detail-section h3 {
  color: #DD385A;
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 16px;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
}

.detail-item label {
  display: block;
  color: #666;
  font-size: 14px;
  margin-bottom: 4px;
}

.detail-item p {
  color: #333;
  font-size: 16px;
  font-weight: 500;
}

.detail-item:nth-child(1) p,
.detail-item:nth-child(3) p {
  font-family: 'Roboto Mono', monospace;
  font-size: 12px;
  color: #666;
}

.settings-buttons {
  display: flex;
  gap: 16px;
}

.settings-buttons button {
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
}

.edit-button {
  background-color: #DD385A;
  color: white;
  border: none;
}

.edit-button:hover {
  background-color: #c62f4d;
}

.password-button {
  background-color: white;
  color: #DD385A;
  border: 1px solid #DD385A;
}

.password-button:hover {
  background-color: rgba(221, 56, 90, 0.05);
}
</style>
