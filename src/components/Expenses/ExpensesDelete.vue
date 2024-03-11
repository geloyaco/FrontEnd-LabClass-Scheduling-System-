<template>
    <div>
      <h1>Delete Expense</h1>
      <div>
        <p>Are you sure you want to delete this Expense?</p>
        <p>Description: {{ expenseDetails.description }}</p>
        <p>Amount: {{ expenseDetails.amount }}</p>
        <p>Date: {{ expenseDetails.date }}</p>
      </div>
      <div>
        <button @click="confirmDelete" :disabled="loading" class="p-button-danger">Delete Expense</button>
        <button @click="cancelDelete" :disabled="loading">Cancel</button>
      </div>
      <div v-if="loading">Deleting expense...</div>
      <div v-if="error" style="color: red;">{{ error }}</div>
      <div v-if="success">Expense deleted successfully!</div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  const expenseDetails = ref({
    user_id: '',
    category_id: '',
    amount: '',
    description: '',
    date: '',
  });
  const loading = ref(false);
  const error = ref(null);
  const success = ref(false);
  const router = useRouter();
  
  // Extract expense ID from the route parameters
  const expenseId = parseInt(router.currentRoute.value.params.expenseId);
  
  // Fetch expense details based on the user ID
  const fetchExpenseDetails = async () => {
    loading.value = true;
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/expenses/${expenseId}`);
      expenseDetails.value = response.data;
    } catch (err) {
      console.error('Error fetching expense details:', err);
      error.value = 'Failed to fetch expense details. Please try again later.';
    } finally {
      loading.value = false;
    }
  };
  
  onMounted(fetchExpenseDetails);
  
  const confirmDelete = async () => {
    const confirm = window.confirm('Are you sure you want to delete this expense?');
    if (confirm) {
      try {
        loading.value = true;
        await axios.delete(`http://127.0.0.1:8000/api/expenses/${expenseId}`);
        success.value = true;
        // Optionally navigate to another page after deletion
        // router.push('/expenses');
      } catch (err) {
        console.error('Error deleting expense:', err);
        error.value = 'Failed to delete expense. Please try again later.';
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
  