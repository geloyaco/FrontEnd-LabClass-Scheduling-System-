<template>
    <div>
      <h1>Update Category</h1>
      <form @submit.prevent="updateCategory">
        <div>
          <label for="name">Categoryname:</label>
          <input type="text" id="name" v-model="updatedCategory.name" required>
        </div>
        <button type="submit">Update Category</button>
      </form>
      <div v-if="loading">Updating category</div>
      <div v-if="error" style="color: red;">{{ error }}</div>
      <div v-if="success">Category updated successfully!</div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  const updatedCategory = ref({
    name: ''
  });
  const loading = ref(false);
  const error = ref(null);
  const success = ref(false);
  const router = useRouter();
  
  // Extract category ID from the route parameters
  const categoryId = parseInt(router.currentRoute.value.params.categoryId);
  
  // Fetch category details based on the category ID
  const fetchCategoryDetails = async () => {
    loading.value = true;
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/categories/${categoryId}`);
      const categoryData = response.data;
      console.log(categoryData); 
      // Update the updatedCategory object with category details
      updatedCategory.value = {
        name: categoryData.name,
      };
    } catch (err) {
      console.error('Error fetching category details:', err);
      error.value = 'Failed to fetch category details. Please try again later.';
    } finally {
      loading.value = false;
    }
  };
  
  onMounted(fetchCategoryDetails);
  
  const updateCategory = async () => {
    loading.value = true;
    error.value = null;
    success.value = false;
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/categories/${categoryId}`, updatedCategory.value,{
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    });
      console.log(response.data);
      success.value = true;
    } catch (err) {
      console.error('Error updating category:', err);
      error.value = 'Failed to update category. Please try again later.';
    } finally {
      loading.value = false;
    }
  };
  </script>
  
  <style scoped>
  /* Add your scoped styles here */
  </style>
  