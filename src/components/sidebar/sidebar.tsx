import { CirclePlay, Home } from "lucide-react";
import { Button } from "../button/Button";
import { MdOutlineSubscriptions, MdVideoLibrary } from "react-icons/md";

export default function Sidebar() {
  return (
    <aside className="sticky top-0 w-14 flex overfloew-x-hidden scrollbar-hidden pb-4 flex-col ml-1 mr-2 px-5 gap-y-6">
      <Button
        variant="ghost"
        className="justify-center text-[10px] ml-[-14px] px-8  font-medium flex flex-col items-center"
      >
        <Home className="text-2xl" />
        Home
      </Button>
      <Button
        variant="ghost"
        className="justify-center text-[10px] ml-[-14px] px-8  font-medium flex flex-col items-center"
      >
        <CirclePlay className="text-2xl" />
        Shorts
      </Button>
      <Button
        variant="ghost"
        className="justify-center text-[10px] ml-[-14px] px-8 font-medium flex flex-col items-center"
      >
        <MdOutlineSubscriptions className="text-2xl" />
        Subscriptions
      </Button>
      <Button
        variant="ghost"
        className="justify-center text-[10px] ml-[-14px] px-8  font-medium flex flex-col items-center"
      >
        <MdVideoLibrary className="text-2xl" />
        You
      </Button>
    </aside>
  );
}
