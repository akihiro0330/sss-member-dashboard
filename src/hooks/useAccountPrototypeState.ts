import {
    useEffect,
    useState,
  } from "react";
  
  import {
    readAccountPrototypeState,
    resetStoredAccountPrototypeState,
    writeAccountPrototypeState,
    type AccountPrototypeStateV1,
    type ActiveSession,
    type MemberProfile,
    type TrustedDevice,
  } from "../data/member";
  
  import {
    useToast,
  } from "../context/ToastContext";
  
  export type MemberFormErrors =
    Partial<
      Record<
        keyof MemberProfile,
        string
      >
    >;
  
  export function useAccountPrototypeState() {
    const {
      showToast,
    } = useToast();
  
    const [
      initialState,
    ] =
      useState<AccountPrototypeStateV1>(
        readAccountPrototypeState,
      );
  
    const [
      member,
      setMember,
    ] =
      useState<MemberProfile>(
        initialState.member,
      );
  
    const [
      memberDraft,
      setMemberDraft,
    ] =
      useState<MemberProfile>(
        initialState.member,
      );
  
    const [
      memberErrors,
      setMemberErrors,
    ] =
      useState<MemberFormErrors>(
        {},
      );
  
    const [
      editMemberOpen,
      setEditMemberOpen,
    ] =
      useState(false);
  
    const [
      savingMember,
      setSavingMember,
    ] =
      useState(false);
  
    const [
      showContactDetails,
      setShowContactDetails,
    ] =
      useState(false);
  
    const [
      twoFactorEnabled,
      setTwoFactorEnabled,
    ] =
      useState(
        initialState.security.twoFactorEnabled,
      );
  
    const [
      devicesOpen,
      setDevicesOpen,
    ] =
      useState(false);
  
    const [
      sessionsOpen,
      setSessionsOpen,
    ] =
      useState(false);
  
    const [
      devices,
      setDevices,
    ] =
      useState<TrustedDevice[]>(
        initialState.trustedDevices,
      );
  
    const [
      sessions,
      setSessions,
    ] =
      useState<ActiveSession[]>(
        initialState.activeSessions,
      );
  
    useEffect(() => {
      const nextState:
        AccountPrototypeStateV1 = {
          version: 1,
  
          member: {
            ...member,
          },
  
          security: {
            twoFactorEnabled,
          },
  
          trustedDevices:
            devices.map(
              (device) => ({
                ...device,
              }),
            ),
  
          activeSessions:
            sessions.map(
              (session) => ({
                ...session,
              }),
            ),
        };
  
      writeAccountPrototypeState(
        nextState,
      );
    }, [
      member,
      twoFactorEnabled,
      devices,
      sessions,
    ]);
  
    function openMemberEditor() {
      setMemberDraft({
        ...member,
      });
  
      setMemberErrors(
        {},
      );
  
      setEditMemberOpen(
        true,
      );
    }
  
    function closeMemberEditor() {
      if (savingMember) {
        return;
      }
  
      setEditMemberOpen(
        false,
      );
  
      setMemberErrors(
        {},
      );
    }
  
    function validateMemberForm() {
      const errors:
        MemberFormErrors =
        {};
  
      if (
        !memberDraft.fullName.trim()
      ) {
        errors.fullName =
          "Full name is required.";
      }
  
      if (
        !memberDraft.email.trim()
      ) {
        errors.email =
          "Email address is required.";
      } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
          memberDraft.email,
        )
      ) {
        errors.email =
          "Enter a valid email address.";
      }
  
      if (
        !memberDraft.mobile.trim()
      ) {
        errors.mobile =
          "Mobile number is required.";
      } else if (
        memberDraft.mobile
          .replace(
            /\D/g,
            "",
          )
          .length < 10
      ) {
        errors.mobile =
          "Enter a valid mobile number.";
      }
  
      if (
        !memberDraft.address.trim()
      ) {
        errors.address =
          "Address is required.";
      }
  
      setMemberErrors(
        errors,
      );
  
      return (
        Object.keys(
          errors,
        ).length === 0
      );
    }
  
    function saveMemberInformation() {
      if (
        !validateMemberForm()
      ) {
        return;
      }
  
      setSavingMember(
        true,
      );
  
      window.setTimeout(
        () => {
          setMember({
            fullName:
              memberDraft.fullName.trim(),
  
            email:
              memberDraft.email.trim(),
  
            mobile:
              memberDraft.mobile.trim(),
  
            address:
              memberDraft.address.trim(),
          });
  
          setSavingMember(
            false,
          );
  
          setEditMemberOpen(
            false,
          );
  
          showToast({
            title:
              "Member information updated",
  
            description:
              "Your prototype profile information has been saved.",
  
            type:
              "success",
          });
        },
        750,
      );
    }
  
    function toggleTwoFactor() {
      const nextValue =
        !twoFactorEnabled;
  
      setTwoFactorEnabled(
        nextValue,
      );
  
      showToast({
        title:
          nextValue
            ? "Two-step verification enabled"
            : "Two-step verification disabled",
  
        description:
          nextValue
            ? "An additional verification step is now enabled in this prototype."
            : "The additional verification step was disabled in this prototype.",
  
        type:
          "success",
      });
    }
  
    function removeDevice(
      id: number,
    ) {
      const device =
        devices.find(
          (item) =>
            item.id === id,
        );
  
      if (
        !device ||
        device.current
      ) {
        return;
      }
  
      setDevices(
        (current) =>
          current.filter(
            (item) =>
              item.id !== id,
          ),
      );
  
      showToast({
        title:
          "Trusted device removed",
  
        description:
          `${device.name} is no longer marked as trusted.`,
  
        type:
          "success",
      });
    }
  
    function terminateSession(
      id: number,
    ) {
      const session =
        sessions.find(
          (item) =>
            item.id === id,
        );
  
      if (
        !session ||
        session.current
      ) {
        return;
      }
  
      setSessions(
        (current) =>
          current.filter(
            (item) =>
              item.id !== id,
          ),
      );
  
      showToast({
        title:
          "Session ended",
  
        description:
          `The session on ${session.device} was terminated.`,
  
        type:
          "success",
      });
    }
  
    function terminateOtherSessions() {
      setSessions(
        (current) =>
          current.filter(
            (session) =>
              session.current,
          ),
      );
  
      showToast({
        title:
          "Other sessions ended",
  
        description:
          "Only your current session remains active.",
  
        type:
          "success",
      });
    }
  
    function resetAccountPrototypeData() {
      const nextState =
        resetStoredAccountPrototypeState();
  
      setMember({
        ...nextState.member,
      });
  
      setMemberDraft({
        ...nextState.member,
      });
  
      setMemberErrors(
        {},
      );
  
      setTwoFactorEnabled(
        nextState.security.twoFactorEnabled,
      );
  
      setDevices(
        nextState.trustedDevices.map(
          (device) => ({
            ...device,
          }),
        ),
      );
  
      setSessions(
        nextState.activeSessions.map(
          (session) => ({
            ...session,
          }),
        ),
      );
  
      setShowContactDetails(
        false,
      );
  
      setEditMemberOpen(
        false,
      );
  
      setDevicesOpen(
        false,
      );
  
      setSessionsOpen(
        false,
      );
  
      showToast({
        title:
          "Demo account data reset",
  
        description:
          "Member profile and prototype security data were restored to their defaults.",
  
        type:
          "success",
      });
    }
  
    return {
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
    };
  }
  