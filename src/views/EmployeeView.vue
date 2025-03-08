<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { employeeService } from "@/services/api";
import type { Employee } from "@/components/employees/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast/use-toast";

const route = useRoute();
const router = useRouter();
const employeeId = route.params.employeeId as string;
const employee = ref<Employee | null>(null);
const loading = ref(true);
const notFound = ref(false);
const { toast } = useToast();

const fetchEmployee = async () => {
  try {
    const data = await employeeService.getById(employeeId);
    if (data) {
      employee.value = data;
    } else {
      throw new Error("Employee not found");
    }
  } catch (error) {
    notFound.value = true;
    toast({
      title: "Not Found",
      description: "Employee not found",
      variant: "destructive",
    });
  } finally {
    loading.value = false;
  }
};

onMounted(fetchEmployee);
</script>

<template>
  <div class="flex justify-center items-center min-h-screen px-4">
    <Card v-if="employee" class="w-full max-w-lg shadow-lg p-6">
      <CardHeader class="text-center">
        <CardTitle class="text-lg sm:text-xl">{{
          employee.fullName
        }}</CardTitle>
        <CardDescription class="text-sm sm:text-base">{{
          employee.occupation
        }}</CardDescription>
      </CardHeader>
      <CardContent class="space-y-1">
        <p class="text-sm sm:text-base">
          <span class="font-semibold">Department:</span>
          {{ employee.department }}
        </p>
        <p class="text-sm sm:text-base">
          <span class="font-semibold">Employment Date:</span>
          {{ employee.employmentDate || "N/A" }}
        </p>
        <p class="text-sm sm:text-base">
          <span class="font-semibold">Termination Date:</span>
          {{ employee.terminationDate || "N/A" }}
        </p>
      </CardContent>
      <CardFooter class="flex justify-center">
        <Button class="w-full sm:w-auto" @click="router.push('/')"
          >Go back</Button
        >
      </CardFooter>
    </Card>

    <p v-else-if="loading" class="text-gray-500 text-lg">
      Loading employee details...
    </p>

    <div v-else-if="notFound" class="text-center space-y-4 p-6">
      <p class="text-lg font-semibold">Employee not found</p>
      <Button class="w-full sm:w-auto" @click="router.push('/')"
        >Go back</Button
      >
    </div>
  </div>
</template>
