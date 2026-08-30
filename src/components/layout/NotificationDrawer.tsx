import type {
  ElementType,
} from "react";

import {
  useMemo,
  useState,
} from "react";

import {
  Bell,
  BellOff,
  CheckCheck,
  ChevronRight,
  CircleUserRound,
  CreditCard,
  Ellipsis,
  Landmark,
  RotateCcw,
  ShieldCheck,
  Trash2,
  X,
} from "lucide-react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  useUI,
} from "../../context/UIContext";

import {
  useNavigation,
} from "../../context/NavigationContext";

import {
  useToast,
} from "../../context/ToastContext";

import {
  type NotificationCategory,
  type PortalNotification,
  useNotifications,
} from "../../context/NotificationContext";

import {
  useAccessibleOverlay,
} from "../../hooks/useAccessibleOverlay";

type NotificationFilter =
  | "all"
  | "unread"
  | NotificationCategory;

const filters: {
  id: NotificationFilter;
  label: string;
}[] = [
  {
    id: "all",
    label: "All",
  },
  {
    id: "unread",
    label: "Unread",
  },
  {
    id: "contribution",
    label: "Contributions",
  },
  {
    id: "account",
    label: "Account",
  },
  {
    id: "system",
    label: "System",
  },
  {
    id: "benefit",
    label: "Benefits",
  },
];

