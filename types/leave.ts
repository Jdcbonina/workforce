export type Leave = {
    id: string
    employee_id: string
    type: string
    requested_date: string
    status: "Pending" | "Approved" | "Denied" 
  }
  