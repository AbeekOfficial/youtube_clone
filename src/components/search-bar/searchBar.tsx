import { KeyboardIcon, Mic, Search } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const SearchBar: React.FC = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState<string>("");
  const submitHandler = (e: any) => {
    e.preventDefault();
    if (value) {
      navigate(`/search/${value}`);
    }
  };
  return (
    <div className="flex items-center gap-4" onSubmit={submitHandler}>
      <div className="w-[600px] flex items-center relative">
        <input
          className="w-full pl-5 py-2  border-black rounded-br-none rounded-tr-none border rounded-3xl focus:border-blue-500 focus:border-2 focus:outline-none"
          type="text"
          placeholder="Search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <KeyboardIcon className="text-black absolute right-[85px]" />
        <button className="py-2 border-black border-l-0  border bg-[#222222] rounded-3xl px-6 rounded-bl-none rounded-tl-none">
          <Search className="text-white" />
        </button>
      </div>
      <div className="px-3 py-[11px] rounded-full text-center bg-[#222222] hover:bg-[#333333]">
        <Mic className="text-white" />
      </div>
    </div>
  );
};
export default SearchBar;
