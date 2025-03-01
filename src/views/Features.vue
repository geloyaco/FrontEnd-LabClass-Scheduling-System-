// Features.vue
<template>
  <div class="main-content">
    <div class="features">
      <div class="content-wrapper">
        <div class="features-grid">
          <div class="feature-card">
            <h2>Academic Coordinator</h2>
            <ul>
              <li>
                <i class="fas fa-calendar-plus"></i>
                Scheduling Creation and Assignment
              </li>
              <li>
                <i class="fas fa-exclamation-triangle"></i>
                Conflict Detection
              </li>
              <li>
                <i class="fas fa-chart-line"></i>
                Audit Tracking
              </li>
            </ul>
          </div>

          <div class="feature-card">
            <h2>All Users</h2>
            <ul>
              <li>
                <i class="fas fa-th-large"></i>
                Centralized Dashboard
              </li>
              <li>
                <i class="fas fa-search"></i>
                Search and Filter
              </li>
              <li>
                <i class="fas fa-bell"></i>
                Receive Notifications
              </li>
            </ul>
          </div>

          <div class="feature-card">
            <h2>Dean</h2>
            <ul>
              <li>
                <i class="fas fa-check-circle"></i>
                Schedule Review and Approval
              </li>
              <li>
                <i class="fas fa-chart-bar"></i>
                Activity Monitoring
              </li>
            </ul>
          </div>

          <div class="feature-card">
            <h2>Faculty/Staff & Students</h2>
            <ul>
              <li>
                <i class="fas fa-calendar-alt"></i>
                View Assigned Schedules
              </li>
            </ul>
          </div>

          <div class="feature-card">
            <h2>System Administrator</h2>
            <ul>
              <li>
                <i class="fas fa-users-cog"></i>
                User Management
              </li>
              <li>
                <i class="fas fa-shield-alt"></i>
                Access Control
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="illustration-section">
        <img src="../assets/features-page-image.svg" alt="Features Illustration" class="features-image" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Features'
}
</script>

<style scoped>
.main-content {
  height: 100vh;
  overflow-y: auto;
  background-color: white;
}

.features {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 4rem;
  max-width: 1400px;
  margin: 0 auto;
  gap: 4rem;
  min-height: min-content;
}

.content-wrapper {
  flex: 1;
  max-width: 600px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.feature-card h2 {
  color: #E91E63;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.feature-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-card li {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  color: #333;
  font-size: 1rem;
}

.feature-card i {
  color: #E91E63;
  font-size: 1.2rem;
  width: 24px;
}

.illustration-section {
  flex: 1;
  position: sticky;
  top: 4rem;
}

.features-image {
  max-width: 100%;
  height: auto;
}

@media (max-width: 1024px) {
  .features {
    flex-direction: column;
    padding: 2rem;
  }

  .illustration-section {
    position: static;
    margin-top: 2rem;
  }

  .content-wrapper {
    max-width: none;
  }
}
</style>
