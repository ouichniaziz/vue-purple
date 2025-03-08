import { h } from "vue";
import type { ColumnDef } from "@tanstack/vue-table";
import type { Employee } from "@/components/employees/types";

import DropdownAction from "@/components/employees/data-table-dropdown.vue";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-vue-next";

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

const formatEmploymentDate = (
  dateStr: string
): { text: string; variant: BadgeVariant } => {
  const date = new Date(dateStr);
  return date > new Date()
    ? { text: "Employed Soon", variant: "secondary" }
    : { text: "Currently Employed", variant: "default" };
};

const formatTerminationDate = (
  dateStr: string | null
): { text: string; variant: BadgeVariant } => {
  if (!dateStr) return { text: "N/A", variant: "outline" };
  const date = new Date(dateStr);
  return date > new Date()
    ? { text: "To be Terminated", variant: "destructive" }
    : { text: "Terminated", variant: "secondary" };
};

const createSortableHeader = (label: string, column: any) =>
  h(
    Button,
    {
      variant: "ghost",
      onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
    },
    () => [label, h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
  );

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "fullName",
    header: ({ column }) => createSortableHeader("Full Name", column),
    cell: ({ row }) =>
      h("div", { class: "font-medium" }, row.getValue("fullName") as string),
  },
  {
    accessorKey: "occupation",
    header: ({ column }) => createSortableHeader("Occupation", column),
    cell: ({ row }) =>
      h("div", { class: "font-medium" }, row.getValue("occupation") as string),
  },
  {
    accessorKey: "department",
    header: ({ column }) => createSortableHeader("Department", column),
    cell: ({ row }) =>
      h("div", { class: "font-medium" }, row.getValue("department") as string),
  },
  {
    accessorKey: "employmentDate",
    header: ({ column }) => createSortableHeader("Employment Date", column),
    cell: ({ row }) => {
      const { text, variant } = formatEmploymentDate(
        row.getValue("employmentDate")
      );
      return h(Badge, { variant }, () => text);
    },
  },
  {
    accessorKey: "terminationDate",
    header: ({ column }) => createSortableHeader("Termination Date", column),
    cell: ({ row }) => {
      const { text, variant } = formatTerminationDate(
        row.getValue("terminationDate")
      );
      return h(Badge, { variant }, () => text);
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => h(DropdownAction, { employee: row.original }),
  },
];
