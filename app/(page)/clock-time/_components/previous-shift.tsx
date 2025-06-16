import { format, parseISO } from "date-fns";

import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Text from "@/components/ui/text";
import Heading from "@/components/ui/heading";
import { ScrollArea } from "@/components/ui/scroll-area";

type PreviousShiftProps = {
  history: any;
};

const PreviousShift = ({ history }: PreviousShiftProps) => {
  const data = history;

  const formatDateTime = (dateTime: string) => {
    const date = format(parseISO(dateTime), "MMMM d, yyyy");
    const time = format(parseISO(dateTime), "hh:mm a");
    return (
      <>
        {date}
        <br />
        {time}
      </>
    );
  };

  return (
    <Card className="rounded-lg border-none flex-1">
      <CardContent className="p-6">
        <Heading className="mx-2 text-xl capitalize mb-4 font-semibold text-center">
          Previous Shift
        </Heading>

        <ScrollArea className="h-[334px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time In</TableHead>

                <TableHead>Time Out</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data && data.length === 0 ? (
                <TableRow>
                  <TableCell className="text-muted-foreground text-sm">
                    N/A
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    N/A
                  </TableCell>
                </TableRow>
              ) : (
                data.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-sm">
                      <Text as="small">
                        {data.clockIn ? formatDateTime(data.clockIn) : "N/A"}
                      </Text>
                    </TableCell>

                    <TableCell className="text-sm">
                      <Text as="small">
                        {data.clockOut ? formatDateTime(data.clockOut) : "N/A"}
                      </Text>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default PreviousShift;
