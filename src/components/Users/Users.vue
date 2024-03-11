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

const users = ref([]);
const loading = ref(false);
const router = useRouter();

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const fetchUsers = async () => {
  loading.value = true;
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/users/');
    users.value = response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchUsers);

const navigateToAddUser = () => {
  router.push(`/usersadd`);
};

const navigateToUpdateUser = (userId) => {
  router.push(`/usersedit/${userId}`);
};

const navigateToDeleteUser = (userId) => {
  router.push(`/usersdelete/${userId}`);
};
</script>

<template>
  <div>
    <h1>Manage Users</h1>
    <Button type="button" label="Add User" icon="pi pi-user-plus" @click="navigateToAddUser()"/>
    <hr/>
    <div v-if="loading">Loading...</div>
    <DataTable 
          :filters="filters" 
          :globalFilterFields="['id', 'username', 'email']" 
          dataKey="id" filterDisplay="row" :loading="loading" 
          v-else :value="users" tableStyle="min-width: 50rem" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]">
      
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
      <template #empty> No user found. </template>
      <template #loading> Loading user data. Please wait. </template>

      <Column sortable field="id" header="ID"></Column>
      <Column sortable field="username" header="Username"></Column>
      <Column sortable field="email" header="Email"></Column>
      <Column header="Actions">
        <template #body="rowData">
          <Button type="button" label="Edit" icon="pi pi-user-edit" @click="navigateToUpdateUser(rowData.data.id)" outlined rounded />
          <Button type="button" label="Delete" icon="pi pi-trash" @click="navigateToDeleteUser(rowData.data.id)" class="p-button-danger" outlined rounded />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style scoped></style>