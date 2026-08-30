import {
  Bell,
  User,
} from "lucide-react";

import {
  motion,
} from "framer-motion";

import {
  useUI,
} from "../../context/UIContext";

import {
  useNavigation,
} from "../../context/NavigationContext";

import {
  useNotifications,
} from "../../context/NotificationContext";

import sssMark from "../../assets/sss-mark.png";

export default function MobileHeader() {
  const {
    profileOpen,
    setProfileOpen,

    notificationsOpen,
    setNotificationsOpen,

    setMoreMenuOpen,
  } = useUI();

  const {
    navigate,
  } =
    useNavigation();

  const {
    unreadCount,
  } =
    useNotifications();

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
        z-40

        px-4
        pt-4

        md:hidden
      "
    >
      <motion.div
        initial={{
          opacity: 0,
          y: -12,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration:
            0.4,

          ease: [
            0.22,
            1,
            0.36,
            1,
          ],
        }}
        className="
          glass

          flex
          items-center
          justify-between

          rounded-[24px]

          px-3
          py-2.5
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
            min-w-0
            items-center
            gap-3

            rounded-[16px]

            text-left

            transition

            active:scale-[0.98]
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

              overflow-hidden

              rounded-[14px]

              border
              border-white/80

              bg-white

              p-1.5

              shadow-md
              shadow-blue-500/10

              dark:border-white/10
            "
          >
            <img
              src={sssMark}
              alt=""
              aria-hidden="true"
              className="
                block
                h-full
                w-full
                object-contain
              "
            />
          </div>

          <div className="min-w-0">
            <p
              className="
                truncate

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
                truncate

                text-[11px]

                text-slate-400

                dark:text-slate-500
              "
            >
              Member Portal
            </p>
          </div>
        </button>

        {/* ACTIONS */}
        <div
          className="
            flex
            shrink-0
            items-center
            gap-1.5
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
                ? `Open notifications, ${unreadCount} unread`
                : "Open notifications"
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

              rounded-2xl

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

                      hover:bg-white/50

                      dark:text-slate-300
                      dark:hover:bg-white/[0.05]
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
              h-10
              w-10

              items-center
              justify-center

              rounded-2xl

              bg-gradient-to-br
              from-blue-500
              to-cyan-400

              text-white

              shadow-md
              shadow-blue-500/20

              transition

              active:scale-95

              ${
                profileOpen
                  ? `
                      ring-4
                      ring-blue-500/15
                    `
                  : ""
              }
            `}
          >
            <User className="h-[18px] w-[18px]" />
          </button>
        </div>
      </motion.div>
    </header>
  );
}
