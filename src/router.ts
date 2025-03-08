import { createRouter, createWebHistory } from "vue-router";
import EmployeeList from "./views/EmployeeList.vue";
import EmployeeView from "./views/EmployeeView.vue";

const routes = [
  {
    path: "/",
    name: "EmployeeList",
    component: EmployeeList,
  },
  {
    path: "/employee/:employeeId",
    name: "EmployeeView",
    component: EmployeeView,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
