import type {
  ElementType,
} from "react";

import {
  useState,
} from "react";

import {
  Eye,
  EyeOff,
  HelpCircle,
  LogOut,
  Moon,
  Settings,
  Shield,
  Sun,
  UserRound,
} from "lucide-react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  useUI,
} from "../../context/UIContext";

import {
  useToast,
} from "../../context/ToastContext";

import {
  useNavigation,
} from "../../context/NavigationContext";

import ConfirmDialog from "../ui/ConfirmDialog";

import {
  useAccessibleOverlay,
} from "../../hooks/useAccessibleOverlay";

import {
  demoMemberIdentity,
  getMemberDisplayName,
  readMemberProfile,
} from "../../data/member";

export default function ProfileMenu() {
  const {
    profileOpen,
    setProfileOpen,

    darkMode,
    toggleDarkMode,

    hideSSNumber,
    toggleSSNumberVisibility,
  } = useUI();

  const {
    showToast,
  } = useToast();

  const {
    navigate,
  } = useNavigation();

  const [
    signOutOpen,
    setSignOutOpen,
  ] = useState(false);

  const [
    signingOut,
    setSigningOut,
  ] = useState(false);

  const member = readMemberProfile();
  const displayName = getMemberDisplayName(member.fullName);

  function closeProfileMenu() {
    if (signOutOpen) {
      return;
    }

    setProfileOpen(false);
  }

  const {
    overlayRef,
  } = useAccessibleOverlay({
    open: profileOpen,
    onClose: closeProfileMenu,
  });

  function navigateToAccount(
    section:
      | "member"
      | "security"
      | "preferences",
  ) {
    setProfileOpen(false);

    navigate(
      "account",
      section,
    );
  }

  function handleHelpCenter() {
    setProfileOpen(false);

    showToast({
      title:
        "Help Center",

      description:
        "Member support resources will open from here.",

      type:
        "info",
    });
  }

  function openSignOutConfirmation() {
    setSignOutOpen(true);
  }

  function closeSignOutConfirmation() {
    if (signingOut) {
      return;
    }

    setSignOutOpen(false);
  }

  function confirmSignOut() {
    if (signingOut) {
      return;
    }

    setSigningOut(true);

    window.setTimeout(
      () => {
        setSigningOut(false);
        setSignOutOpen(false);
        setProfileOpen(false);

        showToast({
          title:
            "Signed out",

          description:
            "Your member session has been ended in this UI prototype.",

          type:
            "success",
        });
      },
      900,
    );
  }

  return (
    <>
      <AnimatePresence>
        {profileOpen && (
          <>
            {/* BACKDROP */}
            <motion.button
              type="button"
              aria-label="Close profile menu"
              tabIndex={-1}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.18,
              }}
              onClick={
                closeProfileMenu
              }
              className="
                fixed
                inset-0

                z-[80]

                cursor-default

                bg-slate-950/5

                backdrop-blur-[1px]

                dark:bg-black/20
              "
            />

            {/* PROFILE MENU */}
            <motion.div
              ref={overlayRef}
              role="dialog"
              aria-modal="true"
              aria-label="Member profile and account menu"
              tabIndex={-1}
              initial={{
                opacity: 0,
                y: -8,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -8,
                scale: 0.96,
              }}
              transition={{
                duration: 0.18,
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
              className="
                glass-strong

                fixed

                left-4
                right-4
                top-[84px]

                z-[90]

                max-h-[calc(100vh-104px)]
                overflow-y-auto

                rounded-[26px]

                p-2

                md:left-auto
                md:right-8
                md:top-[88px]
                md:w-[320px]

                lg:right-10

                xl:right-12
              "
            >
              {/* MEMBER CARD */}
              <div
                className="
                  rounded-[20px]

                  border
                  border-white/50

                  bg-white/45

                  p-4

                  dark:border-white/[0.06]
                  dark:bg-white/[0.04]
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >
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
                      {displayName}
                    </p>

                    <p
                      className="
                        mt-0.5

                        text-xs

                        text-slate-500

                        dark:text-slate-400
                      "
                    >
                      {demoMemberIdentity.portalLabel}
                    </p>
                  </div>
                </div>

                {/* ACCOUNT STATUS */}
                <div
                  className="
                    mt-4

                    flex
                    items-center
                    gap-2
                  "
                >
                  <span
                    className="
                      rounded-full

                      bg-emerald-50

                      px-2.5
                      py-1

                      text-[10px]
                      font-semibold

                      text-emerald-700

                      dark:bg-emerald-500/10
                      dark:text-emerald-400
                    "
                  >
                    Active
                  </span>

                  <span
                    className="
                      flex
                      items-center
                      gap-1

                      text-[10px]
                      font-medium

                      text-slate-400

                      dark:text-slate-500
                    "
                  >
                    <Shield className="h-3 w-3" />

                    Member account
                  </span>
                </div>

                {/* SS NUMBER */}
                <div
                  className="
                    mt-3

                    flex
                    items-center
                    justify-between
                    gap-3

                    rounded-[16px]

                    border
                    border-white/50

                    bg-white/40

                    px-3
                    py-2.5

                    dark:border-white/[0.06]
                    dark:bg-white/[0.025]
                  "
                >
                  <div className="min-w-0">
                    <p
                      className="
                        text-[9px]
                        font-semibold

                        uppercase

                        tracking-[0.12em]

                        text-slate-400

                        dark:text-slate-500
                      "
                    >
                      SS Number
                    </p>

                    <motion.p
                      key={
                        hideSSNumber
                          ? "hidden"
                          : "visible"
                      }
                      initial={{
                        opacity: 0.4,
                        y: 1,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.18,
                      }}
                      className="
                        mt-1

                        truncate

                        font-mono

                        text-[11px]
                        font-semibold

                        tracking-[0.06em]

                        text-slate-600

                        dark:text-slate-300
                      "
                    >
                      {hideSSNumber
                        ? "•••-•••••••-•"
                        : demoMemberIdentity.ssNumber}
                    </motion.p>
                  </div>

                  <motion.button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();

                      toggleSSNumberVisibility();
                    }}
                    whileTap={{
                      scale: 0.88,
                    }}
                    aria-label={
                      hideSSNumber
                        ? "Show SS Number"
                        : "Hide SS Number"
                    }
                    title={
                      hideSSNumber
                        ? "Show SS Number"
                        : "Hide SS Number"
                    }
                    className="
                      flex
                      h-8
                      w-8
                      shrink-0

                      items-center
                      justify-center

                      rounded-full

                      bg-white/60

                      text-slate-400

                      transition-colors

                      hover:bg-white/90
                      hover:text-blue-600

                      dark:bg-white/[0.05]
                      dark:hover:bg-white/[0.09]
                      dark:hover:text-blue-400
                    "
                  >
                    {hideSSNumber ? (
                      <Eye className="h-3.5 w-3.5" />
                    ) : (
                      <EyeOff className="h-3.5 w-3.5" />
                    )}
                  </motion.button>
                </div>
              </div>

              {/* ACCOUNT NAVIGATION */}
              <div
                className="
                  mt-2
                  space-y-1
                "
              >
                <MenuButton
                  icon={
                    UserRound
                  }
                  label="Member Information"
                  description="Personal & membership details"
                  onClick={() =>
                    navigateToAccount(
                      "member",
                    )
                  }
                />

                <MenuButton
                  icon={
                    Shield
                  }
                  label="Security & Login"
                  description="Password, devices & sessions"
                  onClick={() =>
                    navigateToAccount(
                      "security",
                    )
                  }
                />

                <MenuButton
                  icon={
                    Settings
                  }
                  label="Preferences"
                  description="Privacy & personalization"
                  onClick={() =>
                    navigateToAccount(
                      "preferences",
                    )
                  }
                />
              </div>

              {/* DIVIDER */}
              <div
                className="
                  my-2

                  h-px

                  bg-slate-200/60

                  dark:bg-white/10
                "
              />

              {/* THEME */}
              <button
                type="button"
                role="switch"
                aria-checked={
                  darkMode
                }
                onClick={
                  toggleDarkMode
                }
                className="
                  group

                  flex
                  w-full

                  items-center
                  justify-between

                  rounded-[16px]

                  px-3
                  py-3

                  text-left

                  transition

                  hover:bg-white/50

                  active:scale-[0.99]

                  dark:hover:bg-white/[0.06]
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >
                  <div
                    className="
                      flex
                      h-8
                      w-8
                      shrink-0

                      items-center
                      justify-center

                      rounded-[12px]

                      bg-slate-100/70

                      text-slate-500

                      transition-colors

                      group-hover:text-blue-600

                      dark:bg-white/[0.05]
                      dark:text-slate-300
                      dark:group-hover:text-blue-400
                    "
                  >
                    {darkMode ? (
                      <Sun className="h-4 w-4" />
                    ) : (
                      <Moon className="h-4 w-4" />
                    )}
                  </div>

                  <div>
                    <p
                      className="
                        text-sm
                        font-medium

                        text-slate-700

                        dark:text-slate-200
                      "
                    >
                      {darkMode
                        ? "Dark Mode"
                        : "Light Mode"}
                    </p>

                    <p
                      className="
                        mt-0.5

                        text-[10px]

                        text-slate-400

                        dark:text-slate-500
                      "
                    >
                      Appearance
                    </p>
                  </div>
                </div>

                <span
                  className={`
                    relative

                    h-5
                    w-9
                    shrink-0

                    rounded-full

                    transition-colors
                    duration-300

                    ${
                      darkMode
                        ? "bg-blue-600"
                        : "bg-slate-200 dark:bg-white/10"
                    }
                  `}
                >
                  <motion.span
                    animate={{
                      x:
                        darkMode
                          ? 17
                          : 2,
                    }}
                    transition={{
                      type:
                        "spring",
                      stiffness:
                        450,
                      damping:
                        30,
                    }}
                    className="
                      absolute
                      top-0.5

                      h-4
                      w-4

                      rounded-full

                      bg-white

                      shadow
                    "
                  />
                </span>
              </button>

              {/* HELP */}
              <MenuButton
                icon={
                  HelpCircle
                }
                label="Help Center"
                description="Support & assistance"
                onClick={
                  handleHelpCenter
                }
              />

              {/* DIVIDER */}
              <div
                className="
                  my-2

                  h-px

                  bg-slate-200/60

                  dark:bg-white/10
                "
              />

              {/* SIGN OUT */}
              <button
                type="button"
                onClick={
                  openSignOutConfirmation
                }
                className="
                  group

                  flex
                  w-full

                  items-center
                  gap-3

                  rounded-[16px]

                  px-3
                  py-3

                  text-left

                  transition

                  hover:bg-red-50

                  active:scale-[0.99]

                  dark:hover:bg-red-500/10
                "
              >
                <div
                  className="
                    flex
                    h-8
                    w-8
                    shrink-0

                    items-center
                    justify-center

                    rounded-[12px]

                    bg-red-50

                    text-red-500

                    dark:bg-red-500/10
                    dark:text-red-400
                  "
                >
                  <LogOut className="h-4 w-4" />
                </div>

                <div>
                  <p
                    className="
                      text-sm
                      font-semibold

                      text-red-500

                      dark:text-red-400
                    "
                  >
                    Sign Out
                  </p>

                  <p
                    className="
                      mt-0.5

                      text-[10px]

                      text-slate-400

                      dark:text-slate-500
                    "
                  >
                    End this member session
                  </p>
                </div>
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* SIGN OUT DIALOG */}
      <ConfirmDialog
        open={
          signOutOpen
        }
        title="Sign out of My.SSS?"
        description="You’ll need to sign in again to access your member dashboard, account information, and online services."
        confirmLabel="Sign Out"
        cancelLabel="Cancel"
        loading={
          signingOut
        }
        loadingText="Signing out..."
        destructive
        icon={
          <LogOut className="h-5 w-5" />
        }
        helperText="For your security, always sign out when using a shared or public device."
        onCancel={
          closeSignOutConfirmation
        }
        onConfirm={
          confirmSignOut
        }
      />
    </>
  );
}

function MenuButton({
  icon: Icon,
  label,
  description,
  onClick,
}: {
  icon: ElementType;
  label: string;
  description?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={
        onClick
      }
      className="
        group

        flex
        w-full

        items-center
        gap-3

        rounded-[16px]

        px-3
        py-3

        text-left

        transition

        hover:bg-white/50

        active:scale-[0.99]

        dark:hover:bg-white/[0.06]
      "
    >
      <div
        className="
          flex
          h-8
          w-8
          shrink-0

          items-center
          justify-center

          rounded-[12px]

          bg-slate-100/70

          text-slate-500

          transition-colors

          group-hover:text-blue-600

          dark:bg-white/[0.05]
          dark:text-slate-400
          dark:group-hover:text-blue-400
        "
      >
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0">
        <p
          className="
            truncate

            text-sm
            font-medium

            text-slate-700

            dark:text-slate-200
          "
        >
          {label}
        </p>

        {description && (
          <p
            className="
              mt-0.5

              truncate

              text-[10px]

              text-slate-400

              dark:text-slate-500
            "
          >
            {description}
          </p>
        )}
      </div>
    </button>
  );
}