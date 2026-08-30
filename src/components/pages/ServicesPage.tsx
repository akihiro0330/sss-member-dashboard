import type { ElementType } from "react";

import {
  ArrowRight,
  Building2,
  CalendarDays,
  ChevronRight,
  CircleHelp,
  CreditCard,
  FileCheck2,
  FileText,
  Fingerprint,
  Headphones,
  History,
  Landmark,
  LockKeyhole,
  Mail,
  MapPin,
  QrCode,
  Search,
  ShieldCheck,
  Smartphone,
  UserRound,
  WalletCards,
} from "lucide-react";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";

import GlassCard from "../ui/GlassCard";

import { useToast } from "../../context/ToastContext";
import { useNavigation } from "../../context/NavigationContext";

type ServiceCategory =
  | "Payments"
  | "Membership"
  | "Disbursement"
  | "Appointments"
  | "Documents"
  | "Security"
  | "Support";

type Service = {
  id: string;
  title: string;
  description: string;
  category: ServiceCategory;
  icon: ElementType;
  featured?: boolean;
};

const services: Service[] = [
  {
    id: "prn",
    title: "Generate PRN",
    description:
      "Create a Payment Reference Number for applicable SSS payments.",
    category: "Payments",
    icon: QrCode,
    featured: true,
  },
  {
    id: "contribution-payment",
    title: "Pay Contributions",
    description:
      "Review available channels and proceed with contribution payment.",
    category: "Payments",
    icon: WalletCards,
    featured: true,
  },
  {
    id: "payment-history",
    title: "Payment History",
    description:
      "Review previous payments and their posting information.",
    category: "Payments",
    icon: History,
  },
  {
    id: "member-information",
    title: "Member Information",
    description:
      "Review your personal, contact, and membership information.",
    category: "Membership",
    icon: UserRound,
    featured: true,
  },
  {
    id: "update-contact",
    title: "Update Contact Information",
    description:
      "Manage your registered mobile number, email, and contact details.",
    category: "Membership",
    icon: Smartphone,
  },
  {
    id: "membership-records",
    title: "Membership Records",
    description:
      "Access available membership and registration information.",
    category: "Membership",
    icon: FileCheck2,
  },
  {
    id: "disbursement-account",
    title: "Disbursement Account",
    description:
      "Manage enrolled accounts used for applicable SSS disbursements.",
    category: "Disbursement",
    icon: Landmark,
    featured: true,
  },
  {
    id: "disbursement-history",
    title: "Disbursement History",
    description:
      "Review available records of previous account disbursements.",
    category: "Disbursement",
    icon: CreditCard,
  },
  {
    id: "appointment",
    title: "Schedule Appointment",
    description:
      "Arrange an appointment for services that require branch assistance.",
    category: "Appointments",
    icon: CalendarDays,
    featured: true,
  },
  {
    id: "branch-locator",
    title: "Branch Locator",
    description:
      "Find an SSS branch or service location convenient for you.",
    category: "Appointments",
    icon: MapPin,
  },
  {
    id: "documents",
    title: "Member Documents",
    description:
      "Access available forms, records, and downloadable member documents.",
    category: "Documents",
    icon: FileText,
    featured: true,
  },
  {
    id: "certificates",
    title: "Certificates & Records",
    description:
      "View available certificates and member record requests.",
    category: "Documents",
    icon: FileCheck2,
  },
  {
    id: "login-security",
    title: "Login & Security",
    description:
      "Manage your password and other account security options.",
    category: "Security",
    icon: LockKeyhole,
    featured: true,
  },
  {
    id: "authentication",
    title: "Authentication",
    description:
      "Review identity verification and account authentication settings.",
    category: "Security",
    icon: Fingerprint,
  },
  {
    id: "security-activity",
    title: "Security Activity",
    description:
      "Review recent account access and security-related activity.",
    category: "Security",
    icon: ShieldCheck,
  },
  {
    id: "help-center",
    title: "Help Center",
    description:
      "Find answers and guidance for common member concerns.",
    category: "Support",
    icon: CircleHelp,
    featured: true,
  },
  {
    id: "contact-support",
    title: "Contact Support",
    description:
      "Explore available support channels for additional assistance.",
    category: "Support",
    icon: Headphones,
  },
  {
    id: "messages",
    title: "Messages",
    description:
      "Review available account messages and service communications.",
    category: "Support",
    icon: Mail,
  },
];

