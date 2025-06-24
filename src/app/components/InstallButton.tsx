"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const InstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt as EventListener
    );

    return () =>
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt as EventListener
      );
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      setDeferredPrompt(null);
      setIsInstallable(false);

      console.log(`User response to the install prompt: ${outcome}`);
    } catch (error) {
      console.error("Error during installation:", error);
    }
  };

  return (
    <>
      {isInstallable ? (
        <div className="pwaMessageCard">
          <p>
            <strong>TinySaves is now installable!</strong> Enjoy a native app
            experience on your desktop or mobile. Click below to install the app
            and access it faster, anytime.
          </p>
          <button className="actionButton" onClick={handleInstallClick}>
            <i className="bi bi-download"></i>
            Install app
          </button>
        </div>
      ) : (
        <div className="pwaMessage">
          <p>
            <strong>Already using TinySaves?</strong> If you&apos;ve installed
            it, you can now launch it from your home screen or app drawer.
          </p>
          <button
            className="actionButton disabled"
            onClick={handleInstallClick}
            disabled
          >
            <i className="bi bi-check-circle-fill"></i>
            Installed
          </button>
        </div>
      )}
    </>
  );
};

export default InstallButton;
