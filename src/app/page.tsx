"use client";

import MessageC from "@/components/message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import { io } from "socket.io-client";

interface IMsgDataTypes {
  roomId: String | number;
  user: String;
  msg: String;
  time: String;
}

export default function Home() {
  const [messages, setMessages] = useState<IMsgDataTypes[]>([]);
  const [name, setName] = useState<string>("");
  const [currentMessage, setCurrentMessage] = useState<IMsgDataTypes | any>();
  const socket = io("http://localhost:3001");
  const router = useRouter();
  socket.emit("join_room", 1);

  const messagesEndRef = React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  useEffect(() => {
    if (localStorage.getItem("name") === "" || !localStorage.getItem("name")) {
      router.push("/login");
      return;
    }
    setName(localStorage.getItem("name")!);
    socket.on("receive_msg", (message: IMsgDataTypes) => {
      console.log(message, 3);
      setMessages((prevMessages: IMsgDataTypes[]) => [
        ...prevMessages,
        message,
      ]);
    });

    // Clean up the effect by removing the listener when the component unmounts
    return () => {
      socket.off("receive_msg");
    };
  }, []);
  const sendMessageEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (currentMessage === "") {
        return;
      }
      const msgData = {
        roomId: 1,
        user: name,
        msg: currentMessage,
        time: new Date().toLocaleTimeString(),
      };
      socket.emit("send_msg", msgData);
      setCurrentMessage("");
    }
  };
  const sendMessage = (e: React.MouseEvent) => {
    if (currentMessage === "") {
      return;
    }
    const msgData = {
      roomId: 1,
      user: name,
      msg: currentMessage,
      time: new Date().toLocaleTimeString(),
    };
    socket.emit("send_msg", msgData);
    setCurrentMessage("");
  };
  return (
    <div className="bg-darkCustom text-white h-screen ">
      <div className="grid grid-cols-1 md:grid-cols-10 max-w-[1300px] mx-auto gap-10">
        <div className="col-span-2 h-screen  pt-10 pr-10 border-r border-gray-600">
          <p className="border-b border-gray-600 pb-2">welcome {name} :D</p>
          <p className="pt-2">people in the chat :</p>
          <div className="flex flex-col justify-between  ">
            <div className="flex flex-col pt-10 max-h-[400px] overflow-y-scroll space-y-2">
              <div className=" border-b   border-zinc-400 py-3 px-2 rounded-lg flex justify-between items-center">
                <p>Mohammad</p>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
              <div className=" border-b   border-zinc-400 py-3 px-2 rounded-lg flex justify-between items-center">
                <p>Mohammad</p>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
              <div className=" border-b   border-zinc-400 py-3 px-2 rounded-lg flex justify-between items-center">
                <p>Mohammad</p>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
              <div className=" border-b   border-zinc-400 py-3 px-2 rounded-lg flex justify-between items-center">
                <p>Mohammad</p>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
              <div className=" border-b   border-zinc-400 py-3 px-2 rounded-lg flex justify-between items-center">
                <p>Mohammad</p>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
              <div className=" border-b   border-zinc-400 py-3 px-2 rounded-lg flex justify-between items-center">
                <p>Mohammad</p>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
              <div className=" border-b   border-zinc-400 py-3 px-2 rounded-lg flex justify-between items-center">
                <p>Mohammad</p>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
              <div className=" border-b   border-zinc-400 py-3 px-2 rounded-lg flex justify-between items-center">
                <p>Mohammad</p>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
              <div className=" border-b   border-zinc-400 py-3 px-2 rounded-lg flex justify-between items-center">
                <p>Mohammad</p>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
              <div className=" border-b   border-zinc-400 py-3 px-2 rounded-lg flex justify-between items-center">
                <p>Mohammad</p>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
            </div>
            <div className="flex flex-col mt-24 space-y-3">
              <Button variant={"ghost"} className="bg-green-500 ">
                Join
              </Button>
              <Button variant={"ghost"} className="bg-red-500 ">
                Leave
              </Button>
            </div>
          </div>
        </div>
        <div className="col-span-8">
          <div className="grid grid-rows-10 h-screen py-5 ">
            <div className="row-span-9 flex flex-col mb-10 overflow-scroll space-y-4">
              <div className="flex flex-col justify-end border-r flex-grow">
                {messages.map((message, index) => (
                  <MessageC
                    key={index}
                    text={message.msg}
                    name={message.user}
                  />
                ))}
                <div ref={messagesEndRef}></div>
              </div>
            </div>
            <div className="bg-[#1c1d1f] rounded-lg flex items-center p-3 justify-between">
              <Input
                className="bg-[#1c1d1f] border-none "
                placeholder="Type Something here..."
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyDown={sendMessageEnter}
              />
              <IoSend
                size={24}
                className="mr-5 cursor-pointer"
                onClick={sendMessage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
