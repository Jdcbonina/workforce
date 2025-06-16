import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Footprints, Wallet, Calendar } from "lucide-react";

const Content = () => {
  const formattedDate = format(new Date(), "MMMM d, yyyy");
  const cards = [
    {
      title: "Pending Leaves",
      value: "0",
      icon: <Footprints />,
      color: "bg-gradient-to-br from-teal-400 to-teal-600",
    },
    {
      title: "Pending Loans",
      value: "0",
      icon: <Wallet />,
      color: "bg-gradient-to-br from-blue-400 to-blue-600",
    },
    {
      title: "Today is",
      value: formattedDate,
      icon: <Calendar />,
      color: "bg-gradient-to-br from-orange-400 to-orange-600",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
      {cards.map((card, index) => (
        <Card key={index} className={`${card.color} text-white`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            {card.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Content;
