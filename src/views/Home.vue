// Home.vue
<template>
  <div class="main-content">
    <div class="home">
      <div class="content">
        <h1>Schedule a<br>class now.</h1>
        <p>Coordinating and managing computer laboratory schedules are made easy.</p>
        <button class="get-started" @click="navigateToSignUp">Get Started</button>
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