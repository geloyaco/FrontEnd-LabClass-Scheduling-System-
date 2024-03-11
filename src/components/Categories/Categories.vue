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

const categories = ref([]);
const loading = ref(false);
const router = useRouter();

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const fetchCategories = async () => {
  loading.value = true;
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/categories/');
    categories.value = response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchCategories);

const navigateToAddCategories = () => {
  router.push(`/categoriesadd`);
};

const navigateToUpdateCategories = (categoryId) => {
  router.push(`/categoriesedit/${categoryId}`);
};

const navigateToDeleteCategories = (categoryId) => {
  router.push(`/categoriesdelete/${categoryId}`);
};
</script>

<template>
  <div>
    <h1>Manage Categories</h1>
    <Button type="button" label="Add Categories" icon="pi pi-user-plus" @click="navigateToAddCategories()"/>
    <hr/>
    <div v-if="loading">Loading...</div>
    <DataTable 
          :filters="filters" 
          :globalFilterFields="['id', 'name']" 
          dataKey="id" filterDisplay="row" :loading="loading" 
          v-else :value="categories" tableStyle="min-width: 50rem" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]">
      
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
      <template #empty> No category found. </template>
      <template #loading> Loading category data. Please wait. </template>

      <Column sortable field="id" header="ID"></Column>
      <Column sortable field="name" header="name"></Column>
      <Column header="Actions">
        <template #body="rowData">
          <Button type="button" label="Edit" icon="pi pi-user-edit" @click="navigateToUpdateCategories(rowData.data.id)" outlined rounded />
          <Button type="button" label="Delete" icon="pi pi-trash" @click="navigateToDeleteCategories(rowData.data.id)" class="p-button-danger" outlined rounded />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style scoped></style>