import { createRouter, createWebHistory } from "vue-router";

import Home from "../components/Home.vue";
import Users from "../components/Users/Users.vue";
import UsersAdd from "../components/Users/UsersAdd.vue";
import UsersEdit from "../components/Users/UsersEdit.vue";
import UsersDelete from "../components/Users/UsersDelete.vue";
import Categories from "../components/Categories/Categories.vue";
import CategoriesAdd from "../components/Categories/CategoriesAdd.vue";
import CategoriesEdit from "../components/Categories/CategoriesEdit.vue";
import CategoriesDelete from "../components/Categories/CategoriesDelete.vue";
import Expenses from "../components/Expenses/Expenses.vue";
import ExpensesAdd from "../components/Expenses/ExpensesAdd.vue";
import ExpensesEdit from "../components/Expenses/ExpensesEdit.vue";
import ExpensesDelete from "../components/Expenses/ExpensesDelete.vue";

const routes = [
    { path: "/", name: "Home", component: Home, },
    { path: "/users", name: "Users", component: Users, },
    { path: "/usersadd", name: "UsersAdd", component: UsersAdd, },
    { path: "/usersedit/:userId", name: "UsersEdit", component: UsersEdit, },
    { path: "/usersdelete/:userId", name: "UsersDelete", component: UsersDelete, },
    { path: "/categories", name: "Categories", component: Categories, },
    { path: "/categoriesadd", name: "CategoriesAdd", component: CategoriesAdd, },
    { path: "/categoriesedit/:categoryId", name: "CategoriesEdit", component: CategoriesEdit, },
    { path: "/categoriesdelete/:categoryId", name: "CategoriesDelete", component: CategoriesDelete, },    
    { path: "/expenses", name: "Expenses", component: Expenses, },
    { path: "/expensesadd", name: "ExpensesAdd", component: ExpensesAdd, },
    { path: "/expensesedit/:expenseId", name: "ExpensesEdit", component: ExpensesEdit, },
    { path: "/expensesdelete/:expenseId", name: "ExpensesDelete", component: ExpensesDelete, },    
  ];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;