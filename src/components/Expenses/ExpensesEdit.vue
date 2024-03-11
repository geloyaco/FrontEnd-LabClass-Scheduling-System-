<template>
    <div>
      <h1>Update Expense</h1>
      <form @submit.prevent="updateExpense">
        <div>
          <label for="user_id">User_Id:</label>
          <input type="text" id="user_id" v-model="updatedExpense.user_id" required>
        </div>
        <div>
          <label for="category_id">Category_Id:</label>
          <input type="category_id" id="category_id" v-model="updatedExpense.category_id" required>
        </div>
        <div>
          <label for="amount">Amount:</label>
          <input type="amount" id="amount" v-model="updatedExpense.amount" required>
        </div>
        <div>
          <label for="description">Description:</label>
          <input type="description" id="description" v-model="updatedExpense.description" required>
        </div>        
        <div>
          <label for="date">Date:</label>
          <input type="date" id="date" v-model="updatedExpense.date" required>
        </div>        
        <button type="submit">Update Expense</button>
      </form>
      <div v-if="loading">Updating expense...</div>
      <div v-if="error" style="color: red;">{{ error }}</div>
      <div v-if="success">Expense updated successfully!</div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  const updatedExpense = ref({
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
  
  // Fetch user details based on the expense ID
  const fetchExpenseDetails = async () => {
    loading.value = true;
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/expenses/${expenseId}`);
      const expenseData = response.data;
      console.log(expenseData); 
      // Update the updatedExpense object with expense details
      updatedExpense.value = {
        user_id: expenseData.user_id,
        category_id: expenseData.category_id,
        amount: expenseData.amount,
        description: expenseData.description,
        date: expenseData.date,
      };
    } catch (err) {
      console.error('Error fetching expense details:', err);
      error.value = 'Failed to fetch expense details. Please try again later.';
    } finally {
      loading.value = false;
    }
  };
  
  onMounted(fetchExpenseDetails);
  
  const updateExpense = async () => {
    loading.value = true;
    error.value = null;
    success.value = false;
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/expenses/${expenseId}`, updatedExpense.value,{
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    });
      console.log(response.data);
      success.value = true;
    } catch (err) {
      console.error('Error updating expense:', err);
      error.value = 'Failed to update expense. Please try again later.';
    } finally {
      loading.value = false;
    }
  };
  </script>
  
  <style scoped>
  /* Add your scoped styles here */
  </style>
  