import { Card, CardContent } from "@/components/ui/card";
import { LeaveManagementTable } from "./table";

const Content = () => {
  return (
    <Card className="rounded-lg border-none mt-6">
      <CardContent className="p-6">
        <LeaveManagementTable />
      </CardContent>
    </Card>
  );
};

export default Content;
