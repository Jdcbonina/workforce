"use client";

import React from "react";

import { useFindOne } from "@/lib/query";
import Schedule from "./schedule";
import PersonalDetails from "./personal-details";
import Profile from "./profile";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type ContentProps = {
  params: { id: string };
};

const Content = ({ params: { id } }: ContentProps) => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useFindOne({
    api: "/api/employee",
    key: "employee-details",
    id,
  });

  return (
    <>
      {isLoading ? (
        <div className="grid grid-cols-3 gap-6 mt-6 ">
          <Skeleton className="h-[216px] rounded-xl" />
          <Skeleton className="h-[677px] rounded-xl col-span-2 row-span-2" />
          <Skeleton className="h-[435px] rounded-xl" />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-6 mt-6 relative">
          <Profile data={data} />

          <PersonalDetails />

          <Schedule id={id} data={data} />
        </div>
      )}
    </>
  );
};

export default Content;
