import Link from "next/link";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id_number",
    header: "ID Number",
    cell: ({ row }) => (
      <div className="select-none">{row.getValue("id_number")}</div>
    ),
  },
  {
    accessorKey: "first_name",
    header: "First Name",
    cell: ({ row }) => (
      <div className="capitalized select-none">
        {row.getValue("first_name")}
      </div>
    ),
  },
  {
    accessorKey: "middle_name",
    header: "Middle Name",
    cell: ({ row }) => (
      <div className="capitalized select-none">
        {row.getValue("middle_name")}
      </div>
    ),
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
    cell: ({ row }) => (
      <div className="capitalized select-none">{row.getValue("last_name")}</div>
    ),
  },
  {
    accessorKey: "username",
    header: "Username",
    cell: ({ row }) => (
      <div className="select-none">{row.getValue("username")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase select-none">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => (
      <div className="capitalized select-none">
        {row.getValue("department").name}
      </div>
    ),
  },
  {
    accessorKey: "employment_status",
    header: "Employment Status",
    cell: ({ row }) =>
      row.getValue("employment_status") === "Employed" ? (
        <Badge variant="success" className="select-none">
          {row.getValue("employment_status")}
        </Badge>
      ) : (
        <Badge variant="destructive" className="select-none">
          {row.getValue("employment_status")}
        </Badge>
      ),
  },
  {
    accessorKey: "actions",
    header: "Action",
    enableHiding: false,
    cell: ({ row }) => {
      // const id_number = row.getValue("id_number");
      const id = row.original.id;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {/* <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(id_number)}
            >
              Copy ID Number
            </DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <Link href={`/employee-management/view/${id}`}>
              <DropdownMenuItem>View Employee</DropdownMenuItem>
            </Link>
            <DropdownMenuItem>Reset Password</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