const categories = [
  "All",
  "Payments",
  "Membership",
  "Disbursement",
  "Appointments",
  "Documents",
  "Security",
  "Support",
] as const;

type CategoryFilter = (typeof categories)[number];

export default function ServicesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] =
    useState<CategoryFilter>("All");

  const { showToast } = useToast();
  const { navigate } = useNavigation();

  const filteredServices = useMemo(() => {
    const term = search.trim().toLowerCase();

    return services.filter((service) => {
      const matchesCategory =
        category === "All" ||
        service.category === category;

      const matchesSearch =
        !term ||
        service.title
          .toLowerCase()
          .includes(term) ||
        service.description
          .toLowerCase()
          .includes(term) ||
        service.category
          .toLowerCase()
          .includes(term);

      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  function handleService(service: Service) {
    switch (service.id) {
      case "contribution-payment":
      case "payment-history":
        navigate("contributions");

        showToast({
          title: service.title,
          description:
            "Opening your contribution center.",
          type: "success",
        });

        return;

      case "prn":
        showToast({
          title: "Generate PRN",
          description:
            "PRN generation will launch here once payment services are integrated.",
          type: "info",
        });

        return;

      case "appointment":
        showToast({
          title: "Schedule Appointment",
          description:
            "Branch appointment scheduling will be available from this service.",
          type: "info",
        });

        return;

      case "branch-locator":
        showToast({
          title: "Branch Locator",
          description:
            "Branch location services can be connected to this action.",
          type: "info",
        });

        return;

      case "disbursement-account":
      case "disbursement-history":
        showToast({
          title: service.title,
          description:
            "Disbursement management will open from this service.",
          type: "info",
        });

        return;

      case "login-security":
      case "authentication":
      case "security-activity":
        showToast({
          title: service.title,
          description:
            "Account security controls will open from this service.",
          type: "success",
        });

        return;

      case "help-center":
      case "contact-support":
      case "messages":
        showToast({
          title: service.title,
          description:
            "Support functionality will be connected here.",
          type: "info",
        });

        return;

      case "member-information":
      case "update-contact":
      case "membership-records":
        showToast({
          title: service.title,
          description:
            "Member information management will open from this service.",
          type: "info",
        });

        return;

      case "documents":
      case "certificates":
        showToast({
          title: service.title,
          description:
            "Document services will open from this section.",
          type: "info",
        });

        return;

      default:
        showToast({
          title: service.title,
          description:
            "This service is ready for workflow integration.",
          type: "info",
        });
    }
  }

  return (
    <div>
      <ServicesHero />

      <QuickLaunch
        onServiceClick={handleService}
      />

      <section className="mt-4">
        <ServiceDirectory
          category={category}
          setCategory={setCategory}
          search={search}
          setSearch={setSearch}
          services={filteredServices}
          onServiceClick={handleService}
        />
      </section>

      <section className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <AccountSecurity
          onManage={() =>
            handleService(
              services.find(
                (service) =>
                  service.id ===
                  "login-security",
              )!,
            )
          }
        />

        <NeedHelp
          onAction={(id) => {
            const service =
              services.find(
                (item) =>
                  item.id === id,
              );

            if (service) {
              handleService(service);
            }
          }}
        />
      </section>
    </div>
  );
}

function ServicesHero() {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 16,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        glass-strong
        relative
        overflow-hidden
        rounded-[30px]
        p-5
        sm:p-7
        lg:p-9
      "
    >
      <div
        className="
          pointer-events-none
          absolute
          -right-28
          -top-32
          h-80
          w-80
          rounded-full
          bg-blue-400/15
          blur-3xl
          dark:bg-blue-500/10
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-32
          left-[28%]
          h-72
          w-72
          rounded-full
          bg-cyan-300/15
          blur-3xl
          dark:bg-cyan-400/10
        "
      />

      <div className="relative">
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-2xl
              bg-blue-600/10
              text-blue-700
              dark:bg-blue-500/10
              dark:text-blue-400
            "
          >
            <Building2 className="h-5 w-5" />
          </div>

          <div>
            <p
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.16em]
                text-blue-600
                dark:text-blue-400
              "
            >
              Member Services
            </p>

            <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
              Your My.SSS service center
            </p>
          </div>
        </div>

        <h1
          className="
            mt-7
            max-w-3xl
            text-3xl
            font-semibold
            tracking-[-0.045em]
            text-slate-950
            dark:text-white
            sm:text-4xl
            lg:text-5xl
          "
        >
          Everything you need,
          <span
            className="
              block
              bg-gradient-to-r
              from-blue-700
              to-cyan-500
              bg-clip-text
              text-transparent
              dark:from-blue-400
              dark:to-cyan-300
            "
          >
            all in one place.
          </span>
        </h1>

        <p
          className="
            mt-4
            max-w-2xl
            text-sm
            leading-6
            text-slate-500
            dark:text-slate-300
            sm:text-base
            sm:leading-7
          "
        >
          Access payments, member records,
          disbursement, appointments,
          documents, account security, and
          support without navigating through
          complicated menus.
        </p>
      </div>
    </motion.section>
  );
}

function QuickLaunch({
  onServiceClick,
}: {
  onServiceClick: (
    service: Service,
  ) => void;
}) {
  const featured = services
    .filter((service) => service.featured)
    .slice(0, 4);

  return (
    <section className="mt-4">
      <div className="mb-4">
        <p
          className="
            text-xs
            font-semibold
            uppercase
            tracking-[0.16em]
            text-blue-600
            dark:text-blue-400
          "
        >
          Quick Launch
        </p>

        <h2
          className="
            mt-2
            text-2xl
            font-semibold
            tracking-[-0.04em]
            text-slate-950
            dark:text-white
          "
        >
          Frequently used services
        </h2>
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.07,
            },
          },
        }}
        className="
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >
        {featured.map((service) => {
          const Icon = service.icon;

          return (
            <motion.button
              key={service.id}
              type="button"
              onClick={() =>
                onServiceClick(service)
              }
              variants={{
                hidden: {
                  opacity: 0,
                  y: 16,
                },
                show: {
                  opacity: 1,
                  y: 0,
                },
              }}
              whileHover={{
                y: -4,
              }}
              whileTap={{
                scale: 0.98,
              }}
              className="
                glass
                group
                flex
                min-h-[190px]
                flex-col
                rounded-[26px]
                p-5
                text-left
                sm:p-6
              "
            >
              <div className="flex items-start justify-between gap-4">
                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-2xl
                    bg-blue-600/10
                    text-blue-700
                    transition-all
                    duration-300

                    group-hover:bg-blue-600
                    group-hover:text-white
                    group-hover:shadow-lg
                    group-hover:shadow-blue-500/20

                    dark:bg-blue-500/10
                    dark:text-blue-400
                    dark:group-hover:bg-blue-500
                    dark:group-hover:text-white
                  "
                >
                  <Icon className="h-5 w-5" />
                </div>

                <div
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    bg-white/60
                    text-slate-400
                    transition
                    group-hover:bg-blue-600
                    group-hover:text-white

                    dark:bg-white/[0.05]
                    dark:text-slate-500
                    dark:group-hover:bg-blue-500
                    dark:group-hover:text-white
                  "
                >
                  <ArrowRight
                    className="
                      h-3.5
                      w-3.5
                      transition-transform
                      group-hover:translate-x-0.5
                    "
                  />
                </div>
              </div>

              <p
                className="
                  mt-6
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.12em]
                  text-blue-600
                  dark:text-blue-400
                "
              >
                {service.category}
              </p>

              <h3
                className="
                  mt-2
                  text-lg
                  font-semibold
                  tracking-[-0.03em]
                  text-slate-950
                  dark:text-white
                "
              >
                {service.title}
              </h3>

              <p
                className="
                  mt-2
                  text-xs
                  leading-5
                  text-slate-500
                  dark:text-slate-400
                "
              >
                {service.description}
              </p>
            </motion.button>
          );
        })}
      </motion.div>
    </section>
  );
}

