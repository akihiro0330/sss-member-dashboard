import {
  CalendarDays,
  CreditCard,
  FileText,
  Landmark,
  QrCode,
  WalletCards,
} from "lucide-react";

import { motion } from "framer-motion";

import GlassCard from "../ui/GlassCard";

import { useNavigation } from "../../context/NavigationContext";
import { useToast } from "../../context/ToastContext";

const actions = [
  {
    id: "prn",
    label: "Generate PRN",
    description: "Create a payment reference",
    icon: QrCode,
  },
  {
    id: "contribution",
    label: "Pay Contribution",
    description: "View payment options",
    icon: WalletCards,
  },
  {
    id: "loan",
    label: "Apply for Loan",
    description: "Check available loan programs",
    icon: CreditCard,
  },
  {
    id: "appointment",
    label: "Schedule Appointment",
    description: "Visit an SSS branch",
    icon: CalendarDays,
  },
  {
    id: "records",
    label: "Member Records",
    description: "Review account information",
    icon: FileText,
  },
  {
    id: "disbursement",
    label: "Disbursement",
    description: "Manage payout accounts",
    icon: Landmark,
  },
];

export default function QuickActions() {
  const { navigate } = useNavigation();
  const { showToast } = useToast();

  function handleAction(id: string) {
    switch (id) {
      case "loan":
        navigate("loans");
        return;

      case "records":
        navigate("services");

        showToast({
          title: "Member Records",
          description:
            "Opening the member services directory.",
          type: "info",
        });

        return;

      case "prn":
        showToast({
          title: "PRN service selected",
          description:
            "The PRN workflow will open here once payment services are connected.",
          type: "info",
        });

        return;

      case "contribution":
        navigate("contributions");

        showToast({
          title: "Contribution services",
          description:
            "Opening your contribution center.",
          type: "success",
        });

        return;

      case "appointment":
        showToast({
          title: "Appointment service",
          description:
            "Branch appointment scheduling will be connected to this action.",
          type: "info",
        });

        return;

      case "disbursement":
        showToast({
          title: "Disbursement service",
          description:
            "Disbursement account management will open here.",
          type: "info",
        });

        return;
    }
  }

  return (
    <GlassCard className="h-full p-5 sm:p-6">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">
          Services
        </p>

        <h2 className="mt-2 text-xl font-semibold tracking-[-0.035em] text-slate-950 dark:text-white sm:text-2xl">
          Quick Actions
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-300">
          Access your most frequently used member
          services.
        </p>
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.055,
            },
          },
        }}
        className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2"
      >
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <motion.button
              key={action.id}
              type="button"
              onClick={() =>
                handleAction(action.id)
              }
              variants={{
                hidden: {
                  opacity: 0,
                  y: 12,
                },
                show: {
                  opacity: 1,
                  y: 0,

                  transition: {
                    duration: 0.36,
                    ease: [
                      0.22,
                      1,
                      0.36,
                      1,
                    ],
                  },
                },
              }}
              whileHover={{
                y: -3,
                scale: 1.015,
              }}
              whileTap={{
                scale: 0.97,
              }}
              transition={{
                type: "spring",
                stiffness: 350,
                damping: 25,
              }}
              className="
                group
                flex
                items-start
                gap-3
                rounded-[20px]
                border
                border-white/70
                bg-white/50
                p-4
                text-left

                shadow-[0_8px_24px_rgba(32,79,125,0.035)]

                transition-colors
                hover:bg-white/75

                dark:border-white/10
                dark:bg-white/[0.035]
                dark:hover:bg-white/[0.065]
              "
            >
              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-[15px]
                  bg-blue-600/10
                  text-blue-700

                  transition
                  duration-300

                  group-hover:bg-blue-600
                  group-hover:text-white
                  group-hover:shadow-lg
                  group-hover:shadow-blue-500/20

                  dark:bg-blue-500/10
                  dark:text-blue-400

                  dark:group-hover:bg-blue-500
                  dark:group-hover:text-white
                "
              >
                <Icon className="h-[18px] w-[18px]" />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {action.label}
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                  {action.description}
                </p>
              </div>
            </motion.button>
          );
        })}
      </motion.div>
    </GlassCard>
  );
}