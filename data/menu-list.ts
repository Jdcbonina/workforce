import {
  Settings,
  Clock8,
  HandCoins,
  Footprints,
  LayoutGrid,
  LucideIcon,
  UsersRound,
  Wallet,
  ArrowRightCircle,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Contents",
      menus: [
        {
          href: "/clock-time",
          label: "Clock In/Out",
          active: pathname.includes("/clock-time"),
          icon: Clock8,
          submenus: [],
        },
        {
          href: "/employee-management",
          label: "Employee Management",
          active: pathname.includes("/employee-management"),
          icon: UsersRound,
          submenus: [],
        },
        {
          href: "/leave",
          label: "Leave",
          active: pathname.includes("/leave"),
          icon: Footprints,
          submenus: [],
        },
        {
          href: "/leave-management",
          label: "Leave Management",
          active: pathname.includes("/leave-management"),
          icon: ArrowRightCircle ,
          submenus: [],
        },
        {
          href: "/loans",
          label: "Loans",
          active: pathname.includes("/loans"),
          icon: Wallet,
          submenus: [],
        },
        {
          href: "",
          label: "Payroll",
          active: pathname.includes("/payroll"),
          icon: HandCoins,
          submenus: [
            {
              href: "/payroll/employee-salary",
              label: "Employee Salary",
              active: pathname === "/employee-salary",
            },
            {
              href: "/payroll/payslip",
              label: "Payslip",
              active: pathname === "/payroll/payslip",
            },
          ],
        },
      ],
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "",
          label: "Administrative Tools",
          active: pathname.includes("/administrative-tools"),
          icon: Settings,
          submenus: [
            {
              href: "/administrative-tools/authorization",
              label: "Authorization",
              active: pathname === "/administrative-tools/authorization",
            },
            {
              href: "/administrative-tools/department",
              label: "Department",
              active: pathname === "/administrative-tools/department",
            },
            {
              href: "/administrative-tools/leave",
              label: "Leave types",
              active: pathname === "/administrative-tools/leave",
            },
          ],
        },
      ],
    },
  ];
}
