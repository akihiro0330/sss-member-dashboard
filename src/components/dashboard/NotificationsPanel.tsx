import type {
  ElementType,
} from "react";

import {
  Bell,
  BellOff,
  ChevronRight,
  CircleUserRound,
  CreditCard,
  Landmark,
  ShieldCheck,
} from "lucide-react";

import {
  motion,
} from "framer-motion";

import GlassCard from "../ui/GlassCard";

import {
  useUI,
} from "../../context/UIContext";

import {
  useNavigation,
} from "../../context/NavigationContext";

import {
  type NotificationCategory,
  type PortalNotification,
  useNotifications,
} from "../../context/NotificationContext";

export default function NotificationsPanel() {
  const {
    setNotificationsOpen,
  } = useUI();

  const {
    navigate,
  } =
    useNavigation();

  const {
    notifications,
    unreadCount,
    markAsRead,
  } =
    useNotifications();

  const previewNotifications =
    notifications.slice(
      0,
      3,
    );

  function openNotification(
    notification:
      PortalNotification,
  ) {
    markAsRead(
      notification.id,
    );

    if (
      notification.targetPage
    ) {
      navigate(
        notification.targetPage,
        notification.targetSection,
      );
    }
  }

  return (
    <GlassCard className="h-full p-5 sm:p-6">
      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >
        <div>
          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <p
              className="
                text-xs
                font-medium

                uppercase

                tracking-[0.16em]

                text-blue-600

                dark:text-blue-400
              "
            >
              Updates
            </p>

            {unreadCount >
              0 && (
              <motion.span
                key={
                  unreadCount
                }
                initial={{
                  scale: 0.7,
                  opacity: 0,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                }}
                className="
                  rounded-full

                  bg-red-500

                  px-2
                  py-0.5

                  text-[10px]
                  font-bold

                  text-white
                "
              >
                {unreadCount}
              </motion.span>
            )}
          </div>

          <h2
            className="
              mt-2

              text-xl
              font-semibold

              tracking-[-0.035em]

              text-slate-950

              dark:text-white

              sm:text-2xl
            "
          >
            Notifications
          </h2>

          <p
            className="
              mt-2

              text-sm
              leading-6

              text-slate-500

              dark:text-slate-300
            "
          >
            {unreadCount >
            0
              ? `${unreadCount} ${
                  unreadCount ===
                  1
                    ? "update needs"
                    : "updates need"
                } your attention.`
              : "You're all caught up."}
          </p>
        </div>

        <motion.button
          type="button"
          whileHover={{
            y: -2,
          }}
          whileTap={{
            scale: 0.94,
          }}
          onClick={() =>
            setNotificationsOpen(
              true,
            )
          }
          aria-label="Open notification center"
          className="
            relative

            flex
            h-10
            w-10
            shrink-0

            items-center
            justify-center

            rounded-2xl

            bg-blue-600/10

            text-blue-700

            transition-colors

            hover:bg-blue-600/15

            dark:bg-blue-500/10
            dark:text-blue-400
            dark:hover:bg-blue-500/15
          "
        >
          <Bell className="h-[18px] w-[18px]" />

          {unreadCount >
            0 && (
            <span
              className="
                absolute

                -right-0.5
                -top-0.5

                h-2.5
                w-2.5

                rounded-full

                bg-red-500

                ring-2
                ring-white

                dark:ring-slate-900
              "
            />
          )}
        </motion.button>
      </div>

      {previewNotifications.length >
      0 ? (
        <div className="mt-6 space-y-2">
          {previewNotifications.map(
            (
              notification,
              index,
            ) => (
              <NotificationPreview
                key={
                  notification.id
                }
                notification={
                  notification
                }
                index={
                  index
                }
                onClick={() =>
                  openNotification(
                    notification,
                  )
                }
              />
            ),
          )}
        </div>
      ) : (
        <div
          className="
            mt-6

            flex
            min-h-[210px]
            flex-col
            items-center
            justify-center

            rounded-[20px]

            border
            border-dashed
            border-slate-200/70

            px-6

            text-center

            dark:border-white/10
          "
        >
          <div
            className="
              flex
              h-12
              w-12

              items-center
              justify-center

              rounded-[18px]

              bg-slate-100

              text-slate-400

              dark:bg-white/[0.05]
              dark:text-slate-500
            "
          >
            <BellOff className="h-5 w-5" />
          </div>

          <p
            className="
              mt-3

              text-sm
              font-semibold

              text-slate-700

              dark:text-slate-200
            "
          >
            No notifications
          </p>

          <p
            className="
              mt-1

              text-xs
              leading-5

              text-slate-400
            "
          >
            New account updates
            will appear here.
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={() =>
          setNotificationsOpen(
            true,
          )
        }
        className="
          mt-5

          flex
          w-full
          items-center
          justify-center
          gap-1.5

          rounded-[16px]

          border
          border-white/60

          bg-white/60

          py-3

          text-xs
          font-semibold

          text-blue-700

          transition

          hover:bg-white

          dark:border-white/10
          dark:bg-white/[0.05]
          dark:text-blue-400
          dark:hover:bg-white/[0.08]
        "
      >
        View all notifications

        <ChevronRight className="h-3.5 w-3.5" />
      </button>
    </GlassCard>
  );
}

function NotificationPreview({
  notification,
  index,
  onClick,
}: {
  notification:
    PortalNotification;

  index: number;

  onClick:
    () => void;
}) {
  const Icon =
    getCategoryIcon(
      notification.category,
    );

  const styles =
    getCategoryStyles(
      notification.category,
    );

  return (
    <motion.button
      type="button"
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay:
          index * 0.06,
        duration:
          0.32,
      }}
      whileHover={{
        x: 3,
      }}
      onClick={
        onClick
      }
      className={`
        group

        flex
        w-full

        items-start
        gap-3

        rounded-[18px]

        p-3

        text-left

        transition-colors

        ${
          notification.unread
            ? `
                bg-blue-50/40

                hover:bg-blue-50/70

                dark:bg-blue-500/[0.035]
                dark:hover:bg-blue-500/[0.06]
              `
            : `
                hover:bg-white/50

                dark:hover:bg-white/[0.045]
              `
        }
      `}
    >
      <div
        className="
          relative
          mt-0.5
        "
      >
        <div
          className={`
            flex
            h-9
            w-9

            items-center
            justify-center

            rounded-[14px]

            ${styles}
          `}
        >
          <Icon className="h-4 w-4" />
        </div>

        {notification.unread && (
          <span
            className="
              absolute

              -right-0.5
              -top-0.5

              h-2.5
              w-2.5

              rounded-full

              bg-red-500

              ring-2
              ring-white

              dark:ring-slate-900
            "
          />
        )}
      </div>

      <div
        className="
          min-w-0
          flex-1
        "
      >
        <div
          className="
            flex
            items-start
            justify-between
            gap-3
          "
        >
          <div className="min-w-0">
            <div
              className="
                flex
                flex-wrap
                items-center
                gap-1.5
              "
            >
              <p
                className={`
                  text-sm

                  ${
                    notification.unread
                      ? `
                          font-semibold

                          text-slate-900

                          dark:text-slate-100
                        `
                      : `
                          font-medium

                          text-slate-600

                          dark:text-slate-300
                        `
                  }
                `}
              >
                {notification.title}
              </p>

              {notification.priority ===
                "important" && (
                <span
                  className="
                    rounded-full

                    bg-amber-50

                    px-1.5
                    py-0.5

                    text-[8px]
                    font-bold

                    uppercase

                    tracking-[0.06em]

                    text-amber-700

                    dark:bg-amber-500/10
                    dark:text-amber-400
                  "
                >
                  Important
                </span>
              )}
            </div>
          </div>

          <span
            className="
              shrink-0

              text-[10px]
              font-medium

              text-slate-400

              dark:text-slate-500
            "
          >
            {notification.time}
          </span>
        </div>

        <p
          className="
            mt-1

            line-clamp-2

            text-xs
            leading-5

            text-slate-500

            dark:text-slate-400
          "
        >
          {notification.description}
        </p>
      </div>
    </motion.button>
  );
}

function getCategoryIcon(
  category:
    NotificationCategory,
): ElementType {
  switch (category) {
    case "contribution":
      return CreditCard;

    case "account":
      return CircleUserRound;

    case "benefit":
      return ShieldCheck;

    case "system":
    default:
      return Landmark;
  }
}

function getCategoryStyles(
  category:
    NotificationCategory,
) {
  switch (category) {
    case "contribution":
      return `
        bg-blue-600/10
        text-blue-700

        dark:bg-blue-500/10
        dark:text-blue-400
      `;

    case "account":
      return `
        bg-violet-500/10
        text-violet-600

        dark:text-violet-400
      `;

    case "benefit":
      return `
        bg-emerald-500/10
        text-emerald-600

        dark:text-emerald-400
      `;

    case "system":
    default:
      return `
        bg-slate-100
        text-slate-400

        dark:bg-white/[0.05]
        dark:text-slate-500
      `;
  }
}