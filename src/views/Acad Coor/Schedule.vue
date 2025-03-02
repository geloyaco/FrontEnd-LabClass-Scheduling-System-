<template>
  <div class="dashboard-layout">
    <DashBoardSidebar />
    <div class="main-content">
      <DashBoardTopbar :pageTitle="'Schedule'" />
      <div class="content-wrapper">
        <div class="schedule-header">
          <h1>Scheduling Management</h1>
          <div class="filters-container">
            <div class="filters">
              <div class="filter-group">
                <select v-model="selectedSemester" class="filter-dropdown" @change="handleSemesterChange">
                  <option value="" disabled selected>Select Semester</option>
                  <option value="new" class="new-semester" @click="handleNewSemester">+ New Semester</option>
                  <option value="summer2025">Summer 2025</option>
                  <option value="2ndsem20252024">2nd Sem 2025-2024</option>
                  <option value="1stsem20242025">1st Sem 2024-2025</option>
                </select>
              </div>
              <div class="filter-group">
                <select v-model="selectedDay" class="filter-dropdown">
                  <option value="" disabled selected>Select Day</option>
                  <option value="monday">MONDAY</option>
                  <option value="tuesday">TUESDAY</option>
                  <option value="wednesday">WEDNESDAY</option>
                  <option value="thursday">THURSDAY</option>
                  <option value="friday">FRIDAY</option>
                  <option value="saturday">SATURDAY</option>
                </select>
              </div>
              <div class="filter-group">
                <select v-model="selectedSection" class="filter-dropdown scrollable-dropdown">
                  <option value="" disabled selected>Course & Section</option>
                  <option value="bsit1a">BSIT-1A</option>
                  <option value="bsit1b">BSIT-1B</option>
                  <option value="bscs1a">BSCS-1A</option>
                  <option value="bsit2a">BSIT-2A</option>
                  <option value="bsit2b">BSIT-2B</option>
                  <option value="bscs2a">BSCS-2A</option>
                  <option value="bsit3a">BSIT-3A</option>
                  <option value="bsit3b">BSIT-3B</option>
                  <option value="bscs3a">BSCS-3A</option>
                  <option value="bsit4a">BSIT-4A</option>
                  <option value="bsit4b">BSIT-4B</option>
                  <option value="bscs4a">BSCS-4A</option>
                </select>
              </div>
            </div>
            <button class="create-schedule-btn" @click="openCreateSchedule">
              <i class="fas fa-plus"></i>
              Create a Schedule
            </button>
          </div>
        </div>

        <div class="schedule-grid">
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>L201</th>
                <th>L202</th>
                <th>L203</th>
                <th>L204</th>
                <th>L205</th>
                <th>IOT</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="timeSlot in timeSlots" :key="timeSlot">
                <td class="time-slot">{{ timeSlot }}</td>
                <td class="lab-slot"></td>
                <td class="lab-slot"></td>
                <td class="lab-slot"></td>
                <td class="lab-slot"></td>
                <td class="lab-slot"></td>
                <td class="lab-slot"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <!-- New Semester Modal -->
  <div class="modal" v-if="showNewSemesterModal">
    <div class="modal-content">
      <div class="modal-header">
        <h2>New Semester</h2>
        <button class="close-btn" @click="showNewSemesterModal = false">×</button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label>Select Semester</label>
          <select v-model="newSemester.semester" class="modal-dropdown">
            <option value="" disabled selected>Select Semester</option>
            <option value="1st">1st Semester</option>
            <option value="2nd">2nd Semester</option>
            <option value="summer">Summer</option>
          </select>
        </div>
        <div class="form-group">
          <label>School Year</label>
          <select v-model="newSemester.schoolYear" class="modal-dropdown">
            <option value="" disabled selected>Select School Year</option>
            <option value="2025">2025</option>
            <option value="2025-2026">2025-2026</option>
            <option value="2026-2027">2026-2027</option>
            <option value="2027">2027</option>
          </select>
        </div>
      </div>
      <div class="modal-footer">
        <button class="cancel-btn" @click="showNewSemesterModal = false">Cancel</button>
        <button class="create-btn" @click="createNewSemester" :disabled="!isFormValid">Create</button>
      </div>
    </div>
  </div>

  <!-- Create Schedule Modal -->
  <div class="modal" v-if="showCreateScheduleModal">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Create Schedule</h2>
        <button class="close-btn" @click="showCreateScheduleModal = false">×</button>
      </div>
      <div class="modal-body">
        <div class="type-selector">
          <div class="toggle-buttons">
            <button :class="['toggle-btn', { active: scheduleTypes.includes('lab') }]" @click="toggleType('lab')">Lab</button>
            <button :class="['toggle-btn', { active: scheduleTypes.includes('lec') }]" @click="toggleType('lec')">Lec</button>
          </div>
        </div>

        <div class="form-group">
          <label>Course Code</label>
          <input type="text" v-model="newSchedule.courseCode" class="form-input" placeholder="Enter course code">
        </div>

        <div class="form-group">
          <label>Day</label>
          <select v-model="newSchedule.day" class="form-select">
            <option value="" disabled selected>Select Day</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
          </select>
        </div>

        <div class="form-group">
          <label>Lab Room No.</label>
          <select v-model="newSchedule.labRoom" class="form-select">
            <option value="" disabled selected>Select Lab Room</option>
            <option value="L201">L201</option>
            <option value="L202">L202</option>
            <option value="L203">L203</option>
            <option value="L204">L204</option>
            <option value="L205">L205</option>
            <option value="IOT">IOT</option>
          </select>
        </div>

        <div class="form-group">
          <label>Course & Section</label>
          <select v-model="newSchedule.section" class="form-select scrollable">
            <option value="" disabled selected>Select Course & Section</option>
            <option value="BSIT-1A">BSIT-1A</option>
            <option value="BSIT-1B">BSIT-1B</option>
            <option value="BSCS-1A">BSCS-1A</option>
            <option value="BSIT-2A">BSIT-2A</option>
            <option value="BSIT-2B">BSIT-2B</option>
            <option value="BSCS-2A">BSCS-2A</option>
            <option value="BSIT-3A">BSIT-3A</option>
            <option value="BSIT-3B">BSIT-3B</option>
            <option value="BSCS-3A">BSCS-3A</option>
            <option value="BSIT-4A">BSIT-4A</option>
            <option value="BSIT-4B">BSIT-4B</option>
            <option value="BSCS-4A">BSCS-4A</option>
            <option value="custom">Custom</option>
          </select>
        </div>

        <div class="form-group">
          <label>Instructor Name</label>
          <input type="text" v-model="newSchedule.instructorName" class="form-input" placeholder="Enter instructor name">
        </div>

        <div class="time-inputs">
          <div class="form-group">
            <label>Start Time</label>
            <div class="time-picker">
              <select v-model="newSchedule.startHour" class="time-select">
                <option v-for="hour in 12" :key="'start-'+hour" :value="hour">{{ hour }}</option>
              </select>
              <span>:</span>
              <select v-model="newSchedule.startMinute" class="time-select">
                <option value="00">00</option>
                <option value="30">30</option>
              </select>
              <select v-model="newSchedule.startPeriod" class="period-select">
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label>End Time</label>
            <div class="time-picker">
              <select v-model="newSchedule.endHour" class="time-select">
                <option v-for="hour in 12" :key="'end-'+hour" :value="hour">{{ hour }}</option>
              </select>
              <span>:</span>
              <select v-model="newSchedule.endMinute" class="time-select">
                <option value="00">00</option>
                <option value="30">30</option>
              </select>
              <select v-model="newSchedule.endPeriod" class="period-select">
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="create-btn" @click="createSchedule" :disabled="!isScheduleFormValid">Create</button>
      </div>
    </div>
  </div>
