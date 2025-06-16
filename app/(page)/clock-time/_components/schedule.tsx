import { Card, CardContent } from "@/components/ui/card";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import Text from "@/components/ui/text";
import { convertTo12Hour } from "@/lib/convert-time";

type ScheduleProps = {
  schedules: any;
};

const Schedule = ({ schedules }: ScheduleProps) => {
  const data = schedules || [];

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const sortedSchedule = data.sort((a, b) => {
    return days.indexOf(a.day) - days.indexOf(b.day);
  });

  return (
    <>
      <Card className="rounded-lg border-none">
        <CardContent className="p-6">
          <Heading className="mx-2 text-xl capitalize mb-4 font-semibold text-center">
            Schedule
          </Heading>
          <Table className="mt-4">
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell>No data</TableCell>
                  <TableCell>No data</TableCell>
                </TableRow>
              ) : (
                sortedSchedule.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="grid grid-cols-1 text-center">
                        <Text as="h1" className="font-bold">
                          {`${convertTo12Hour(item.start_time)}`}
                        </Text>
                        <Text as="small" className="text-muted-foreground">
                          {`${item.day}`}
                        </Text>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="grid grid-cols-1 text-center">
                        <Text as="h1" className="font-bold">
                          {`${convertTo12Hour(item.end_time)}`}
                        </Text>
                        <Text as="small" className="text-muted-foreground">
                          {`${item.day}`}
                        </Text>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default Schedule;
