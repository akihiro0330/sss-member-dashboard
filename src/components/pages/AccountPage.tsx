import type {
  ElementType,
  ReactNode,
  RefObject,
} from "react";

import {
  Bell,
  Check,
  ChevronRight,
  Eye,
  EyeOff,
  Fingerprint,
  KeyRound,
  Laptop,
  LockKeyhole,
  Mail,
  MapPin,
  MonitorSmartphone,
  Moon,
  Palette,
  Pencil,
  Phone,
  RotateCcw,
  Save,
  ShieldCheck,
  Smartphone,
  Sun,
  Trash2,
  UserRound,
  WalletCards,
  X,
} from "lucide-react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import {
  useUI,
} from "../../context/UIContext";

import {
  useNavigation,
} from "../../context/NavigationContext";

import {
  useToast,
} from "../../context/ToastContext";

import {
  type NotificationPreferences,
  useNotifications,
} from "../../context/NotificationContext";

import ActionButton from "../ui/ActionButton";

import {
  useAccessibleOverlay,
} from "../../hooks/useAccessibleOverlay";

import {
  demoMemberIdentity,
} from "../../data/member";

import {
  useAccountPrototypeState,
} from "../../hooks/useAccountPrototypeState";

type SectionId =
  | "member"
  | "security"
  | "preferences"
  | "notifications";

type PasswordErrors = {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
};

