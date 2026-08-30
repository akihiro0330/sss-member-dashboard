import {
  createContext,
  type ReactNode,
  useContext,
  useState,
} from "react";

export type DashboardPage =
  | "overview"
  | "contributions"
  | "loans"
  | "benefits"
  | "services"
  | "account";

type NavigationContextType = {
  activePage: DashboardPage;
  navigate: (
    page: DashboardPage,
    section?: string,
  ) => void;
  targetSection: string | null;
  clearTargetSection: () => void;
};

const NavigationContext =
  createContext<NavigationContextType | null>(
    null,
  );

export function NavigationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [
    activePage,
    setActivePage,
  ] =
    useState<DashboardPage>(
      "overview",
    );

  const [
    targetSection,
    setTargetSection,
  ] =
    useState<string | null>(
      null,
    );

  function navigate(
    page: DashboardPage,
    section?: string,
  ) {
    setTargetSection(
      section ?? null,
    );

    setActivePage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function clearTargetSection() {
    setTargetSection(null);
  }

  return (
    <NavigationContext.Provider
      value={{
        activePage,
        navigate,
        targetSection,
        clearTargetSection,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context =
    useContext(
      NavigationContext,
    );

  if (!context) {
    throw new Error(
      "useNavigation must be used inside NavigationProvider",
    );
  }

  return context;
}