import { Card, CardContent } from "@/components/ui/card";
import { LeaveTable } from "./table";

const Content = () => {
  return (
    <Card className="rounded-lg border-none mt-6">
      <CardContent className="p-6">
        <LeaveTable />
      </CardContent>
    </Card>
  );
};

export default Content;
