// Calendar.vue
<template>
  <div class="calendar-container">
    <div class="calendar-header">
      <button @click="previousMonth"><i class="fas fa-chevron-left"></i></button>
      <span>{{ currentMonthName }} {{ currentYear }}</span>
      <button @click="nextMonth"><i class="fas fa-chevron-right"></i></button>
    </div>
    <div class="calendar-days">
      <div class="weekdays">
        <div v-for="day in weekdays" :key="day">{{ day }}</div>
      </div>
      <div class="days">
        <div v-for="n in firstDayOfMonth" :key="'empty-'+n" class="day empty"></div>
        <div v-for="day in daysInMonth" 
             :key="day"
             :class="['day', { 
               'today': isToday(day),
               'selected': isSelected(day)
             }]"
             @click="selectDay(day)">
          {{ day }}
        </div>
      </div>
    </div>
    <div class="calendar-nav">
      <button @click="previousDay" class="nav-btn">
        <i class="fas fa-chevron-left"></i>
      </button>
      <button @click="setToday" class="today-btn">Today</button>
      <button @click="nextDay" class="nav-btn">
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Calendar',
  data() {
    const now = new Date()
    return {
      weekdays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
      selectedDay: now.getDate(),
      currentMonth: now.getMonth(),
      currentYear: now.getFullYear(),
      today: {
        day: now.getDate(),
        month: now.getMonth(),
        year: now.getFullYear()
      }
    }
  },
  computed: {
    firstDayOfMonth() {
      return new Date(this.currentYear, this.currentMonth, 1).getDay()
    },
    daysInMonth() {
      return new Date(this.currentYear, this.currentMonth + 1, 0).getDate()
    },
    currentMonthName() {
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                     'July', 'August', 'September', 'October', 'November', 'December']
      return months[this.currentMonth]
    },
    selectedDate() {
      return new Date(this.currentYear, this.currentMonth, this.selectedDay)
    }
  },
  methods: {
    isToday(day) {
      return day === this.today.day && 
             this.currentMonth === this.today.month && 
             this.currentYear === this.today.year
    },
    isSelected(day) {
      return day === this.selectedDay
    },
    selectDay(day) {
      this.selectedDay = day
      this.$emit('date-selected', this.selectedDate)
    },
    previousMonth() {
      if (this.currentMonth === 0) {
        this.currentMonth = 11
        this.currentYear--
      } else {
        this.currentMonth--
      }
    },
    nextMonth() {
      if (this.currentMonth === 11) {
        this.currentMonth = 0
        this.currentYear++
      } else {
        this.currentMonth++
      }
    },
    previousDay() {
      const prevDate = new Date(this.selectedDate)
      prevDate.setDate(prevDate.getDate() - 1)
      this.currentYear = prevDate.getFullYear()
      this.currentMonth = prevDate.getMonth()
      this.selectedDay = prevDate.getDate()
      this.$emit('date-selected', prevDate)
    },
    nextDay() {
      const nextDate = new Date(this.selectedDate)
      nextDate.setDate(nextDate.getDate() + 1)
      this.currentYear = nextDate.getFullYear()
      this.currentMonth = nextDate.getMonth()
      this.selectedDay = nextDate.getDate()
      this.$emit('date-selected', nextDate)
    },
    setToday() {
      this.currentYear = this.today.year
      this.currentMonth = this.today.month
      this.selectedDay = this.today.day
      this.$emit('date-selected', new Date())
    }
  }
}
</script>

<style scoped>
.calendar-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.5rem;
}

.calendar-header span {
  font-size: 0.9rem;
  color: #E91E63;
  font-weight: 500;
}

.calendar-header button {
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  background: #f5f5f5;
  color: #666;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
}

.calendar-header button:hover {
  background: #eee;
}

.calendar-days {
  padding: 0.5rem;
  background: #f9f9f9;
  border-radius: 4px;
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  color: #666;
  font-size: 0.75rem;
  margin-bottom: 0.5rem;
}

.weekdays div:first-child {
  color: #E91E63;
}

.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
}

.day {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  cursor: pointer;
  border-radius: 4px;
  color: #333;
}

.day:hover {
  background: #f0f0f0;
}

.day.empty {
  cursor: default;
}

.day.today {
  background: #E91E63;
  color: white;
}

.day.selected {
  background: #E91E63;
  color: white;
}

.calendar-nav {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.nav-btn, .today-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.nav-btn {
  background: #f5f5f5;
  color: #666;
  padding: 0.5rem;
  width: 32px;
  height: 32px;
}

.today-btn {
  background: #E91E63;
  color: white;
  padding: 0.5rem 1rem;
}

button {
  transition: opacity 0.2s;
}

button:hover {
  opacity: 0.9;
}
</style>
