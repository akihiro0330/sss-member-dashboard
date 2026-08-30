import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type UIContextType = {
  darkMode: boolean;
  toggleDarkMode: () => void;

  profileOpen: boolean;
  setProfileOpen: (value: boolean) => void;

  notificationsOpen: boolean;
  setNotificationsOpen: (value: boolean) => void;

  moreMenuOpen: boolean;
  setMoreMenuOpen: (value: boolean) => void;

  hideSSNumber: boolean;
  toggleSSNumberVisibility: () => void;

  hideContributions: boolean;
  toggleContributionVisibility: () => void;
};

const UIContext =
  createContext<UIContextType | null>(
    null,
  );

export function UIProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [darkMode, setDarkMode] =
    useState(() => {
      return (
        localStorage.getItem(
          "sss-theme",
        ) === "dark"
      );
    });

  const [
    profileOpen,
    setProfileOpen,
  ] = useState(false);

  const [
    notificationsOpen,
    setNotificationsOpen,
  ] = useState(false);

  const [
    moreMenuOpen,
    setMoreMenuOpen,
  ] = useState(false);

  /*
   * Privacy preferences
   *
   * SS Number defaults to hidden for
   * security/privacy.
   */
  const [
    hideSSNumber,
    setHideSSNumber,
  ] = useState(() => {
    const saved =
      localStorage.getItem(
        "sss-hide-ss-number",
      );

    if (saved === null) {
      return true;
    }

    return saved === "true";
  });

  /*
   * Contributions remain visible by
   * default unless the member chooses
   * to hide them.
   */
  const [
    hideContributions,
    setHideContributions,
  ] = useState(() => {
    return (
      localStorage.getItem(
        "sss-hide-contributions",
      ) === "true"
    );
  });

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      darkMode,
    );

    localStorage.setItem(
      "sss-theme",
      darkMode ? "dark" : "light",
    );
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem(
      "sss-hide-ss-number",
      String(hideSSNumber),
    );
  }, [hideSSNumber]);

  useEffect(() => {
    localStorage.setItem(
      "sss-hide-contributions",
      String(hideContributions),
    );
  }, [hideContributions]);

  function toggleDarkMode() {
    setDarkMode(
      (current) => !current,
    );
  }

  function toggleSSNumberVisibility() {
    setHideSSNumber(
      (current) => !current,
    );
  }

  function toggleContributionVisibility() {
    setHideContributions(
      (current) => !current,
    );
  }

  return (
    <UIContext.Provider
      value={{
        darkMode,
        toggleDarkMode,

        profileOpen,
        setProfileOpen,

        notificationsOpen,
        setNotificationsOpen,

        moreMenuOpen,
        setMoreMenuOpen,

        hideSSNumber,
        toggleSSNumberVisibility,

        hideContributions,
        toggleContributionVisibility,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context =
    useContext(UIContext);

  if (!context) {
    throw new Error(
      "useUI must be used inside UIProvider",
    );
  }

  return context;
}