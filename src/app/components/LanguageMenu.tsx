"use client";
import Image from "next/image";
import React, { useState } from "react";

interface LangMenuProps {
  closeMenu: () => void;
  setCurrentLang: (locale: string) => void;
}

const LanguageMenu = ({ closeMenu, setCurrentLang }: LangMenuProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleChangeLanguage = async (locale: string) => {
    await fetch("/api/locale", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locale }),
    });
    setCurrentLang(locale);
    closeMenu();

    window.location.reload();
  };
  return (
    <>
      {!isEditing && (
        <section className="actionsMenu langMenu">
          <button
            className="actionButton langMenuButton"
            onClick={() => {
              setIsEditing(!isEditing);
              handleChangeLanguage("en");
            }}
          >
            <Image src={"/en.svg"} width={20} height={20} alt="en"></Image>
            English
          </button>
          <button
            className="actionButton langMenuButton"
            onClick={() => {
              setIsEditing(!isEditing);
              handleChangeLanguage("sv");
            }}
          >
            <Image src={"/sv.svg"} width={20} height={20} alt="sv"></Image>
            Svenska
          </button>
          <button
            className="actionButton langMenuButton"
            onClick={() => {
              setIsEditing(!isEditing);
              handleChangeLanguage("es");
            }}
          >
            <Image src={"/es.svg"} width={20} height={20} alt="es"></Image>
            Español
          </button>
        </section>
      )}
    </>
  );
};

export default LanguageMenu;
