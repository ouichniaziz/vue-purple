import type { Employee } from "@/components/employees/types";

const API_URL = "http://localhost:3000";

export const employeeService = {
  // Get all employees
  async getAll(): Promise<Employee[]> {
    const response = await fetch(`${API_URL}/employees`);
    if (!response.ok) {
      throw new Error("Failed to fetch employees");
    }
    return response.json();
  },

  // Get a single employee by ID
  async getById(id: string): Promise<Employee> {
    const response = await fetch(`${API_URL}/employees/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch employee with ID ${id}`);
    }
    return response.json();
  },

  // Create a new employee
  async create(employee: Omit<Employee, "id">): Promise<Employee> {
    const response = await fetch(`${API_URL}/employees`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    });
    if (!response.ok) {
      throw new Error("Failed to create employee");
    }
    return response.json();
  },

  // Update an existing employee
  async update(id: string, employee: Partial<Employee>): Promise<Employee> {
    const response = await fetch(`${API_URL}/employees/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    });
    if (!response.ok) {
      throw new Error(`Failed to update employee with ID ${id}`);
    }
    return response.json();
  },

  // Delete an employee
  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/employees/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Failed to delete employee with ID ${id}`);
    }
  },
};
