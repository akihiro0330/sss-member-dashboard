import {
  CreditCard,
  Home,
  Landmark,
  ShieldCheck,
  WalletCards,
} from "lucide-react";

import type {
  DashboardPage,
} from "../context/NavigationContext";

export const navItems: {
  label: string;
  page: DashboardPage;
  icon: typeof Home;
}[] = [
  {
    label: "Overview",
    page: "overview",
    icon: Home,
  },
  {
    label: "Contributions",
    page: "contributions",
    icon: WalletCards,
  },
  {
    label: "Loans",
    page: "loans",
    icon: CreditCard,
  },
  {
    label: "Benefits",
    page: "benefits",
    icon: ShieldCheck,
  },
  {
    label: "Services",
    page: "services",
    icon: Landmark,
  },
];

export const memberMetrics = [
  {
    label: "Total contributions",
    value: "₱51,335",
    caption: "Posted contributions",
  },
  {
    label: "Contribution months",
    value: "20",
    caption: "As of August 2026",
  },
  {
    label: "Loan status",
    value: "Clear",
    caption: "No active balance",
  },
];