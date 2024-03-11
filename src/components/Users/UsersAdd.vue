<script setup>
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import Card from 'primevue/card';
import { ref } from 'vue';
import axios from 'axios';

const newUser = ref({
  username: '',
  email: ''
});

const loading = ref(false);
const error = ref(null);
const success = ref(false);

const addUser = async () => {
  loading.value = true;
  error.value = null;
  success.value = false;
  try {
    await axios.post('http://127.0.0.1:8000/api/users/', newUser.value, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    });
    success.value = true;
    newUser.value = { username: '', email: '' }; // Reset form fields after successful submission
  } catch (err) {
    console.error('Error adding user:', err);
    error.value = 'Failed to add user. Please try again later.';
  } finally {
    loading.value = false;
  }
};


const value = ref(null);
</script>

<template>
    <div>
    <Card>
      <template #title>Add Users</template>
      <template #content>
        <form @submit.prevent="addUser">
          <div class="customstyle">
            <FloatLabel>
              <label for="username">Username</label>
              <InputText id="username" v-model="newUser.username"/>
            </FloatLabel>
          </div>
          <div class="customstyle">
            <FloatLabel>
              <label for="email">Email</label>
              <InputText id="email" v-model="newUser.email"/>
            </FloatLabel>          
          </div>
          <div class="customstyle">
            <FloatLabel>
              <label for="password">Password</label>
              <InputText type="password" id="password" v-model="newUser.password" required/>
            </FloatLabel>            
          </div>
          <div class="customstyle">
            <Button type="submit" label="Create New User" icon="pi pi-user-plus" />
          </div>
        </form>
        <div v-if="loading">Adding user...</div>
        <div v-if="error" style="color: red;">{{ error }}</div>
        <div v-if="success">User added successfully!</div>
      </template>
    </Card>
  </div>


</template>

<style scoped>

.customstyle {
  padding: 15px;
}

</style>