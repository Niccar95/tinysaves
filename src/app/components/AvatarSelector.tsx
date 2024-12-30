"use client";
import Image from "next/image";

interface AvatarSelectorProps {
  onAvatarSelect: (image: string) => void;
  onClose: () => void;
}

const AvatarSelector = ({ onAvatarSelect, onClose }: AvatarSelectorProps) => {
  const avatars = [
    { src: "/piggyBank.svg", alt: "piggy bank" },
    { src: "/coffeeCup.svg", alt: "coffee cup" },
    { src: "/hamburger.svg", alt: "hamburger" },
    { src: "/sunglasses.svg", alt: "sunglasses" },
    { src: "/hotDog.svg", alt: "hot dog" },
    { src: "/coins.svg", alt: "coins" },
  ];

  return (
    <section className="avatarSelection">
      {avatars.map((avatar) => (
        <Image
          key={avatar.src}
          className="avatar"
          src={avatar.src}
          alt={avatar.alt}
          height="50"
          width="50"
          onClick={() => {
            onAvatarSelect(avatar.src);
            onClose();
          }}
        />
      ))}
    </section>
  );
};

export default AvatarSelector;
