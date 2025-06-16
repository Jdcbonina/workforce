import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import EmployeeTable from "./table";

const Content = () => {
  return (
    <Card className="rounded-lg border-none mt-6">
      <CardContent className="p-6">
        <EmployeeTable />
      </CardContent>
    </Card>
  );
};

export default Content;
