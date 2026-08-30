import {
  Bell,
  ChevronDown,
  UserRound,
} from "lucide-react";

import {
  motion,
} from "framer-motion";

import {
  navItems,
} from "../../data/dashboard";

import {
  useNavigation,
} from "../../context/NavigationContext";

import {
  useUI,
} from "../../context/UIContext";

import {
  useNotifications,
} from "../../context/NotificationContext";

import {
  preloadPage,
} from "../../utils/pagePreload";

import sssLogo from "../../assets/sss-logo.png";

export default function DesktopNavbar() {
  const {
    activePage,
    navigate,
  } = useNavigation();

  const {
    profileOpen,
    setProfileOpen,

    notificationsOpen,
    setNotificationsOpen,

    setMoreMenuOpen,
  } = useUI();

  const {
    unreadCount,
  } = useNotifications();

  function openProfile() {
    setProfileOpen(
      !profileOpen,
    );

    setNotificationsOpen(
      false,
    );

    setMoreMenuOpen(
      false,
    );
  }

  function openNotifications() {
    setNotificationsOpen(
      !notificationsOpen,
    );

    setProfileOpen(
      false,
    );

    setMoreMenuOpen(
      false,
    );
  }

  function goHome() {
    setProfileOpen(
      false,
    );

    setNotificationsOpen(
      false,
    );

    setMoreMenuOpen(
      false,
    );

    navigate(
      "overview",
    );
  }

  return (
    <header
      className="
        sticky
        top-0
        z-50

        hidden

        px-8
        py-4

        md:block

        lg:px-10

        xl:px-12
      "
    >
      <div
        className="
          glass-strong

          mx-auto

          flex
          h-[68px]
          w-full
          max-w-[1600px]

          items-center
          justify-between

          rounded-[24px]

          px-4

          lg:px-5
        "
      >
        {/* BRAND */}
        <button
          type="button"
          onClick={
            goHome
          }
          aria-label="Go to dashboard overview"
          className="
            flex
            shrink-0
            items-center
            gap-3

            rounded-[16px]

            pr-3

            text-left

            transition

            active:scale-[0.98]
          "
        >
          <div
            className="
              flex
              h-11
              min-w-[106px]
              items-center
              justify-center

              overflow-hidden

              rounded-[15px]

              border
              border-white/80

              bg-white

              px-2.5

              shadow-sm

              dark:border-white/10
            "
          >
            <img
              src={sssLogo}
              alt="Social Security System"
              className="
                block
                h-8
                w-auto
                max-w-[92px]
                object-contain
              "
            />
          </div>

          <div className="hidden lg:block">
            <p
              className="
                text-sm
                font-semibold

                tracking-[-0.02em]

                text-slate-950

                dark:text-white
              "
            >
              My.SSS
            </p>

            <p
              className="
                text-[10px]

                text-slate-400

                dark:text-slate-500
              "
            >
              Member Portal
            </p>
          </div>
        </button>

        {/* NAVIGATION */}
        <nav
          className="
            mx-4

            flex
            min-w-0
            flex-1

            items-center
            justify-center

            gap-1
          "
          aria-label="Primary navigation"
        >
          {navItems.map(
            (
              item,
            ) => {
              const Icon =
                item.icon;

              const active =
                activePage ===
                item.page;

              return (
                <button
                  key={
                    item.page
                  }
                  type="button"
                  onMouseEnter={() =>
                    preloadPage(
                      item.page,
                    )
                  }
                  onFocus={() =>
                    preloadPage(
                      item.page,
                    )
                  }
                  onPointerEnter={() =>
                    preloadPage(
                      item.page,
                    )
                  }
                  onClick={() =>
                    navigate(
                      item.page,
                    )
                  }
                  className={`
                    relative
                    isolate

                    flex
                    items-center
                    gap-2

                    rounded-[16px]

                    px-3
                    py-2.5

                    text-xs
                    font-medium

                    transition-colors
                    duration-200

                    lg:px-4
                    lg:text-sm

                    ${
                      active
                        ? `
                            text-blue-700

                            dark:text-blue-400
                          `
                        : `
                            text-slate-500

                            hover:text-slate-950

                            dark:text-slate-400
                            dark:hover:text-white
                          `
                    }
                  `}
                >
                  {active && (
                    <motion.span
                      layoutId="desktop-active-navigation"
                      transition={{
                        type:
                          "spring",

                        stiffness:
                          380,

                        damping:
                          30,
                      }}
                      className="
                        absolute
                        inset-0

                        -z-10

                        rounded-[16px]

                        bg-blue-50/90

                        dark:bg-blue-500/10
                      "
                    />
                  )}

                  <Icon
                    className="
                      h-4
                      w-4
                      shrink-0
                    "
                  />

                  <span className="hidden xl:inline">
                    {
                      item.label
                    }
                  </span>
                </button>
              );
            },
          )}
        </nav>

        {/* ACTIONS */}
        <div
          className="
            flex
            shrink-0
            items-center
            gap-2
          "
        >
          {/* NOTIFICATIONS */}
          <button
            type="button"
            onClick={
              openNotifications
            }
            aria-label={
              unreadCount >
              0
                ? `Notifications, ${unreadCount} unread`
                : "Notifications"
            }
            aria-expanded={
              notificationsOpen
            }
            className={`
              relative

              flex
              h-10
              w-10

              items-center
              justify-center

              rounded-[15px]

              transition

              active:scale-95

              ${
                notificationsOpen
                  ? `
                      bg-blue-50

                      text-blue-700

                      dark:bg-blue-500/10
                      dark:text-blue-400
                    `
                  : `
                      text-slate-500

                      hover:bg-white/60
                      hover:text-slate-900

                      dark:text-slate-400
                      dark:hover:bg-white/[0.06]
                      dark:hover:text-white
                    `
              }
            `}
          >
            <Bell className="h-[18px] w-[18px]" />

            {unreadCount >
              0 && (
              <motion.span
                key={
                  unreadCount
                }
                initial={{
                  scale:
                    0.65,

                  opacity:
                    0,
                }}
                animate={{
                  scale:
                    1,

                  opacity:
                    1,
                }}
                transition={{
                  type:
                    "spring",

                  stiffness:
                    500,

                  damping:
                    28,
                }}
                className="
                  absolute

                  -right-1
                  -top-1

                  flex
                  min-h-[18px]
                  min-w-[18px]

                  items-center
                  justify-center

                  rounded-full

                  bg-red-500

                  px-1

                  text-[9px]
                  font-bold

                  leading-none

                  text-white

                  ring-2
                  ring-white

                  shadow-sm

                  dark:ring-slate-900
                "
              >
                {unreadCount >
                9
                  ? "9+"
                  : unreadCount}
              </motion.span>
            )}
          </button>

          {/* PROFILE */}
          <button
            type="button"
            onClick={
              openProfile
            }
            aria-expanded={
              profileOpen
            }
            aria-label="Open profile menu"
            className={`
              flex
              items-center
              gap-2

              rounded-[17px]

              p-1.5
              pr-2.5

              transition

              active:scale-[0.98]

              ${
                profileOpen
                  ? `
                      bg-blue-50/80

                      dark:bg-blue-500/10
                    `
                  : `
                      hover:bg-white/60

                      dark:hover:bg-white/[0.06]
                    `
              }
            `}
          >
            <div
              className="
                flex
                h-9
                w-9

                items-center
                justify-center

                rounded-[14px]

                bg-gradient-to-br
                from-blue-600
                to-cyan-400

                text-white

                shadow
                shadow-blue-500/20
              "
            >
              <UserRound className="h-4 w-4" />
            </div>

            <div className="hidden text-left lg:block">
              <p
                className="
                  max-w-[100px]

                  truncate

                  text-xs
                  font-semibold

                  text-slate-900

                  dark:text-slate-100
                "
              >
                Jay Mark
              </p>

              <p
                className="
                  text-[10px]

                  text-slate-400

                  dark:text-slate-500
                "
              >
                Member
              </p>
            </div>

            <ChevronDown
              className={`
                hidden
                h-3.5
                w-3.5

                text-slate-400

                transition-transform
                duration-200

                lg:block

                ${
                  profileOpen
                    ? "rotate-180"
                    : ""
                }
              `}
            />
          </button>
        </div>
      </div>
    </header>
  );
}
