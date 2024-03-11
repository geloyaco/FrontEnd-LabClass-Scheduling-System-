<template>
    <div>
      <h1>Delete User</h1>
      <div>
        <p>Are you sure you want to delete this user?</p>
        <p>Username: {{ userDetails.username }}</p>
        <p>Email: {{ userDetails.email }}</p>
      </div>
      <div>
        <button @click="confirmDelete" :disabled="loading" class="p-button-danger">Delete User</button>
        <button @click="cancelDelete" :disabled="loading">Cancel</button>
      </div>
      <div v-if="loading">Deleting user...</div>
      <div v-if="error" style="color: red;">{{ error }}</div>
      <div v-if="success">User deleted successfully!</div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  const userDetails = ref({
    username: '',
    email: ''
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
      userDetails.value = response.data;
    } catch (err) {
      console.error('Error fetching user details:', err);
      error.value = 'Failed to fetch user details. Please try again later.';
    } finally {
      loading.value = false;
    }
  };
  
  onMounted(fetchUserDetails);
  
  const confirmDelete = async () => {
    const confirm = window.confirm('Are you sure you want to delete this user?');
    if (confirm) {
      try {
        loading.value = true;
        await axios.delete(`http://127.0.0.1:8000/api/users/${userId}`);
        success.value = true;
        // Optionally navigate to another page after deletion
        // router.push('/users');
      } catch (err) {
        console.error('Error deleting user:', err);
        error.value = 'Failed to delete user. Please try again later.';
      } finally {
        loading.value = false;
      }
    }
  };
  
  const cancelDelete = () => {
    router.back(); // Go back to the previous page
  };
  </script>
  
  <style scoped>
  /* Add your scoped styles here */
  </style>
  