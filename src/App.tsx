import {
  Suspense,
  useMemo,
} from "react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import DesktopNavbar from "./components/layout/DesktopNavbar";
import MobileHeader from "./components/layout/MobileHeader";
import MobileNavigation from "./components/layout/MobileNavigation";
import MobileMoreSheet from "./components/layout/MobileMoreSheet";
import NotificationDrawer from "./components/layout/NotificationDrawer";
import ProfileMenu from "./components/layout/ProfileMenu";

import OverviewPage from "./components/pages/OverviewPage";

import PageLoadingSkeleton from "./components/ui/PageLoadingSkeleton";
import ToastViewport from "./components/ui/ToastViewport";

import {
  useNavigation,
  type DashboardPage,
} from "./context/NavigationContext";

import {
  AccountPage,
  BenefitsPage,
  ContributionsPage,
  LoansPage,
  ServicesPage,
} from "./utils/pagePreload";

export default function App() {
  const {
    activePage,
  } = useNavigation();

  const CurrentPage =
    useMemo(
      () =>
        getCurrentPage(
          activePage,
        ),
      [activePage],
    );

  return (
    <div
      className="
        relative
        min-h-screen
        overflow-x-hidden

        text-slate-950

        transition-colors
        duration-300

        dark:text-white
      "
    >
      {/* Ambient background */}
      <AmbientBackground />

      {/* Desktop navigation */}
      <DesktopNavbar />

      {/* Mobile header */}
      <MobileHeader />

      {/* Main content */}
      <main
        className="
          relative
          z-10

          mx-auto
          w-full
          max-w-[1600px]

          px-4

          pb-32
          pt-4

          sm:px-5
          sm:pt-5

          md:px-6

          lg:px-8
          lg:pb-12
          lg:pt-6

          xl:px-10

          2xl:px-12
        "
      >
        <AnimatePresence
          mode="wait"
          initial={false}
        >
          <motion.div
            key={activePage}
            initial={{
              opacity: 0,
              y: 8,
              filter:
                "blur(2px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              filter:
                "blur(0px)",
            }}
            exit={{
              opacity: 0,
              y: -5,
              filter:
                "blur(2px)",
            }}
            transition={{
              duration: 0.24,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
          >
            <Suspense
              fallback={
                <PageLoadingSkeleton />
              }
            >
              <CurrentPage />
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile bottom navigation */}
      <MobileNavigation />

      {/* Global overlays */}
      <NotificationDrawer />
      <ProfileMenu />
      <MobileMoreSheet />

      {/* Toast notifications */}
      <ToastViewport />
    </div>
  );
}

function getCurrentPage(
  activePage: DashboardPage,
) {
  switch (activePage) {
    case "contributions":
      return ContributionsPage;

    case "loans":
      return LoansPage;

    case "benefits":
      return BenefitsPage;

    case "services":
      return ServicesPage;

    case "account":
      return AccountPage;

    case "overview":
    default:
      return OverviewPage;
  }
}

function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="ambient-background"
    >
      <div
        className="
          ambient-orb
          ambient-orb-one
        "
      />

      <div
        className="
          ambient-orb
          ambient-orb-two
        "
      />

      <div
        className="
          ambient-orb
          ambient-orb-three
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-0

          bg-[linear-gradient(to_right,rgba(37,99,235,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(37,99,235,0.025)_1px,transparent_1px)]

          bg-[size:48px_48px]

          opacity-40

          [mask-image:linear-gradient(to_bottom,black,transparent_80%)]

          dark:opacity-20
        "
      />
    </div>
  );
}