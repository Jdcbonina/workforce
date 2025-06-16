"use client";

import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Session } from "next-auth";

import { ClockTimeSchema } from "@/schema/clock";
import { zodResolver } from "@hookform/resolvers/zod";
import Heading from "@/components/ui/heading";
import Text from "@/components/ui/text";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Loader2 } from "lucide-react";

type ClockTimeProps = {
  session: Session;
  clockIn: any;
  handleUpdate: any;
  refetch: any;
};

const ClockTime = ({
  session,
  clockIn,
  handleUpdate,
  refetch,
}: ClockTimeProps) => {
  const router = useRouter();
  const formattedDate = format(new Date(), "d MMM, yyyy");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    function updateSeconds() {
      const now = new Date();
      const time = format(now, "hh:mm:ss a");
      const timeElement = document.getElementById("time");

      if (timeElement) {
        timeElement.textContent = time;
      }
    }

    const intervalId = setInterval(updateSeconds, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const form = useForm<z.infer<typeof ClockTimeSchema>>({
    resolver: zodResolver(ClockTimeSchema),
    defaultValues: {
      employee_id: session.user.id,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      if (data.type === "in") {
        setIsLoading(true);

        const response = await axios
          .post("/api/clock-time", data)
          .then(() => {
            toast({
              variant: "success",
              title: "Clock-In Successful",
              description:
                "You have successfully clocked in. Have a great day!",
              duration: 5000,
            });

            refetch();
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else if (data.type === "out") {
        setIsLoading(true);

        const response = await axios
          .patch("/api/clock-time", data)
          .then(() => {
            toast({
              variant: "success",
              title: "Clock-Out Successful",
              description:
                "You have been successfully clocked out. Have a great day!",
              duration: 5000,
            });

            refetch();
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    },
  });

  const onSubmit = async (values: z.infer<typeof ClockTimeSchema>) => {
    try {
      if (clockIn) {
        await mutation.mutateAsync({
          id: clockIn.id,
          type: "out",
        });
      } else {
        await mutation.mutateAsync({
          employee: {
            id: values.employee_id,
          },
          type: "in",
        });
      }

      router.refresh();
    } catch (error) {
      console.error("Failed to submit clock time:", error);
    }
  };

  return (
    <Card className="rounded-lg border-none">
      <CardContent className="p-6">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Heading className="mx-2 text-xl capitalize mb-4 font-semibold text-center">
            <span className="font-semibold">Timesheet </span>

            <span className="text-muted-foreground">{formattedDate}</span>
          </Heading>

          <div className="bg-gray-100 text-center dark:bg-background border rounded-[4px] py-3 px-4">
            {clockIn ? (
              <>
                <Text as="h6" className="font-semibold">
                  Punch In at
                </Text>

                <Text as="small" className="text-muted-foreground">
                  {clockIn.clockIn
                    ? format(
                        new Date(clockIn.clockIn),
                        "EEE, d MMM yyyy hh:mm:ss"
                      )
                    : ""}
                </Text>
              </>
            ) : (
              <Text as="h6" className="text-muted-foreground font-bold">
                Not yet on-duty
              </Text>
            )}
          </div>

          <div className="flex justify-center items-center my-5">
            <div className="border-4 border-slate-200 h-[120px] w-[120px] bg-gray-100 dark:bg-background rounded-full flex justify-center items-center">
              <Text as="h1" className="font-semibold" id="time"></Text>
            </div>
          </div>

          <div className="flex justify-center">
            {clockIn ? (
              <Button
                type="submit"
                variant="destructive"
                onClick={handleUpdate}
                disabled={isLoading ? true : false}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" />
                    &nbsp;Please wait
                  </>
                ) : (
                  "Punch Out"
                )}
              </Button>
            ) : (
              <Button
                type="submit"
                variant="success"
                onClick={handleUpdate}
                disabled={isLoading ? true : false}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" />
                    &nbsp;Please wait
                  </>
                ) : (
                  "Punch In"
                )}
              </Button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 my-5">
            <div className="border bg-gray-100 dark:bg-background  grid grid-rows-2 p-1 text-center">
              <Text as="small" className="dark:text-light">
                Total render
              </Text>
              <Text as="small" className="font-semibold">
                1.21hrs
              </Text>
            </div>

            <div className="border bg-gray-100 dark:bg-background grid grid-rows-2 p-1 text-center">
              <Text as="small">Overtime</Text>
              <Text as="small" className="font-semibold">
                3hrs
              </Text>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ClockTime;
