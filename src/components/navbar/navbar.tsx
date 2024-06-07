import { Menu } from "lucide-react";
import Logo from "../../assets/logo.jpg";
import SearchBar from "../search-bar/searchBar";
import { Notifications, VideoCall } from "@mui/icons-material";
import "../../index.css";
import NavbarContainer from "../../ui/navbar-container";

export default function Navbar() {
  return (
    <NavbarContainer>
      <header
        className={`sticky z-20 top-0 right-0 left-0  py-8 px-4 mx-auto ${
          !top &&
          `bg-[#0F1924] shadow-lg duration-500 ease-in-out shadow-green-700`
        }`}
      >
        <nav className="sticky top-0 bg-white shadow-custom z-20 flex gap-10 lg:gap-20 justify-between items-center px-4 pt-2">
          <div className="flex gap-4 items-center">
            <button>
              <Menu />
            </button>
            <a href="/">
              <img src={Logo} alt="Logo" width={100} height={40} />
            </a>
          </div>
          <div className="flex items-center gap-4">
            <SearchBar />
          </div>
          <div className="flex items-center gap-6">
            <div className="group relative flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-[#222222] opacity-0 group-hover:opacity-100 transition-opacity absolute"></div>
              <VideoCall className="text-black relative text-3xl" />
            </div>
            <div className="group relative flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-[#222222] opacity-0 group-hover:opacity-100 transition-opacity absolute"></div>
              <Notifications className="text-black relative text-3xl" />
            </div>
            <div className="w-10 h-10 rounded-full bg-[#222222]"></div>
          </div>
        </nav>
      </header>
    </NavbarContainer>
  );
}
