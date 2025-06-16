import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

type ProfileProps = {
  data: any;
};

const Profile = ({ data }: ProfileProps) => {
  return (
    <>
      <div className="bg-white border bg-card text-card-foreground shadow rounded-lg border-none">
        <div className="bg-gray-800 p-8 rounded-t-lg h-20 flex justify-center">
          <Avatar className="h-20 w-20 flex justify-center items-center">
            <AvatarImage src={data?.avatar || "#"} alt="Avatar" />
            <AvatarFallback className="p-6 bg-gray-300 rounded-full text-2xl font-extrabold">
              {`${data?.first_name[0].toUpperCase()}${data?.last_name[0].toUpperCase()}`}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="text-center">
          <div className="py-10">
            <h2 className="text-2xl font-bold capitalize">
              {data?.first_name +
                " " +
                (data?.middle_name ? data?.middle_name + " " : "") +
                data?.last_name}
            </h2>
            <p className="text-gray-400">{data?.department.name}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
