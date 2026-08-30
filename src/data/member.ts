export type MemberProfile = {
    fullName: string;
    email: string;
    mobile: string;
    address: string;
  };
  
  export type TrustedDevice = {
    id: number;
    name: string;
    description: string;
    current?: boolean;
  };
  
  export type ActiveSession = {
    id: number;
    device: string;
    location: string;
    lastActive: string;
    current?: boolean;
  };
  
  export type AccountPrototypeStateV1 = {
    version: 1;
    member: MemberProfile;
    security: {
      twoFactorEnabled: boolean;
    };
    trustedDevices: TrustedDevice[];
    activeSessions: ActiveSession[];
  };
  
  export const accountPrototypeStorageKey =
    "sss-dashboard-account-state";
  
  export const memberStorageKeys = {
    profile: "sss-dashboard-member-profile",
    twoFactor: "sss-dashboard-two-factor",
    trustedDevices: "sss-dashboard-trusted-devices",
    activeSessions: "sss-dashboard-active-sessions",
  } as const;
  
  /*
   * Clearly fictional frontend demo identity.
   * Never place a real SS Number or other authoritative
   * member identifiers in client-side source code.
   */
  export const demoMemberIdentity = {
    ssNumber: "05-1793304-2",
    membershipStatus: "Active Member",
    portalLabel: "SSS Member",
  } as const;
  
  export const defaultMemberProfile: MemberProfile = {
    fullName: "Jay Mark Sales Bolalaque",
    email: "jaymark.bolalaque@icloud.com",
    mobile: "+63 927-423-5045",
    address: "184 Zone 2, Hiwacloy Goa, Camarines Sur",
  };
  
  export const defaultTrustedDevices: TrustedDevice[] = [
    {
      id: 1,
      name: "Windows PC",
      description: "Chrome • Current device",
      current: true,
    },
    {
      id: 2,
      name: "iPhone",
      description: "Safari • Trusted device",
    },
    {
      id: 3,
      name: "iPad",
      description: "Safari • Trusted device",
    },
  ];
  
  export const defaultActiveSessions: ActiveSession[] = [
    {
      id: 1,
      device: "Windows PC • Chrome",
      location: "Philippines",
      lastActive: "Active now",
      current: true,
    },
    {
      id: 2,
      device: "iPhone • Safari",
      location: "Philippines",
      lastActive: "2 hours ago",
    },
    {
      id: 3,
      device: "iPad • Safari",
      location: "Philippines",
      lastActive: "Yesterday",
    },
  ];
  
  export function createDefaultAccountPrototypeState(): AccountPrototypeStateV1 {
    return {
      version: 1,
      member: { ...defaultMemberProfile },
      security: {
        twoFactorEnabled: false,
      },
      trustedDevices: defaultTrustedDevices.map((device) => ({
        ...device,
      })),
      activeSessions: defaultActiveSessions.map((session) => ({
        ...session,
      })),
    };
  }
  
  export function readAccountPrototypeState(): AccountPrototypeStateV1 {
    const stored = readStoredJson(accountPrototypeStorageKey);
  
    if (isAccountPrototypeStateV1(stored)) {
      return cloneAccountPrototypeState(stored);
    }
  
    const migrated = migrateLegacyAccountPrototypeState();
  
    writeAccountPrototypeState(migrated);
    removeLegacyAccountPrototypeStorage();
  
    return migrated;
  }
  
  export function writeAccountPrototypeState(
    state: AccountPrototypeStateV1,
  ) {
    writeStoredJson(
      accountPrototypeStorageKey,
      state,
    );
  }
  
  export function resetStoredAccountPrototypeState() {
    const nextState =
      createDefaultAccountPrototypeState();
  
    writeAccountPrototypeState(nextState);
    removeLegacyAccountPrototypeStorage();
  
    return nextState;
  }
  
  export function readMemberProfile(): MemberProfile {
    return {
      ...readAccountPrototypeState().member,
    };
  }
  
  export function readTrustedDevices(): TrustedDevice[] {
    return readAccountPrototypeState().trustedDevices.map(
      (device) => ({ ...device }),
    );
  }
  
  export function readActiveSessions(): ActiveSession[] {
    return readAccountPrototypeState().activeSessions.map(
      (session) => ({ ...session }),
    );
  }
  
  export function readStoredBoolean(
    key: string,
    fallback: boolean,
  ) {
    if (typeof window === "undefined") {
      return fallback;
    }
  
    try {
      const stored =
        window.localStorage.getItem(key);
  
      if (stored === "true") return true;
      if (stored === "false") return false;
  
      return fallback;
    } catch {
      return fallback;
    }
  }
  
  export function writeStoredJson(
    key: string,
    value: unknown,
  ) {
    if (typeof window === "undefined") {
      return;
    }
  
    try {
      window.localStorage.setItem(
        key,
        JSON.stringify(value),
      );
    } catch {
      // Persistence is optional in this frontend prototype.
    }
  }
  
  export function writeStoredBoolean(
    key: string,
    value: boolean,
  ) {
    if (typeof window === "undefined") {
      return;
    }
  
    try {
      window.localStorage.setItem(
        key,
        String(value),
      );
    } catch {
      // Keep the in-memory prototype state working.
    }
  }
  
  export function getMemberFirstName(
    fullName: string,
  ) {
    const [firstName] =
      fullName
        .trim()
        .split(/\s+/)
        .filter(Boolean);
  
    return firstName || "Member";
  }
  
  export function getMemberDisplayName(
    fullName: string,
  ) {
    const parts =
      fullName
        .trim()
        .split(/\s+/)
        .filter(Boolean);
  
    if (parts.length === 0) {
      return "Member";
    }
  
    return parts.slice(0, 2).join(" ");
  }
  
  function migrateLegacyAccountPrototypeState(): AccountPrototypeStateV1 {
    const nextState =
      createDefaultAccountPrototypeState();
  
    const legacyProfile =
      readStoredJson(
        memberStorageKeys.profile,
      );
  
    if (isMemberProfile(legacyProfile)) {
      nextState.member = {
        ...legacyProfile,
      };
    }
  
    const legacyTwoFactor =
      readStoredBoolean(
        memberStorageKeys.twoFactor,
        false,
      );
  
    nextState.security.twoFactorEnabled =
      legacyTwoFactor;
  
    const legacyDevices =
      readStoredJson(
        memberStorageKeys.trustedDevices,
      );
  
    if (
      Array.isArray(legacyDevices) &&
      legacyDevices.every(isTrustedDevice)
    ) {
      nextState.trustedDevices =
        legacyDevices.map(
          (device) => ({
            ...device,
          }),
        );
    }
  
    const legacySessions =
      readStoredJson(
        memberStorageKeys.activeSessions,
      );
  
    if (
      Array.isArray(legacySessions) &&
      legacySessions.every(isActiveSession)
    ) {
      nextState.activeSessions =
        legacySessions.map(
          (session) => ({
            ...session,
          }),
        );
    }
  
    return nextState;
  }
  
  function removeLegacyAccountPrototypeStorage() {
    if (typeof window === "undefined") {
      return;
    }
  
    try {
      Object.values(
        memberStorageKeys,
      ).forEach((key) => {
        window.localStorage.removeItem(key);
      });
    } catch {
      // Migration cleanup is optional.
    }
  }
  
  function cloneAccountPrototypeState(
    state: AccountPrototypeStateV1,
  ): AccountPrototypeStateV1 {
    return {
      version: 1,
      member: {
        ...state.member,
      },
      security: {
        twoFactorEnabled:
          state.security.twoFactorEnabled,
      },
      trustedDevices:
        state.trustedDevices.map(
          (device) => ({
            ...device,
          }),
        ),
      activeSessions:
        state.activeSessions.map(
          (session) => ({
            ...session,
          }),
        ),
    };
  }
  
  function readStoredJson(
    key: string,
  ): unknown {
    if (typeof window === "undefined") {
      return null;
    }
  
    try {
      const stored =
        window.localStorage.getItem(key);
  
      return stored
        ? JSON.parse(stored)
        : null;
    } catch {
      return null;
    }
  }
  
  function isAccountPrototypeStateV1(
    value: unknown,
  ): value is AccountPrototypeStateV1 {
    if (
      !value ||
      typeof value !== "object"
    ) {
      return false;
    }
  
    const state =
      value as Record<string, unknown>;
  
    if (state.version !== 1) {
      return false;
    }
  
    if (!isMemberProfile(state.member)) {
      return false;
    }
  
    if (
      !state.security ||
      typeof state.security !== "object"
    ) {
      return false;
    }
  
    const security =
      state.security as Record<
        string,
        unknown
      >;
  
    if (
      typeof security.twoFactorEnabled !==
      "boolean"
    ) {
      return false;
    }
  
    if (
      !Array.isArray(
        state.trustedDevices,
      ) ||
      !state.trustedDevices.every(
        isTrustedDevice,
      )
    ) {
      return false;
    }
  
    if (
      !Array.isArray(
        state.activeSessions,
      ) ||
      !state.activeSessions.every(
        isActiveSession,
      )
    ) {
      return false;
    }
  
    return true;
  }
  
  function isMemberProfile(
    value: unknown,
  ): value is MemberProfile {
    if (
      !value ||
      typeof value !== "object"
    ) {
      return false;
    }
  
    const member =
      value as Record<string, unknown>;
  
    return (
      typeof member.fullName === "string" &&
      typeof member.email === "string" &&
      typeof member.mobile === "string" &&
      typeof member.address === "string"
    );
  }
  
  function isTrustedDevice(
    value: unknown,
  ): value is TrustedDevice {
    if (
      !value ||
      typeof value !== "object"
    ) {
      return false;
    }
  
    const device =
      value as Record<string, unknown>;
  
    return (
      typeof device.id === "number" &&
      typeof device.name === "string" &&
      typeof device.description === "string" &&
      (
        device.current === undefined ||
        typeof device.current === "boolean"
      )
    );
  }
  
  function isActiveSession(
    value: unknown,
  ): value is ActiveSession {
    if (
      !value ||
      typeof value !== "object"
    ) {
      return false;
    }
  
    const session =
      value as Record<string, unknown>;
  
    return (
      typeof session.id === "number" &&
      typeof session.device === "string" &&
      typeof session.location === "string" &&
      typeof session.lastActive === "string" &&
      (
        session.current === undefined ||
        typeof session.current === "boolean"
      )
    );
  }
  