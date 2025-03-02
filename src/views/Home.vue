// Home.vue
<template>
  <div class="main-content">
    <div class="home">
      <div class="content">
        <h1>Schedule a<br>class now.</h1>
        <p>Coordinating and managing computer laboratory schedules are made easy.</p>
        <button class="get-started cta-button" @click="navigateToSignUp">Get Started</button>
      </div>
      <div class="illustration">
        <img src="../assets/LandingPageIMG.png" alt="Calendar Illustration" class="landing-image" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    navigateToSignUp() {
      this.$router.push('/signup')
    }
  }
}
</script>

<style>
.nav-link.router-link-active {
  color: #DD385A;
  font-weight: 500;
}

.nav-link:hover {
  color: #DD385A;
}

.cta-button {
  background-color: #DD385A;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s;
}

.cta-button:hover {
  background-color: #c4314f;
}

.highlight {
  color: #DD385A;
}
</style>