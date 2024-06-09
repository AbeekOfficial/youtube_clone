import { ArrowLeft, Bell, Menu, Mic, Search, Upload, User } from "lucide-react";
import logo from "../../assets/logo.jpg";
import { Button } from "../button/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showInput, setShowInput] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  const navigate = useNavigate();
  const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault;
    if (value) {
      navigate(`/search/${value}`);
      setValue("");
    }
  };
  return (
    <nav className="flex items-center gap-10 justify-between lg:gap-20 pt-2 mb-6 mx-5">
      <div
        className={`flex items-center gap-4 flex-shrink-0 ${
          showInput ? "hidden" : "flex"
        }`}
      >
        <Button variant={"ghost"} size={"icon"}>
          <Menu className="text-2xl" />
        </Button>
        <a href="/">
          <img src={logo} alt="logo" width={100} height={100} />
        </a>
      </div>
      <form
        onSubmit={handleChange}
        className={`flex-shrink-0 gap-4 justify-center flex-grow ${
          showInput ? "flex" : "hidden md:flex"
        }`}
      >
        {showInput && (
          <Button
            onClick={() => setShowInput(false)}
            size={"icon"}
            variant={"ghost"}
            className="flex-shrink-0"
          >
            <ArrowLeft />
          </Button>
        )}
        <div className="max-w-[600px] flex flex-grow items-center">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="search"
            placeholder="Search"
            className="border border-secondary-border rounded-l-full shadow-inner shadow-secondary w-full py-1 pt-1 px-4 text-lg focus:border-blue-500 outline-none"
          />
          <Button
            type="submit"
            className="py-2 px-4 rounded-r-full flex-shrink-0 border-l-0"
          >
            <Search />
          </Button>
        </div>
        <Button size={"icon"} type="button" className="flex-shrink-0">
          <Mic />
        </Button>
      </form>
      <div
        className={`flex-shrink-0 md:gap-2 ${showInput ? "hidden" : "flex"}`}
      >
        <Button
          onClick={() => setShowInput(true)}
          size={"icon"}
          variant={"ghost"}
          className="md:hidden"
        >
          <Search />
        </Button>
        <Button size={"icon"} variant={"ghost"} className="md:hidden">
          <Mic />
        </Button>
        <Button variant={"ghost"} size={"icon"}>
          <Upload />
        </Button>
        <Button variant={"ghost"} size={"icon"}>
          <Bell />
        </Button>
        <Button variant={"ghost"} size={"icon"}>
          <User />
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
