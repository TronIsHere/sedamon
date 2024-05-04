"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginPage = () => {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleButtonClick = () => {
    localStorage.setItem("name", name);

    router.push("/");
  };

  return (
    <div className="flex justify-center items-center bg-darkCustom h-screen">
      <div className="md:w-1/4 w-full h-2/4 bg-[#1c1d1f] flex items-center justify-center flex-col p-10">
        <h1 className="text-white text-xl font-bold mb-20">Login</h1>
        <Input
          className="bg-[#1c1d1f] text-white"
          placeholder="your name"
          value={name}
          onChange={handleInputChange}
        />
        <Button
          variant={"ghost"}
          className="bg-green-500 w-full mt-10"
          onClick={handleButtonClick}
        >
          Join
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
