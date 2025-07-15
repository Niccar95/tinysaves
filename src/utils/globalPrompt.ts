export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

let globalDeferredPrompt: BeforeInstallPromptEvent | null = null;

export const setGlobalPrompt = (e: BeforeInstallPromptEvent | null) => {
  globalDeferredPrompt = e;

  if (e) {
    sessionStorage.setItem("pwa-installable", "true");
  } else {
    sessionStorage.removeItem("pwa-installable");
  }
};

export const getGlobalPrompt = () => globalDeferredPrompt;

export const wasInstallable = () => {
  return typeof window !== "undefined"
    ? sessionStorage.getItem("pwa-installable") === "true"
    : false;
};
