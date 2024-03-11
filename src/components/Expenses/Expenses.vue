<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';

import { FilterMatchMode } from 'primevue/api';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import axios from 'axios';

const expenses = ref([]);
const loading = ref(false);
const router = useRouter();

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const fetchExpenses = async () => {
  loading.value = true;
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/expenses/');
    expenses.value = response.data;
  } catch (error) {
    console.error('Error fetching expenses:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchExpenses);

const navigateToAddExpense = () => {
  router.push(`/expensesadd`);
};

const navigateToUpdateExpense = (expenseId) => {
  router.push(`/expensesedit/${expenseId}`);
};

const navigateToDeleteExpense = (expenseId) => {
  router.push(`/expensesdelete/${expenseId}`);
};
</script>

<template>
  <div>
    <h1>Manage Expenses</h1>
    <Button type="button" label="Add Expense" icon="pi pi-user-plus" @click="navigateToAddExpense()"/>
    <hr/>
    <div v-if="loading">Loading...</div>
    <DataTable 
          :filters="filters" 
          :globalFilterFields="['id', 'expense_id', 'category_id', 'amount', 'description', 'date']" 
          dataKey="id" filterDisplay="row" :loading="loading" 
          v-else :value="expenses" tableStyle="min-width: 50rem" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]">
      
      <template #header>
          <div class="flex justify-content-end">
              <IconField iconPosition="left">
                  <InputIcon>
                      <i class="pi pi-search" />
                  </InputIcon>
                  <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
              </IconField>
          </div>
      </template>
      <template #empty> No expense found. </template>
      <template #loading> Loading expense data. Please wait. </template>

      <Column sortable field="id" header="ID"></Column>
      <Column sortable field="user_id" header="User_Id"></Column>
      <Column sortable field="category_id" header="Category_Id"></Column>
      <Column sortable field="amount" header="Amount"></Column>
      <Column sortable field="description" header="Description"></Column>
      <Column sortable field="date" header="Date"></Column>
      <Column header="Actions">
        <template #body="rowData">
          <Button type="button" label="Edit" icon="pi pi-user-edit" @click="navigateToUpdateExpense(rowData.data.id)" outlined rounded />
          <Button type="button" label="Delete" icon="pi pi-trash" @click="navigateToDeleteExpense(rowData.data.id)" class="p-button-danger" outlined rounded />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style scoped></style>