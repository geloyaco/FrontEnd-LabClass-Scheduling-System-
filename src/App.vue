<script setup>
import Menubar from "primevue/menubar";
import { useRouter } from 'vue-router';
import router from "./router";
import { ref } from "vue";

const items = [
        {
          label: "Home",
          icon: "pi pi-fw pi-home",
          command: () => {
            router.push('/');
          }
        },
        {
          label: "Users",
          icon: "pi pi-fw pi-list",
          route: "/users",
          command: () => {
            router.push('/users');
          }
        },
        {
          label: "Categories",
          icon: "pi pi-fw pi-list",
          route: "/categories",
          command: () => {
            router.push('/categories');
          }
        },
        {
          label: "Expenses",
          icon: "pi pi-fw pi-list",
          route: "/expenses",
          command: () => {
            router.push('/expenses');
          }
        }
      ];
</script>

<template>
    <div>
        <Menubar :model="items" />
        <router-view></router-view>
    </div>

</template>

<style scoped>
</style>