function ServiceDirectory({
  category,
  setCategory,
  search,
  setSearch,
  services,
  onServiceClick,
}: {
  category: CategoryFilter;
  setCategory: (
    category: CategoryFilter,
  ) => void;
  search: string;
  setSearch: (value: string) => void;
  services: Service[];
  onServiceClick: (
    service: Service,
  ) => void;
}) {
  return (
    <GlassCard className="p-4 sm:p-6">
      <div
        className="
          flex
          flex-col
          gap-5
          xl:flex-row
          xl:items-end
          xl:justify-between
        "
      >
        <div>
          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.16em]
              text-blue-600
              dark:text-blue-400
            "
          >
            Service Directory
          </p>

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
            Find a service
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
            Search or browse services by
            category.
          </p>
        </div>

        <div
          className="
            flex
            items-center
            gap-2
            rounded-[17px]
            border
            border-white/70
            bg-white/50
            px-3
            dark:border-white/10
            dark:bg-white/[0.04]
          "
        >
          <Search className="h-4 w-4 shrink-0 text-slate-400" />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search services"
            className="
              w-full
              bg-transparent
              py-3
              text-sm
              text-slate-900
              outline-none
              placeholder:text-slate-400
              dark:text-white
              dark:placeholder:text-slate-500
              sm:w-56
            "
          />
        </div>
      </div>

      <div className="mt-6 overflow-x-auto pb-2">
        <div className="flex min-w-max gap-2">
          {categories.map((item) => {
            const active =
              category === item;

            return (
              <button
                key={item}
                type="button"
                onClick={() =>
                  setCategory(item)
                }
                className={`
                  rounded-full
                  px-4
                  py-2
                  text-xs
                  font-semibold
                  transition

                  ${
                    active
                      ? `
                        bg-blue-600
                        text-white
                        shadow-lg
                        shadow-blue-500/15
                      `
                      : `
                        border
                        border-white/60
                        bg-white/45
                        text-slate-500
                        hover:bg-white/80
                        hover:text-slate-900

                        dark:border-white/10
                        dark:bg-white/[0.04]
                        dark:text-slate-400
                        dark:hover:bg-white/[0.07]
                        dark:hover:text-white
                      `
                  }
                `}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      {services.length > 0 ? (
        <motion.div
          layout
          className="
            mt-6
            grid
            grid-cols-1
            gap-3
            md:grid-cols-2
            xl:grid-cols-3
          "
        >
          {services.map(
            (service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                onClick={() =>
                  onServiceClick(service)
                }
              />
            ),
          )}
        </motion.div>
      ) : (
        <EmptyServices />
      )}
    </GlassCard>
  );
}

function ServiceCard({
  service,
  index,
  onClick,
}: {
  service: Service;
  index: number;
  onClick: () => void;
}) {
  const Icon = service.icon;

  return (
    <motion.button
      layout
      type="button"
      onClick={onClick}
      initial={{
        opacity: 0,
        y: 12,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: index * 0.025,
        duration: 0.32,
      }}
      whileHover={{
        y: -3,
      }}
      whileTap={{
        scale: 0.985,
      }}
      className="
        group
        flex
        items-start
        gap-4
        rounded-[22px]
        border
        border-white/70
        bg-white/45
        p-4
        text-left
        transition-colors
        hover:bg-white/75

        dark:border-white/10
        dark:bg-white/[0.035]
        dark:hover:bg-white/[0.065]
      "
    >
      <div
        className="
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          rounded-[16px]
          bg-blue-600/10
          text-blue-700
          transition-all
          duration-300

          group-hover:bg-blue-600
          group-hover:text-white

          dark:bg-blue-500/10
          dark:text-blue-400
          dark:group-hover:bg-blue-500
          dark:group-hover:text-white
        "
      >
        <Icon className="h-[18px] w-[18px]" />
      </div>

      <div className="min-w-0 flex-1">
        <p
          className="
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.1em]
            text-slate-400
            dark:text-slate-500
          "
        >
          {service.category}
        </p>

        <p
          className="
            mt-1.5
            text-sm
            font-semibold
            text-slate-900
            dark:text-slate-100
          "
        >
          {service.title}
        </p>

        <p
          className="
            mt-1.5
            text-xs
            leading-5
            text-slate-500
            dark:text-slate-400
          "
        >
          {service.description}
        </p>
      </div>

      <ChevronRight
        className="
          mt-1
          h-4
          w-4
          shrink-0
          text-slate-300
          transition
          group-hover:translate-x-1
          group-hover:text-blue-600

          dark:text-slate-600
          dark:group-hover:text-blue-400
        "
      />
    </motion.button>
  );
}

function AccountSecurity({
  onManage,
}: {
  onManage: () => void;
}) {
  return (
    <GlassCard className="h-full p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.16em]
              text-blue-600
              dark:text-blue-400
            "
          >
            Account Security
          </p>

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
            Your account looks secure.
          </h2>

          <p
            className="
              mt-2
              max-w-lg
              text-sm
              leading-6
              text-slate-500
              dark:text-slate-300
            "
          >
            Keep your account information
            current and review security
            activity regularly.
          </p>
        </div>

        <div
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-2xl
            bg-emerald-50
            text-emerald-600
            dark:bg-emerald-500/10
            dark:text-emerald-400
          "
        >
          <ShieldCheck className="h-5 w-5" />
        </div>
      </div>

      <div
        className="
          mt-7
          rounded-[22px]
          border
          border-white/60
          bg-white/40
          p-4
          dark:border-white/10
          dark:bg-white/[0.03]
        "
      >
        <SecurityRow
          icon={LockKeyhole}
          label="Password"
          value="Protected"
        />

        <SecurityRow
          icon={Smartphone}
          label="Mobile number"
          value="Registered"
        />

        <SecurityRow
          icon={Mail}
          label="Email address"
          value="Registered"
        />

        <SecurityRow
          icon={Fingerprint}
          label="Identity"
          value="Verified"
          last
        />
      </div>

      <button
        type="button"
        onClick={onManage}
        className="
          mt-5
          flex
          items-center
          gap-2
          text-sm
          font-semibold
          text-blue-700
          transition
          hover:text-blue-800
          dark:text-blue-400
          dark:hover:text-blue-300
        "
      >
        Manage account security
        <ArrowRight className="h-4 w-4" />
      </button>
    </GlassCard>
  );
}

function SecurityRow({
  icon: Icon,
  label,
  value,
  last = false,
}: {
  icon: ElementType;
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className={`
        flex
        items-center
        justify-between
        gap-4
        py-3

        ${
          !last
            ? "border-b border-slate-200/60 dark:border-white/10"
            : ""
        }
      `}
    >
      <div className="flex items-center gap-3">
        <Icon
          className="
            h-4
            w-4
            shrink-0
            text-slate-400
            dark:text-slate-500
          "
        />

        <span
          className="
            text-sm
            text-slate-600
            dark:text-slate-300
          "
        >
          {label}
        </span>
      </div>

      <span
        className="
          flex
          items-center
          gap-1.5
          text-xs
          font-semibold
          text-emerald-600
          dark:text-emerald-400
        "
      >
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        {value}
      </span>
    </div>
  );
}

function NeedHelp({
  onAction,
}: {
  onAction: (id: string) => void;
}) {
  return (
    <GlassCard className="h-full p-5 sm:p-6">
      <p
        className="
          text-xs
          font-semibold
          uppercase
          tracking-[0.16em]
          text-blue-600
          dark:text-blue-400
        "
      >
        Support
      </p>

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
        Need some help?
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
        Find answers, locate a branch, or
        explore available support channels.
      </p>

      <div className="mt-6 space-y-3">
        <SupportAction
          icon={CircleHelp}
          title="Help Center"
          description="Browse common questions and member guides."
          onClick={() =>
            onAction("help-center")
          }
        />

        <SupportAction
          icon={MapPin}
          title="Find an SSS Branch"
          description="Locate a service branch convenient for you."
          onClick={() =>
            onAction("branch-locator")
          }
        />

        <SupportAction
          icon={Headphones}
          title="Contact Support"
          description="Review available official support channels."
          onClick={() =>
            onAction("contact-support")
          }
        />
      </div>
    </GlassCard>
  );
}

function SupportAction({
  icon: Icon,
  title,
  description,
  onClick,
}: {
  icon: ElementType;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        group
        flex
        w-full
        items-center
        gap-3
        rounded-[18px]
        border
        border-white/60
        bg-white/40
        p-3
        text-left
        transition
        hover:bg-white/70

        dark:border-white/10
        dark:bg-white/[0.03]
        dark:hover:bg-white/[0.06]
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
          rounded-[15px]
          bg-blue-600/10
          text-blue-700
          dark:bg-blue-500/10
          dark:text-blue-400
        "
      >
        <Icon className="h-[17px] w-[17px]" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </div>

      <ChevronRight
        className="
          h-4
          w-4
          shrink-0
          text-slate-300
          transition-transform
          group-hover:translate-x-1
          dark:text-slate-600
        "
      />
    </button>
  );
}

function EmptyServices() {
  return (
    <div className="py-16 text-center">
      <div
        className="
          mx-auto
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-2xl
          bg-slate-100
          text-slate-400
          dark:bg-white/[0.05]
          dark:text-slate-500
        "
      >
        <Search className="h-5 w-5" />
      </div>

      <p className="mt-4 text-sm font-semibold text-slate-700 dark:text-slate-200">
        No services found
      </p>

      <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
        Try another search or service
        category.
      </p>
    </div>
  );
}