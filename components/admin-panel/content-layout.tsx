import Navbar from "@/components/admin-panel/navbar";
import { authOptions } from "@/lib/auth";

import { getServerSession, Session } from "next-auth";

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
}

const ContentLayout = async ({ title, children }: ContentLayoutProps) => {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <Navbar title={title} session={session} />
      <div className="container pt-8 pb-8 px-4 sm:px-8">{children}</div>
    </div>
  );
};

export default ContentLayout;
