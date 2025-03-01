// SignUp.vue
<template>
  <div class="signup-container">
    <div class="signup-card">
      <div class="logo-section">
        <img src="../assets/uic-logo-3.svg" alt="UIC Logo" class="logo" />
        <img src="../assets/CCS-logo.svg" alt="CCS Logo" class="logo" />
      </div>

      <router-link to="/" class="back-link">
        <i class="fas fa-chevron-left"></i>
      </router-link>

      <h1>Sign Up</h1>

      <div class="signup-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input 
            type="email" 
            id="email" 
            placeholder="Enter your email"
          >
        </div>

        <div class="form-group">
          <label for="id">ID</label>
          <input 
            type="text" 
            id="id" 
            placeholder="Enter your ID"
          >
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input 
            type="password" 
            id="password" 
            placeholder="Enter your password"
          >
        </div>

        <button class="signup-button">Sign Up</button>

        <div class="divider">
          <span>or</span>
        </div>

        <button class="google-button">
          <img src="../assets/Google-logo.svg" alt="Google" class="google-icon">
          Sign up with Google
        </button>

        <p class="login-link">
          Already have an account? 
          <router-link to="/login">Sign In</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignUp'
}
</script>

<style scoped>
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 93vh;
  background-color: #f5f5f5;
  padding: 1rem;
}

.signup-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 360px;
  position: relative;
}

.logo-section {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.logo {
  height: 50px;
  width: auto;
}

.back-link {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  color: #666;
  text-decoration: none;
  font-size: 1.2rem;
}

h1 {
  text-align: center;
  color: #E91E63;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
}

.signup-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

label {
  color: #666;
  font-size: 0.9rem;
}

input {
  padding: 0.7rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 0.9rem;
  transition: border-color 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #E91E63;
}

.signup-button {
  background-color: #E91E63;
  color: white;
  padding: 0.8rem;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.signup-button:hover {
  background-color: #D81B60;
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 0.5rem 0;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #ddd;
}

.divider span {
  padding: 0 10px;
  color: #666;
  font-size: 0.9rem;
}

.google-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: white;
  color: #666;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.google-button:hover {
  background-color: #f5f5f5;
}

.google-icon {
  height: 18px;
  width: auto;
}

.login-link {
  text-align: center;
  color: #666;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.login-link a {
  color: #E91E63;
  text-decoration: none;
  font-weight: 500;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>
