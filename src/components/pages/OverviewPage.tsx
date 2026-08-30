import MemberHero from "../dashboard/MemberHero";
import DashboardCards from "../dashboard/DashboardCards";
import RecentActivity from "../dashboard/RecentActivity";
import QuickActions from "../dashboard/QuickActions";
import NotificationsPanel from "../dashboard/NotificationsPanel";

export default function OverviewPage() {
  return (
    <>
      <MemberHero />

      <DashboardCards />

      <section
        className="
          mt-4
          grid
          grid-cols-1
          gap-4
          xl:grid-cols-[1.45fr_0.9fr]
        "
      >
        <RecentActivity />
        <QuickActions />
      </section>

      <section
        className="
          mt-4
          grid
          grid-cols-1
          gap-4
          lg:grid-cols-[1fr_0.7fr]
        "
      >
        <NotificationsPanel />

        <SavingsCard />
      </section>
    </>
  );
}

function SavingsCard() {
  return (
    <div
      className="
        glass
        group
        relative
        min-h-[300px]
        overflow-hidden
        rounded-[28px]
        p-6
        dark:border-white/10
        dark:bg-white/[0.045]
        sm:p-8
      "
    >
      <div
        className="
          pointer-events-none
          absolute
          -right-24
          -top-24
          h-64
          w-64
          rounded-full
          bg-blue-400/20
          blur-3xl
          transition
          duration-700
          group-hover:scale-110
          dark:bg-blue-500/15
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-28
          -left-16
          h-60
          w-60
          rounded-full
          bg-cyan-300/15
          blur-3xl
          dark:bg-cyan-400/10
        "
      />

      <div className="relative flex h-full flex-col justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span
              className="
                h-2
                w-2
                rounded-full
                bg-blue-500
                shadow-[0_0_0_5px_rgba(59,130,246,0.1)]
              "
            />

            <p
              className="
                text-xs
                font-medium
                uppercase
                tracking-[0.16em]
                text-blue-600
                dark:text-blue-400
              "
            >
              Optional Savings
            </p>
          </div>

          <h2
            className="
              mt-4
              max-w-md
              text-2xl
              font-semibold
              leading-tight
              tracking-[-0.04em]
              text-slate-950
              dark:text-white
              sm:text-3xl
            "
          >
            Build more for your future.
          </h2>

          <p
            className="
              mt-3
              max-w-md
              text-sm
              leading-6
              text-slate-500
              dark:text-slate-400
            "
          >
            Discover voluntary savings programs and other
            services designed to complement your regular SSS
            membership.
          </p>
        </div>

        <button
          type="button"
          className="
            mt-8
            w-fit
            rounded-full
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
          "
        >
          Explore savings
        </button>
      </div>
    </div>
  );
}