<template>
  <div class="dashboard-layout">
    <DashBoardSidebarSysAd />
    <div class="main-content">
      <DashBoardTopbar />
      <div class="dashboard-content">
        <div class="header">
          <div class="header-left">
            <h1>Welcome, {{ userName }}!</h1>
            <p class="date">{{ formatDate(new Date()) }}</p>
          </div>
          <div class="active-users">
            <div class="user-count">
              <i class="fas fa-users"></i>
              <span>{{ activeUsers }} Active Users</span>
            </div>
          </div>
        </div>

        <div class="dashboard-grid">
          <!-- Quick Stats -->
          <div class="stats-section">
            <h2>System Overview</h2>
            <div class="stats-grid">
              <div class="stat-card">
                <i class="fas fa-user-graduate"></i>
                <div class="stat-info">
                  <span class="stat-value">{{ totalStudents || 0 }}</span>
                  <span class="stat-label">Total Students</span>
                </div>
              </div>
              <div class="stat-card">
                <i class="fas fa-chalkboard-teacher"></i>
                <div class="stat-info">
                  <span class="stat-value">{{ totalFaculty || 0 }}</span>
                  <span class="stat-label">Faculty Members</span>
                </div>
              </div>
              <div class="stat-card">
                <i class="fas fa-laptop-code"></i>
                <div class="stat-info">
                  <span class="stat-value">{{ totalLabs || 0 }}</span>
                  <span class="stat-label">Active Labs</span>
                </div>
              </div>
              <div class="stat-card">
                <i class="fas fa-calendar-check"></i>
                <div class="stat-info">
                  <span class="stat-value">{{ activeSchedules || 0 }}</span>
                  <span class="stat-label">Active Schedules</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="quick-actions">
            <h2>Quick Actions</h2>
            <div class="action-grid">
              <router-link to="/user-management" class="action-card">
                <i class="fas fa-user-plus"></i>
                <span>Add New User</span>
              </router-link>
              <router-link to="/schedule-sysad" class="action-card">
                <i class="fas fa-calendar-plus"></i>
                <span>My Schedule</span>
              </router-link>
              <router-link to="/account-management" class="action-card">
                <i class="fas fa-user-shield"></i>
                <span>Manage Accounts</span>
              </router-link>
              <router-link to="/all-schedules-sysad" class="action-card">
                <i class="fas fa-calendar-alt"></i>
                <span>View All Schedules</span>
              </router-link>
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="recent-activity">
            <h2>Recent Activity</h2>
            <div class="activity-list" v-if="recentActivities.length > 0">
              <div v-for="activity in recentActivities" :key="activity.id" class="activity-item">
                <div class="activity-icon" :class="activity.type">
                  <i :class="getActivityIcon(activity.type)"></i>
                </div>
                <div class="activity-details">
                  <div class="activity-header">
                    <span class="activity-user">{{ activity.user }}</span>
                    <span class="activity-action">{{ activity.action }}</span>
                  </div>
                  <p class="activity-text">{{ activity.text }}</p>
                  <div class="activity-meta">
                    <span class="activity-time">{{ formatActivityTime(activity.timestamp) }}</span>
                    <span v-if="activity.details" class="activity-view-details" @click="viewActivityDetails(activity)">
                      View Details
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="no-activity">
              <i class="fas fa-history"></i>
              <p>No recent activity</p>
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
  name: 'DashboardSysAd',
  components: {
    DashBoardSidebarSysAd,
    DashBoardTopbar
  },
  data() {
    return {
      userName: '', // Will be populated from auth
      activeUsers: 0,
      totalStudents: null,
      totalFaculty: null,
      totalLabs: null,
      activeSchedules: null,
      recentActivities: [] // Will be populated from backend
    }
  },
  methods: {
    formatDate(date) {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
    },
    getActivityIcon(type) {
      const icons = {
        create: 'fas fa-plus-circle',
        update: 'fas fa-edit',
        delete: 'fas fa-trash-alt',
        login: 'fas fa-sign-in-alt',
        logout: 'fas fa-sign-out-alt',
        schedule: 'fas fa-calendar-alt',
        user: 'fas fa-user',
        system: 'fas fa-cog'
      }
      return icons[type] || 'fas fa-info-circle'
    },
    formatActivityTime(timestamp) {
      const now = new Date()
      const diff = now - timestamp
      const minutes = Math.floor(diff / 1000 / 60)
      
      if (minutes < 60) {
        return `${minutes} minutes ago`
      } else if (minutes < 1440) {
        const hours = Math.floor(minutes / 60)
        return `${hours} hours ago`
      } else {
        const days = Math.floor(minutes / 1440)
        return `${days} days ago`
      }
    },
    viewActivityDetails(activity) {
      // Will implement modal or navigation to detailed audit log
      console.log('View details for activity:', activity)
    }
  }
}
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #f5f5f5;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
}

.main-content {
  flex: 1;
  margin-left: 70px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.dashboard-content {
  padding: 2rem;
  height: calc(100vh - 64px);
  overflow-y: auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.header-left h1 {
  font-size: 2rem;
  color: #DD385A;
  margin: 0;
  font-weight: 500;
}

.header-left .date {
  color: #666;
  font-size: 0.9rem;
  margin: 0.5rem 0 0 0;
}

.active-users {
  background: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.user-count {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #DD385A;
  font-weight: 500;
}

.user-count i {
  font-size: 1.25rem;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.stats-section {
  grid-column: 1 / -1;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-top: 1rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-card i {
  font-size: 2rem;
  color: #DD385A;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2C3E50;
}

.stat-label {
  font-size: 0.9rem;
  color: #666;
}

h2 {
  font-size: 1.25rem;
  color: #2C3E50;
  margin: 0 0 1rem 0;
  font-weight: 500;
}

.action-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.action-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  color: #2C3E50;
  transition: all 0.2s ease;
}

.action-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #DD385A;
  color: white;
}

.action-card i {
  font-size: 1.25rem;
}

.recent-activity {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  border-radius: 6px;
  background: #f8f9fa;
  transition: background-color 0.2s ease;
}

.activity-item:hover {
  background: #f0f2f4;
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.activity-icon.create { background-color: #4CAF50; }
.activity-icon.update { background-color: #2196F3; }
.activity-icon.delete { background-color: #f44336; }
.activity-icon.login { background-color: #9C27B0; }
.activity-icon.logout { background-color: #795548; }
.activity-icon.schedule { background-color: #FF9800; }
.activity-icon.user { background-color: #607D8B; }
.activity-icon.system { background-color: #795548; }

.activity-details {
  flex: 1;
}

.activity-header {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}

.activity-user {
  font-weight: 500;
  color: #DD385A;
}

.activity-action {
  color: #666;
}

.activity-text {
  margin: 0;
  color: #2C3E50;
  font-size: 0.95rem;
}

.activity-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
}

.activity-time {
  font-size: 0.8rem;
  color: #666;
}

.activity-view-details {
  font-size: 0.8rem;
  color: #DD385A;
  cursor: pointer;
  text-decoration: underline;
}

.no-activity {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  color: #666;
  text-align: center;
}

.no-activity i {
  font-size: 3rem;
  color: #ddd;
  margin-bottom: 1rem;
}

.no-activity p {
  margin: 0;
  font-size: 1.1rem;
}
</style>