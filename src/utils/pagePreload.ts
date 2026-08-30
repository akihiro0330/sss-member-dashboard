import {
    lazy,
  } from "react";
  
  import type {
    DashboardPage,
  } from "../context/NavigationContext";
  
  const contributionsImporter =
    () =>
      import(
        "../components/pages/ContributionsPage"
      );
  
  const loansImporter =
    () =>
      import(
        "../components/pages/LoansPage"
      );
  
  const benefitsImporter =
    () =>
      import(
        "../components/pages/BenefitsPage"
      );
  
  const servicesImporter =
    () =>
      import(
        "../components/pages/ServicesPage"
      );
  
  const accountImporter =
    () =>
      import(
        "../components/pages/AccountPage"
      );
  
  export const ContributionsPage =
    lazy(
      contributionsImporter,
    );
  
  export const LoansPage =
    lazy(
      loansImporter,
    );
  
  export const BenefitsPage =
    lazy(
      benefitsImporter,
    );
  
  export const ServicesPage =
    lazy(
      servicesImporter,
    );
  
  export const AccountPage =
    lazy(
      accountImporter,
    );
  
  const preloadCache =
    new Set<DashboardPage>();
  
  export function preloadPage(
    page: DashboardPage,
  ) {
    if (
      page === "overview" ||
      preloadCache.has(page)
    ) {
      return;
    }
  
    preloadCache.add(page);
  
    switch (page) {
      case "contributions":
        void contributionsImporter();
        break;
  
      case "loans":
        void loansImporter();
        break;
  
      case "benefits":
        void benefitsImporter();
        break;
  
      case "services":
        void servicesImporter();
        break;
  
      case "account":
        void accountImporter();
        break;
  
      default:
        break;
    }
  }