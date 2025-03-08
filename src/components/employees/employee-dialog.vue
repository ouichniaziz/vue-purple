<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { defineEmits, defineProps, watch } from "vue";
import * as z from "zod";
import type { Employee } from "./types";
import { useEmployeeStore } from "@/composables/useEmployeeStore";

// Get the employee store
const { createEmployee, updateEmployee } = useEmployeeStore();

// Define props and emits
const props = defineProps<{
  employee?: Employee;
  open: boolean;
}>();

const emit = defineEmits(["update:open"]);

// Define validation schema with optional employmentDate
const formSchema = toTypedSchema(
  z.object({
    fullName: z
      .string()
      .min(2, { message: "Full name must be at least 2 characters." }),
    occupation: z
      .string()
      .min(2, { message: "Occupation must be at least 2 characters." }),
    department: z
      .string()
      .min(2, { message: "Department must be at least 2 characters." }),
    employmentDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: "Invalid date format (YYYY-MM-DD).",
      })
      .optional()
      .or(z.literal("")),
    terminationDate: z.string().optional(),
  })
);

// Determine if we're in edit mode
const isEditMode = () => !!props.employee;

// Set up form with initial values
const { handleSubmit, isFieldDirty, resetForm, setValues } = useForm({
  validationSchema: formSchema,
  initialValues: {
    fullName: "",
    occupation: "",
    department: "",
    employmentDate: "",
    terminationDate: "",
  },
});

// Watch for changes in the employee prop to update form values
watch(
  () => props.employee,
  (newEmployee) => {
    if (newEmployee) {
      setValues({
        fullName: newEmployee.fullName,
        occupation: newEmployee.occupation,
        department: newEmployee.department,
        employmentDate: newEmployee.employmentDate || "",
        terminationDate: newEmployee.terminationDate || "",
      });
    } else {
      resetForm();
    }
  },
  { immediate: true }
);

// Watch for changes in the open prop
watch(
  () => props.open,
  (newOpen) => {
    if (!newOpen && !isEditMode()) {
      resetForm();
    }
  }
);

// Form submission logic
const onSubmit = handleSubmit(async (values) => {
  if (isEditMode() && props.employee) {
    // Update existing employee
    await updateEmployee({
      ...props.employee,
      ...values,
    });
  } else {
    // Create new employee
    await createEmployee(values);
  }

  // Close the dialog
  emit("update:open", false);
});

// Handle dialog close
const handleClose = () => {
  emit("update:open", false);
};
</script>

<template>
  <Dialog :open="open" @update:open="(val) => emit('update:open', val)">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{{
          isEditMode() ? "Edit Employee" : "Create Employee"
        }}</DialogTitle>
      </DialogHeader>

      <form class="space-y-4" @submit.prevent="onSubmit">
        <FormField
          v-slot="{ componentField }"
          name="fullName"
          :validate-on-blur="!isFieldDirty"
        >
          <FormItem>
            <FormLabel>Full Name</FormLabel>
            <FormControl>
              <Input v-bind="componentField" placeholder="John Doe" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField
          v-slot="{ componentField }"
          name="occupation"
          :validate-on-blur="!isFieldDirty"
        >
          <FormItem>
            <FormLabel>Occupation</FormLabel>
            <FormControl>
              <Input v-bind="componentField" placeholder="Enter occupation" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField
          v-slot="{ componentField }"
          name="department"
          :validate-on-blur="!isFieldDirty"
        >
          <FormItem>
            <FormLabel>Department</FormLabel>
            <FormControl>
              <Input v-bind="componentField" placeholder="Enter department" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField
          v-slot="{ componentField }"
          name="employmentDate"
          :validate-on-blur="!isFieldDirty"
        >
          <FormItem>
            <FormLabel>Employment Date (Optional)</FormLabel>
            <FormControl>
              <Input type="date" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField
          v-slot="{ componentField }"
          name="terminationDate"
          :validate-on-blur="!isFieldDirty"
        >
          <FormItem>
            <FormLabel>Termination Date (Optional)</FormLabel>
            <FormControl>
              <Input type="date" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <DialogFooter>
          <Button type="button" variant="outline" @click="handleClose"
            >Cancel</Button
          >
          <Button type="submit">{{
            isEditMode() ? "Update Employee" : "Save Employee"
          }}</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
