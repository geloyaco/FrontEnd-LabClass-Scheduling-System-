<template>
    <div>
      <h1>Delete Category</h1>
      <div>
        <p>Are you sure you want to delete this category?</p>
        <p>Name: {{ categoryDetails.name }}</p>
      </div>
      <div>
        <button @click="confirmDelete" :disabled="loading" class="p-button-danger">Delete Category</button>
        <button @click="cancelDelete" :disabled="loading">Cancel</button>
      </div>
      <div v-if="loading">Deleting category...</div>
      <div v-if="error" style="color: red;">{{ error }}</div>
      <div v-if="success">Category deleted successfully!</div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  const categoryDetails = ref({
    name: ''
  });
  const loading = ref(false);
  const error = ref(null);
  const success = ref(false);
  const router = useRouter();
  
  const categoryId = parseInt(router.currentRoute.value.params.categoryId);
  
  const fetchCategoryDetails = async () => {
    loading.value = true;
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/categories/${categoryId}`);
      categoryDetails.value = response.data;
    } catch (err) {
      console.error('Error fetching category details:', err);
      error.value = 'Failed to fetch category details. Please try again later.';
    } finally {
      loading.value = false;
    }
  };
  
  onMounted(fetchCategoryDetails);
  
  const confirmDelete = async () => {
    const confirm = window.confirm('Are you sure you want to delete this category?');
    if (confirm) {
      try {
        loading.value = true;
        await axios.delete(`http://127.0.0.1:8000/api/categories/${categoryId}`);
        success.value = true;
        // router.push('/categories');
      } catch (err) {
        console.error('Error deleting category:', err);
        error.value = 'Failed to delete category. Please try again later.';
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
  