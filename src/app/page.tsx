"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import VoiceAvatar from "@/components/voiceAvatar";
import Image from "next/image";

export default function Home() {
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState("Erwin");

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleDoneClick = () => {
    setIsEditing(false);
  };

  return (
    <>
      <div className="max-w-[1400px] mx-auto mt-10 ">
        <div className=" flex justify-center text-white flex-col items-center">
          <h1 className="text-white font-bold text-4xl">Voice Chat</h1>
          {isEditing ? (
            <input
              type="text"
              value={userName}
              onChange={handleNameChange}
              className="pt-2"
            />
          ) : (
            <span className="pt-2">user id : {userName}</span>
          )}
        </div>
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-3 gap-4 mt-10">
            <Button variant="secondary">Mute</Button>
            <Button variant="secondary">Deafen</Button>
            {isEditing ? (
              <Button variant="primary" onClick={handleDoneClick}>
                Done
              </Button>
            ) : (
              <Button variant="secondary" onClick={handleEditClick}>
                Change Name
              </Button>
            )}
          </div>
        </div>
        <div className="flex justify-center mt-10">
          <div className=" grid grid-cols-5 gap-4">
            <VoiceAvatar name={userName} activeTalking={true} />
            <VoiceAvatar name="User 2" />
            <VoiceAvatar name="User 3" />
            <VoiceAvatar name="User 4" />
            <VoiceAvatar name="User 5" />
            <VoiceAvatar name="User 6" />
            <VoiceAvatar name="User 7" />
          </div>
        </div>
      </div>
    </>
  );
}
