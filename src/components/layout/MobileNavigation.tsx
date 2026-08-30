import {
  CreditCard,
  Home,
  Menu,
  ShieldCheck,
  WalletCards,
} from "lucide-react";

import {
  motion,
} from "framer-motion";

import {
  useNavigation,
  type DashboardPage,
} from "../../context/NavigationContext";

import {
  useUI,
} from "../../context/UIContext";

import {
  preloadPage,
} from "../../utils/pagePreload";

const mobileItems: {
  label: string;
  page: DashboardPage;
  icon: typeof Home;
}[] = [
  {
    label: "Home",
    page: "overview",
    icon: Home,
  },
  {
    label: "Contributions",
    page: "contributions",
    icon: WalletCards,
  },
  {
    label: "Loans",
    page: "loans",
    icon: CreditCard,
  },
  {
    label: "Benefits",
    page: "benefits",
    icon: ShieldCheck,
  },
];

export default function MobileNavigation() {
  const {
    activePage,
    navigate,
  } = useNavigation();

  const {
    moreMenuOpen,
    setMoreMenuOpen,
    setProfileOpen,
    setNotificationsOpen,
  } = useUI();

  function openMoreMenu() {
    /*
     * Services is one of the most likely
     * destinations after opening More.
     *
     * Start fetching it immediately.
     */
    preloadPage("services");

    setMoreMenuOpen(true);
    setProfileOpen(false);
    setNotificationsOpen(false);
  }

  return (
    <motion.nav
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: 0.25,
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        glass

        fixed
        bottom-4
        left-4
        right-4

        z-50

        rounded-[26px]

        p-2

        md:hidden
      "
      aria-label="Mobile navigation"
    >
      <div className="grid grid-cols-5 gap-1">
        {mobileItems.map(
          (item) => {
            const Icon = item.icon;

            const active =
              activePage === item.page &&
              !moreMenuOpen;

            return (
              <button
                key={item.page}
                type="button"
                onPointerDown={() =>
                  preloadPage(item.page)
                }
                onTouchStart={() =>
                  preloadPage(item.page)
                }
                onFocus={() =>
                  preloadPage(item.page)
                }
                onClick={() => {
                  navigate(item.page);

                  setMoreMenuOpen(false);
                }}
                className={`
                  relative
                  isolate

                  flex
                  min-w-0
                  flex-col
                  items-center
                  justify-center

                  gap-1

                  rounded-[18px]

                  px-1
                  py-2

                  text-[10px]
                  font-medium

                  transition

                  ${
                    active
                      ? `
                        text-blue-700

                        dark:text-blue-400
                      `
                      : `
                        text-slate-400

                        active:bg-white/50

                        dark:text-slate-500
                      `
                  }
                `}
              >
                {active && (
                  <motion.span
                    layoutId="mobile-active"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                    className="
                      absolute
                      inset-0

                      -z-10

                      rounded-[18px]

                      bg-blue-50/90

                      dark:bg-blue-500/10
                    "
                  />
                )}

                <Icon className="h-[18px] w-[18px]" />

                <span className="max-w-full truncate">
                  {item.label}
                </span>
              </button>
            );
          },
        )}

        <button
          type="button"
          onPointerDown={() =>
            preloadPage("services")
          }
          onTouchStart={() =>
            preloadPage("services")
          }
          onClick={openMoreMenu}
          aria-expanded={moreMenuOpen}
          aria-label="Open more options"
          className={`
            relative
            isolate

            flex
            flex-col
            items-center
            justify-center

            gap-1

            rounded-[18px]

            px-1
            py-2

            text-[10px]
            font-medium

            transition

            ${
              moreMenuOpen
                ? `
                  text-blue-700

                  dark:text-blue-400
                `
                : `
                  text-slate-400

                  dark:text-slate-500
                `
            }
          `}
        >
          {moreMenuOpen && (
            <motion.span
              layoutId="mobile-active"
              transition={{
                type: "spring",
                stiffness: 380,
                damping: 30,
              }}
              className="
                absolute
                inset-0

                -z-10

                rounded-[18px]

                bg-blue-50/90

                dark:bg-blue-500/10
              "
            />
          )}

          <Menu className="h-[18px] w-[18px]" />

          <span>More</span>
        </button>
      </div>
    </motion.nav>
  );
}