export default function AccountPage() {
  const {
    darkMode,
    toggleDarkMode,

    hideSSNumber,
    toggleSSNumberVisibility,

    hideContributions,
    toggleContributionVisibility,
  } = useUI();

  const {
    targetSection,
    clearTargetSection,
  } = useNavigation();

  const {
    showToast,
  } = useToast();

  const memberRef =
    useRef<HTMLDivElement>(null);

  const securityRef =
    useRef<HTMLDivElement>(null);

  const preferencesRef =
    useRef<HTMLDivElement>(null);

  const notificationsRef =
    useRef<HTMLDivElement>(null);

  const sectionVisibilityRef =
    useRef<Record<SectionId, number>>({
      member: 0,
      security: 0,
      preferences: 0,
      notifications: 0,
    });

  const [
    activeSection,
    setActiveSection,
  ] =
    useState<SectionId>(
      "member",
    );

  const {
    member,
    memberDraft,
    setMemberDraft,
    memberErrors,
    editMemberOpen,
    savingMember,
    showContactDetails,
    setShowContactDetails,
    openMemberEditor,
    closeMemberEditor,
    saveMemberInformation,
    twoFactorEnabled,
    toggleTwoFactor,
    devicesOpen,
    setDevicesOpen,
    devices,
    removeDevice,
    sessionsOpen,
    setSessionsOpen,
    sessions,
    terminateSession,
    terminateOtherSessions,
    resetAccountPrototypeData,
  } = useAccountPrototypeState();

  const [
    resetDemoOpen,
    setResetDemoOpen,
  ] =
    useState(false);

  const [
    resettingDemo,
    setResettingDemo,
  ] =
    useState(false);

  const [
    passwordOpen,
    setPasswordOpen,
  ] =
    useState(false);

  const [
    currentPassword,
    setCurrentPassword,
  ] =
    useState("");

  const [
    newPassword,
    setNewPassword,
  ] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] =
    useState("");

  const [
    showCurrentPassword,
    setShowCurrentPassword,
  ] =
    useState(false);

  const [
    showNewPassword,
    setShowNewPassword,
  ] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] =
    useState(false);

  const [
    passwordErrors,
    setPasswordErrors,
  ] =
    useState<PasswordErrors>(
      {},
    );

  const [
    changingPassword,
    setChangingPassword,
  ] =
    useState(false);

  const {
    preferences: notificationPreferences,
    updatePreferences: updateNotificationPreferences,
  } = useNotifications();

  const [
    notificationDraft,
    setNotificationDraft,
  ] =
    useState<NotificationPreferences>(
      notificationPreferences,
    );

  const [
    savingPreferences,
    setSavingPreferences,
  ] =
    useState(false);

  useEffect(() => {
    setNotificationDraft(
      notificationPreferences,
    );
  }, [notificationPreferences]);

  useEffect(() => {
    if (!targetSection) {
      return;
    }

    const refs:
      Record<
        string,
        HTMLDivElement | null
      > = {
        member:
          memberRef.current,

        security:
          securityRef.current,

        preferences:
          preferencesRef.current,

        notifications:
          notificationsRef.current,
      };

    const target =
      refs[targetSection];

    if (!target) {
      return;
    }

    const timeout =
      window.setTimeout(
        () => {
          target.scrollIntoView({
            behavior:
              "smooth",

            block:
              "start",
          });

          setActiveSection(
            targetSection as SectionId,
          );

          clearTargetSection();
        },
        120,
      );

    return () =>
      window.clearTimeout(
        timeout,
      );
  }, [
    targetSection,
    clearTargetSection,
  ]);

  useEffect(() => {
    const sections: Array<{
      id: SectionId;
      element: HTMLDivElement | null;
    }> = [
      {
        id: "member",
        element: memberRef.current,
      },
      {
        id: "security",
        element: securityRef.current,
      },
      {
        id: "preferences",
        element: preferencesRef.current,
      },
      {
        id: "notifications",
        element: notificationsRef.current,
      },
    ];

    const availableSections =
      sections.filter(
        (section): section is {
          id: SectionId;
          element: HTMLDivElement;
        } => Boolean(section.element),
      );

    if (
      availableSections.length === 0 ||
      typeof IntersectionObserver === "undefined"
    ) {
      return;
    }

    const elementToSection =
      new Map<Element, SectionId>(
        availableSections.map(
          (section) => [
            section.element,
            section.id,
          ],
        ),
      );

    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach(
            (entry) => {
              const sectionId =
                elementToSection.get(
                  entry.target,
                );

              if (!sectionId) {
                return;
              }

              sectionVisibilityRef.current[
                sectionId
              ] = entry.isIntersecting
                ? entry.intersectionRatio
                : 0;
            },
          );

          const visibleSection =
            (Object.entries(
              sectionVisibilityRef.current,
            ) as Array<[SectionId, number]>)
              .filter(([, ratio]) => ratio > 0)
              .sort(
                (a, b) => b[1] - a[1],
              )[0];

          if (visibleSection) {
            setActiveSection(
              visibleSection[0],
            );
          }
        },
        {
          // Track the section occupying the main reading zone rather
          // than changing the nav as soon as a card touches the viewport.
          root: null,
          rootMargin: "-14% 0px -38% 0px",
          threshold: [
            0,
            0.05,
            0.15,
            0.3,
            0.5,
            0.75,
          ],
        },
      );

    availableSections.forEach(
      (section) => {
        observer.observe(
          section.element,
        );
      },
    );

    return () => {
      observer.disconnect();

      sectionVisibilityRef.current = {
        member: 0,
        security: 0,
        preferences: 0,
        notifications: 0,
      };
    };
  }, []);

  function scrollToSection(
    section: SectionId,
  ) {
    const refs: Record<
      SectionId,
      RefObject<HTMLDivElement | null>
    > = {
      member:
        memberRef,

      security:
        securityRef,

      preferences:
        preferencesRef,

      notifications:
        notificationsRef,
    };

    setActiveSection(
      section,
    );

    refs[
      section
    ].current?.scrollIntoView(
      {
        behavior:
          "smooth",

        block:
          "start",
      },
    );
  }

  function openResetDemoDialog() {
    setResetDemoOpen(
      true,
    );
  }

  function closeResetDemoDialog() {
    if (
      resettingDemo
    ) {
      return;
    }

    setResetDemoOpen(
      false,
    );
  }

  function confirmResetDemoData() {
    setResettingDemo(
      true,
    );

    window.setTimeout(
      () => {
        resetAccountPrototypeData();

        setResettingDemo(
          false,
        );

        setResetDemoOpen(
          false,
        );

        showToast({
          title:
            "Demo data restored",

          description:
            "Account Center prototype information has been restored to its default state.",

          type:
            "success",
        });
      },
      550,
    );
  }

  function openPasswordDialog() {
    setCurrentPassword(
      "",
    );

    setNewPassword(
      "",
    );

    setConfirmPassword(
      "",
    );

    setPasswordErrors(
      {},
    );

    setShowCurrentPassword(
      false,
    );

    setShowNewPassword(
      false,
    );

    setShowConfirmPassword(
      false,
    );

    setPasswordOpen(
      true,
    );
  }

  function closePasswordDialog() {
    if (
      changingPassword
    ) {
      return;
    }

    setPasswordOpen(
      false,
    );

    setPasswordErrors(
      {},
    );
  }

  function validatePassword() {
    const errors:
      PasswordErrors =
      {};

    if (
      !currentPassword
    ) {
      errors.currentPassword =
        "Enter your current password.";
    }

    if (
      !newPassword
    ) {
      errors.newPassword =
        "Enter a new password.";
    } else if (
      newPassword.length < 8
    ) {
      errors.newPassword =
        "Use at least 8 characters.";
    } else if (
      !/[A-Z]/.test(
        newPassword,
      ) ||
      !/[a-z]/.test(
        newPassword,
      ) ||
      !/\d/.test(
        newPassword,
      )
    ) {
      errors.newPassword =
        "Include uppercase, lowercase, and a number.";
    }

    if (
      !confirmPassword
    ) {
      errors.confirmPassword =
        "Confirm your new password.";
    } else if (
      confirmPassword !==
      newPassword
    ) {
      errors.confirmPassword =
        "Passwords do not match.";
    }

    if (
      currentPassword &&
      newPassword &&
      currentPassword ===
        newPassword
    ) {
      errors.newPassword =
        "New password must be different.";
    }

    setPasswordErrors(
      errors,
    );

    return (
      Object.keys(
        errors,
      ).length === 0
    );
  }

  function changePassword() {
    if (
      !validatePassword()
    ) {
      return;
    }

    setChangingPassword(
      true,
    );

    window.setTimeout(
      () => {
        setChangingPassword(
          false,
        );

        setPasswordOpen(
          false,
        );

        showToast({
          title:
            "Password updated",

          description:
            "Password change completed in this UI prototype.",

          type:
            "success",
        });
      },
      850,
    );
  }

  function updateNotificationDraft(
    key: keyof NotificationPreferences,
  ) {
    setNotificationDraft(
      (current) => ({
        ...current,
        [key]: !current[key],
      }),
    );
  }

  function savePreferences() {
    setSavingPreferences(
      true,
    );

    window.setTimeout(
      () => {
        updateNotificationPreferences(
          notificationDraft,
        );

        setSavingPreferences(
          false,
        );

        showToast({
          title:
            "Notification preferences saved",

          description:
            "Your delivery methods and optional notification categories have been updated.",

          type:
            "success",
        });
      },
      700,
    );
  }

  return (
    <>
      <motion.main
        initial={{
          opacity: 0,
          y: 12,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.42,
          ease: [
            0.22,
            1,
            0.36,
            1,
          ],
        }}
        className="
          mx-auto
          w-full
          max-w-[1500px]
        "
      >
        {/* HEADER */}
        <section
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
              left-[35%]

              h-72
              w-72

              rounded-full

              bg-cyan-300/15

              blur-3xl

              dark:bg-cyan-400/[0.07]
            "
          />

          <div
            className="
              relative

              flex
              flex-col

              gap-6

              lg:flex-row
              lg:items-end
              lg:justify-between
            "
          >
            <div>
              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >
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
                  <UserRound className="h-5 w-5" />
                </div>

                <div>
                  <p
                    className="
                      text-xs
                      font-semibold

                      uppercase

                      tracking-[0.15em]

                      text-blue-600

                      dark:text-blue-400
                    "
                  >
                    My Account
                  </p>

                  <p
                    className="
                      mt-0.5

                      text-xs

                      text-slate-400
                    "
                  >
                    Member settings
                    and preferences
                  </p>
                </div>
              </div>

              <h1
                className="
                  mt-6

                  text-3xl
                  font-semibold

                  tracking-[-0.045em]

                  text-slate-950

                  dark:text-white

                  sm:text-4xl
                  lg:text-5xl
                "
              >
                Account Center
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
                "
              >
                Manage your member information,
                privacy, appearance, notifications,
                and account security.
              </p>
            </div>

            <div
              className="
                flex
                w-fit
                items-center
                gap-2

                rounded-full

                border
                border-emerald-200/70

                bg-emerald-50/70

                px-3
                py-2

                text-xs
                font-semibold

                text-emerald-700

                dark:border-emerald-500/20
                dark:bg-emerald-500/10
                dark:text-emerald-300
              "
            >
              <ShieldCheck className="h-4 w-4" />

              Account protected
            </div>
          </div>
        </section>

        <div
          className="
            mt-5

            grid
            gap-5

            xl:grid-cols-[260px_minmax(0,1fr)]
          "
        >
          {/* SIDE NAVIGATION */}
          <aside
            className="
              glass

              h-fit

              rounded-[26px]

              p-2

              xl:sticky
              xl:top-28
            "
          >
            <AccountNavButton
              active={
                activeSection ===
                "member"
              }
              icon={
                UserRound
              }
              label="Member Information"
              onClick={() =>
                scrollToSection(
                  "member",
                )
              }
            />

            <AccountNavButton
              active={
                activeSection ===
                "security"
              }
              icon={
                ShieldCheck
              }
              label="Security & Login"
              onClick={() =>
                scrollToSection(
                  "security",
                )
              }
            />

            <AccountNavButton
              active={
                activeSection ===
                "preferences"
              }
              icon={
                Palette
              }
              label="Preferences"
              onClick={() =>
                scrollToSection(
                  "preferences",
                )
              }
            />

            <AccountNavButton
              active={
                activeSection ===
                "notifications"
              }
              icon={
                Bell
              }
              label="Notifications"
              onClick={() =>
                scrollToSection(
                  "notifications",
                )
              }
            />
          </aside>

          <div className="space-y-5">
            {/* MEMBER INFORMATION */}
            <AccountSection
              sectionRef={
                memberRef
              }
              eyebrow="Member Profile"
              title="Member Information"
              description="Review and manage the personal and membership information associated with this account."
              icon={
                UserRound
              }
              action={
                <ActionButton
                  variant="secondary"
                  onClick={
                    openMemberEditor
                  }
                >
                  <Pencil className="h-4 w-4" />

                  Edit information
                </ActionButton>
              }
            >
              <div
                className="
                  mb-4

                  flex
                  flex-wrap
                  items-center
                  justify-between

                  gap-3
                "
              >
                <div>
                  <p
                    className="
                      text-xs
                      font-semibold

                      text-slate-500

                      dark:text-slate-300
                    "
                  >
                    Contact privacy
                  </p>

                  <p
                    className="
                      mt-1

                      text-[11px]

                      text-slate-400
                    "
                  >
                    Email and mobile details are masked by default.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowContactDetails(
                      (
                        current,
                      ) =>
                        !current,
                    )
                  }
                  className="
                    flex
                    items-center
                    gap-2

                    rounded-full

                    border
                    border-white/70

                    bg-white/55

                    px-3
                    py-2

                    text-xs
                    font-semibold

                    text-slate-500

                    transition

                    hover:bg-white
                    hover:text-blue-600

                    dark:border-white/10
                    dark:bg-white/[0.05]
                    dark:text-slate-300
                    dark:hover:bg-white/[0.08]
                    dark:hover:text-blue-400
                  "
                >
                  {showContactDetails ? (
                    <EyeOff className="h-3.5 w-3.5" />
                  ) : (
                    <Eye className="h-3.5 w-3.5" />
                  )}

                  {showContactDetails
                    ? "Hide contact details"
                    : "Show contact details"}
                </button>
              </div>

              <div
                className="
                  grid
                  gap-3

                  md:grid-cols-2
                "
              >
                <InfoField
                  label="Full name"
                  value={
                    member.fullName
                  }
                  icon={
                    UserRound
                  }
                />

                <InfoField
                  label="Membership status"
                  value={demoMemberIdentity.membershipStatus}
                  icon={
                    ShieldCheck
                  }
                />

                <InfoField
                  label="Email address"
                  value={
                    showContactDetails
                      ? member.email
                      : maskEmail(
                          member.email,
                        )
                  }
                  icon={
                    Mail
                  }
                />

                <InfoField
                  label="Mobile number"
                  value={
                    showContactDetails
                      ? member.mobile
                      : maskPhone(
                          member.mobile,
                        )
                  }
                  icon={
                    Phone
                  }
                />

                <InfoField
                  label="Registered address"
                  value={
                    member.address
                  }
                  icon={
                    MapPin
                  }
                />

                <div
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
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      gap-3
                    "
                  >
                    <div>
                      <p
                        className="
                          text-xs
                          font-medium

                          text-slate-400
                        "
                      >
                        SS Number
                      </p>

                      <motion.p
                        key={
                          hideSSNumber
                            ? "hidden"
                            : "visible"
                        }
                        initial={{
                          opacity:
                            0.5,
                        }}
                        animate={{
                          opacity:
                            1,
                        }}
                        className="
                          mt-2

                          font-mono

                          text-sm
                          font-semibold

                          tracking-[0.06em]

                          text-slate-800

                          dark:text-slate-200
                        "
                      >
                        {hideSSNumber
                          ? "•••-•••••••-•"
                          : demoMemberIdentity.ssNumber}
                      </motion.p>
                    </div>

                    <button
                      type="button"
                      onClick={
                        toggleSSNumberVisibility
                      }
                      aria-label={
                        hideSSNumber
                          ? "Show SS Number"
                          : "Hide SS Number"
                      }
                      className="
                        flex
                        h-9
                        w-9

                        items-center
                        justify-center

                        rounded-full

                        bg-white/70

                        text-slate-400

                        transition

                        hover:text-blue-600

                        dark:bg-white/[0.06]
                        dark:hover:text-blue-400
                      "
                    >
                      {hideSSNumber ? (
                        <Eye className="h-4 w-4" />
                      ) : (
                        <EyeOff className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div
                className="
                  mt-5

                  rounded-[20px]

                  border
                  border-blue-100

                  bg-blue-50/60

                  p-4

                  dark:border-blue-500/15
                  dark:bg-blue-500/[0.06]
                "
              >
                <div
                  className="
                    flex
                    gap-3
                  "
                >
                  <ShieldCheck
                    className="
                      mt-0.5
                      h-4
                      w-4
                      shrink-0

                      text-blue-600

                      dark:text-blue-400
                    "
                  />

                  <div>
                    <p
                      className="
                        text-sm
                        font-semibold

                        text-blue-800

                        dark:text-blue-300
                      "
                    >
                      Verified member record
                    </p>

                    <p
                      className="
                        mt-1

                        text-xs
                        leading-5

                        text-blue-700/70

                        dark:text-blue-300/70
                      "
                    >
                      This redesign uses demo information only.
                      In a real portal, identity-sensitive fields
                      would be retrieved from authenticated member
                      records and may require verification before
                      changes are accepted.
                    </p>
                  </div>
                </div>
              </div>
            </AccountSection>

            {/* SECURITY */}
            <AccountSection
              sectionRef={
                securityRef
              }
              eyebrow="Security"
              title="Security & Login"
              description="Manage authentication, trusted devices, verification methods, and active sessions."
              icon={
                ShieldCheck
              }
            >
              <div className="space-y-3">
                <SettingRow
                  icon={
                    KeyRound
                  }
                  title="Password"
                  description="Protect your account with a strong and unique password"
                  status="Protected"
                  actionLabel="Change"
                  onClick={
                    openPasswordDialog
                  }
                />

                <ToggleSettingRow
                  icon={
                    Fingerprint
                  }
                  title="Two-step verification"
                  description="Require an additional verification step when signing in"
                  checked={
                    twoFactorEnabled
                  }
                  onChange={
                    toggleTwoFactor
                  }
                />

                <SettingRow
                  icon={
                    Smartphone
                  }
                  title="Trusted devices"
                  description={`${devices.length} ${
                    devices.length ===
                    1
                      ? "device"
                      : "devices"
                  } currently registered`}
                  status={`${devices.length}`}
                  actionLabel="Review"
                  onClick={() =>
                    setDevicesOpen(
                      true,
                    )
                  }
                />

                <SettingRow
                  icon={
                    LockKeyhole
                  }
                  title="Active sessions"
                  description={`${sessions.length} active ${
                    sessions.length ===
                    1
                      ? "session"
                      : "sessions"
                  }`}
                  status={`${sessions.length}`}
                  actionLabel="Manage"
                  onClick={() =>
                    setSessionsOpen(
                      true,
                    )
                  }
                />
              </div>

              <div
                className="
                  mt-5

                  rounded-[20px]

                  border
                  border-emerald-200/60

                  bg-emerald-50/60

                  p-4

                  dark:border-emerald-500/15
                  dark:bg-emerald-500/[0.06]
                "
              >
                <div
                  className="
                    flex
                    items-start
                    gap-3
                  "
                >
                  <ShieldCheck
                    className="
                      mt-0.5
                      h-4
                      w-4
                      shrink-0

                      text-emerald-600

                      dark:text-emerald-400
                    "
                  />

                  <div>
                    <p
                      className="
                        text-sm
                        font-semibold

                        text-emerald-800

                        dark:text-emerald-300
                      "
                    >
                      Security status
                    </p>

                    <p
                      className="
                        mt-1

                        text-xs
                        leading-5

                        text-emerald-700/70

                        dark:text-emerald-300/70
                      "
                    >
                      Your prototype account is protected.
                      {twoFactorEnabled
                        ? " Two-step verification is enabled."
                        : " Enable two-step verification for stronger sign-in protection."}
                    </p>
                  </div>
                </div>
              </div>
            </AccountSection>

            {/* PREFERENCES */}
            <AccountSection
              sectionRef={
                preferencesRef
              }
              eyebrow="Personalization"
              title="Preferences"
              description="Customize appearance and privacy behavior across the member portal."
              icon={
                Palette
              }
            >
              <div className="space-y-3">
                <ToggleSettingRow
                  icon={
                    darkMode
                      ? Sun
                      : Moon
                  }
                  title={
                    darkMode
                      ? "Dark appearance"
                      : "Light appearance"
                  }
                  description="Switch between light and dark portal themes"
                  checked={
                    darkMode
                  }
                  onChange={
                    toggleDarkMode
                  }
                />

                <ToggleSettingRow
                  icon={
                    hideSSNumber
                      ? EyeOff
                      : Eye
                  }
                  title="Hide SS Number"
                  description="Mask your SS Number throughout the dashboard"
                  checked={
                    hideSSNumber
                  }
                  onChange={
                    toggleSSNumberVisibility
                  }
                />

                <ToggleSettingRow
                  icon={
                    WalletCards
                  }
                  title="Hide contribution details"
                  description="Mask contribution totals, counts, and overview data"
                  checked={
                    hideContributions
                  }
                  onChange={
                    toggleContributionVisibility
                  }
                />
              </div>

              <div
                className="
                  mt-6

                  border-t
                  border-white/60

                  pt-6

                  dark:border-white/10
                "
              >
                <div
                  className="
                    rounded-[22px]

                    border
                    border-amber-200/70

                    bg-amber-50/55

                    p-4

                    dark:border-amber-500/15
                    dark:bg-amber-500/[0.055]

                    sm:p-5
                  "
                >
                  <div
                    className="
                      flex
                      flex-col

                      gap-4

                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                    "
                  >
                    <div
                      className="
                        flex
                        min-w-0
                        items-start

                        gap-3
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

                          bg-amber-100/80

                          text-amber-700

                          dark:bg-amber-500/10
                          dark:text-amber-300
                        "
                      >
                        <RotateCcw className="h-4 w-4" />
                      </div>

                      <div className="min-w-0">
                        <p
                          className="
                            text-sm
                            font-semibold

                            text-slate-800

                            dark:text-slate-200
                          "
                        >
                          Prototype data
                        </p>

                        <p
                          className="
                            mt-1

                            max-w-2xl

                            text-xs
                            leading-5

                            text-slate-500

                            dark:text-slate-400
                          "
                        >
                          Restore the demo member profile, two-step
                          verification, trusted devices, and active
                          sessions to their original prototype values.
                          Theme, privacy, and notification preferences
                          are left unchanged.
                        </p>
                      </div>
                    </div>

                    <ActionButton
                      variant="secondary"
                      onClick={
                        openResetDemoDialog
                      }
                      className="
                        shrink-0

                        border-amber-200/80

                        text-amber-700

                        hover:bg-amber-100/70

                        dark:border-amber-500/20
                        dark:text-amber-300
                        dark:hover:bg-amber-500/10
                      "
                    >
                      <RotateCcw className="h-4 w-4" />

                      Reset demo data
                    </ActionButton>
                  </div>
                </div>
              </div>
            </AccountSection>

            {/* NOTIFICATIONS */}
            <AccountSection
              sectionRef={
                notificationsRef
              }
              eyebrow="Communications"
              title="Notification Preferences"
              description="Choose how optional member updates appear and which delivery channels you want to use."
              icon={
                Bell
              }
            >
              <div
                className="
                  rounded-[20px]

                  border
                  border-blue-100

                  bg-blue-50/55

                  p-4

                  dark:border-blue-500/15
                  dark:bg-blue-500/[0.055]
                "
              >
                <div className="flex items-start gap-3">
                  <ShieldCheck
                    className="
                      mt-0.5
                      h-4
                      w-4
                      shrink-0

                      text-blue-600

                      dark:text-blue-400
                    "
                  />

                  <div>
                    <p
                      className="
                        text-sm
                        font-semibold

                        text-blue-800

                        dark:text-blue-300
                      "
                    >
                      Essential account notices stay enabled
                    </p>

                    <p
                      className="
                        mt-1

                        text-xs
                        leading-5

                        text-blue-700/70

                        dark:text-blue-300/70
                      "
                    >
                      Security, sign-in, and important account notices cannot be hidden from the in-portal notification center in this prototype.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <ToggleSettingRow
                  icon={
                    Mail
                  }
                  title="Email notifications"
                  description="Use email as a delivery channel for supported account and service notices"
                  checked={
                    notificationDraft.emailEnabled
                  }
                  onChange={() =>
                    updateNotificationDraft(
                      "emailEnabled",
                    )
                  }
                />

                <ToggleSettingRow
                  icon={
                    Phone
                  }
                  title="SMS notifications"
                  description="Use text messages as a delivery channel for selected alerts"
                  checked={
                    notificationDraft.smsEnabled
                  }
                  onChange={() =>
                    updateNotificationDraft(
                      "smsEnabled",
                    )
                  }
                />

                <div
                  className="
                    my-5
                    border-t
                    border-white/60
                    dark:border-white/10
                  "
                />

                <ToggleSettingRow
                  icon={
                    WalletCards
                  }
                  title="Contribution updates"
                  description="Show contribution posting notices and related reminders in the notification center"
                  checked={
                    notificationDraft.contributionUpdates
                  }
                  onChange={() =>
                    updateNotificationDraft(
                      "contributionUpdates",
                    )
                  }
                />

                <ToggleSettingRow
                  icon={
                    ShieldCheck
                  }
                  title="Benefit reminders"
                  description="Show optional benefit information and reminder notifications"
                  checked={
                    notificationDraft.benefitReminders
                  }
                  onChange={() =>
                    updateNotificationDraft(
                      "benefitReminders",
                    )
                  }
                />

                <ToggleSettingRow
                  icon={
                    Bell
                  }
                  title="Service updates"
                  description="Show portal announcements, maintenance, and service availability notices"
                  checked={
                    notificationDraft.serviceUpdates
                  }
                  onChange={() =>
                    updateNotificationDraft(
                      "serviceUpdates",
                    )
                  }
                />

                <ToggleSettingRow
                  icon={
                    LockKeyhole
                  }
                  title="Account & security notices"
                  description="Important account, identity, and sign-in security notifications"
                  checked={
                    true
                  }
                  disabled
                  badge="Always on"
                  onChange={() => {}}
                />
              </div>

              <div
                className="
                  mt-6

                  flex
                  flex-col
                  gap-3

                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                <p
                  className="
                    max-w-xl

                    text-[11px]
                    leading-5

                    text-slate-400
                  "
                >
                  Category preferences control optional in-portal demo notifications. Email and SMS switches represent delivery preferences only; this frontend prototype does not send real messages.
                </p>

                <ActionButton
                  loading={
                    savingPreferences
                  }
                  loadingText="Saving..."
                  onClick={
                    savePreferences
                  }
                >
                  <Save className="h-4 w-4" />

                  Save preferences
                </ActionButton>
              </div>
            </AccountSection>
          </div>
        </div>
      </motion.main>

      {/* EDIT MEMBER INFORMATION */}
      <SideSheet
        open={
          editMemberOpen
        }
        title="Edit Member Information"
        description="Update the contact information shown in this prototype."
        onClose={
          closeMemberEditor
        }
      >
        <div className="space-y-4">
          <FormField
            label="Full name"
            value={
              memberDraft.fullName
            }
            placeholder="Full name"
            error={
              memberErrors.fullName
            }
            icon={
              UserRound
            }
            onChange={(
              value,
            ) =>
              setMemberDraft(
                (
                  current,
                ) => ({
                  ...current,
                  fullName:
                    value,
                }),
              )
            }
          />

          <FormField
            label="Email address"
            type="email"
            value={
              memberDraft.email
            }
            placeholder="name@example.com"
            error={
              memberErrors.email
            }
            icon={
              Mail
            }
            onChange={(
              value,
            ) =>
              setMemberDraft(
                (
                  current,
                ) => ({
                  ...current,
                  email:
                    value,
                }),
              )
            }
          />

          <FormField
            label="Mobile number"
            type="tel"
            value={
              memberDraft.mobile
            }
            placeholder="+63 912 345 6789"
            error={
              memberErrors.mobile
            }
            icon={
              Phone
            }
            onChange={(
              value,
            ) =>
              setMemberDraft(
                (
                  current,
                ) => ({
                  ...current,
                  mobile:
                    value,
                }),
              )
            }
          />

          <FormField
            label="Registered address"
            value={
              memberDraft.address
            }
            placeholder="Address"
            error={
              memberErrors.address
            }
            icon={
              MapPin
            }
            onChange={(
              value,
            ) =>
              setMemberDraft(
                (
                  current,
                ) => ({
                  ...current,
                  address:
                    value,
                }),
              )
            }
          />

          <div
            className="
              rounded-[18px]

              border
              border-blue-100

              bg-blue-50/60

              p-4

              dark:border-blue-500/15
              dark:bg-blue-500/[0.06]
            "
          >
            <p
              className="
                text-xs
                leading-5

                text-blue-700

                dark:text-blue-300
              "
            >
              This form changes local prototype data only.
              A real SSS portal would require identity
              verification and server-side validation for
              protected member records.
            </p>
          </div>

          <div
            className="
              grid
              grid-cols-2
              gap-3

              pt-2
            "
          >
            <ActionButton
              variant="secondary"
              disabled={
                savingMember
              }
              onClick={
                closeMemberEditor
              }
              fullWidth
            >
              Cancel
            </ActionButton>

            <ActionButton
              loading={
                savingMember
              }
              loadingText="Saving..."
              onClick={
                saveMemberInformation
              }
              fullWidth
            >
              <Save className="h-4 w-4" />

              Save changes
            </ActionButton>
          </div>
        </div>
      </SideSheet>

      {/* CHANGE PASSWORD */}
      <CenteredDialog
        open={
          passwordOpen
        }
        title="Change Password"
        description="Create a strong password for your account."
        onClose={
          closePasswordDialog
        }
      >
        <div className="space-y-4">
          <PasswordField
            label="Current password"
            value={
              currentPassword
            }
            show={
              showCurrentPassword
            }
            error={
              passwordErrors.currentPassword
            }
            onChange={
              setCurrentPassword
            }
            onToggle={() =>
              setShowCurrentPassword(
                (
                  current,
                ) =>
                  !current,
              )
            }
          />

          <PasswordField
            label="New password"
            value={
              newPassword
            }
            show={
              showNewPassword
            }
            error={
              passwordErrors.newPassword
            }
            onChange={
              setNewPassword
            }
            onToggle={() =>
              setShowNewPassword(
                (
                  current,
                ) =>
                  !current,
              )
            }
          />

          <PasswordField
            label="Confirm new password"
            value={
              confirmPassword
            }
            show={
              showConfirmPassword
            }
            error={
              passwordErrors.confirmPassword
            }
            onChange={
              setConfirmPassword
            }
            onToggle={() =>
              setShowConfirmPassword(
                (
                  current,
                ) =>
                  !current,
              )
            }
          />

          <div
            className="
              rounded-[18px]

              bg-slate-50/70

              p-4

              dark:bg-white/[0.035]
            "
          >
            <p
              className="
                text-xs
                font-semibold

                text-slate-600

                dark:text-slate-300
              "
            >
              Password requirements
            </p>

            <div className="mt-3 space-y-2">
              <PasswordRequirement
                met={
                  newPassword.length >=
                  8
                }
                label="At least 8 characters"
              />

              <PasswordRequirement
                met={
                  /[A-Z]/.test(
                    newPassword,
                  ) &&
                  /[a-z]/.test(
                    newPassword,
                  )
                }
                label="Uppercase and lowercase letters"
              />

              <PasswordRequirement
                met={
                  /\d/.test(
                    newPassword,
                  )
                }
                label="At least one number"
              />

              <PasswordRequirement
                met={
                  Boolean(
                    confirmPassword,
                  ) &&
                  confirmPassword ===
                    newPassword
                }
                label="Passwords match"
              />
            </div>
          </div>

          <div
            className="
              grid
              grid-cols-2
              gap-3

              pt-2
            "
          >
            <ActionButton
              variant="secondary"
              disabled={
                changingPassword
              }
              onClick={
                closePasswordDialog
              }
              fullWidth
            >
              Cancel
            </ActionButton>

            <ActionButton
              loading={
                changingPassword
              }
              loadingText="Updating..."
              onClick={
                changePassword
              }
              fullWidth
            >
              Update password
            </ActionButton>
          </div>
        </div>
      </CenteredDialog>

      {/* TRUSTED DEVICES */}
      <SideSheet
        open={
          devicesOpen
        }
        title="Trusted Devices"
        description="Review devices currently trusted by this prototype account."
        onClose={() =>
          setDevicesOpen(
            false,
          )
        }
      >
        <div className="space-y-3">
          {devices.map(
            (
              device,
            ) => (
              <div
                key={
                  device.id
                }
                className="
                  flex
                  items-center
                  justify-between

                  gap-3

                  rounded-[20px]

                  border
                  border-white/60

                  bg-white/45

                  p-4

                  dark:border-white/10
                  dark:bg-white/[0.035]
                "
              >
                <div
                  className="
                    flex
                    min-w-0
                    items-center
                    gap-3
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

                      bg-blue-50

                      text-blue-600

                      dark:bg-blue-500/10
                      dark:text-blue-400
                    "
                  >
                    {device.name ===
                    "Windows PC" ? (
                      <Laptop className="h-4 w-4" />
                    ) : (
                      <Smartphone className="h-4 w-4" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <div
                      className="
                        flex
                        flex-wrap
                        items-center
                        gap-2
                      "
                    >
                      <p
                        className="
                          truncate

                          text-sm
                          font-semibold

                          text-slate-800

                          dark:text-slate-200
                        "
                      >
                        {device.name}
                      </p>

                      {device.current && (
                        <span
                          className="
                            rounded-full

                            bg-emerald-50

                            px-2
                            py-0.5

                            text-[9px]
                            font-semibold

                            text-emerald-700

                            dark:bg-emerald-500/10
                            dark:text-emerald-400
                          "
                        >
                          Current
                        </span>
                      )}
                    </div>

                    <p
                      className="
                        mt-1

                        text-xs

                        text-slate-400
                      "
                    >
                      {device.description}
                    </p>
                  </div>
                </div>

                {!device.current && (
                  <button
                    type="button"
                    onClick={() =>
                      removeDevice(
                        device.id,
                      )
                    }
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0

                      items-center
                      justify-center

                      rounded-full

                      text-slate-400

                      transition

                      hover:bg-red-50
                      hover:text-red-500

                      dark:hover:bg-red-500/10
                      dark:hover:text-red-400
                    "
                    aria-label={`Remove ${device.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            ),
          )}
        </div>

        {devices.length ===
          1 && (
          <EmptyState
            icon={
              MonitorSmartphone
            }
            title="No additional trusted devices"
            description="Only your current device remains trusted."
          />
        )}
      </SideSheet>

      {/* ACTIVE SESSIONS */}
      <SideSheet
        open={
          sessionsOpen
        }
        title="Active Sessions"
        description="Review where this prototype account is currently signed in."
        onClose={() =>
          setSessionsOpen(
            false,
          )
        }
      >
        <div className="space-y-3">
          {sessions.map(
            (
              session,
            ) => (
              <div
                key={
                  session.id
                }
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
                <div
                  className="
                    flex
                    items-start
                    justify-between

                    gap-3
                  "
                >
                  <div
                    className="
                      flex
                      min-w-0
                      gap-3
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

                        bg-blue-50

                        text-blue-600

                        dark:bg-blue-500/10
                        dark:text-blue-400
                      "
                    >
                      <MonitorSmartphone className="h-4 w-4" />
                    </div>

                    <div className="min-w-0">
                      <div
                        className="
                          flex
                          flex-wrap
                          items-center
                          gap-2
                        "
                      >
                        <p
                          className="
                            text-sm
                            font-semibold

                            text-slate-800

                            dark:text-slate-200
                          "
                        >
                          {session.device}
                        </p>

                        {session.current && (
                          <span
                            className="
                              rounded-full

                              bg-emerald-50

                              px-2
                              py-0.5

                              text-[9px]
                              font-semibold

                              text-emerald-700

                              dark:bg-emerald-500/10
                              dark:text-emerald-400
                            "
                          >
                            Current
                          </span>
                        )}
                      </div>

                      <p
                        className="
                          mt-1

                          text-xs

                          text-slate-400
                        "
                      >
                        {session.location}
                        {" • "}
                        {session.lastActive}
                      </p>
                    </div>
                  </div>

                  {!session.current && (
                    <button
                      type="button"
                      onClick={() =>
                        terminateSession(
                          session.id,
                        )
                      }
                      className="
                        rounded-[13px]

                        bg-red-50

                        px-3
                        py-2

                        text-xs
                        font-semibold

                        text-red-600

                        transition

                        hover:bg-red-100

                        dark:bg-red-500/10
                        dark:text-red-400
                        dark:hover:bg-red-500/15
                      "
                    >
                      End
                    </button>
                  )}
                </div>
              </div>
            ),
          )}
        </div>

        {sessions.length >
          1 && (
          <div className="mt-5">
            <ActionButton
              variant="danger"
              fullWidth
              onClick={
                terminateOtherSessions
              }
            >
              End all other sessions
            </ActionButton>
          </div>
        )}
      </SideSheet>

      {/* RESET DEMO DATA */}
      <CenteredDialog
        open={
          resetDemoOpen
        }
        title="Reset demo data?"
        description="Restore the Account Center prototype to its original demo information."
        onClose={
          closeResetDemoDialog
        }
      >
        <div className="space-y-5">
          <div
            className="
              rounded-[20px]

              border
              border-amber-200/70

              bg-amber-50/60

              p-4

              dark:border-amber-500/15
              dark:bg-amber-500/[0.055]
            "
          >
            <div
              className="
                flex
                items-start

                gap-3
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

                  bg-amber-100

                  text-amber-700

                  dark:bg-amber-500/10
                  dark:text-amber-300
                "
              >
                <RotateCcw className="h-4 w-4" />
              </div>

              <div>
                <p
                  className="
                    text-sm
                    font-semibold

                    text-slate-800

                    dark:text-slate-200
                  "
                >
                  The following prototype data will be restored
                </p>

                <ul
                  className="
                    mt-3
                    space-y-2

                    text-xs
                    leading-5

                    text-slate-500

                    dark:text-slate-400
                  "
                >
                  <li>• Demo member profile information</li>
                  <li>• Two-step verification setting</li>
                  <li>• Trusted device list</li>
                  <li>• Active session list</li>
                </ul>
              </div>
            </div>
          </div>

          <p
            className="
              text-xs
              leading-5

              text-slate-400
            "
          >
            Your appearance, SS Number visibility, contribution
            privacy, and notification preferences will not be reset.
            This action affects frontend prototype data only.
          </p>

          <div
            className="
              grid
              grid-cols-2
              gap-3

              pt-1
            "
          >
            <ActionButton
              variant="secondary"
              disabled={
                resettingDemo
              }
              onClick={
                closeResetDemoDialog
              }
              fullWidth
            >
              Cancel
            </ActionButton>

            <ActionButton
              variant="danger"
              loading={
                resettingDemo
              }
              loadingText="Restoring..."
              onClick={
                confirmResetDemoData
              }
              fullWidth
            >
              Reset data
            </ActionButton>
          </div>
        </div>
      </CenteredDialog>
    </>
  );
}

function AccountSection({
  sectionRef,
  eyebrow,
  title,
  description,
  icon: Icon,
  action,
  children,
}: {
  sectionRef:
    RefObject<HTMLDivElement | null>;

  eyebrow: string;

  title: string;

  description: string;

  icon:
    ElementType;

  action?: ReactNode;

  children:
    ReactNode;
}) {
  return (
    <section
      ref={
        sectionRef
      }
      className="
        glass

        scroll-mt-28

        rounded-[28px]

        p-5

        sm:p-6
        lg:p-7
      "
    >
      <div
        className="
          flex
          flex-col

          gap-4

          sm:flex-row
          sm:items-start
          sm:justify-between
        "
      >
        <div
          className="
            flex
            items-start
            gap-3
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

              rounded-2xl

              bg-blue-600/10

              text-blue-700

              dark:bg-blue-500/10
              dark:text-blue-400
            "
          >
            <Icon className="h-5 w-5" />
          </div>

          <div>
            <p
              className="
                text-[10px]
                font-semibold

                uppercase

                tracking-[0.14em]

                text-blue-600

                dark:text-blue-400
              "
            >
              {eyebrow}
            </p>

            <h2
              className="
                mt-1

                text-xl
                font-semibold

                tracking-[-0.03em]

                text-slate-950

                dark:text-white

                sm:text-2xl
              "
            >
              {title}
            </h2>

            <p
              className="
                mt-2

                max-w-2xl

                text-sm
                leading-6

                text-slate-500

                dark:text-slate-300
              "
            >
              {description}
            </p>
          </div>
        </div>

        {action && (
          <div className="shrink-0">
            {action}
          </div>
        )}
      </div>

      <div className="mt-6">
        {children}
      </div>
    </section>
  );
}

function AccountNavButton({
  active,
  icon: Icon,
  label,
  onClick,
}: {
  active: boolean;

  icon:
    ElementType;

  label: string;

  onClick:
    () => void;
}) {
  return (
    <button
      type="button"
      aria-current={
        active
          ? "location"
          : undefined
      }
      onClick={
        onClick
      }
      className={`
        flex
        w-full

        items-center
        justify-between

        rounded-[17px]

        px-3
        py-3

        text-left

        transition

        ${
          active
            ? `
                bg-blue-600
                text-white
                shadow-lg
                shadow-blue-500/20
              `
            : `
                text-slate-600

                hover:bg-white/60
                hover:text-slate-950

                dark:text-slate-300
                dark:hover:bg-white/[0.06]
                dark:hover:text-white
              `
        }
      `}
    >
      <span
        className="
          flex
          items-center
          gap-3

          text-sm
          font-medium
        "
      >
        <Icon className="h-4 w-4" />

        {label}
      </span>

      <ChevronRight className="h-4 w-4" />
    </button>
  );
}

function InfoField({
  label,
  value,
  icon: Icon,
}: {
  label: string;

  value: string;

  icon:
    ElementType;
}) {
  return (
    <div
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
      <div
        className="
          flex
          gap-3
        "
      >
        <Icon
          className="
            mt-0.5
            h-4
            w-4
            shrink-0

            text-blue-600

            dark:text-blue-400
          "
        />

        <div className="min-w-0">
          <p
            className="
              text-xs
              font-medium

              text-slate-400
            "
          >
            {label}
          </p>

          <motion.p
            key={
              value
            }
            initial={{
              opacity:
                0.5,
            }}
            animate={{
              opacity:
                1,
            }}
            className="
              mt-2

              break-words

              text-sm
              font-semibold

              text-slate-800

              dark:text-slate-200
            "
          >
            {value}
          </motion.p>
        </div>
      </div>
    </div>
  );
}

function SettingRow({
  icon: Icon,
  title,
  description,
  status,
  actionLabel,
  onClick,
}: {
  icon:
    ElementType;

  title: string;

  description: string;

  status?: string;

  actionLabel: string;

  onClick:
    () => void;
}) {
  return (
    <div
      className="
        flex
        flex-col

        gap-4

        rounded-[20px]

        border
        border-white/60

        bg-white/40

        p-4

        dark:border-white/10
        dark:bg-white/[0.03]

        sm:flex-row
        sm:items-center
        sm:justify-between
      "
    >
      <div
        className="
          flex
          min-w-0
          gap-3
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

            bg-slate-100/80

            text-slate-600

            dark:bg-white/[0.06]
            dark:text-slate-300
          "
        >
          <Icon className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <div
            className="
              flex
              flex-wrap
              items-center
              gap-2
            "
          >
            <p
              className="
                text-sm
                font-semibold

                text-slate-800

                dark:text-slate-200
              "
            >
              {title}
            </p>

            {status && (
              <span
                className="
                  rounded-full

                  bg-emerald-50

                  px-2
                  py-0.5

                  text-[9px]
                  font-semibold

                  text-emerald-700

                  dark:bg-emerald-500/10
                  dark:text-emerald-400
                "
              >
                {status}
              </span>
            )}
          </div>

          <p
            className="
              mt-1

              text-xs
              leading-5

              text-slate-400
            "
          >
            {description}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={
          onClick
        }
        className="
          shrink-0

          rounded-[14px]

          bg-white/70

          px-4
          py-2

          text-xs
          font-semibold

          text-blue-700

          transition

          hover:bg-white

          dark:bg-white/[0.06]
          dark:text-blue-400
          dark:hover:bg-white/[0.1]
        "
      >
        {actionLabel}
      </button>
    </div>
  );
}

function ToggleSettingRow({
  icon: Icon,
  title,
  description,
  checked,
  onChange,
  disabled = false,
  badge,
}: {
  icon:
    ElementType;

  title: string;

  description: string;

  checked: boolean;

  onChange:
    () => void;

  disabled?: boolean;

  badge?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={
        checked
      }
      disabled={
        disabled
      }
      onClick={
        onChange
      }
      className={`
        flex
        w-full

        items-center
        justify-between

        gap-4

        rounded-[20px]

        border
        border-white/60

        bg-white/40

        p-4

        text-left

        transition

        dark:border-white/10
        dark:bg-white/[0.03]

        ${
          disabled
            ? "cursor-default"
            : "hover:bg-white/60 dark:hover:bg-white/[0.05]"
        }
      `}
    >
      <div
        className="
          flex
          min-w-0
          gap-3
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

            bg-slate-100/80

            text-slate-600

            dark:bg-white/[0.06]
            dark:text-slate-300
          "
        >
          <Icon className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p
              className="
                text-sm
                font-semibold

                text-slate-800

                dark:text-slate-200
              "
            >
              {title}
            </p>

            {badge && (
              <span
                className="
                  rounded-full

                  bg-blue-50

                  px-2
                  py-0.5

                  text-[9px]
                  font-semibold

                  text-blue-700

                  dark:bg-blue-500/10
                  dark:text-blue-400
                "
              >
                {badge}
              </span>
            )}
          </div>

          <p
            className="
              mt-1

              text-xs
              leading-5

              text-slate-400
            "
          >
            {description}
          </p>
        </div>
      </div>

      <span
        className={`
          relative

          h-6
          w-11
          shrink-0

          rounded-full

          transition-colors

          ${
            checked
              ? "bg-blue-600"
              : "bg-slate-200 dark:bg-white/10"
          }

          ${
            disabled
              ? "opacity-70"
              : ""
          }
        `}
      >
        <motion.span
          animate={{
            x:
              checked
                ? 21
                : 3,
          }}
          transition={{
            type:
              "spring",

            stiffness:
              450,

            damping:
              30,
          }}
          className="
            absolute
            top-[3px]

            h-[18px]
            w-[18px]

            rounded-full

            bg-white

            shadow
          "
        />
      </span>
    </button>
  );
}

function FormField({
  label,
  type = "text",
  value,
  placeholder,
  error,
  icon: Icon,
  onChange,
}: {
  label: string;

  type?: string;

  value: string;

  placeholder?: string;

  error?: string;

  icon:
    ElementType;

  onChange:
    (
      value: string,
    ) => void;
}) {
  return (
    <label className="block">
      <span
        className="
          text-xs
          font-semibold

          text-slate-600

          dark:text-slate-300
        "
      >
        {label}
      </span>

      <div
        className={`
          mt-2

          flex
          items-center
          gap-3

          rounded-[17px]

          border

          bg-white/60

          px-3

          transition

          focus-within:ring-4

          dark:bg-white/[0.04]

          ${
            error
              ? `
                  border-red-300
                  focus-within:border-red-400
                  focus-within:ring-red-500/10

                  dark:border-red-500/30
                `
              : `
                  border-white/70

                  focus-within:border-blue-400/60
                  focus-within:ring-blue-500/10

                  dark:border-white/10
                `
          }
        `}
      >
        <Icon
          className="
            h-4
            w-4
            shrink-0

            text-slate-400
          "
        />

        <input
          type={
            type
          }
          value={
            value
          }
          placeholder={
            placeholder
          }
          onChange={(
            event,
          ) =>
            onChange(
              event.target.value,
            )
          }
          className="
            min-h-12
            min-w-0
            flex-1

            bg-transparent

            text-sm

            text-slate-800

            outline-none

            placeholder:text-slate-300

            dark:text-slate-100
            dark:placeholder:text-slate-600
          "
        />
      </div>

      {error && (
        <p
          className="
            mt-1.5

            text-xs

            text-red-500

            dark:text-red-400
          "
        >
          {error}
        </p>
      )}
    </label>
  );
}

function PasswordField({
  label,
  value,
  show,
  error,
  onChange,
  onToggle,
}: {
  label: string;

  value: string;

  show: boolean;

  error?: string;

  onChange:
    (
      value: string,
    ) => void;

  onToggle:
    () => void;
}) {
  return (
    <label className="block">
      <span
        className="
          text-xs
          font-semibold

          text-slate-600

          dark:text-slate-300
        "
      >
        {label}
      </span>

      <div
        className={`
          mt-2

          flex
          items-center
          gap-2

          rounded-[17px]

          border

          bg-white/60

          pl-3
          pr-2

          transition

          focus-within:ring-4

          dark:bg-white/[0.04]

          ${
            error
              ? `
                  border-red-300
                  focus-within:ring-red-500/10

                  dark:border-red-500/30
                `
              : `
                  border-white/70
                  focus-within:ring-blue-500/10

                  dark:border-white/10
                `
          }
        `}
      >
        <LockKeyhole
          className="
            h-4
            w-4
            shrink-0

            text-slate-400
          "
        />

        <input
          type={
            show
              ? "text"
              : "password"
          }
          value={
            value
          }
          onChange={(
            event,
          ) =>
            onChange(
              event.target.value,
            )
          }
          autoComplete="off"
          className="
            min-h-12
            min-w-0
            flex-1

            bg-transparent

            text-sm

            text-slate-800

            outline-none

            dark:text-white
          "
        />

        <button
          type="button"
          onClick={
            onToggle
          }
          className="
            flex
            h-8
            w-8
            shrink-0

            items-center
            justify-center

            rounded-full

            text-slate-400

            transition

            hover:bg-white
            hover:text-blue-600

            dark:hover:bg-white/[0.08]
            dark:hover:text-blue-400
          "
        >
          {show ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>

      {error && (
        <p
          className="
            mt-1.5

            text-xs

            text-red-500

            dark:text-red-400
          "
        >
          {error}
        </p>
      )}
    </label>
  );
}

function PasswordRequirement({
  met,
  label,
}: {
  met: boolean;

  label: string;
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-2
      "
    >
      <div
        className={`
          flex
          h-4
          w-4
          shrink-0

          items-center
          justify-center

          rounded-full

          ${
            met
              ? `
                  bg-emerald-500
                  text-white
                `
              : `
                  bg-slate-200
                  text-slate-400

                  dark:bg-white/10
                `
          }
        `}
      >
        {met && (
          <Check className="h-2.5 w-2.5" />
        )}
      </div>

      <span
        className={`
          text-xs

          ${
            met
              ? `
                  text-emerald-600

                  dark:text-emerald-400
                `
              : `
                  text-slate-400
                `
          }
        `}
      >
        {label}
      </span>
    </div>
  );
}

function SideSheet({
  open,
  title,
  description,
  children,
  onClose,
}: {
  open: boolean;

  title: string;

  description: string;

  children:
    ReactNode;

  onClose:
    () => void;
}) {
  const titleId = useId();
  const descriptionId = useId();

  const {
    overlayRef,
  } = useAccessibleOverlay<HTMLElement>({
    open,
    onClose,
  });

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close panel"
            tabIndex={-1}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={
              onClose
            }
            className="
              fixed
              inset-0

              z-[110]

              cursor-default

              bg-slate-950/30

              backdrop-blur-[6px]

              dark:bg-black/60
            "
          />

          <motion.aside
            ref={overlayRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            tabIndex={-1}
            initial={{
              x: "100%",
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            exit={{
              x: "100%",
              opacity: 0,
            }}
            transition={{
              type:
                "spring",

              stiffness:
                330,

              damping:
                32,
            }}
            className="
              glass-strong

              fixed
              bottom-0
              right-0
              top-0

              z-[120]

              flex
              w-full
              max-w-[500px]
              flex-col

              border-l
              border-white/60

              dark:border-white/10
            "
          >
            <div
              className="
                flex
                items-start
                justify-between

                gap-4

                border-b
                border-slate-200/60

                p-5

                dark:border-white/10

                sm:p-6
              "
            >
              <div>
                <h2
                  id={titleId}
                  className="
                    text-xl
                    font-semibold

                    tracking-[-0.03em]

                    text-slate-950

                    dark:text-white
                  "
                >
                  {title}
                </h2>

                <p
                  id={descriptionId}
                  className="
                    mt-1.5

                    text-sm
                    leading-6

                    text-slate-500

                    dark:text-slate-300
                  "
                >
                  {description}
                </p>
              </div>

              <button
                type="button"
                aria-label="Close panel"
                onClick={
                  onClose
                }
                className="
                  flex
                  h-9
                  w-9
                  shrink-0

                  items-center
                  justify-center

                  rounded-full

                  bg-white/60

                  text-slate-500

                  transition

                  hover:bg-white

                  dark:bg-white/[0.06]
                  dark:text-slate-300
                  dark:hover:bg-white/[0.1]
                "
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div
              className="
                flex-1
                overflow-y-auto

                p-5

                sm:p-6
              "
            >
              {children}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function CenteredDialog({
  open,
  title,
  description,
  children,
  onClose,
}: {
  open: boolean;

  title: string;

  description: string;

  children:
    ReactNode;

  onClose:
    () => void;
}) {
  const titleId = useId();
  const descriptionId = useId();

  const {
    overlayRef,
  } = useAccessibleOverlay({
    open,
    onClose,
  });

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close dialog"
            tabIndex={-1}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={
              onClose
            }
            className="
              fixed
              inset-0

              z-[130]

              cursor-default

              bg-slate-950/30

              backdrop-blur-[6px]

              dark:bg-black/60
            "
          />

          <motion.div
            ref={overlayRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            tabIndex={-1}
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 16,
              scale: 0.97,
            }}
            transition={{
              type:
                "spring",

              stiffness:
                350,

              damping:
                30,
            }}
            className="
              glass-strong

              fixed
              bottom-4
              left-4
              right-4

              z-[140]

              max-h-[calc(100vh-32px)]

              overflow-y-auto

              rounded-[28px]

              p-5

              sm:bottom-auto
              sm:left-1/2
              sm:right-auto
              sm:top-1/2

              sm:w-[480px]

              sm:-translate-x-1/2
              sm:-translate-y-1/2

              sm:p-6
            "
          >
            <div
              className="
                flex
                items-start
                justify-between
                gap-4
              "
            >
              <div>
                <h2
                  id={titleId}
                  className="
                    text-xl
                    font-semibold

                    tracking-[-0.03em]

                    text-slate-950

                    dark:text-white
                  "
                >
                  {title}
                </h2>

                <p
                  id={descriptionId}
                  className="
                    mt-1.5

                    text-sm
                    leading-6

                    text-slate-500

                    dark:text-slate-300
                  "
                >
                  {description}
                </p>
              </div>

              <button
                type="button"
                aria-label="Close dialog"
                onClick={
                  onClose
                }
                className="
                  flex
                  h-9
                  w-9
                  shrink-0

                  items-center
                  justify-center

                  rounded-full

                  bg-white/60

                  text-slate-500

                  transition

                  hover:bg-white

                  dark:bg-white/[0.06]
                  dark:text-slate-300
                "
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-6">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon:
    ElementType;

  title: string;

  description: string;
}) {
  return (
    <div
      className="
        mt-5

        rounded-[20px]

        border
        border-dashed
        border-slate-200

        p-6

        text-center

        dark:border-white/10
      "
    >
      <div
        className="
          mx-auto

          flex
          h-11
          w-11

          items-center
          justify-center

          rounded-2xl

          bg-slate-100

          text-slate-400

          dark:bg-white/[0.05]
        "
      >
        <Icon className="h-5 w-5" />
      </div>

      <p
        className="
          mt-3

          text-sm
          font-semibold

          text-slate-700

          dark:text-slate-200
        "
      >
        {title}
      </p>

      <p
        className="
          mt-1

          text-xs
          leading-5

          text-slate-400
        "
      >
        {description}
      </p>
    </div>
  );
}

function maskEmail(
  email: string,
) {
  const [
    name,
    domain,
  ] =
    email.split("@");

  if (
    !name ||
    !domain
  ) {
    return email;
  }

  const visible =
    name.slice(
      0,
      Math.min(
        2,
        name.length,
      ),
    );

  return `${visible}${"•".repeat(
    Math.max(
      4,
      name.length - 2,
    ),
  )}@${domain}`;
}

function maskPhone(
  phone: string,
) {
  const digits =
    phone.replace(
      /\D/g,
      "",
    );

  if (
    digits.length < 4
  ) {
    return "••••••••••";
  }

  return `+63 ••• ••• ${digits.slice(
    -4,
  )}`;
}