</template>

<script>
import DashBoardSidebar from '../../components/DashBoardSidebar.vue'
import DashBoardTopbar from '../../components/DashBoardTopbar.vue'

export default {
  name: 'AcadCoorSchedule',
  components: {
    DashBoardSidebar,
    DashBoardTopbar
  },
  data() {
    return {
      selectedSemester: '',
      selectedDay: '',
      selectedSection: '',
      showNewSemesterModal: false,
      newSemester: {
        semester: '',
        schoolYear: ''
      },
      showCreateScheduleModal: false,
      scheduleTypes: [],
      newSchedule: {
        courseCode: '',
        day: '',
        labRoom: '',
        section: '',
        instructorName: '',
        startHour: '',
        startMinute: '00',
        startPeriod: 'AM',
        endHour: '',
        endMinute: '00',
        endPeriod: 'AM'
      },
      timeSlots: [
        '7:30 AM', '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM',
        '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM',
        '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM',
        '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM',
        '7:30 PM', '8:00 PM'
      ]
    }
  },
  methods: {
    handleNewSemester() {
      this.showNewSemesterModal = true;
    },
    handleSemesterChange() {
      if (this.selectedSemester === 'new') {
        this.handleNewSemester();
        this.selectedSemester = ''; // Reset selection
      }
    },
    createNewSemester() {
      // Here you'll add the logic to create the new semester
      console.log('Creating new semester:', this.newSemester);
      this.showNewSemesterModal = false;
      // Reset form
      this.newSemester = {
        semester: '',
        schoolYear: ''
      };
    },
    openCreateSchedule() {
      this.showCreateScheduleModal = true;
    },
    createSchedule() {
      // Here you'll add the logic to create the schedule
      console.log('Creating schedule:', {
        ...this.newSchedule,
        types: this.scheduleTypes
      });
      this.showCreateScheduleModal = false;
      this.resetScheduleForm();
    },
    resetScheduleForm() {
      this.scheduleTypes = [];
      this.newSchedule = {
        courseCode: '',
        day: '',
        labRoom: '',
        section: '',
        instructorName: '',
        startHour: '',
        startMinute: '00',
        startPeriod: 'AM',
        endHour: '',
        endMinute: '00',
        endPeriod: 'AM'
      };
    },
    toggleType(type) {
      const index = this.scheduleTypes.indexOf(type);
      if (index === -1) {
        this.scheduleTypes.push(type);
      } else {
        this.scheduleTypes.splice(index, 1);
      }
    }
  },
  computed: {
    isFormValid() {
      return this.newSemester.semester && this.newSemester.schoolYear;
    },
    isScheduleFormValid() {
      return this.newSchedule.courseCode &&
        this.newSchedule.day &&
        this.newSchedule.labRoom &&
        this.newSchedule.section &&
        this.newSchedule.instructorName &&
        this.newSchedule.startHour &&
        this.newSchedule.endHour &&
        this.scheduleTypes.length > 0;
    }
  }
}
</script>

