import {
    createContext,
    type ReactNode,
    useContext,
    useEffect,
    useMemo,
    useState,
  } from "react";
  
  import type { DashboardPage } from "./NavigationContext";
  
  export type NotificationCategory =
    | "contribution"
    | "account"
    | "system"
    | "benefit";
  
  export type NotificationPriority = "normal" | "important";
  
  export type PortalNotification = {
    id: string;
    title: string;
    description: string;
    time: string;
    dateLabel: string;
    unread: boolean;
    category: NotificationCategory;
    priority: NotificationPriority;
    targetPage?: DashboardPage;
    targetSection?: string;
  };
  
  export type NotificationPreferences = {
    emailEnabled: boolean;
    smsEnabled: boolean;
    contributionUpdates: boolean;
    benefitReminders: boolean;
    serviceUpdates: boolean;
  };
  
  type NotificationContextType = {
    notifications: PortalNotification[];
    unreadCount: number;
    preferences: NotificationPreferences;
    markAsRead: (id: string) => void;
    markAsUnread: (id: string) => void;
    toggleReadState: (id: string) => void;
    markAllAsRead: () => void;
    deleteNotification: (id: string) => void;
    resetNotifications: () => void;
    updatePreferences: (preferences: NotificationPreferences) => void;
  };
  
  const NOTIFICATIONS_STORAGE_KEY = "sss-dashboard-notifications";
  const PREFERENCES_STORAGE_KEY = "sss-notification-preferences";
  
  const defaultPreferences: NotificationPreferences = {
    emailEnabled: true,
    smsEnabled: false,
    contributionUpdates: true,
    benefitReminders: true,
    serviceUpdates: true,
  };
  
  const defaultNotifications: PortalNotification[] = [
    {
      id: "contribution-aug-2026",
      title: "Contribution successfully posted",
      description:
        "Your latest monthly contribution is now reflected in your account.",
      time: "10:24 AM",
      dateLabel: "Today",
      unread: true,
      category: "contribution",
      priority: "important",
      targetPage: "contributions",
    },
    {
      id: "account-review-2026",
      title: "Review your contact information",
      description:
        "Keeping your mobile number and email updated helps protect your account.",
      time: "Aug 25",
      dateLabel: "Aug 25",
      unread: true,
      category: "account",
      priority: "important",
      targetPage: "account",
      targetSection: "member",
    },
    {
      id: "maintenance-aug-21",
      title: "Scheduled maintenance completed",
      description: "Online member services are fully available again.",
      time: "Aug 21",
      dateLabel: "Aug 21",
      unread: false,
      category: "system",
      priority: "normal",
      targetPage: "services",
    },
    {
      id: "benefits-reminder-aug-18",
      title: "Explore your benefit options",
      description:
        "Review available member benefits and their general requirements.",
      time: "Aug 18",
      dateLabel: "Aug 18",
      unread: false,
      category: "benefit",
      priority: "normal",
      targetPage: "benefits",
    },
    {
      id: "security-reminder-aug-14",
      title: "Strengthen your account security",
      description:
        "Enable additional sign-in protection from your Account Center.",
      time: "Aug 14",
      dateLabel: "Aug 14",
      unread: false,
      category: "account",
      priority: "normal",
      targetPage: "account",
      targetSection: "security",
    },
  ];
  
  const NotificationContext = createContext<NotificationContextType | null>(null);
  
  export function NotificationProvider({ children }: { children: ReactNode }) {
    const [allNotifications, setAllNotifications] = useState<PortalNotification[]>(
      () => readStoredNotifications(),
    );
  
    const [preferences, setPreferences] = useState<NotificationPreferences>(() =>
      readStoredPreferences(),
    );
  
    useEffect(() => {
      localStorage.setItem(
        NOTIFICATIONS_STORAGE_KEY,
        JSON.stringify(allNotifications),
      );
    }, [allNotifications]);
  
    useEffect(() => {
      localStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(preferences));
    }, [preferences]);
  
    const notifications = useMemo(
      () =>
        allNotifications.filter((notification) =>
          categoryIsEnabled(notification.category, preferences),
        ),
      [allNotifications, preferences],
    );
  
    const unreadCount = useMemo(
      () => notifications.filter((notification) => notification.unread).length,
      [notifications],
    );
  
    function markAsRead(id: string) {
      setAllNotifications((current) =>
        current.map((notification) =>
          notification.id === id
            ? { ...notification, unread: false }
            : notification,
        ),
      );
    }
  
    function markAsUnread(id: string) {
      setAllNotifications((current) =>
        current.map((notification) =>
          notification.id === id
            ? { ...notification, unread: true }
            : notification,
        ),
      );
    }
  
    function toggleReadState(id: string) {
      setAllNotifications((current) =>
        current.map((notification) =>
          notification.id === id
            ? { ...notification, unread: !notification.unread }
            : notification,
        ),
      );
    }
  
    function markAllAsRead() {
      const visibleIds = new Set(notifications.map((notification) => notification.id));
  
      setAllNotifications((current) =>
        current.map((notification) =>
          visibleIds.has(notification.id)
            ? { ...notification, unread: false }
            : notification,
        ),
      );
    }
  
    function deleteNotification(id: string) {
      setAllNotifications((current) =>
        current.filter((notification) => notification.id !== id),
      );
    }
  
    function resetNotifications() {
      setAllNotifications(defaultNotifications);
    }
  
    function updatePreferences(nextPreferences: NotificationPreferences) {
      setPreferences(nextPreferences);
    }
  
    return (
      <NotificationContext.Provider
        value={{
          notifications,
          unreadCount,
          preferences,
          markAsRead,
          markAsUnread,
          toggleReadState,
          markAllAsRead,
          deleteNotification,
          resetNotifications,
          updatePreferences,
        }}
      >
        {children}
      </NotificationContext.Provider>
    );
  }
  
  export function useNotifications() {
    const context = useContext(NotificationContext);
  
    if (!context) {
      throw new Error(
        "useNotifications must be used inside NotificationProvider",
      );
    }
  
    return context;
  }
  
  function categoryIsEnabled(
    category: NotificationCategory,
    preferences: NotificationPreferences,
  ) {
    switch (category) {
      case "contribution":
        return preferences.contributionUpdates;
      case "benefit":
        return preferences.benefitReminders;
      case "system":
        return preferences.serviceUpdates;
      case "account":
      default:
        // Account and security notices are essential in this prototype.
        return true;
    }
  }
  
  function readStoredNotifications(): PortalNotification[] {
    try {
      const saved = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
  
      if (!saved) {
        return defaultNotifications;
      }
  
      const parsed = JSON.parse(saved);
  
      if (!Array.isArray(parsed)) {
        return defaultNotifications;
      }
  
      return parsed;
    } catch {
      return defaultNotifications;
    }
  }
  
  function readStoredPreferences(): NotificationPreferences {
    try {
      const saved = localStorage.getItem(PREFERENCES_STORAGE_KEY);
  
      if (!saved) {
        return defaultPreferences;
      }
  
      const parsed = JSON.parse(saved) as Partial<NotificationPreferences>;
  
      return {
        ...defaultPreferences,
        ...parsed,
      };
    } catch {
      return defaultPreferences;
    }
  }
  