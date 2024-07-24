import React, { useMemo } from "react";

const colors = [
  "bg-red-400",
  "bg-blue-400",
  "bg-green-400",
  "bg-yellow-400",
  "bg-purple-400",
  "bg-slate-400",
  "bg-orange-400",
  "bg-pink-400",
  "bg-indigo-400",
  "bg-teal-400",
  "bg-cyan-400",
  "bg-lime-400",
  "bg-amber-400",
  "bg-emerald-400",
  "bg-violet-400",
];

interface VoiceAvatarProps {
  name: string;
  activeTalking?: boolean;
}

const VoiceAvatar: React.FC<VoiceAvatarProps> = ({
  name = "User",
  activeTalking = false,
}) => {
  const avatarColor = useMemo(() => {
    const index =
      Math.abs(
        name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
      ) % colors.length;
    return colors[index];
  }, [name]);

  return (
    <div className="flex flex-col text-center">
      <div
        className={`w-[100px] h-[100px] flex justify-center items-center rounded-full ${avatarColor} ${
          activeTalking ? "ring-4 ring-green-600" : ""
        }`}
      >
        <span className="text-xl">{name.charAt(0) + name.charAt(1)}</span>
      </div>
      <span className="mt-2 text-white">{name}</span>
    </div>
  );
};

export default VoiceAvatar;
