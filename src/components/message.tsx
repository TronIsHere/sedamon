import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MessageCProps {
  text: String;
}

const MessageC: React.FC<MessageCProps> = ({ text }) => {
  return (
    <div className="message flex items-center">
      <Avatar>
        <AvatarFallback>MO</AvatarFallback>
        <AvatarImage src="https://avatars.githubusercontent.com/u/1000000"></AvatarImage>
      </Avatar>
      <div className="flex flex-col">
        <p className="text-xs ml-2 opacity-60">Mohammad</p>
        <span className="ml-2 bg-[#28292c] p-3 rounded-r-xl rounded-b-xl ">
          {text}
        </span>
      </div>
    </div>
  );
};

export default MessageC;
