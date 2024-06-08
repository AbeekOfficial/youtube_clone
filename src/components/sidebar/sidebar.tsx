import { CirclePlay, Home } from "lucide-react";
import { Button } from "../button/Button";
import { MdOutlineSubscriptions, MdVideoLibrary } from "react-icons/md";

export default function Sidebar() {
  return (
    <aside className="sticky top-0 overfloew-x-hidden scrollbar-hidden pb-4 flex-col ml-1 px-1 gap-y-48">
      <Button
        variant="ghost"
        className="justify-center text-[12px] font-medium flex flex-col items-center"
      >
        <Home className="text-3xl" />
        Home
      </Button>
      <Button
        variant="ghost"
        className="justify-center text-[12px] font-medium flex flex-col items-center"
      >
        <CirclePlay className="text-3xl" />
        Shorts
      </Button>
      <Button
        variant="ghost"
        className="justify-center text-[12px] font-medium flex flex-col items-center"
      >
        <MdOutlineSubscriptions className="text-3xl" />
        Subscribtions
      </Button>
      <Button
        variant="ghost"
        className="justify-center text-[12px] font-medium flex flex-col items-center"
      >
        <MdVideoLibrary className="text-3xl" />
        You
      </Button>
    </aside>
  );
}
