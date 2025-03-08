import { h } from "vue";
import type { ColumnDef } from "@tanstack/vue-table";
import type { Employee } from "@/components/employees/types";
import DropdownAction from "@/components/employees/data-table-dropdown.vue";
import { Badge } from "@/components/ui/badge";

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

const formatEmploymentDate = (
  dateStr: string
): { text: string; variant: BadgeVariant } => {
  const date = new Date(dateStr);
  const now = new Date();
  return date > now
    ? { text: "Employed Soon", variant: "secondary" }
    : { text: "Currently Employed", variant: "default" };
};

const formatTerminationDate = (
  dateStr: string | null
): { text: string; variant: BadgeVariant } => {
  if (!dateStr) return { text: "N/A", variant: "outline" };
  const date = new Date(dateStr);
  const now = new Date();
  return date > now
    ? { text: "To be Terminated", variant: "destructive" }
    : { text: "Terminated", variant: "secondary" };
};

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "fullName",
    header: "Full Name",
    cell: ({ row }) =>
      h("div", { class: "font-medium" }, row.getValue("fullName") as string),
  },
  {
    accessorKey: "occupation",
    header: "Occupation",
    cell: ({ row }) =>
      h("div", { class: "font-medium" }, row.getValue("occupation") as string),
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) =>
      h("div", { class: "font-medium" }, row.getValue("department") as string),
  },
  {
    accessorKey: "employmentDate",
    header: "Employment Date",
    cell: ({ row }) => {
      const employmentDate = row.getValue("employmentDate") as string;
      const { text, variant } = formatEmploymentDate(employmentDate);
      return h(Badge, { variant }, () => text);
    },
  },
  {
    accessorKey: "terminationDate",
    header: "Termination Date",
    cell: ({ row }) => {
      const terminationDate = row.getValue("terminationDate") as string | null;
      const { text, variant } = formatTerminationDate(terminationDate);
      return h(Badge, { variant }, () => text);
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const employee = row.original;
      return h(
        "div",
        { class: "relative" },
        h(DropdownAction, {
          employee,
        })
      );
    },
  },
];
