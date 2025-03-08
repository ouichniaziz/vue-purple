import { ref, provide, inject, type InjectionKey, type Ref } from "vue";
import type { Employee } from "@/components/employees/types";
import { employeeService } from "@/services/api";
import { useToast } from "@/components/ui/toast/use-toast";

// Define the type for our employee store
type EmployeeStore = {
  employees: Ref<Employee[]>;
  loading: Ref<boolean>;
  fetchEmployees: () => Promise<void>;
  createEmployee: (employee: Omit<Employee, "id">) => Promise<void>;
  updateEmployee: (employee: Employee) => Promise<void>;
  deleteEmployee: (id: string) => Promise<void>;
};

// Create an injection key
const EmployeeStoreKey = Symbol() as InjectionKey<EmployeeStore>;

// Create the provider function
export function provideEmployeeStore() {
  const { toast } = useToast();
  const employees = ref<Employee[]>([]);
  const loading = ref(true); // `loading` is a Ref<boolean>

  // Fetch all employees
  const fetchEmployees = async () => {
    loading.value = true;
    try {
      employees.value = await employeeService.getAll();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch employees",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  // Create a new employee
  const createEmployee = async (employee: Omit<Employee, "id">) => {
    try {
      // Calculate the new id based on the last employee's id
      const lastEmployee = employees.value[employees.value.length - 1];
      const newId = lastEmployee
        ? (parseInt(lastEmployee.id, 10) + 1).toString()
        : "1";

      // Create the employee with the new id (note we are not passing `id` in the argument)
      const createdEmployee = await employeeService.create({
        ...employee, // spread all other properties of the employee
        id: newId, // add the new id to the employee object
      } as Employee); // Assert the type here to treat the result as `Employee`

      employees.value = [...employees.value, createdEmployee];
      toast({
        title: "Success",
        description: "Employee created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create employee",
        variant: "destructive",
      });
      console.error(error);
    }
  };

  // Update an existing employee
  const updateEmployee = async (employee: Employee) => {
    console.log("Updating employee in store:", employee);
    try {
      const { id, ...employeeData } = employee; // The `id` is kept for the update call, but not passed into the update data
      await employeeService.update(id, employeeData); // Only pass the `employeeData` to the update service
      // Update the local state
      employees.value = employees.value.map((emp) =>
        emp.id === id ? { ...employee } : emp
      );
      toast({
        title: "Success",
        description: "Employee updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update employee",
        variant: "destructive",
      });
      console.error(error);
    }
  };

  // Delete an employee
  const deleteEmployee = async (id: string) => {
    console.log("Deleting employee in store:", id);
    try {
      await employeeService.delete(id);
      employees.value = employees.value.filter((emp) => emp.id !== id);
      toast({
        title: "Success",
        description: "Employee deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete employee",
        variant: "destructive",
      });
      console.error(error);
    }
  };

  // Create the store object
  const store: EmployeeStore = {
    employees,
    loading, // This is now a Ref<boolean>
    fetchEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
  };

  // Provide the store to descendants
  provide(EmployeeStoreKey, store);

  return store;
}

// Create the injection function
export function useEmployeeStore(): EmployeeStore {
  const store = inject(EmployeeStoreKey);
  if (!store) {
    throw new Error(
      "useEmployeeStore must be used within a component that has called provideEmployeeStore"
    );
  }
  return store;
}