export default function NotificationDrawer() {
  const {
    notificationsOpen,
    setNotificationsOpen,
  } = useUI();

  const {
    navigate,
  } =
    useNavigation();

  const {
    showToast,
  } =
    useToast();

  const {
    notifications,
    unreadCount,
    markAsRead,
    toggleReadState,
    markAllAsRead,
    deleteNotification,
    resetNotifications,
  } =
    useNotifications();

  const [
    activeFilter,
    setActiveFilter,
  ] =
    useState<NotificationFilter>(
      "all",
    );

  const [
    menuOpen,
    setMenuOpen,
  ] =
    useState(false);

  const filteredNotifications =
    useMemo(() => {
      if (
        activeFilter ===
        "all"
      ) {
        return notifications;
      }

      if (
        activeFilter ===
        "unread"
      ) {
        return notifications.filter(
          (
            notification,
          ) =>
            notification.unread,
        );
      }

      return notifications.filter(
        (
          notification,
        ) =>
          notification.category ===
          activeFilter,
      );
    }, [
      activeFilter,
      notifications,
    ]);

  function closeDrawer() {
    setMenuOpen(
      false,
    );

    setNotificationsOpen(
      false,
    );
  }

  const {
    overlayRef,
  } = useAccessibleOverlay<HTMLElement>({
    open: notificationsOpen,
    onClose: closeDrawer,
  });

  function openNotification(
    notification: PortalNotification,
  ) {
    markAsRead(
      notification.id,
    );

    if (
      notification.targetPage
    ) {
      closeDrawer();

      navigate(
        notification.targetPage,
        notification.targetSection,
      );
    }
  }

  function handleMarkAllRead() {
    if (
      unreadCount === 0
    ) {
      return;
    }

    markAllAsRead();

    setMenuOpen(
      false,
    );

    showToast({
      title:
        "Notifications updated",

      description:
        "All notifications have been marked as read.",

      type:
        "success",
    });
  }

  function handleResetNotifications() {
    resetNotifications();

    setActiveFilter(
      "all",
    );

    setMenuOpen(
      false,
    );

    showToast({
      title:
        "Demo notifications restored",

      description:
        "The notification center has been reset to its original prototype state.",

      type:
        "info",
    });
  }

  function handleDelete(
    notification: PortalNotification,
  ) {
    deleteNotification(
      notification.id,
    );

    showToast({
      title:
        "Notification removed",

      description:
        `"${notification.title}" was removed from your notification center.`,

      type:
        "success",
    });
  }

  return (
    <AnimatePresence>
      {notificationsOpen && (
        <>
          <motion.button
            type="button"
            aria-label="Close notifications"
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
              duration: 0.2,
            }}
            onClick={
              closeDrawer
            }
            className="
              fixed
              inset-0
              z-[70]

              cursor-default

              bg-slate-950/10

              backdrop-blur-[3px]

              dark:bg-black/40
            "
          />

          <motion.aside
            ref={overlayRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="notification-drawer-title"
            aria-describedby="notification-drawer-description"
            tabIndex={-1}
            initial={{
              x: "105%",
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            exit={{
              x: "105%",
              opacity: 0,
            }}
            transition={{
              type:
                "spring",

              stiffness:
                320,

              damping:
                32,
            }}
            className="
              glass-strong

              fixed

              bottom-3
              right-3
              top-3

              z-[80]

              flex

              w-[calc(100%-24px)]
              max-w-[440px]

              flex-col

              overflow-hidden

              rounded-[30px]

              sm:bottom-4
              sm:right-4
              sm:top-4
            "
          >
            {/* HEADER */}
            <div
              className="
                border-b
                border-white/50

                p-5

                dark:border-white/10

                sm:p-6
              "
            >
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
                    <div className="relative">
                      <Bell
                        className="
                          h-4
                          w-4

                          text-blue-600

                          dark:text-blue-400
                        "
                      />

                      {unreadCount >
                        0 && (
                        <span
                          className="
                            absolute
                            -right-1.5
                            -top-1

                            h-2
                            w-2

                            rounded-full

                            bg-red-500

                            ring-2
                            ring-white

                            dark:ring-slate-900
                          "
                        />
                      )}
                    </div>

                    <p
                      className="
                        text-xs
                        font-semibold

                        uppercase

                        tracking-[0.15em]

                        text-blue-600

                        dark:text-blue-400
                      "
                    >
                      Updates
                    </p>
                  </div>

                  <div
                    className="
                      mt-2

                      flex
                      flex-wrap
                      items-end
                      gap-2
                    "
                  >
                    <h2
                      id="notification-drawer-title"
                      className="
                        text-2xl
                        font-semibold

                        tracking-[-0.04em]

                        text-slate-950

                        dark:text-white
                      "
                    >
                      Notifications
                    </h2>

                    {unreadCount >
                      0 && (
                      <span
                        className="
                          mb-0.5

                          rounded-full

                          bg-blue-600/10

                          px-2
                          py-1

                          text-[10px]
                          font-semibold

                          text-blue-700

                          dark:bg-blue-500/10
                          dark:text-blue-400
                        "
                      >
                        {unreadCount} unread
                      </span>
                    )}
                  </div>

                  <p
                    id="notification-drawer-description"
                    className="
                      mt-2

                      text-xs
                      leading-5

                      text-slate-400

                      dark:text-slate-500
                    "
                  >
                    Account activity,
                    reminders, and
                    service updates.
                  </p>
                </div>

                <div
                  className="
                    flex
                    shrink-0
                    items-center
                    gap-2
                  "
                >
                  {/* MORE MENU */}
                  <div className="relative">
                    <button
                      type="button"
                      aria-label="Notification options"
                      onClick={() =>
                        setMenuOpen(
                          (
                            current,
                          ) =>
                            !current,
                        )
                      }
                      className="
                        flex
                        h-10
                        w-10

                        items-center
                        justify-center

                        rounded-2xl

                        bg-white/60

                        text-slate-500

                        transition

                        hover:bg-white
                        hover:text-blue-600

                        dark:bg-white/[0.06]
                        dark:text-slate-300
                        dark:hover:bg-white/10
                        dark:hover:text-blue-400
                      "
                    >
                      <Ellipsis className="h-[18px] w-[18px]" />
                    </button>

                    <AnimatePresence>
                      {menuOpen && (
                        <motion.div
                          initial={{
                            opacity: 0,
                            y: -6,
                            scale:
                              0.96,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            scale:
                              1,
                          }}
                          exit={{
                            opacity: 0,
                            y: -4,
                            scale:
                              0.97,
                          }}
                          transition={{
                            duration:
                              0.16,
                          }}
                          className="
                            glass-strong

                            absolute

                            right-0
                            top-12

                            z-30

                            w-[220px]

                            rounded-[18px]

                            p-1.5

                            shadow-xl
                          "
                        >
                          <button
                            type="button"
                            disabled={
                              unreadCount ===
                              0
                            }
                            onClick={
                              handleMarkAllRead
                            }
                            className="
                              flex
                              w-full
                              items-center
                              gap-3

                              rounded-[13px]

                              px-3
                              py-2.5

                              text-left
                              text-xs
                              font-semibold

                              text-slate-600

                              transition

                              hover:bg-white/60

                              disabled:cursor-not-allowed
                              disabled:opacity-40

                              dark:text-slate-300
                              dark:hover:bg-white/[0.06]
                            "
                          >
                            <CheckCheck className="h-4 w-4" />

                            Mark all as read
                          </button>

                          <button
                            type="button"
                            onClick={
                              handleResetNotifications
                            }
                            className="
                              flex
                              w-full
                              items-center
                              gap-3

                              rounded-[13px]

                              px-3
                              py-2.5

                              text-left
                              text-xs
                              font-semibold

                              text-slate-600

                              transition

                              hover:bg-white/60

                              dark:text-slate-300
                              dark:hover:bg-white/[0.06]
                            "
                          >
                            <RotateCcw className="h-4 w-4" />

                            Restore demo notifications
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <button
                    type="button"
                    aria-label="Close notifications"
                    onClick={
                      closeDrawer
                    }
                    className="
                      flex
                      h-10
                      w-10

                      items-center
                      justify-center

                      rounded-2xl

                      bg-white/60

                      text-slate-500

                      transition

                      hover:bg-white
                      hover:text-slate-900

                      dark:bg-white/[0.06]
                      dark:text-slate-300
                      dark:hover:bg-white/10
                      dark:hover:text-white
                    "
                  >
                    <X className="h-[18px] w-[18px]" />
                  </button>
                </div>
              </div>

              {/* FILTERS */}
              <div
                className="
                  -mx-1
                  mt-5

                  flex
                  gap-2

                  overflow-x-auto

                  px-1
                  pb-1

                  [scrollbar-width:none]

                  [&::-webkit-scrollbar]:hidden
                "
              >
                {filters.map(
                  (
                    filter,
                  ) => {
                    const active =
                      activeFilter ===
                      filter.id;

                    const count =
                      getFilterCount(
                        filter.id,
                        notifications,
                      );

                    return (
                      <button
                        key={
                          filter.id
                        }
                        type="button"
                        onClick={() =>
                          setActiveFilter(
                            filter.id,
                          )
                        }
                        className={`
                          flex
                          shrink-0
                          items-center
                          gap-1.5

                          rounded-full

                          px-3
                          py-2

                          text-[11px]
                          font-semibold

                          transition

                          ${
                            active
                              ? `
                                  bg-blue-600
                                  text-white
                                  shadow-lg
                                  shadow-blue-500/20
                                `
                              : `
                                  border
                                  border-white/60

                                  bg-white/45

                                  text-slate-500

                                  hover:bg-white/80
                                  hover:text-slate-800

                                  dark:border-white/10
                                  dark:bg-white/[0.04]
                                  dark:text-slate-400
                                  dark:hover:bg-white/[0.07]
                                  dark:hover:text-white
                                `
                          }
                        `}
                      >
                        {filter.label}

                        {count >
                          0 && (
                          <span
                            className={`
                              rounded-full

                              px-1.5
                              py-0.5

                              text-[9px]

                              ${
                                active
                                  ? "bg-white/20 text-white"
                                  : "bg-slate-100 text-slate-500 dark:bg-white/[0.07] dark:text-slate-400"
                              }
                            `}
                          >
                            {count}
                          </span>
                        )}
                      </button>
                    );
                  },
                )}
              </div>
            </div>

            {/* CONTENT */}
            <div
              className="
                min-h-0
                flex-1

                overflow-y-auto

                p-3

                sm:p-4
              "
            >
              <AnimatePresence
                mode="popLayout"
              >
                {filteredNotifications.length >
                0 ? (
                  <div className="space-y-2">
                    {filteredNotifications.map(
                      (
                        notification,
                        index,
                      ) => (
                        <NotificationItem
                          key={
                            notification.id
                          }
                          notification={
                            notification
                          }
                          index={
                            index
                          }
                          onOpen={() =>
                            openNotification(
                              notification,
                            )
                          }
                          onToggleRead={() =>
                            toggleReadState(
                              notification.id,
                            )
                          }
                          onDelete={() =>
                            handleDelete(
                              notification,
                            )
                          }
                        />
                      ),
                    )}
                  </div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{
                      opacity: 0,
                      y: 8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className="
                      flex
                      min-h-[340px]
                      flex-col
                      items-center
                      justify-center

                      px-8

                      text-center
                    "
                  >
                    <div
                      className="
                        flex
                        h-14
                        w-14

                        items-center
                        justify-center

                        rounded-[20px]

                        bg-slate-100

                        text-slate-400

                        dark:bg-white/[0.05]
                        dark:text-slate-500
                      "
                    >
                      <BellOff className="h-5 w-5" />
                    </div>

                    <h3
                      className="
                        mt-4

                        text-sm
                        font-semibold

                        text-slate-800

                        dark:text-slate-200
                      "
                    >
                      No notifications here
                    </h3>

                    <p
                      className="
                        mt-2

                        max-w-[260px]

                        text-xs
                        leading-5

                        text-slate-400
                      "
                    >
                      Nothing currently
                      matches this filter.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* FOOTER */}
            <div
              className="
                border-t
                border-white/50

                px-5
                py-4

                dark:border-white/10
              "
            >
              <p
                className="
                  text-center

                  text-[10px]
                  leading-4

                  text-slate-400

                  dark:text-slate-500
                "
              >
                This notification
                center uses prototype
                data and is not connected
                to live government
                services.
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function NotificationItem({
  notification,
  index,
  onOpen,
  onToggleRead,
  onDelete,
}: {
  notification: PortalNotification;

  index: number;

  onOpen: () => void;

  onToggleRead: () => void;

  onDelete: () => void;
}) {
  const Icon =
    getCategoryIcon(
      notification.category,
    );

  const categoryStyles =
    getCategoryStyles(
      notification.category,
    );

  return (
    <motion.div
      layout
      initial={{
        opacity: 0,
        x: 16,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      exit={{
        opacity: 0,
        x: 24,
        scale: 0.97,
      }}
      transition={{
        delay:
          Math.min(
            index,
            5,
          ) * 0.04,
        duration:
          0.24,
      }}
      className={`
        group

        relative

        overflow-hidden

        rounded-[22px]

        border

        transition-colors

        ${
          notification.unread
            ? `
                border-blue-200/50
                bg-blue-50/45

                dark:border-blue-500/15
                dark:bg-blue-500/[0.045]
              `
            : `
                border-transparent
                bg-transparent

                hover:border-white/60
                hover:bg-white/40

                dark:hover:border-white/[0.06]
                dark:hover:bg-white/[0.035]
              `
        }
      `}
    >
      {notification.unread && (
        <div
          className="
            absolute

            bottom-0
            left-0
            top-0

            w-[3px]

            bg-blue-500
          "
        />
      )}

      <button
        type="button"
        onClick={
          onOpen
        }
        className="
          flex
          w-full

          gap-3

          p-4
          pb-3

          text-left
        "
      >
        <div
          className={`
            relative

            flex
            h-10
            w-10
            shrink-0

            items-center
            justify-center

            rounded-[15px]

            ${categoryStyles}
          `}
        >
          <Icon className="h-4 w-4" />

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
                  gap-2
                "
              >
                <p
                  className={`
                    text-sm

                    ${
                      notification.unread
                        ? "font-semibold text-slate-950 dark:text-white"
                        : "font-medium text-slate-700 dark:text-slate-300"
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

                      tracking-[0.08em]

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
              mt-1.5

              text-xs
              leading-5

              text-slate-500

              dark:text-slate-400
            "
          >
            {notification.description}
          </p>

          {notification.targetPage && (
            <div
              className="
                mt-3

                flex
                items-center
                gap-1

                text-[10px]
                font-semibold

                text-blue-600

                dark:text-blue-400
              "
            >
              View details

              <ChevronRight className="h-3 w-3" />
            </div>
          )}
        </div>
      </button>

      <div
        className="
          flex
          items-center
          justify-end
          gap-1

          px-3
          pb-3
        "
      >
        <button
          type="button"
          onClick={
            onToggleRead
          }
          className="
            rounded-[11px]

            px-2.5
            py-1.5

            text-[10px]
            font-semibold

            text-slate-400

            transition

            hover:bg-white/70
            hover:text-blue-600

            dark:hover:bg-white/[0.06]
            dark:hover:text-blue-400
          "
        >
          {notification.unread
            ? "Mark read"
            : "Mark unread"}
        </button>

        <button
          type="button"
          onClick={
            onDelete
          }
          aria-label={`Delete ${notification.title}`}
          className="
            flex
            h-7
            w-7

            items-center
            justify-center

            rounded-[10px]

            text-slate-400

            transition

            hover:bg-red-50
            hover:text-red-500

            dark:hover:bg-red-500/10
            dark:hover:text-red-400
          "
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </motion.div>
  );
}

function getFilterCount(
  filter:
    NotificationFilter,
  notifications:
    PortalNotification[],
) {
  if (
    filter ===
    "all"
  ) {
    return notifications.length;
  }

  if (
    filter ===
    "unread"
  ) {
    return notifications.filter(
      (
        notification,
      ) =>
        notification.unread,
    ).length;
  }

  return notifications.filter(
    (
      notification,
    ) =>
      notification.category ===
      filter,
  ).length;
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
        bg-blue-50
        text-blue-600

        dark:bg-blue-500/10
        dark:text-blue-400
      `;

    case "account":
      return `
        bg-violet-50
        text-violet-600

        dark:bg-violet-500/10
        dark:text-violet-400
      `;

    case "benefit":
      return `
        bg-emerald-50
        text-emerald-600

        dark:bg-emerald-500/10
        dark:text-emerald-400
      `;

    case "system":
    default:
      return `
        bg-slate-100
        text-slate-500

        dark:bg-white/[0.06]
        dark:text-slate-400
      `;
  }
}