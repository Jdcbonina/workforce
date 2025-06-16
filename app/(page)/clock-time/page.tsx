import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import ContentLayout from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Content from "./_components/content";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

const Page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/signin");
  }

  const clockIn = await prisma.clockTime.findFirst({
    where: {
      employee_id: session.user.id,
      clockIn: {
        isSet: true,
      },
      clockOut: {
        isSet: false,
      },
    },
    select: {
      id: true,
      clockIn: true,
    },
  });

  return (
    <ContentLayout title="Time In/Out">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Time In/Out</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Content session={session!} clockIn={clockIn} />
    </ContentLayout>
  );
};

export default Page;
