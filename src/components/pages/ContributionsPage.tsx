import {
    CalendarDays,
    CheckCircle2,
    ChevronDown,
    Download,
    Filter,
    Search,
    TrendingUp,
    WalletCards,
  } from "lucide-react";
  import { motion } from "framer-motion";
  import { useState } from "react";
  
  import GlassCard from "../ui/GlassCard";
  import AnimatedNumber from "../ui/AnimatedNumber";
  
  const contributionData = [
    {
      month: "August",
      year: 2026,
      amount: 2800,
      source: "Voluntary",
      datePosted: "Aug 18, 2026",
      status: "Posted",
    },
    {
      month: "July",
      year: 2026,
      amount: 2800,
      source: "Voluntary",
      datePosted: "Jul 17, 2026",
      status: "Posted",
    },
    {
      month: "June",
      year: 2026,
      amount: 2800,
      source: "Voluntary",
      datePosted: "Jun 18, 2026",
      status: "Posted",
    },
    {
      month: "May",
      year: 2026,
      amount: 2800,
      source: "Voluntary",
      datePosted: "May 17, 2026",
      status: "Posted",
    },
    {
      month: "April",
      year: 2026,
      amount: 2800,
      source: "Voluntary",
      datePosted: "Apr 16, 2026",
      status: "Posted",
    },
    {
      month: "March",
      year: 2026,
      amount: 2600,
      source: "Employed",
      datePosted: "Mar 19, 2026",
      status: "Posted",
    },
    {
      month: "February",
      year: 2026,
      amount: 2600,
      source: "Employed",
      datePosted: "Feb 18, 2026",
      status: "Posted",
    },
    {
      month: "January",
      year: 2026,
      amount: 2600,
      source: "Employed",
      datePosted: "Jan 17, 2026",
      status: "Posted",
    },
  ];
  
  const chartData = [
    {
      month: "Jan",
      value: 2600,
    },
    {
      month: "Feb",
      value: 2600,
    },
    {
      month: "Mar",
      value: 2600,
    },
    {
      month: "Apr",
      value: 2800,
    },
    {
      month: "May",
      value: 2800,
    },
    {
      month: "Jun",
      value: 2800,
    },
    {
      month: "Jul",
      value: 2800,
    },
    {
      month: "Aug",
      value: 2800,
    },
  ];
  
  const availableYears = [
    2026,
    2025,
    2024,
  ];
  
  export default function ContributionsPage() {
    const [selectedYear, setSelectedYear] =
      useState(2026);
  
    const [search, setSearch] =
      useState("");
  
    const filteredContributions =
      contributionData.filter((item) => {
        const matchesYear =
          item.year === selectedYear;
  
        const term =
          search.toLowerCase();
  
        const matchesSearch =
          item.month
            .toLowerCase()
            .includes(term) ||
          item.source
            .toLowerCase()
            .includes(term);
  
        return (
          matchesYear &&
          matchesSearch
        );
      });
  
    const annualTotal =
      contributionData
        .filter(
          (item) =>
            item.year === selectedYear,
        )
        .reduce(
          (sum, item) =>
            sum + item.amount,
          0,
        );
  
    return (
      <div>
        <PageHeader
          selectedYear={selectedYear}
          setSelectedYear={
            setSelectedYear
          }
        />
  
        <SummaryCards
          annualTotal={annualTotal}
        />
  
        <section
          className="
            mt-4
            grid
            grid-cols-1
            gap-4
            xl:grid-cols-[1.4fr_0.6fr]
          "
        >
          <ContributionChart />
  
          <YearSummary
            total={annualTotal}
          />
        </section>
  
        <section className="mt-4">
          <ContributionHistory
            contributions={
              filteredContributions
            }
            search={search}
            setSearch={setSearch}
          />
        </section>
      </div>
    );
  }
  
  function PageHeader({
    selectedYear,
    setSelectedYear,
  }: {
    selectedYear: number;
    setSelectedYear: (
      year: number,
    ) => void;
  }) {
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
          ease: [
            0.22,
            1,
            0.36,
            1,
          ],
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
                <WalletCards className="h-5 w-5" />
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
                  Member Records
                </p>
  
                <p
                  className="
                    mt-0.5
                    text-xs
                    text-slate-400
                    dark:text-slate-500
                  "
                >
                  Contribution history
                  and posting
                </p>
              </div>
            </div>
  
            <h1
              className="
                mt-7
                text-3xl
                font-semibold
                tracking-[-0.045em]
                text-slate-950
                dark:text-white
                sm:text-4xl
                lg:text-5xl
              "
            >
              Your contributions,
              clearly organized.
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
              Review posted
              contributions, monthly
              payments, and your
              contribution trend.
            </p>
          </div>
  
          <div
            className="
              flex
              flex-wrap
              items-center
              gap-3
            "
          >
            <div
              className="
                relative
                flex
                items-center
                gap-2
                rounded-[18px]
                border
                border-white/70
                bg-white/60
                px-4
                py-3
                dark:border-white/10
                dark:bg-white/[0.05]
              "
            >
              <CalendarDays
                className="
                  h-4
                  w-4
                  text-slate-500
                  dark:text-slate-400
                "
              />
  
              <select
                value={selectedYear}
                onChange={(event) =>
                  setSelectedYear(
                    Number(
                      event.target
                        .value,
                    ),
                  )
                }
                className="
                  appearance-none
                  bg-transparent
                  pr-6
                  text-sm
                  font-semibold
                  text-slate-800
                  outline-none
                  dark:text-slate-100
                "
              >
                {availableYears.map(
                  (year) => (
                    <option
                      key={year}
                      value={year}
                    >
                      {year}
                    </option>
                  ),
                )}
              </select>
  
              <ChevronDown
                className="
                  pointer-events-none
                  absolute
                  right-3
                  h-4
                  w-4
                  text-slate-400
                "
              />
            </div>
  
            <button
              type="button"
              className="
                flex
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
              <Download className="h-4 w-4" />
              Download statement
            </button>
          </div>
        </div>
      </motion.section>
    );
  }
  
  function SummaryCards({
    annualTotal,
  }: {
    annualTotal: number;
  }) {
    const summaries = [
      {
        label: "2026 contributions",
        value: annualTotal,
        prefix: "₱",
        caption:
          "Posted this year",
        icon: WalletCards,
      },
      {
        label: "Months posted",
        value: 8,
        caption:
          "January to August",
        icon: CalendarDays,
      },
      {
        label: "Posting status",
        text: "Up to date",
        caption:
          "Latest payment posted",
        icon: CheckCircle2,
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
        {summaries.map(
          (item) => {
            const Icon =
              item.icon;
  
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
                        value={
                          item.value ??
                          0
                        }
                        prefix={
                          item.prefix
                        }
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
          },
        )}
      </motion.section>
    );
  }
  
  function ContributionChart() {
    const maxValue = Math.max(
      ...chartData.map(
        (item) => item.value,
      ),
    );
  
    return (
      <GlassCard className="p-5 sm:p-6">
        <div
          className="
            flex
            flex-col
            gap-3
            sm:flex-row
            sm:items-start
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
              Contribution Trend
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
              Monthly posting
            </h2>
  
            <p
              className="
                mt-2
                text-sm
                text-slate-500
                dark:text-slate-300
              "
            >
              Posted contribution
              amounts for 2026.
            </p>
          </div>
  
          <div
            className="
              flex
              items-center
              gap-2
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
            <TrendingUp className="h-3.5 w-3.5" />
            Consistent
          </div>
        </div>
  
        <div
          className="
            mt-8
            overflow-x-auto
            pb-2
          "
        >
          <div className="flex h-[220px] min-w-[520px] items-end gap-4">
            {chartData.map(
              (item, index) => {
                const height =
                  (item.value /
                    maxValue) *
                  100;
  
                return (
                  <div
                    key={
                      item.month
                    }
                    className="
                      flex
                      min-w-0
                      flex-1
                      flex-col
                      items-center
                    "
                  >
                    <div
                      className="
                        flex
                        h-[170px]
                        w-full
                        items-end
                        justify-center
                      "
                    >
                      <motion.div
                        initial={{
                          height: 0,
                        }}
                        animate={{
                          height: `${Math.max(
                            height,
                            20,
                          )}%`,
                        }}
                        transition={{
                          delay:
                            0.2 +
                            index *
                              0.05,
                          duration: 0.55,
                          ease: [
                            0.22,
                            1,
                            0.36,
                            1,
                          ],
                        }}
                        className="
                          group
                          relative
                          w-full
                          max-w-[42px]
                          rounded-t-[14px]
                          bg-gradient-to-t
                          from-blue-600
                          to-cyan-400
                          shadow-[0_12px_28px_rgba(37,99,235,0.15)]
                        "
                      >
                        <div
                          className="
                            pointer-events-none
                            absolute
                            -top-9
                            left-1/2
                            -translate-x-1/2
                            whitespace-nowrap
                            rounded-lg
                            bg-slate-950
                            px-2
                            py-1
                            text-[10px]
                            font-semibold
                            text-white
                            opacity-0
                            shadow-lg
                            transition
                            group-hover:opacity-100
                            dark:bg-white
                            dark:text-slate-950
                          "
                        >
                          ₱
                          {item.value.toLocaleString(
                            "en-PH",
                          )}
                        </div>
                      </motion.div>
                    </div>
  
                    <p
                      className="
                        mt-3
                        text-xs
                        font-medium
                        text-slate-500
                        dark:text-slate-400
                      "
                    >
                      {item.month}
                    </p>
                  </div>
                );
              },
            )}
          </div>
        </div>
      </GlassCard>
    );
  }
  
  function YearSummary({
    total,
  }: {
    total: number;
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
          Year Summary
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
          2026 at a glance
        </h2>
  
        <div
          className="
            mt-7
            rounded-[22px]
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
            Total posted
          </p>
  
          <p
            className="
              mt-2
              text-3xl
              font-semibold
              tracking-[-0.04em]
              text-slate-950
              dark:text-white
            "
          >
            ₱
            {total.toLocaleString(
              "en-PH",
            )}
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
              initial={{
                width: 0,
              }}
              animate={{
                width: "67%",
              }}
              transition={{
                delay: 0.5,
                duration: 0.8,
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
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
  
          <p
            className="
              mt-3
              text-xs
              leading-5
              text-slate-500
              dark:text-slate-400
            "
          >
            Eight contribution
            months have been posted
            for the selected year.
          </p>
        </div>
  
        <div className="mt-5 space-y-4">
          <SummaryRow
            label="Latest posting"
            value="August 2026"
          />
  
          <SummaryRow
            label="Latest amount"
            value="₱2,800"
          />
  
          <SummaryRow
            label="Current source"
            value="Voluntary"
          />
  
          <SummaryRow
            label="Status"
            value="Up to date"
            positive
          />
        </div>
      </GlassCard>
    );
  }
  
  function SummaryRow({
    label,
    value,
    positive = false,
  }: {
    label: string;
    value: string;
    positive?: boolean;
  }) {
    return (
      <div
        className="
          flex
          items-center
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
        <span
          className="
            text-sm
            text-slate-500
            dark:text-slate-400
          "
        >
          {label}
        </span>
  
        <span
          className={`
            text-right
            text-sm
            font-semibold
  
            ${
              positive
                ? `
                  text-emerald-600
                  dark:text-emerald-400
                `
                : `
                  text-slate-900
                  dark:text-slate-100
                `
            }
          `}
        >
          {value}
        </span>
      </div>
    );
  }
  
  function ContributionHistory({
    contributions,
    search,
    setSearch,
  }: {
    contributions: typeof contributionData;
    search: string;
    setSearch: (
      value: string,
    ) => void;
  }) {
    return (
      <GlassCard className="p-4 sm:p-6">
        <div
          className="
            flex
            flex-col
            gap-4
            lg:flex-row
            lg:items-end
            lg:justify-between
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
              Records
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
              Contribution History
            </h2>
  
            <p
              className="
                mt-2
                text-sm
                text-slate-500
                dark:text-slate-300
              "
            >
              Review individual
              contribution postings.
            </p>
          </div>
  
          <div className="flex flex-col gap-2 sm:flex-row">
            <div
              className="
                flex
                items-center
                gap-2
                rounded-[16px]
                border
                border-white/70
                bg-white/50
                px-3
                dark:border-white/10
                dark:bg-white/[0.04]
              "
            >
              <Search
                className="
                  h-4
                  w-4
                  text-slate-400
                "
              />
  
              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target
                      .value,
                  )
                }
                placeholder="Search records"
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
                  sm:w-48
                "
              />
            </div>
  
            <button
              type="button"
              className="
                flex
                items-center
                justify-center
                gap-2
                rounded-[16px]
                border
                border-white/70
                bg-white/50
                px-4
                py-3
                text-sm
                font-semibold
                text-slate-700
                transition
                hover:bg-white
                dark:border-white/10
                dark:bg-white/[0.04]
                dark:text-slate-200
                dark:hover:bg-white/[0.07]
              "
            >
              <Filter className="h-4 w-4" />
              Filter
            </button>
          </div>
        </div>
  
        <div className="mt-6 hidden overflow-hidden rounded-[22px] border border-white/60 dark:border-white/10 md:block">
          <table className="w-full border-collapse">
            <thead
              className="
                bg-white/45
                dark:bg-white/[0.035]
              "
            >
              <tr>
                {[
                  "Contribution",
                  "Amount",
                  "Source",
                  "Date Posted",
                  "Status",
                ].map(
                  (heading) => (
                    <th
                      key={
                        heading
                      }
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
                  ),
                )}
              </tr>
            </thead>
  
            <tbody>
              {contributions.map(
                (item) => (
                  <tr
                    key={`${item.month}-${item.year}`}
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
                      {item.month}{" "}
                      {item.year}
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
                      ₱
                      {item.amount.toLocaleString(
                        "en-PH",
                      )}
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
                      {item.source}
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
                      {
                        item.datePosted
                      }
                    </td>
  
                    <td className="px-5 py-4">
                      <StatusBadge />
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
  
        <div className="mt-6 space-y-3 md:hidden">
          {contributions.map(
            (item) => (
              <motion.div
                key={`${item.month}-${item.year}`}
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
                      {item.month}{" "}
                      {item.year}
                    </p>
  
                    <p
                      className="
                        mt-1
                        text-xs
                        text-slate-500
                        dark:text-slate-400
                      "
                    >
                      {item.source}
                    </p>
                  </div>
  
                  <StatusBadge />
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
                  ₱
                  {item.amount.toLocaleString(
                    "en-PH",
                  )}
                </p>
  
                <div
                  className="
                    mt-4
                    flex
                    items-center
                    justify-between
                    border-t
                    border-slate-200/60
                    pt-3
                    dark:border-white/10
                  "
                >
                  <span
                    className="
                      text-xs
                      text-slate-400
                      dark:text-slate-500
                    "
                  >
                    Date posted
                  </span>
  
                  <span
                    className="
                      text-xs
                      font-medium
                      text-slate-600
                      dark:text-slate-300
                    "
                  >
                    {
                      item.datePosted
                    }
                  </span>
                </div>
              </motion.div>
            ),
          )}
        </div>
  
        {contributions.length ===
          0 && (
          <div className="py-16 text-center">
            <p
              className="
                text-sm
                font-medium
                text-slate-600
                dark:text-slate-300
              "
            >
              No contribution
              records found.
            </p>
  
            <p
              className="
                mt-1
                text-xs
                text-slate-400
                dark:text-slate-500
              "
            >
              Try another search
              or year.
            </p>
          </div>
        )}
      </GlassCard>
    );
  }
  
  function StatusBadge() {
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
        Posted
      </span>
    );
  }