import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = async ({ children }: LayoutProps) => {
  const session = await getServerSession(authOptions);
  return <AdminPanelLayout session={session}>{children}</AdminPanelLayout>;
};

export default Layout;
