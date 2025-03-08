<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/employees/data-table.vue";
import EmployeeDialog from "@/components/employees/employee-dialog.vue";
import { columns } from "@/components/employees/columns";
import { provideEmployeeStore } from "@/composables/useEmployeeStore";

// Provide the employee store
const { employees, loading, fetchEmployees } = provideEmployeeStore();

// Create dialog state for creating a new employee
const createDialogOpen = ref(false);

onMounted(fetchEmployees);
</script>

<template>
  <div class="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
    <div v-if="loading" class="flex justify-center items-center py-10">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"
      ></div>
    </div>

    <div v-else>
      <DataTable :columns="columns" :data="employees" class="min-w-full" />

      <div class="mt-6 flex justify-center sm:justify-end">
        <!-- Button to open the dialog for creating a new employee -->
        <Button @click="createDialogOpen = true" class="w-full sm:w-auto">
          Create Employee
        </Button>
      </div>

      <!-- Employee creation dialog -->
      <EmployeeDialog v-model:open="createDialogOpen" />
    </div>
  </div>
</template>
