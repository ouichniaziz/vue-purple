<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Button } from "@/components/ui/button";
import Toaster from "@/components/ui/toast/Toaster.vue";
import DataTable from "@/components/employees/data-table.vue";
import EmployeeDialog from "@/components/employees/employee-dialog.vue";
import { columns } from "@/components/employees/columns";
import { provideEmployeeStore } from "@/composables/useEmployeeStore";

// Provide the employee store
const { employees, loading, fetchEmployees } = provideEmployeeStore();

// Create dialog state
const createDialogOpen = ref(false);

// Fetch employees on mount
onMounted(fetchEmployees);
</script>

<template>
  <Toaster />
  <div class="container py-10 mx-auto">
    <div v-if="loading" class="flex justify-center items-center py-10">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"
      ></div>
    </div>

    <div v-else>
      <DataTable :columns="columns" :data="employees" />

      <div class="mt-6 flex justify-end">
        <Button @click="createDialogOpen = true">Create Employee</Button>
        <EmployeeDialog v-model:open="createDialogOpen" />
      </div>
    </div>
  </div>
</template>
