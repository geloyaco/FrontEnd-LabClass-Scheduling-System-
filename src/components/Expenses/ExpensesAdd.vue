<script setup>
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import Card from 'primevue/card';
import { ref } from 'vue';
import axios from 'axios';

const newExpense = ref({
  user_id: '',
  category_id: '',
  amount: '',
  description: '',
  date: '',
});

const loading = ref(false);
const error = ref(null);
const success = ref(false);

const addExpense = async () => {
  loading.value = true;
  error.value = null;
  success.value = false;
  try {
    await axios.post('http://127.0.0.1:8000/api/expenses/', newExpense.value, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    });
    success.value = true;
    newExpense.value = { user_id: '', category_id: '', amount: '', description: '', date: '', }; // Reset form fields after successful submission
  } catch (err) {
    console.error('Error adding expense:', err);
    error.value = 'Failed to add expense. Please try again later.';
  } finally {
    loading.value = false;
  }
};

const value = ref(null);
</script>

<template>
    <div>
    <Card>
      <template #title>Add Expenses</template>
      <template #content>
        <form @submit.prevent="addExpense">
          <div class="customstyle">
            <FloatLabel>
              <label for="user_id">User_Id</label>
              <InputText id="user_id" v-model="newExpense.user_id"/>
            </FloatLabel>
          </div>
          <div class="customstyle">
            <FloatLabel>
              <label for="category_id">Category_Id</label>
              <InputText id="category_id" v-model="newExpense.category_id"/>
            </FloatLabel>          
          </div>
          <div class="customstyle">
            <FloatLabel>
              <label for="amount">Amount</label>
              <InputText id="amount" v-model="newExpense.amount" required/>
            </FloatLabel>            
          </div>
          <div class="customstyle">
            <FloatLabel>
              <label for="description">Description</label>
              <InputText id="description" v-model="newExpense.description" required/>
            </FloatLabel>            
          </div>     
          <div class="customstyle">
            <FloatLabel>
              <label for="date">Date</label>
              <InputText id="date" v-model="newExpense.date" required/>
            </FloatLabel>            
          </div>               
          <div class="customstyle">
            <Button type="submit" label="Create New Expense" icon="pi pi-user-plus" />
          </div>
        </form>
        <div v-if="loading">Adding expense...</div>
        <div v-if="error" style="color: red;">{{ error }}</div>
        <div v-if="success">Expense added successfully!</div>
      </template>
    </Card>
  </div>


</template>

<style scoped>

.customstyle {
  padding: 15px;
}

</style>