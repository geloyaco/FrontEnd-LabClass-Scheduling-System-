<script setup>
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import Card from 'primevue/card';
import { ref } from 'vue';
import axios from 'axios';

const newCategory = ref({
  name: '',
});

const loading = ref(false);
const error = ref(null);
const success = ref(false);

const addCategory = async () => {
  loading.value = true;
  error.value = null;
  success.value = false;
  try {
    await axios.post('http://127.0.0.1:8000/api/categories/', newCategory.value, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    });
    success.value = true;
    newCategory.value = { name: ''}; 
  } catch (err) {
    console.error('Error adding category:', err);
    error.value = 'Failed to add category. Please try again later.';
  } finally {
    loading.value = false;
  }
};


const value = ref(null);
</script>

<template>
    <div>
    <Card>
      <template #title>Add Category</template>
      <template #content>
        <form @submit.prevent="addCategory">
          <div class="customstyle">
            <FloatLabel>
              <label for="name">Name</label>
              <InputText id="name" v-model="newCategory.name"/>
            </FloatLabel>
          </div>
          <div class="customstyle">
            <Button type="submit" label="Create New Category" icon="pi pi-user-plus" />
          </div>
        </form>
        <div v-if="loading">Adding category...</div>
        <div v-if="error" style="color: red;">{{ error }}</div>
        <div v-if="success">Category added successfully!</div>
      </template>
    </Card>
  </div>


</template>

<style scoped>

.customstyle {
  padding: 15px;
}

</style>