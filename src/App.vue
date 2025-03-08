<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Employee } from "@/components/employees/types";
import { columns } from "@/components/employees/columns";
import DataTable from "@/components/employees/data-table.vue";

const data = ref<Employee[]>([]);

async function getData(): Promise<Employee[]> {
  return [
    ...Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      fullName: `Employee ${i + 1}`,
      occupation: [
        "Software Engineer",
        "Product Manager",
        "UX Designer",
        "Marketing Specialist",
        "Data Analyst",
        "HR Manager",
      ][i % 6],
      department: [
        "Engineering",
        "Product",
        "Design",
        "Marketing",
        "Analytics",
        "Human Resources",
      ][i % 6],
      employmentDate: new Date(2020 + (i % 6), (i * 2) % 12, 10).toISOString().split("T")[0],
      terminationDate: new Date(2024 + (i % 5), ((i + 3) * 2) % 12, 20).toISOString().split("T")[0],
    })),
  ];
}

onMounted(async () => {
  data.value = await getData();
});
</script>

<template>
  <div class="container py-10 mx-auto">
    <DataTable :columns="columns" :data="data" />
  </div>
</template>
