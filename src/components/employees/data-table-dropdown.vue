<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-vue-next";
import { ref } from "vue";
import EmployeeDialog from "./employee-dialog.vue";
import type { Employee } from "./types";
import { useEmployeeStore } from "@/composables/useEmployeeStore";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const props = defineProps<{ employee: Employee }>();
const { deleteEmployee } = useEmployeeStore();

const editDialogOpen = ref(false);
const alertDialogOpen = ref(false);

const handleDelete = async () => {
  await deleteEmployee(props.employee.id);
  alertDialogOpen.value = false;
};
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="w-8 h-8 p-0">
        <span class="sr-only">Open menu</span>
        <MoreHorizontal class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem>View</DropdownMenuItem>
      <DropdownMenuItem @click="editDialogOpen = true">Edit</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="alertDialogOpen = true" class="text-destructive"
        >Delete</DropdownMenuItem
      >
    </DropdownMenuContent>
  </DropdownMenu>

  <!-- Employee Edit Dialog -->
  <EmployeeDialog v-model:open="editDialogOpen" :employee="props.employee" />

  <!-- Confirmation Alert Dialog for Deletion -->
  <AlertDialog v-model:open="alertDialogOpen">
    <AlertDialogContent class="space-y-4">
      <AlertDialogHeader>
        <AlertDialogTitle>Delete employee</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. Are you sure ?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter class="flex justify-end space-x-4">
        <AlertDialogCancel
          @click="alertDialogOpen = false"
          class="text-gray-500"
          >Cancel</AlertDialogCancel
        >
        <AlertDialogAction @click="handleDelete">Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
