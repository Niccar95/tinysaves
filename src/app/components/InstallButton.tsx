"use client";

import {
  BeforeInstallPromptEvent,
  getGlobalPrompt,
  setGlobalPrompt,
  wasInstallable,
} from "@/utils/globalPrompt";
import { useEffect, useState } from "react";

const InstallButton = () => {
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    if (wasInstallable()) {
      setIsInstallable(true);
    }

    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setGlobalPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt as EventListener
    );

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt as EventListener
      );
    };
  }, []);

  const handleInstallClick = async () => {
    const deferredPrompt = getGlobalPrompt();
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      setGlobalPrompt(null);
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
        <div className="pwaMessageCard">
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
