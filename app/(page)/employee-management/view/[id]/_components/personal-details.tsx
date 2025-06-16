import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TabsList, Tabs, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const PersonalDetails = () => {
  return (
    <Card className="rounded-lg border-none col-span-2 row-span-2">
      <CardContent>
        <Tabs defaultValue="personal_details">
          <TabsList className="grid w-full grid-cols-2 mt-2">
            <TabsTrigger value="personal_details">Personal Details</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="personal_details">Personal details</TabsContent>
          <TabsContent value="settings">Settings</TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PersonalDetails;
