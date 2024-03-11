<template>
    <div>
      <h1>Update User</h1>
      <form @submit.prevent="updateUser">
        <div>
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="updatedUser.username" required>
        </div>
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="updatedUser.email" required>
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="updatedUser.password" required>
        </div>
        <button type="submit">Update User</button>
      </form>
      <div v-if="loading">Updating user...</div>
      <div v-if="error" style="color: red;">{{ error }}</div>
      <div v-if="success">User updated successfully!</div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  const updatedUser = ref({
    username: '',
    email: '',
    password: ''
  });
  const loading = ref(false);
  const error = ref(null);
  const success = ref(false);
  const router = useRouter();
  
  // Extract user ID from the route parameters
  const userId = parseInt(router.currentRoute.value.params.userId);
  
  // Fetch user details based on the user ID
  const fetchUserDetails = async () => {
    loading.value = true;
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/users/${userId}`);
      const userData = response.data;
      console.log(userData); 
      // Update the updatedUser object with user details
      updatedUser.value = {
        username: userData.username,
        email: userData.email,
        password: '' // Clear password field for security reasons
      };
    } catch (err) {
      console.error('Error fetching user details:', err);
      error.value = 'Failed to fetch user details. Please try again later.';
    } finally {
      loading.value = false;
    }
  };
  
  onMounted(fetchUserDetails);
  
  const updateUser = async () => {
    loading.value = true;
    error.value = null;
    success.value = false;
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/users/${userId}`, updatedUser.value,{
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    });
      console.log(response.data);
      success.value = true;
    } catch (err) {
      console.error('Error updating user:', err);
      error.value = 'Failed to update user. Please try again later.';
    } finally {
      loading.value = false;
    }
  };
  </script>
  
  <style scoped>
  /* Add your scoped styles here */
  </style>
  