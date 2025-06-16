"use client";

import React, { useState } from "react";
import axios from "axios";
import { z } from "zod";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { employeeSchema } from "@/schema/employee";
import { useFindMany } from "@/lib/query";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { InputIdNumber } from "@/components/ui/inputIdNumber";

const Create = () => {
  const queryClient = useQueryClient();
  const [loading, setIsLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof employeeSchema>>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      id_number: "",
      first_name: "",
      last_name: "",
      middle_name: "",
      suffix: "",
      email: "",
      contact_number: "",
      department: {
        id: "",
        name: "",
      },
      employment_status: "",
      date_employed: null,
      username: "",
      password: "",
    },
  });

  const { data: department } = useFindMany({
    api: "/api/department",
    key: "department",
  });

  const getDepartment = department || [];

  const onSubmit = async (values: z.infer<typeof employeeSchema>) => {
    setIsLoading(true);

    await axios
      .post("/api/employee", values)
      .then(() => {
        form.reset();
        setOpen(false);
        toast({
          variant: "success",
          title: "Account Created",
          description: "The employee account has been successfully added.",
          duration: 5000,
        });
        queryClient.invalidateQueries({
          queryKey: ["employee-management"],
        });
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          toast({
            variant: "destructive",
            title: "Username Exists",
            description:
              "The username is already in use. Please choose a different one.",
            duration: 5000,
          });
        } else if (error.response && error.response.status === 401) {
          toast({
            variant: "destructive",
            title: "ID Number Exists",
            description:
              "The ID Number is already in use. Please choose a different one.",
            duration: 5000,
          });
        } else if (error.response && error.response.status === 401) {
          toast({
            variant: "destructive",
            title: "Email Exists",
            description:
              "The Email is already in use. Please choose a different one.",
            duration: 5000,
          });
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description:
              "An unexpected error occurred. Please try again later.",
            duration: 5000,
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="ml-2">
            Create New
          </Button>
        </SheetTrigger>

        <SheetContent className="lg:max-w-xl overflow-y-auto">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex justify-between flex-col">
              <SheetHeader>
                <SheetDescription>
                  Important Fields &#8226; Mandatory Fields{" "}
                  <span className="text-red-500">*</span>
                </SheetDescription>

                <Separator />

                <SheetTitle className="text-xl py-6">
                  Employee Details
                </SheetTitle>
              </SheetHeader>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="id_number" className="text-right">
                    ID Number <span className="text-red-500">*</span>
                  </Label>
                  <Controller
                    control={form.control}
                    name="id_number"
                    render={({ field: { ref, value, onChange } }) => (
                      <InputIdNumber
                        ref={ref}
                        value={value}
                        type="text"
                        className="col-span-3"
                        // placeholder="ID Number"
                        onChange={onChange}
                        isInvalid={
                          form.formState.errors.id_number ? true : false
                        }
                        errorMessage={form.formState.errors.id_number?.message}
                        startContent={<p>W-</p>}
                      />
                    )}
                  />
                </div>

                <div>
                  <Label htmlFor="first_name" className="text-right">
                    First Name <span className="text-red-500">*</span>
                  </Label>
                  <Controller
                    control={form.control}
                    name="first_name"
                    render={({ field: { ref, value, onChange } }) => (
                      <Input
                        ref={ref}
                        value={value}
                        type="text"
                        className="col-span-3"
                        // placeholder="First Name"
                        onChange={onChange}
                        isInvalid={
                          form.formState.errors.first_name ? true : false
                        }
                        errorMessage={form.formState.errors.first_name?.message}
                      />
                    )}
                  />
                </div>

                <div>
                  <Label htmlFor="middle_name" className="text-right">
                    Middle Name <span className="text-red-500">*</span>
                  </Label>

                  <Controller
                    control={form.control}
                    name="middle_name"
                    render={({ field: { ref, value, onChange } }) => (
                      <Input
                        ref={ref}
                        value={value}
                        type="text"
                        className="col-span-3"
                        // placeholder="Middle Name"
                        onChange={onChange}
                        isInvalid={
                          form.formState.errors.middle_name ? true : false
                        }
                        errorMessage={
                          form.formState.errors.middle_name?.message
                        }
                      />
                    )}
                  />
                </div>

                <div>
                  <Label htmlFor="last_name" className="text-right">
                    Last Name <span className="text-red-500">*</span>
                  </Label>

                  <Controller
                    control={form.control}
                    name="last_name"
                    render={({ field: { ref, value, onChange } }) => (
                      <Input
                        ref={ref}
                        value={value}
                        type="text"
                        className="col-span-3"
                        // placeholder="Last Name"
                        onChange={onChange}
                        isInvalid={
                          form.formState.errors.last_name ? true : false
                        }
                        errorMessage={form.formState.errors.last_name?.message}
                      />
                    )}
                  />
                </div>

                <div>
                  <Label htmlFor="suffix" className="text-right">
                    Suffix
                  </Label>

                  <Controller
                    control={form.control}
                    name="suffix"
                    render={({ field: { ref, value, onChange } }) => (
                      <Input
                        ref={ref}
                        value={value}
                        type="text"
                        className="col-span-3"
                        // placeholder="Suffix"
                        onChange={onChange}
                        isInvalid={form.formState.errors.suffix ? true : false}
                        errorMessage={form.formState.errors.suffix?.message}
                      />
                    )}
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-right">
                    Email <span className="text-red-500">*</span>
                  </Label>

                  <Controller
                    control={form.control}
                    name="email"
                    render={({ field: { ref, value, onChange } }) => (
                      <Input
                        ref={ref}
                        value={value}
                        type="email"
                        className="col-span-3"
                        // placeholder="Email"
                        onChange={onChange}
                        isInvalid={form.formState.errors.email ? true : false}
                        errorMessage={form.formState.errors.email?.message}
                      />
                    )}
                  />
                </div>

                <div>
                  <Label htmlFor="employment_status" className="text-right">
                    Employment Status <span className="text-red-500">*</span>
                  </Label>

                  <Controller
                    control={form.control}
                    name="employment_status"
                    render={({ field: { ref, value, onChange } }) => (
                      <Select onValueChange={onChange} value={value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>

                        <SelectContent ref={ref}>
                          <SelectItem value="Employed">Employed</SelectItem>
                          <SelectItem value="Resigned">Resigned</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div>
                  <Label htmlFor="department" className="text-right">
                    Department <span className="text-red-500">*</span>
                  </Label>

                  <Controller
                    control={form.control}
                    name="department.id"
                    render={({ field: { ref, value, onChange } }) => (
                      <Select value={value} onValueChange={onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Department" />
                        </SelectTrigger>

                        <SelectContent ref={ref}>
                          {getDepartment.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div>
                  <Label htmlFor="date_employed" className="text-right">
                    Date Employed <span className="text-red-500">*</span>
                  </Label>

                  <div>
                    <Controller
                      control={form.control}
                      name="date_employed"
                      render={({ field: { ref, value, onChange } }) => {
                        const selectedDate = value
                          ? new Date(value)
                          : undefined;

                        return (
                          <Popover modal={true}>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[-webkit-fill-available] pl-3 text-left font-normal",
                                  !value && "text-muted-foreground"
                                )}
                              >
                                {value ? (
                                  format(value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={onChange}
                                disabled={(date) =>
                                  date > new Date() ||
                                  date < new Date("1900-01-01")
                                }
                                // initialFocus
                                required
                              />
                            </PopoverContent>
                          </Popover>
                        );
                      }}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="date_employed" className="text-right">
                    Contact Number <span className="text-red-500">*</span>
                  </Label>
                  <Controller
                    control={form.control}
                    name="contact_number"
                    render={({ field: { ref, value, onChange } }) => (
                      <Input
                        ref={ref}
                        value={value}
                        type="text"
                        onChange={onChange}
                        isInvalid={
                          form.formState.errors.username ? true : false
                        }
                        errorMessage={form.formState.errors.username?.message}
                      />
                    )}
                  />
                </div>
              </div>

              <SheetTitle className="text-xl py-6">Account Details</SheetTitle>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="username" className="text-right">
                    Username <span className="text-red-500">*</span>
                  </Label>

                  <Controller
                    control={form.control}
                    name="username"
                    render={({ field: { ref, value, onChange } }) => (
                      <Input
                        ref={ref}
                        value={value}
                        type="text"
                        className="col-span-3"
                        // placeholder="Username"
                        onChange={onChange}
                        isInvalid={
                          form.formState.errors.username ? true : false
                        }
                        errorMessage={form.formState.errors.username?.message}
                      />
                    )}
                  />
                </div>

                <div>
                  <Label htmlFor="password" className="text-right">
                    Password <span className="text-red-500">*</span>
                  </Label>

                  <Controller
                    control={form.control}
                    name="password"
                    render={({ field: { ref, value, onChange } }) => (
                      <Input
                        ref={ref}
                        value={value}
                        type="password"
                        className="col-span-3"
                        // placeholder="Password"
                        onChange={onChange}
                        isInvalid={
                          form.formState.errors.password ? true : false
                        }
                        errorMessage={form.formState.errors.password?.message}
                      />
                    )}
                  />
                </div>
              </div>
              <Button type="submit" isLoading={loading} className="mt-6">
                Submit
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Create;
