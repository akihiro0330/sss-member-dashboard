import type { ElementType } from "react";
import { useState } from "react";

import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  CircleHelp,
  FileText,
  Landmark,
  LogOut,
  Moon,
  QrCode,
  Settings,
  ShieldCheck,
  Sun,
  UserRound,
  WalletCards,
  X,
} from "lucide-react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import { useUI } from "../../context/UIContext";
import { useNavigation } from "../../context/NavigationContext";
import { useToast } from "../../context/ToastContext";

import ConfirmDialog from "../ui/ConfirmDialog";

const shortcuts = [
  {
    id: "prn",
    label: "Generate PRN",
    description: "Create payment reference",
    icon: QrCode,
  },
  {
    id: "contribution",
    label: "Pay Contribution",
    description: "View payment options",
    icon: WalletCards,
  },
  {
    id: "disbursement",
    label: "Disbursement",
    description: "Manage payout account",
    icon: Landmark,
  },
  {
    id: "appointment",
    label: "Appointments",
    description: "Schedule branch visit",
    icon: CalendarDays,
  },
];

export default function MobileMoreSheet() {
  const {
    moreMenuOpen,
    setMoreMenuOpen,
    darkMode,
    toggleDarkMode,
    setProfileOpen,
  } = useUI();

  const { navigate } = useNavigation();
  const { showToast } = useToast();

  const [signOutOpen, setSignOutOpen] =
    useState(false);

  const [signingOut, setSigningOut] =
    useState(false);

  function closeSheet() {
    if (signOutOpen) return;

    setMoreMenuOpen(false);
  }

  function goToServices() {
    navigate("services");
    setMoreMenuOpen(false);
  }

  function openProfile() {
    setMoreMenuOpen(false);

    window.setTimeout(() => {
      setProfileOpen(true);
    }, 180);
  }

  function handleShortcut(id: string) {
    switch (id) {
      case "contribution":
        navigate("contributions");

        setMoreMenuOpen(false);

        showToast({
          title: "Contribution services",
          description:
            "Opening your contribution center.",
          type: "success",
        });

        return;

      case "prn":
        setMoreMenuOpen(false);

        showToast({
          title: "Generate PRN",
          description:
            "The PRN workflow will open here once payment services are integrated.",
          type: "info",
        });

        return;

      case "disbursement":
        setMoreMenuOpen(false);

        showToast({
          title: "Disbursement",
          description:
            "Disbursement account management will open from this service.",
          type: "info",
        });

        return;

      case "appointment":
        setMoreMenuOpen(false);

        showToast({
          title: "Appointments",
          description:
            "Branch appointment scheduling will open from this service.",
          type: "info",
        });

        return;
    }
  }

  function handleSecondaryAction(
    action:
      | "records"
      | "security"
      | "help",
  ) {
    setMoreMenuOpen(false);

    window.setTimeout(() => {
      switch (action) {
        case "records":
          showToast({
            title: "Member Records",
            description:
              "Member record management will open from this section.",
            type: "info",
          });
          return;

        case "security":
          showToast({
            title: "Security & Login",
            description:
              "Account security controls will open from this section.",
            type: "success",
          });
          return;

        case "help":
          showToast({
            title: "Help Center",
            description:
              "Member support resources will open from this section.",
            type: "info",
          });
          return;
      }
    }, 120);
  }

  function openSignOutConfirmation() {
    setSignOutOpen(true);
  }

  function closeSignOutConfirmation() {
    if (signingOut) return;

    setSignOutOpen(false);
  }

  function confirmSignOut() {
    if (signingOut) return;

    setSigningOut(true);

    window.setTimeout(() => {
      setSigningOut(false);
      setSignOutOpen(false);
      setMoreMenuOpen(false);

      showToast({
        title: "Signed out",
        description:
          "Your member session has been ended in this UI prototype.",
        type: "success",
      });
    }, 900);
  }

  return (
    <>
      <AnimatePresence>
        {moreMenuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close more menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.2,
              }}
              onClick={closeSheet}
              className="
                fixed
                inset-0

                z-[70]

                cursor-default

                bg-slate-950/20
                backdrop-blur-[3px]

                dark:bg-black/45

                md:hidden
              "
            />

            <motion.div
              initial={{
                opacity: 0,
                y: 80,
                scale: 0.98,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 80,
                scale: 0.98,
              }}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 28,
              }}
              className="
                glass-strong

                fixed

                bottom-[92px]
                left-4
                right-4

                z-[80]

                max-h-[calc(100vh-120px)]
                overflow-y-auto

                rounded-[30px]

                p-3

                md:hidden
              "
            >
              <div
                className="
                  mx-auto
                  mb-3

                  h-1.5
                  w-10

                  rounded-full

                  bg-slate-300/70

                  dark:bg-white/15
                "
              />

              <div
                className="
                  rounded-[24px]

                  border
                  border-white/60

                  bg-white/40

                  p-4

                  dark:border-white/10
                  dark:bg-white/[0.035]
                "
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className="
                        flex
                        h-12
                        w-12
                        shrink-0
                        items-center
                        justify-center

                        rounded-[18px]

                        bg-gradient-to-br
                        from-blue-600
                        to-cyan-400

                        text-white

                        shadow-lg
                        shadow-blue-500/20
                      "
                    >
                      <UserRound className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <p
                        className="
                          truncate

                          text-sm
                          font-semibold

                          text-slate-950

                          dark:text-white
                        "
                      >
                        Jay Mark
                      </p>

                      <div className="mt-1 flex items-center gap-2">
                        <span
                          className="
                            h-1.5
                            w-1.5

                            rounded-full

                            bg-emerald-500
                          "
                        />

                        <p
                          className="
                            text-xs

                            text-slate-400

                            dark:text-slate-500
                          "
                        >
                          Active Member
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setMoreMenuOpen(false)
                    }
                    aria-label="Close"
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center

                      rounded-full

                      bg-white/60

                      text-slate-500

                      transition

                      hover:bg-white/80
                      active:scale-95

                      dark:bg-white/[0.06]
                      dark:text-slate-300
                      dark:hover:bg-white/[0.1]
                    "
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={openProfile}
                  className="
                    mt-4

                    flex
                    w-full
                    items-center
                    justify-between

                    rounded-[17px]

                    bg-white/50

                    px-3
                    py-3

                    text-left

                    transition

                    hover:bg-white/75
                    active:scale-[0.99]

                    dark:bg-white/[0.04]
                    dark:hover:bg-white/[0.07]
                  "
                >
                  <div className="flex items-center gap-3">
                    <Settings
                      className="
                        h-4
                        w-4

                        text-slate-500

                        dark:text-slate-400
                      "
                    />

                    <span
                      className="
                        text-sm
                        font-medium

                        text-slate-700

                        dark:text-slate-200
                      "
                    >
                      Account & Preferences
                    </span>
                  </div>

                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </button>
              </div>

              <div className="px-1 pb-1 pt-5">
                <p
                  className="
                    px-2

                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.16em]

                    text-slate-400

                    dark:text-slate-500
                  "
                >
                  Quick Services
                </p>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  {shortcuts.map(
                    (shortcut) => {
                      const Icon =
                        shortcut.icon;

                      return (
                        <motion.button
                          key={shortcut.id}
                          type="button"
                          onClick={() =>
                            handleShortcut(
                              shortcut.id,
                            )
                          }
                          whileHover={{
                            y: -2,
                          }}
                          whileTap={{
                            scale: 0.97,
                          }}
                          className="
                            group

                            rounded-[20px]

                            border
                            border-white/60

                            bg-white/45

                            p-4

                            text-left

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
                              items-center
                              justify-center

                              rounded-[15px]

                              bg-blue-600/10

                              text-blue-700

                              transition-all
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
                            <Icon className="h-[17px] w-[17px]" />
                          </div>

                          <p
                            className="
                              mt-4

                              text-sm
                              font-semibold

                              text-slate-900

                              dark:text-slate-100
                            "
                          >
                            {shortcut.label}
                          </p>

                          <p
                            className="
                              mt-1

                              text-[11px]
                              leading-4

                              text-slate-400

                              dark:text-slate-500
                            "
                          >
                            {
                              shortcut.description
                            }
                          </p>
                        </motion.button>
                      );
                    },
                  )}
                </div>
              </div>

              <div className="mt-3 space-y-1">
                <SheetAction
                  icon={FileText}
                  label="Member Records"
                  onClick={() =>
                    handleSecondaryAction(
                      "records",
                    )
                  }
                />

                <SheetAction
                  icon={ShieldCheck}
                  label="Security & Login"
                  onClick={() =>
                    handleSecondaryAction(
                      "security",
                    )
                  }
                />

                <SheetAction
                  icon={CircleHelp}
                  label="Help Center"
                  onClick={() =>
                    handleSecondaryAction(
                      "help",
                    )
                  }
                />

                <button
                  type="button"
                  onClick={toggleDarkMode}
                  className="
                    flex
                    w-full
                    items-center
                    justify-between

                    rounded-[18px]

                    px-4
                    py-3.5

                    text-left

                    transition

                    hover:bg-white/50
                    active:scale-[0.99]

                    dark:hover:bg-white/[0.06]
                  "
                >
                  <div className="flex items-center gap-3">
                    {darkMode ? (
                      <Sun
                        className="
                          h-[18px]
                          w-[18px]

                          text-slate-400
                        "
                      />
                    ) : (
                      <Moon
                        className="
                          h-[18px]
                          w-[18px]

                          text-slate-500
                        "
                      />
                    )}

                    <span
                      className="
                        text-sm
                        font-medium

                        text-slate-700

                        dark:text-slate-200
                      "
                    >
                      {darkMode
                        ? "Light Mode"
                        : "Dark Mode"}
                    </span>
                  </div>

                  <span
                    className={`
                      relative

                      h-6
                      w-11

                      shrink-0

                      rounded-full

                      transition-colors
                      duration-300

                      ${
                        darkMode
                          ? "bg-blue-600"
                          : "bg-slate-200"
                      }
                    `}
                  >
                    <motion.span
                      animate={{
                        x: darkMode
                          ? 21
                          : 3,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 450,
                        damping: 30,
                      }}
                      className="
                        absolute
                        top-[3px]

                        h-[18px]
                        w-[18px]

                        rounded-full

                        bg-white

                        shadow
                      "
                    />
                  </span>
                </button>
              </div>

              <div
                className="
                  my-3

                  h-px

                  bg-slate-200/60

                  dark:bg-white/10
                "
              />

              <button
                type="button"
                onClick={goToServices}
                className="
                  group

                  flex
                  w-full
                  items-center
                  justify-between

                  rounded-[20px]

                  bg-blue-600

                  px-4
                  py-4

                  text-left
                  text-white

                  shadow-lg
                  shadow-blue-500/20

                  transition

                  hover:bg-blue-700
                  active:scale-[0.985]

                  dark:bg-blue-500
                  dark:hover:bg-blue-400
                "
              >
                <div>
                  <p className="text-sm font-semibold">
                    View All Services
                  </p>

                  <p className="mt-0.5 text-xs text-white/70">
                    Open the complete service
                    directory
                  </p>
                </div>

                <ArrowRight
                  className="
                    h-5
                    w-5

                    transition-transform

                    group-hover:translate-x-1
                  "
                />
              </button>

              <button
                type="button"
                onClick={
                  openSignOutConfirmation
                }
                className="
                  mt-2

                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2

                  rounded-[18px]

                  px-4
                  py-3

                  text-sm
                  font-semibold

                  text-red-500

                  transition

                  hover:bg-red-50
                  active:scale-[0.99]

                  dark:text-red-400
                  dark:hover:bg-red-500/10
                "
              >
                <LogOut className="h-4 w-4" />

                Sign Out
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <ConfirmDialog
        open={signOutOpen}
        title="Sign out of My.SSS?"
        description="You’ll need to sign in again to access your member dashboard and account services."
        confirmLabel="Sign Out"
        cancelLabel="Cancel"
        loading={signingOut}
        loadingText="Signing out..."
        destructive
        icon={<LogOut className="h-5 w-5" />}
        helperText="This redesigned portal currently uses a simulated session. Connect this action to the real logout endpoint once authentication is available."
        onCancel={
          closeSignOutConfirmation
        }
        onConfirm={confirmSignOut}
      />
    </>
  );
}

function SheetAction({
  icon: Icon,
  label,
  onClick,
}: {
  icon: ElementType;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        group

        flex
        w-full
        items-center
        justify-between

        rounded-[18px]

        px-4
        py-3.5

        text-left

        transition

        hover:bg-white/50
        active:scale-[0.99]

        dark:hover:bg-white/[0.06]
      "
    >
      <div className="flex items-center gap-3">
        <Icon
          className="
            h-[18px]
            w-[18px]

            text-slate-500

            transition-colors

            group-hover:text-blue-600

            dark:text-slate-400
            dark:group-hover:text-blue-400
          "
        />

        <span
          className="
            text-sm
            font-medium

            text-slate-700

            dark:text-slate-200
          "
        >
          {label}
        </span>
      </div>

      <ChevronRight
        className="
          h-4
          w-4

          text-slate-400

          transition-transform

          group-hover:translate-x-1

          dark:text-slate-600
        "
      />
    </button>
  );
}