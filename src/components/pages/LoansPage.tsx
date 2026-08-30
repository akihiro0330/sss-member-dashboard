import {
    ArrowUpRight,
    BadgeCheck,
    CalendarDays,
    CheckCircle2,
    Clock3,
    CreditCard,
    FileText,
    Landmark,
    Percent,
    ShieldCheck,
    WalletCards,
  } from "lucide-react";
  import { motion } from "framer-motion";
  
  import GlassCard from "../ui/GlassCard";
  import AnimatedNumber from "../ui/AnimatedNumber";
  
  const loanPrograms = [
    {
      title: "Salary Loan",
      description:
        "Short-term member loan for qualified members with sufficient posted contributions.",
      icon: WalletCards,
      status: "Eligible",
      accent: "blue",
    },
    {
      title: "Calamity Loan",
      description:
        "Financial assistance for qualified members affected by declared calamity areas.",
      icon: ShieldCheck,
      status: "Check availability",
      accent: "cyan",
    },
    {
      title: "Pension Loan",
      description:
        "Loan facility designed for qualified retiree pensioners.",
      icon: Landmark,
      status: "Not applicable",
      accent: "slate",
    },
  ];
  
  const applicationHistory = [
    {
      type: "Salary Loan",
      date: "Mar 18, 2025",
      amount: 20000,
      status: "Completed",
    },
    {
      type: "Salary Loan",
      date: "Aug 09, 2023",
      amount: 15000,
      status: "Completed",
    },
  ];
  
  export default function LoansPage() {
    return (
      <div>
        <LoanHeader />
  
        <LoanSummary />
  
        <section
          className="
            mt-4
            grid
            grid-cols-1
            gap-4
            xl:grid-cols-[1.1fr_0.9fr]
          "
        >
          <EligibilityCard />
          <LoanEstimator />
        </section>
  
        <LoanPrograms />
  
        <section className="mt-4">
          <LoanHistory />
        </section>
      </div>
    );
  }
  
  function LoanHeader() {
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
            -right-24
            -top-28
            h-72
            w-72
            rounded-full
            bg-blue-400/15
            blur-3xl
            dark:bg-blue-500/10
          "
        />
  
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
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
                <CreditCard className="h-5 w-5" />
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
                  Member Loans
                </p>
  
                <p
                  className="
                    mt-0.5
                    text-xs
                    text-slate-400
                    dark:text-slate-500
                  "
                >
                  Eligibility, applications, and repayment
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
              Manage your loans with less guesswork.
            </h1>
  
            <p
              className="
                mt-3
                max-w-2xl
                text-sm
                leading-6
                text-slate-500
                dark:text-slate-300
                sm:text-base
                sm:leading-7
              "
            >
              Review your current loan standing, check available
              programs, and monitor previous applications in one place.
            </p>
          </div>
  
          <button
            type="button"
            className="
              flex
              w-fit
              items-center
              gap-2
              rounded-[18px]
              bg-blue-600
              px-4
              py-3
              text-sm
              font-semibold
              text-white
              shadow-lg
              shadow-blue-500/20
              transition
              hover:-translate-y-0.5
              hover:bg-blue-700
              active:scale-[0.98]
              dark:bg-blue-500
              dark:hover:bg-blue-400
            "
          >
            <FileText className="h-4 w-4" />
            Start loan application
          </button>
        </div>
      </motion.section>
    );
  }
  
  function LoanSummary() {
    const items = [
      {
        label: "Current balance",
        value: 0,
        prefix: "₱",
        caption: "No outstanding loan",
        icon: CreditCard,
      },
      {
        label: "Loan status",
        text: "Clear",
        caption: "No active repayment",
        icon: CheckCircle2,
      },
      {
        label: "Previous loans",
        value: 2,
        caption: "Completed applications",
        icon: FileText,
      },
    ];
  
    return (
      <motion.section
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.08,
            },
          },
        }}
        className="
          mt-4
          grid
          grid-cols-1
          gap-4
          md:grid-cols-3
        "
      >
        {items.map((item) => {
          const Icon = item.icon;
  
          return (
            <motion.div
              key={item.label}
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
            >
              <GlassCard className="h-full p-5 sm:p-6">
                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-2xl
                    bg-blue-600/10
                    text-blue-700
                    dark:bg-blue-500/10
                    dark:text-blue-400
                  "
                >
                  <Icon className="h-4 w-4" />
                </div>
  
                <p
                  className="
                    mt-6
                    text-sm
                    font-medium
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  {item.label}
                </p>
  
                <p
                  className="
                    mt-2
                    text-2xl
                    font-semibold
                    tracking-[-0.04em]
                    text-slate-950
                    dark:text-white
                    sm:text-3xl
                  "
                >
                  {item.text ? (
                    item.text
                  ) : (
                    <AnimatedNumber
                      value={item.value ?? 0}
                      prefix={item.prefix}
                    />
                  )}
                </p>
  
                <p
                  className="
                    mt-2
                    text-sm
                    text-slate-500
                    dark:text-slate-300
                  "
                >
                  {item.caption}
                </p>
              </GlassCard>
            </motion.div>
          );
        })}
      </motion.section>
    );
  }
  
  function EligibilityCard() {
    const requirements = [
      "Sufficient posted contributions",
      "No disqualifying outstanding loan",
      "Updated member information",
      "Valid disbursement account",
    ];
  
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
              Eligibility
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
              Salary loan eligibility
            </h2>
  
            <p
              className="
                mt-2
                max-w-xl
                text-sm
                leading-6
                text-slate-500
                dark:text-slate-300
              "
            >
              Based on the member information currently shown in this
              redesign concept.
            </p>
          </div>
  
          <span
            className="
              flex
              shrink-0
              items-center
              gap-1.5
              rounded-full
              bg-emerald-50
              px-3
              py-2
              text-xs
              font-semibold
              text-emerald-700
              dark:bg-emerald-500/10
              dark:text-emerald-400
            "
          >
            <BadgeCheck className="h-3.5 w-3.5" />
            Eligible
          </span>
        </div>
  
        <div className="mt-7 space-y-3">
          {requirements.map((requirement, index) => (
            <motion.div
              key={requirement}
              initial={{
                opacity: 0,
                x: -10,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 0.15 + index * 0.06,
              }}
              className="
                flex
                items-center
                gap-3
                rounded-[18px]
                border
                border-white/60
                bg-white/45
                p-3
                dark:border-white/10
                dark:bg-white/[0.035]
              "
            >
              <div
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-emerald-50
                  text-emerald-600
                  dark:bg-emerald-500/10
                  dark:text-emerald-400
                "
              >
                <CheckCircle2 className="h-4 w-4" />
              </div>
  
              <span
                className="
                  text-sm
                  font-medium
                  text-slate-700
                  dark:text-slate-200
                "
              >
                {requirement}
              </span>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    );
  }
  
  function LoanEstimator() {
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
          Estimate
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
          Potential loan amount
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
          Illustrative amount only. Final eligibility and approved
          amount would still depend on actual SSS rules and member
          records.
        </p>
  
        <div
          className="
            mt-7
            rounded-[24px]
            border
            border-white/60
            bg-white/45
            p-5
            dark:border-white/10
            dark:bg-white/[0.04]
          "
        >
          <p
            className="
              text-xs
              font-medium
              text-slate-400
              dark:text-slate-500
            "
          >
            Estimated loanable amount
          </p>
  
          <p
            className="
              mt-2
              text-3xl
              font-semibold
              tracking-[-0.045em]
              text-slate-950
              dark:text-white
            "
          >
            ₱20,000
          </p>
  
          <div
            className="
              mt-5
              h-2
              overflow-hidden
              rounded-full
              bg-slate-100
              dark:bg-white/10
            "
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "58%" }}
              transition={{
                delay: 0.35,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                h-full
                rounded-full
                bg-gradient-to-r
                from-blue-600
                to-cyan-400
              "
            />
          </div>
        </div>
  
        <div className="mt-5 space-y-4">
          <LoanMetaRow
            icon={CalendarDays}
            label="Illustrative term"
            value="24 months"
          />
  
          <LoanMetaRow
            icon={Percent}
            label="Interest"
            value="Subject to SSS policy"
          />
  
          <LoanMetaRow
            icon={Clock3}
            label="Processing"
            value="After validation"
          />
        </div>
      </GlassCard>
    );
  }
  
  function LoanMetaRow({
    icon: Icon,
    label,
    value,
  }: {
    icon: typeof CalendarDays;
    label: string;
    value: string;
  }) {
    return (
      <div
        className="
          flex
          items-start
          justify-between
          gap-4
          border-b
          border-slate-200/60
          pb-4
          last:border-0
          last:pb-0
          dark:border-white/10
        "
      >
        <div className="flex items-center gap-2">
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
              text-slate-500
              dark:text-slate-400
            "
          >
            {label}
          </span>
        </div>
  
        <span
          className="
            max-w-[50%]
            text-right
            text-sm
            font-semibold
            text-slate-900
            dark:text-slate-100
          "
        >
          {value}
        </span>
      </div>
    );
  }
  
  function LoanPrograms() {
    return (
      <section className="mt-4">
        <div
          className="
            mb-4
            flex
            flex-col
            gap-2
            sm:flex-row
            sm:items-end
            sm:justify-between
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
              Available Programs
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
              Loan services
            </h2>
          </div>
        </div>
  
        <div
          className="
            grid
            grid-cols-1
            gap-4
            md:grid-cols-2
            xl:grid-cols-3
          "
        >
          {loanPrograms.map((program, index) => {
            const Icon = program.icon;
  
            return (
              <motion.div
                key={program.title}
                initial={{
                  opacity: 0,
                  y: 16,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.06,
                }}
              >
                <GlassCard className="h-full p-5 sm:p-6">
                  <div className="flex h-full flex-col">
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
                      <Icon className="h-5 w-5" />
                    </div>
  
                    <h3
                      className="
                        mt-6
                        text-xl
                        font-semibold
                        tracking-[-0.035em]
                        text-slate-950
                        dark:text-white
                      "
                    >
                      {program.title}
                    </h3>
  
                    <p
                      className="
                        mt-2
                        text-sm
                        leading-6
                        text-slate-500
                        dark:text-slate-300
                      "
                    >
                      {program.description}
                    </p>
  
                    <div className="mt-5">
                      <span
                        className="
                          inline-flex
                          rounded-full
                          bg-slate-100
                          px-3
                          py-1.5
                          text-xs
                          font-semibold
                          text-slate-600
                          dark:bg-white/[0.06]
                          dark:text-slate-300
                        "
                      >
                        {program.status}
                      </span>
                    </div>
  
                    <button
                      type="button"
                      className="
                        group
                        mt-auto
                        flex
                        w-fit
                        items-center
                        gap-2
                        pt-7
                        text-sm
                        font-semibold
                        text-blue-700
                        dark:text-blue-400
                      "
                    >
                      View details
  
                      <ArrowUpRight
                        className="
                          h-4
                          w-4
                          transition-transform
                          group-hover:-translate-y-0.5
                          group-hover:translate-x-0.5
                        "
                      />
                    </button>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </section>
    );
  }
  
  function LoanHistory() {
    return (
      <GlassCard className="p-4 sm:p-6">
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
            History
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
            Previous loan applications
          </h2>
  
          <p
            className="
              mt-2
              text-sm
              text-slate-500
              dark:text-slate-300
            "
          >
            Review completed and previous loan records.
          </p>
        </div>
  
        <div
          className="
            mt-6
            hidden
            overflow-hidden
            rounded-[22px]
            border
            border-white/60
            dark:border-white/10
            md:block
          "
        >
          <table className="w-full border-collapse">
            <thead className="bg-white/45 dark:bg-white/[0.035]">
              <tr>
                {[
                  "Loan Type",
                  "Application Date",
                  "Amount",
                  "Status",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="
                      px-5
                      py-4
                      text-left
                      text-[11px]
                      font-semibold
                      uppercase
                      tracking-[0.08em]
                      text-slate-400
                      dark:text-slate-500
                    "
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
  
            <tbody>
              {applicationHistory.map((item) => (
                <tr
                  key={`${item.type}-${item.date}`}
                  className="
                    border-t
                    border-slate-200/60
                    transition
                    hover:bg-white/40
                    dark:border-white/10
                    dark:hover:bg-white/[0.03]
                  "
                >
                  <td
                    className="
                      px-5
                      py-4
                      text-sm
                      font-semibold
                      text-slate-900
                      dark:text-slate-100
                    "
                  >
                    {item.type}
                  </td>
  
                  <td
                    className="
                      px-5
                      py-4
                      text-sm
                      text-slate-500
                      dark:text-slate-300
                    "
                  >
                    {item.date}
                  </td>
  
                  <td
                    className="
                      px-5
                      py-4
                      text-sm
                      font-semibold
                      text-slate-900
                      dark:text-slate-100
                    "
                  >
                    ₱{item.amount.toLocaleString("en-PH")}
                  </td>
  
                  <td className="px-5 py-4">
                    <CompletedBadge />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        <div className="mt-6 space-y-3 md:hidden">
          {applicationHistory.map((item) => (
            <motion.div
              key={`${item.type}-${item.date}`}
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="
                rounded-[20px]
                border
                border-white/60
                bg-white/45
                p-4
                dark:border-white/10
                dark:bg-white/[0.035]
              "
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p
                    className="
                      text-sm
                      font-semibold
                      text-slate-900
                      dark:text-slate-100
                    "
                  >
                    {item.type}
                  </p>
  
                  <p
                    className="
                      mt-1
                      text-xs
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    {item.date}
                  </p>
                </div>
  
                <CompletedBadge />
              </div>
  
              <p
                className="
                  mt-5
                  text-2xl
                  font-semibold
                  tracking-[-0.04em]
                  text-slate-950
                  dark:text-white
                "
              >
                ₱{item.amount.toLocaleString("en-PH")}
              </p>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    );
  }
  
  function CompletedBadge() {
    return (
      <span
        className="
          inline-flex
          items-center
          gap-1.5
          rounded-full
          bg-emerald-50
          px-2.5
          py-1.5
          text-[11px]
          font-semibold
          text-emerald-700
          dark:bg-emerald-500/10
          dark:text-emerald-400
        "
      >
        <CheckCircle2 className="h-3.5 w-3.5" />
        Completed
      </span>
    );
  }