<style scoped>
* {
  font-family: 'Inter', sans-serif;
}

.dashboard-layout {
  display: flex;
  min-height: 100vh;
  background-color: #f5f5f5;
  width: 100%;
}

.main-content {
  flex: 1;
  margin-left: 70px;
  transition: margin-left 0.3s;
  display: flex;
  flex-direction: column;
  width: calc(100% - 70px);
}

.content-wrapper {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

.schedule-header {
  margin-bottom: 2rem;
}

h1 {
  font-size: 1.75rem;
  font-weight: 500;
  color: #DD385A;
  margin-bottom: 1.5rem;
}

.filters-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.filters {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.filter-dropdown {
  padding: 0.5rem 1rem;
  border: none;
  background: #ffebee;
  color: #DD385A;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  min-width: 180px;
}

.scrollable-dropdown {
  max-height: 200px;
  overflow-y: auto;
}

.new-semester {
  color: #DD385A;
  font-weight: 500;
}

.create-schedule-btn {
  background-color: #DD385A;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

.create-schedule-btn:hover {
  background-color: #c4314f;
}

.schedule-grid {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  overflow-x: auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
}

th, td {
  border: 1px solid #eee;
  padding: 0.75rem;
  text-align: center;
}

th {
  background: #f9f9f9;
  color: #DD385A;
  font-weight: 500;
  position: sticky;
  top: 0;
}

.time-slot {
  color: #DD385A;
  font-weight: 500;
  background: #f9f9f9;
  position: sticky;
  left: 0;
  width: 100px;
  font-size: 0.85rem;
}

.lab-slot {
  height: 40px;
  cursor: pointer;
  transition: background-color 0.2s;
  border: 1px solid #eee;
}

.lab-slot:hover {
  background-color: rgba(221, 56, 90, 0.05);
}

/* Custom scrollbar */
.content-wrapper::-webkit-scrollbar,
.schedule-grid::-webkit-scrollbar,
.scrollable-dropdown::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.content-wrapper::-webkit-scrollbar-track,
.schedule-grid::-webkit-scrollbar-track,
.scrollable-dropdown::-webkit-scrollbar-track {
  background: transparent;
}

.content-wrapper::-webkit-scrollbar-thumb,
.schedule-grid::-webkit-scrollbar-thumb,
.scrollable-dropdown::-webkit-scrollbar-thumb {
  background: #DD385A;
  border-radius: 4px;
}

/* Modal Styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h2 {
  color: #DD385A;
  font-size: 1.25rem;
  font-weight: 500;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #666;
  cursor: pointer;
  padding: 0;
}

.modal-body {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #666;
  font-size: 0.9rem;
}

.modal-dropdown {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 0.9rem;
  color: #333;
  background: white;
}

.modal-dropdown:focus {
  outline: none;
  border-color: #DD385A;
}

.modal-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.cancel-btn, .create-btn {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
}

.cancel-btn {
  background: #ffebee;
  color: #DD385A;
  border: none;
}

.cancel-btn:hover {
  background: #ffdde3;
}

.create-btn {
  background: #DD385A;
  color: white;
  border: none;
}

.create-btn:hover {
  background: #c4314f;
}

.create-btn:disabled {
  background: #ddd;
  cursor: not-allowed;
}

.type-selector {
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: flex-end;
}

.toggle-buttons {
  display: flex;
  border: 1px solid #DD385A;
  border-radius: 6px;
  overflow: hidden;
}

.toggle-btn {
  padding: 0.5rem 1.5rem;
  border: none;
  background: white;
  color: #DD385A;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  overflow: hidden;
}

.toggle-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(221, 56, 90, 0.1);
  opacity: 0;
  transition: opacity 0.2s;
}

.toggle-btn:hover::before {
  opacity: 1;
}

.toggle-btn.active {
  background: #DD385A;
  color: white;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 0.9rem;
}

.form-select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 0.9rem;
  background: white;
}

.scrollable {
  max-height: 200px;
  overflow-y: auto;
}

.time-inputs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.time-picker {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.time-select {
  width: 60px;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 0.9rem;
}

.period-select {
  width: 70px;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 0.9rem;
}

input:focus, select:focus {
  outline: none;
  border-color: #DD385A;
}
</style>
