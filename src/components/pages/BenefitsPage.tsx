import {
    ArrowRight,
    Baby,
    BriefcaseBusiness,
    CheckCircle2,
    ChevronRight,
    CircleDollarSign,
    Clock3,
    FileCheck2,
    HeartPulse,
    Info,
    Landmark,
    Search,
    ShieldCheck,
    UserRound,
  } from "lucide-react";
  import { motion } from "framer-motion";
  import { useMemo, useState } from "react";
  
  import GlassCard from "../ui/GlassCard";
  
  type BenefitStatus =
    | "Available"
    | "Check eligibility"
    | "Requirements apply";
  
  type Benefit = {
    id: string;
    title: string;
    shortTitle: string;
    description: string;
    icon: typeof HeartPulse;
    status: BenefitStatus;
    category: string;
    requirements: string[];
  };
  
  const benefits: Benefit[] = [
    {
      id: "sickness",
      title: "Sickness Benefit",
      shortTitle: "Sickness",
      description:
        "Daily cash allowance for qualified members who are unable to work because of sickness or injury.",
      icon: HeartPulse,
      status: "Check eligibility",
      category: "Health",
      requirements: [
        "Required number of posted contributions",
        "Qualified sickness or injury",
        "Supporting medical documents",
      ],
    },
    {
      id: "maternity",
      title: "Maternity Benefit",
      shortTitle: "Maternity",
      description:
        "Cash benefit for qualified female members covering childbirth, miscarriage, or emergency termination of pregnancy.",
      icon: Baby,
      status: "Requirements apply",
      category: "Family",
      requirements: [
        "Required posted contributions",
        "Maternity notification",
        "Required supporting documents",
      ],
    },
    {
      id: "disability",
      title: "Disability Benefit",
      shortTitle: "Disability",
      description:
        "Financial support for qualified members who experience partial or total permanent disability.",
      icon: UserRound,
      status: "Check eligibility",
      category: "Protection",
      requirements: [
        "Medical assessment",
        "Required contribution history",
        "Supporting disability documents",
      ],
    },
    {
      id: "retirement",
      title: "Retirement Benefit",
      shortTitle: "Retirement",
      description:
        "Pension or lump-sum benefit for members who satisfy applicable age and contribution requirements.",
      icon: Landmark,
      status: "Check eligibility",
      category: "Retirement",
      requirements: [
        "Applicable retirement age",
        "Required number of contributions",
        "Updated member records",
      ],
    },
    {
      id: "death",
      title: "Death Benefit",
      shortTitle: "Death",
      description:
        "Financial benefit payable to qualified beneficiaries following the death of a covered member.",
      icon: ShieldCheck,
      status: "Requirements apply",
      category: "Protection",
      requirements: [
        "Qualified beneficiaries",
        "Member contribution records",
        "Required supporting documents",
      ],
    },
    {
      id: "funeral",
      title: "Funeral Benefit",
      shortTitle: "Funeral",
      description:
        "Cash benefit that may be granted to the person who paid the funeral expenses of a qualified member.",
      icon: CircleDollarSign,
      status: "Requirements apply",
      category: "Protection",
      requirements: [
        "Proof of funeral expenses",
        "Member eligibility requirements",
        "Required supporting documents",
      ],
    },
    {
      id: "unemployment",
      title: "Unemployment Benefit",
      shortTitle: "Unemployment",
      description:
        "Cash assistance for qualified employees who become involuntarily separated from employment.",
      icon: BriefcaseBusiness,
      status: "Check eligibility",
      category: "Employment",
      requirements: [
        "Involuntary separation",
        "Required contribution history",
        "Applicable certification and documents",
      ],
    },
  ];
  
  const categories = [
    "All",
    "Health",
    "Family",
    "Protection",
    "Retirement",
    "Employment",
  ];
  
  export default function BenefitsPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [search, setSearch] = useState("");
    const [selectedBenefit, setSelectedBenefit] =
      useState<Benefit | null>(null);
  
    const filteredBenefits = useMemo(() => {
      const term = search.trim().toLowerCase();
  
      return benefits.filter((benefit) => {
        const categoryMatches =
          activeCategory === "All" ||
          benefit.category === activeCategory;
  
        const searchMatches =
          !term ||
          benefit.title.toLowerCase().includes(term) ||
          benefit.description.toLowerCase().includes(term) ||
          benefit.category.toLowerCase().includes(term);
  
        return categoryMatches && searchMatches;
      });
    }, [activeCategory, search]);
  
    return (
      <div>
        <BenefitsHeader />
  
        <BenefitsOverview />
  
        <section className="mt-4">
          <BenefitsDirectory
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            search={search}
            setSearch={setSearch}
            benefits={filteredBenefits}
            setSelectedBenefit={setSelectedBenefit}
          />
        </section>
  
        <section className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[1.15fr_0.85fr]">
          <ApplicationStatus />
          <BenefitsHelp />
        </section>
  
        {selectedBenefit && (
          <BenefitDetails
            benefit={selectedBenefit}
            close={() => setSelectedBenefit(null)}
          />
        )}
      </div>
    );
  }
  
  function BenefitsHeader() {
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
  
        <div
          className="
            pointer-events-none
            absolute
            -bottom-32
            left-[30%]
            h-64
            w-64
            rounded-full
            bg-cyan-300/15
            blur-3xl
            dark:bg-cyan-400/10
          "
        />
  
        <div className="relative flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
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
                <ShieldCheck className="h-5 w-5" />
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
                  SSS Benefits
                </p>
  
                <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
                  Protection throughout life's important moments
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
              Support when you need it most.
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
              Explore benefit programs, understand basic requirements,
              and keep track of benefit applications from one
              streamlined member experience.
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
              px-5
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
            Check my eligibility
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </motion.section>
    );
  }
  
  function BenefitsOverview() {
    const items = [
      {
        label: "Benefit programs",
        value: "7",
        caption: "Member benefit categories",
        icon: ShieldCheck,
      },
      {
        label: "Active claims",
        value: "0",
        caption: "No ongoing applications",
        icon: FileCheck2,
      },
      {
        label: "Member status",
        value: "Active",
        caption: "Membership in good standing",
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
        className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3"
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
  
                <p className="mt-6 text-sm font-medium text-slate-500 dark:text-slate-400">
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
                  {item.value}
                </p>
  
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
                  {item.caption}
                </p>
              </GlassCard>
            </motion.div>
          );
        })}
      </motion.section>
    );
  }
  
  function BenefitsDirectory({
    activeCategory,
    setActiveCategory,
    search,
    setSearch,
    benefits,
    setSelectedBenefit,
  }: {
    activeCategory: string;
    setActiveCategory: (category: string) => void;
    search: string;
    setSearch: (search: string) => void;
    benefits: Benefit[];
    setSelectedBenefit: (benefit: Benefit) => void;
  }) {
    return (
      <GlassCard className="p-4 sm:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
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
              Benefits Directory
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
              Explore available benefits
            </h2>
  
            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-300">
              Find the benefit program relevant to your situation.
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
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search benefits"
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
            {categories.map((category) => {
              const active = category === activeCategory;
  
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
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
                  {category}
                </button>
              );
            })}
          </div>
        </div>
  
        {benefits.length > 0 ? (
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
            {benefits.map((benefit, index) => (
              <BenefitCard
                key={benefit.id}
                benefit={benefit}
                index={index}
                onClick={() => setSelectedBenefit(benefit)}
              />
            ))}
          </motion.div>
        ) : (
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
              No benefits found
            </p>
  
            <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
              Try another search or category.
            </p>
          </div>
        )}
      </GlassCard>
    );
  }
  
  function BenefitCard({
    benefit,
    index,
    onClick,
  }: {
    benefit: Benefit;
    index: number;
    onClick: () => void;
  }) {
    const Icon = benefit.icon;
  
    return (
      <motion.button
        layout
        type="button"
        initial={{
          opacity: 0,
          y: 14,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: index * 0.04,
          duration: 0.35,
        }}
        whileHover={{
          y: -4,
        }}
        whileTap={{
          scale: 0.985,
        }}
        onClick={onClick}
        className="
          group
          flex
          min-h-[260px]
          flex-col
          rounded-[24px]
          border
          border-white/70
          bg-white/45
          p-5
          text-left
          shadow-[0_12px_30px_rgba(32,79,125,0.04)]
          transition-colors
          hover:bg-white/70
  
          dark:border-white/10
          dark:bg-white/[0.035]
          dark:hover:bg-white/[0.06]
        "
      >
        <div className="flex items-start justify-between gap-3">
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
              transition
              group-hover:bg-blue-600
              group-hover:text-white
              dark:bg-blue-500/10
              dark:text-blue-400
              dark:group-hover:bg-blue-500
              dark:group-hover:text-white
            "
          >
            <Icon className="h-5 w-5" />
          </div>
  
          <BenefitStatus status={benefit.status} />
        </div>
  
        <p
          className="
            mt-6
            text-[11px]
            font-semibold
            uppercase
            tracking-[0.12em]
            text-slate-400
            dark:text-slate-500
          "
        >
          {benefit.category}
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
          {benefit.title}
        </h3>
  
        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-300">
          {benefit.description}
        </p>
  
        <div
          className="
            mt-auto
            flex
            items-center
            gap-1.5
            pt-6
            text-sm
            font-semibold
            text-blue-700
            dark:text-blue-400
          "
        >
          View benefit
  
          <ChevronRight
            className="
              h-4
              w-4
              transition-transform
              group-hover:translate-x-1
            "
          />
        </div>
      </motion.button>
    );
  }
  
  function BenefitStatus({
    status,
  }: {
    status: BenefitStatus;
  }) {
    if (status === "Available") {
      return (
        <span
          className="
            rounded-full
            bg-emerald-50
            px-2.5
            py-1.5
            text-[10px]
            font-semibold
            text-emerald-700
            dark:bg-emerald-500/10
            dark:text-emerald-400
          "
        >
          Available
        </span>
      );
    }
  
    return (
      <span
        className="
          rounded-full
          bg-blue-50
          px-2.5
          py-1.5
          text-[10px]
          font-semibold
          text-blue-700
          dark:bg-blue-500/10
          dark:text-blue-400
        "
      >
        {status}
      </span>
    );
  }
  
  function ApplicationStatus() {
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
              Applications
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
              Benefit application status
            </h2>
  
            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-300">
              Track submitted benefit claims and applications.
            </p>
          </div>
  
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-blue-600/10
              text-blue-700
              dark:bg-blue-500/10
              dark:text-blue-400
            "
          >
            <FileCheck2 className="h-[18px] w-[18px]" />
          </div>
        </div>
  
        <div
          className="
            mt-7
            flex
            min-h-[180px]
            flex-col
            items-center
            justify-center
            rounded-[22px]
            border
            border-dashed
            border-slate-200
            bg-white/25
            px-5
            text-center
            dark:border-white/10
            dark:bg-white/[0.02]
          "
        >
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-emerald-50
              text-emerald-600
              dark:bg-emerald-500/10
              dark:text-emerald-400
            "
          >
            <CheckCircle2 className="h-5 w-5" />
          </div>
  
          <p className="mt-4 text-sm font-semibold text-slate-900 dark:text-slate-100">
            No active benefit applications
          </p>
  
          <p className="mt-1 max-w-sm text-xs leading-5 text-slate-500 dark:text-slate-400">
            Submitted claims and their processing status will appear
            here.
          </p>
        </div>
      </GlassCard>
    );
  }
  
  function BenefitsHelp() {
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
          Before You Apply
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
          Prepare your application.
        </h2>
  
        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-300">
          Requirements vary depending on the benefit and the member's
          circumstances.
        </p>
  
        <div className="mt-6 space-y-3">
          <HelpRow
            icon={UserRound}
            title="Review member information"
            description="Make sure your personal and contact information is current."
          />
  
          <HelpRow
            icon={FileCheck2}
            title="Prepare supporting documents"
            description="Required documents depend on the benefit being claimed."
          />
  
          <HelpRow
            icon={Clock3}
            title="Check filing requirements"
            description="Some benefits may have specific filing periods or conditions."
          />
        </div>
      </GlassCard>
    );
  }
  
  function HelpRow({
    icon: Icon,
    title,
    description,
  }: {
    icon: typeof UserRound;
    title: string;
    description: string;
  }) {
    return (
      <div
        className="
          flex
          gap-3
          rounded-[18px]
          border
          border-white/60
          bg-white/40
          p-3
          dark:border-white/10
          dark:bg-white/[0.03]
        "
      >
        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-[14px]
            bg-blue-600/10
            text-blue-700
            dark:bg-blue-500/10
            dark:text-blue-400
          "
        >
          <Icon className="h-4 w-4" />
        </div>
  
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            {title}
          </p>
  
          <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
            {description}
          </p>
        </div>
      </div>
    );
  }
  
  function BenefitDetails({
    benefit,
    close,
  }: {
    benefit: Benefit;
    close: () => void;
  }) {
    const Icon = benefit.icon;
  
    return (
      <>
        <motion.button
          type="button"
          aria-label="Close benefit details"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={close}
          className="
            fixed
            inset-0
            z-[80]
            cursor-default
            bg-slate-950/20
            backdrop-blur-sm
            dark:bg-black/40
          "
        />
  
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
            scale: 0.98,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.28,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            glass-strong
            fixed
            bottom-4
            left-4
            right-4
            z-[90]
            max-h-[calc(100vh-32px)]
            overflow-y-auto
            rounded-[30px]
            p-5
  
            md:bottom-auto
            md:left-auto
            md:right-8
            md:top-1/2
            md:w-[460px]
            md:-translate-y-1/2
            md:p-7
  
            lg:right-10
            xl:right-12
          "
        >
          <div className="flex items-start justify-between gap-4">
            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-[18px]
                bg-blue-600
                text-white
                shadow-lg
                shadow-blue-500/20
              "
            >
              <Icon className="h-5 w-5" />
            </div>
  
            <button
              type="button"
              onClick={close}
              className="
                rounded-full
                bg-slate-100
                px-3
                py-2
                text-xs
                font-semibold
                text-slate-600
                transition
                hover:bg-slate-200
                dark:bg-white/[0.06]
                dark:text-slate-300
                dark:hover:bg-white/[0.1]
              "
            >
              Close
            </button>
          </div>
  
          <p
            className="
              mt-7
              text-xs
              font-semibold
              uppercase
              tracking-[0.14em]
              text-blue-600
              dark:text-blue-400
            "
          >
            {benefit.category}
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
            {benefit.title}
          </h2>
  
          <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-300">
            {benefit.description}
          </p>
  
          <div
            className="
              mt-6
              rounded-[22px]
              border
              border-white/60
              bg-white/45
              p-4
              dark:border-white/10
              dark:bg-white/[0.04]
            "
          >
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
  
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Basic requirements
              </p>
            </div>
  
            <div className="mt-4 space-y-3">
              {benefit.requirements.map((requirement) => (
                <div
                  key={requirement}
                  className="flex items-start gap-2.5"
                >
                  <CheckCircle2
                    className="
                      mt-0.5
                      h-4
                      w-4
                      shrink-0
                      text-emerald-500
                    "
                  />
  
                  <span className="text-sm leading-5 text-slate-600 dark:text-slate-300">
                    {requirement}
                  </span>
                </div>
              ))}
            </div>
          </div>
  
          <div
            className="
              mt-5
              rounded-[18px]
              bg-blue-50/80
              p-4
              dark:bg-blue-500/[0.08]
            "
          >
            <p className="text-xs leading-5 text-blue-800 dark:text-blue-300">
              Eligibility shown in this redesign is illustrative.
              Actual qualification should be determined from official
              member records and current SSS policies.
            </p>
          </div>
  
          <button
            type="button"
            className="
              mt-6
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-[18px]
              bg-blue-600
              px-5
              py-3.5
              text-sm
              font-semibold
              text-white
              shadow-lg
              shadow-blue-500/20
              transition
              hover:bg-blue-700
              active:scale-[0.98]
              dark:bg-blue-500
              dark:hover:bg-blue-400
            "
          >
            Check eligibility
  
            <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>
      </>
    );
  }