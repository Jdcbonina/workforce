"use client";

import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

import Heading from "@/components/ui/heading";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { employeeSchedule, employeeScheduleUpdate } from "@/schema/schedule";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { convertTo12Hour } from "@/lib/convert-time";
import Text from "@/components/ui/text";
import { Table, TableRow, TableBody, TableCell } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader, Loader2, Save, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const ScheduleUpdate = ({ id, days, schedule }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [updateOpen, setUpdateOpen] = useState(false);
  const schedules = schedule.map((data) => data.day);
  const mySchedule = days.filter((day) => schedules.includes(day));
  const [loading, setLoading] = useState(false);
  const [updateSchedule, setUpdateSchedule] = useState(false);

  const form = useForm<z.infer<typeof employeeScheduleUpdate>>({
    resolver: zodResolver(employeeScheduleUpdate),
    defaultValues: schedule.reduce((acc, item) => {
      acc[item.day.toLowerCase()] = item;
      return acc;
    }, {} as Record<string, z.infer<typeof employeeScheduleUpdate>>),
  });

  useEffect(() => {
    if (schedule) {
      form.reset(
        schedule.reduce((acc, item) => {
          acc[item.day.toLowerCase()] = item;
          return acc;
        }, {} as Record<string, z.infer<typeof employeeScheduleUpdate>>)
      );
    }
  }, [schedule, form]);

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      setLoading(true);
      await axios.patch(`/api/employee/${id}`, data);
    },
    onSuccess: async () => {
      toast({
        title: "Schedule Updated",
        description: "Employee schedule updated successfully.",
        variant: "success",
      });
      setUpdateOpen(false);
      queryClient.invalidateQueries({ queryKey: ["employee-details"] });
      setLoading(false);
      router.refresh();
    },
    onError: async (error) => {
      setLoading(false);
      console.error(error);
    },
  });

  const deleteMutuate = useMutation({
    mutationFn: async (data: any) => {
      setUpdateSchedule(true);
      await axios.patch(`/api/employee/${id}`, data);
    },
    onSuccess: async () => {
      setUpdateSchedule(false);
      toast({
        title: "Schedule Deleted",
        description: "Employee schedule updated successfully.",
        variant: "success",
        duration: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ["employee-details"] });
    },
    onError: async (error) => {
      setUpdateSchedule(false);
      console.log(error);
      toast({
        title: "Update failed!",
        description: "Something went wrong while deleting the schedule.",
        variant: "destructive",
        duration: 3000,
      });
    },
  });

  const onUpdate = async (values: z.infer<typeof employeeScheduleUpdate>) => {
    mutation.mutate({
      type: "edit",
      id: id,
      ...values,
    });
  };

  const onRemove = ({ id }: { id: string }) => {
    deleteMutuate.mutate({
      type: "delete",
      id: schedule.map((i) => i.id),
    });
  };

  return (
    <Dialog open={updateOpen} onOpenChange={setUpdateOpen}>
      <DialogTrigger asChild>
        <Button className="w-full mt-2">Update Schedule</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Employee Schedule</DialogTitle>
          <DialogDescription>
            Update your work schedule. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onUpdate)} className="space-y-4 mt-4">
          {mySchedule.map((day, index) => (
            <div className="grid grid-cols-4 gap-4" key={index}>
              <Controller
                control={form.control}
                name={`${day.toLowerCase()}.day` as keyof FormFieldNames}
                render={({ field: { value, onChange } }) => (
                  <Select value={value} onValueChange={onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Day" />
                    </SelectTrigger>
                    <SelectContent>
                      {days.map((day) => (
                        <SelectItem key={day} value={day}>
                          {day}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <Controller
                control={form.control}
                name={`${day.toLowerCase()}.start_time` as keyof FormFieldNames}
                render={({ field: { value, onChange } }) => (
                  <Input
                    value={value}
                    onChange={onChange}
                    type="time"
                    className="col-span-1"
                    isInvalid={
                      !!form.formState.errors[`${day.toLowerCase()}.start_time`]
                    }
                    errorMessage={
                      form.formState.errors[`${day.toLowerCase()}.start_time`]
                        ?.message
                    }
                  />
                )}
              />
              <span className="flex items-center justify-center">to</span>
              <Controller
                control={form.control}
                name={`${day.toLowerCase()}.end_time` as keyof FormFieldNames}
                render={({ field: { value, onChange } }) => (
                  <Input
                    value={value}
                    onChange={onChange}
                    type="time"
                    className="col-span-1"
                    isInvalid={
                      !!form.formState.errors[`${day.toLowerCase()}.end_time`]
                    }
                    errorMessage={
                      form.formState.errors[`${day.toLowerCase()}.end_time`]
                        ?.message
                    }
                  />
                )}
              />
            </div>
          ))}
          <div className="flex gap-2 mt-6">
            {loading ? (
              <Button type="submit" className="w-full" disabled>
                <Loader2 className="animate-spin " />
                &nbsp;Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full">
                <Save className="mr-2 h-4 w-4" /> Save Schedule
              </Button>
            )}

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  type="button"
                  variant="destructive"
                  className="flex items-center"
                >
                  {updateSchedule ? (
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  ) : (
                    <>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Clear
                    </>
                  )}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Clear Schedule</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to clear this employee&apos;s
                    schedule? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onRemove({ id: id })}>
                    Clear Schedule
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

type ScheduleProps = {
  id: string;
  data: any;
};

const Schedule = ({ id, data }: ScheduleProps) => {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const schedule = data.schedule || [];

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const sortedSchedule = schedule.sort((a, b) => {
    return days.indexOf(a.day) - days.indexOf(b.day);
  });

  const form = useForm<z.infer<typeof employeeSchedule>>({
    resolver: zodResolver(employeeSchedule),
    defaultValues: {
      monday: { day: "", start_time: "", end_time: "", employee_id: id },
      tuesday: { day: "", start_time: "", end_time: "", employee_id: id },
      wednesday: { day: "", start_time: "", end_time: "", employee_id: id },
      thursday: { day: "", start_time: "", end_time: "", employee_id: id },
      friday: { day: "", start_time: "", end_time: "", employee_id: id },
      saturday: { day: "", start_time: "", end_time: "", employee_id: id },
      sunday: { day: "", start_time: "", end_time: "", employee_id: id },
    },
  });
  // console.log(form.watch());
  // console.log(form.formState.errors);

  const onSubmit = async (values: z.infer<typeof employeeSchedule>) => {
    // console.log(values);
    setLoading(true);
    try {
      await axios.post(`/api/employee/${id}`, values);
      form.reset();
      setOpen(false);
      toast({
        variant: "success",
        title: "Employee Schedule",
        description: "The employee schedule has been successfully submitted.",
        duration: 5000,
      });
      queryClient.invalidateQueries({ queryKey: ["employee-details"] });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card className="rounded-lg border-none">
      <CardContent>
        <div className="mt-6">
          <Heading className="mx-2 text-xl font-bold capitalize mb-4 text-center">
            Schedule
          </Heading>
          <Separator />
          <Table className="mt-4">
            <TableBody>
              {schedule.length === 0 ? (
                <TableRow>
                  <TableCell>No data</TableCell>
                  <TableCell>No data</TableCell>
                </TableRow>
              ) : (
                schedule.map((item, index) => (
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
        </div>
        {!schedule || schedule.length === 0 ? (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="w-full mt-2">Create Schedule</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Employee Schedule</DialogTitle>
                <DialogDescription>
                  Set your work schedule. Click save when you&apos;re done.
                </DialogDescription>
              </DialogHeader>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 mt-4"
              >
                {days.slice(0, 5).map((day, index) => (
                  <div className="grid grid-cols-4 gap-4" key={index}>
                    <Controller
                      control={form.control}
                      name={`${day.toLowerCase()}.day` as keyof FormFieldNames}
                      render={({ field: { value, onChange } }) => (
                        <Select value={value} onValueChange={onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Day" />
                          </SelectTrigger>
                          <SelectContent>
                            {days.map((day) => (
                              <SelectItem key={day} value={day}>
                                {day}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <Controller
                      control={form.control}
                      name={
                        `${day.toLowerCase()}.start_time` as keyof FormFieldNames
                      }
                      render={({ field: { value, onChange } }) => (
                        <Input
                          value={value}
                          onChange={onChange}
                          type="time"
                          className="col-span-1"
                          isInvalid={
                            !!form.formState.errors[
                              `${day.toLowerCase()}.start_time`
                            ]
                          }
                          errorMessage={
                            form.formState.errors[
                              `${day.toLowerCase()}.start_time`
                            ]?.message
                          }
                        />
                      )}
                    />
                    <span className="flex items-center justify-center">to</span>
                    <Controller
                      control={form.control}
                      name={
                        `${day.toLowerCase()}.end_time` as keyof FormFieldNames
                      }
                      render={({ field: { value, onChange } }) => (
                        <Input
                          value={value}
                          onChange={onChange}
                          type="time"
                          className="col-span-1"
                          isInvalid={
                            !!form.formState.errors[
                              `${day.toLowerCase()}.end_time`
                            ]
                          }
                          errorMessage={
                            form.formState.errors[
                              `${day.toLowerCase()}.end_time`
                            ]?.message
                          }
                        />
                      )}
                    />
                  </div>
                ))}
                <Button type="submit" className="w-full mt-6">
                  Save Schedule
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        ) : (
          <ScheduleUpdate days={days} schedule={schedule} id={id} />
        )}
      </CardContent>
    </Card>
  );
};

export default Schedule;
