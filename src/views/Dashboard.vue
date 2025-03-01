// Dashboard.vue
<template>
  <div class="dashboard-layout">
    <DashBoardSidebar />
    <div class="main-content">
      <DashBoardTopbar />
      <div class="dashboard-content">
        <div class="header">
          <div class="header-left">
            <h1>Welcome, John!</h1>
            <p class="date">{{ formatDate(selectedDate) }}</p>
          </div>
        </div>

        <div class="main-section">
          <div class="calendar-nav">
            <div class="mini-calendar">
              <Calendar @date-selected="onDateSelected" />
            </div>
          </div>
          <div class="right-section">
            <div class="search-controls">
              <div class="search-box">
                <i class="fas fa-search"></i>
                <input type="text" placeholder="Search...">
              </div>
              <div class="lab-select">
                <select>
                  <option>Select Laboratory</option>
                  <option>L201</option>
                  <option>L202</option>
                  <option>L203</option>
                  <option>L204</option>
                  <option>L205</option>
                  <option>IOT</option>
                </select>
              </div>
            </div>
            <div class="schedule-container">
              <div class="schedule-grid">
                <div class="time-column">
                  <div class="time-slot" v-for="time in timeSlots" :key="time">
                    {{ formatTime(time) }}
                  </div>
                </div>
                <div class="labs-grid">
                  <div class="lab-column" v-for="lab in ['L201', 'L202', 'L203', 'L204', 'L205', 'IOT']" :key="lab">
                    <div class="lab-header">{{ lab }}</div>
                    <div class="lab-slots">
                      <div class="time-slot" v-for="time in timeSlots" :key="time">
                        <!-- Schedule content will go here -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashBoardSidebar from '../components/DashBoardSidebar.vue'
import DashBoardTopbar from '../components/DashBoardTopbar.vue'
import Calendar from '../components/Calendar.vue'

export default {
  name: 'Dashboard',
  components: {
    DashBoardSidebar,
    DashBoardTopbar,
    Calendar
  },
  data() {
    return {
      selectedDate: new Date(),
      timeSlots: [
        '7:30', '8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00',
        '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
        '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00',
        '18:30', '19:00', '19:30', '20:00'
      ]
    }
  },
  methods: {
    onDateSelected(date) {
      this.selectedDate = date
    },
    formatDate(date) {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
    },
    formatTime(time) {
      const [hours, minutes] = time.split(':')
      const hour = parseInt(hours)
      const ampm = hour >= 12 ? 'PM' : 'AM'
      const hour12 = hour % 12 || 12
      return `${hour12}:${minutes}${ampm}`
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
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

h1 {
  font-size: 2rem;
  color: #E91E63;
  margin: 0;
  font-weight: 500;
}

.date {
  color: #666;
  font-size: 0.9rem;
  margin: 0;
}

.main-section {
  display: flex;
  gap: 2rem;
  height: calc(100% - 120px);
}

.calendar-nav {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  width: 280px;
  height: fit-content;
}

.right-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.search-controls {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.search-box {
  position: relative;
  width: 200px;
}

.search-box input {
  width: 100%;
  padding: 0.5rem 1rem 0.5rem 2rem;
  border: none;
  border-radius: 8px;
  background: rgba(233, 30, 99, 0.1);
  outline: none;
  font-size: 0.9rem;
  color: #E91E63;
}

.search-box input::placeholder {
  color: rgba(233, 30, 99, 0.6);
}

.search-box i {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(233, 30, 99, 0.6);
  font-size: 0.9rem;
}

.lab-select select {
  padding: 0.5rem 2rem 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  background: rgba(233, 30, 99, 0.1);
  outline: none;
  cursor: pointer;
  font-size: 0.9rem;
  color: rgba(233, 30, 99, 0.8);
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(233, 30, 99, 0.6)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
}

.schedule-container {
  flex: 1;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.schedule-grid {
  display: flex;
  flex: 1;
  overflow: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(233, 30, 99, 0.6) rgba(233, 30, 99, 0.1);
}

.schedule-grid::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.schedule-grid::-webkit-scrollbar-track {
  background: rgba(233, 30, 99, 0.1);
  border-radius: 4px;
}

.schedule-grid::-webkit-scrollbar-thumb {
  background-color: rgba(233, 30, 99, 0.6);
  border-radius: 4px;
}

.labs-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  min-width: 900px;
}

.lab-column {
  border-right: 1px solid #eee;
  min-width: 150px;
  display: flex;
  flex-direction: column;
}

.lab-header {
  padding: 1rem;
  text-align: center;
  border-bottom: 1px solid #eee;
  font-weight: 500;
  color: #E91E63;
  background: #f9f9f9;
  position: sticky;
  top: 0;
  z-index: 1;
}

.lab-slots {
  flex: 1;
}

.time-column {
  width: 80px;
  border-right: 1px solid #eee;
  background: #f9f9f9;
  flex-shrink: 0;
}

.time-slot {
  height: 60px;
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
  color: #E91E63;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
}

.lab-slots .time-slot {
  border-right: 1px solid #eee;
}
</style>
