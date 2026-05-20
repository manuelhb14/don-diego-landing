"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

type SiteReviewInstance = {
  unmount: () => void;
};

type SiteReviewApi = {
  mount: (options: {
    title: string;
    subtitle: string;
    projectName: string;
    storageKey: string;
    exportFilenamePrefix: string;
    cssHref: string;
    enableCloudSync?: boolean;
    syncEndpoint?: string;
    authEndpoint?: string;
    locale?: string;
    reviewSessionKey?: string;
    open?: boolean;
  }) => SiteReviewInstance;
  unmount: () => void;
};

declare global {
  interface Window {
    SiteReview?: SiteReviewApi;
    __donDiegoSiteReview?: SiteReviewInstance;
  }
}

const SCRIPT_ID = "site-review-widget-script";
const SCRIPT_SRC = "/site-review/site-review.js";
const CSS_SRC = "/site-review/site-review.css";
const REVIEW_SESSION_KEY = "siteReview::don-diego::enabled";

function isReloadNavigation() {
  const navigation = window.performance.getEntriesByType("navigation")[0] as
    | PerformanceNavigationTiming
    | undefined;

  return navigation?.type === "reload";
}

function ensureScript(onReady: () => void) {
  const existingScript = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;

  if (window.SiteReview) {
    onReady();
    return;
  }

  if (existingScript) {
    existingScript.addEventListener("load", onReady, { once: true });
    return;
  }

  const script = document.createElement("script");
  script.id = SCRIPT_ID;
  script.src = SCRIPT_SRC;
  script.async = true;
  script.addEventListener("load", onReady, { once: true });
  document.body.appendChild(script);
}

export default function SiteReviewLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const reviewParam = searchParams.get("review");

  useEffect(() => {
    const pageReloaded = isReloadNavigation();

    if (reviewParam === "1") {
      window.sessionStorage.setItem(REVIEW_SESSION_KEY, "1");
    } else if (reviewParam === "0" || pageReloaded) {
      window.sessionStorage.removeItem(REVIEW_SESSION_KEY);
    }

    const reviewEnabled =
      reviewParam === "1" ||
      (!pageReloaded && reviewParam !== "0" && window.sessionStorage.getItem(REVIEW_SESSION_KEY) === "1");

    if (!reviewEnabled) {
      window.__donDiegoSiteReview?.unmount();
      window.__donDiegoSiteReview = undefined;
      return;
    }

    let cancelled = false;

    ensureScript(() => {
      if (cancelled || !window.SiteReview) return;

      window.__donDiegoSiteReview = window.SiteReview.mount({
        title: "Don Diego Site Review",
        subtitle: "Add notes, edit copy, preview image swaps, and export a Markdown report.",
        projectName: "Don Diego",
        storageKey: `siteReview::don-diego::${pathname}`,
        exportFilenamePrefix: "don-diego-site-review",
        cssHref: CSS_SRC,
        enableCloudSync: true,
        syncEndpoint: "/api/site-review/notes",
        authEndpoint: "/api/site-review/auth",
        locale: document.documentElement.lang || "",
        reviewSessionKey: REVIEW_SESSION_KEY,
        open: true,
      });
    });

    return () => {
      cancelled = true;
    };
  }, [pathname, reviewParam]);

  return null;
}
