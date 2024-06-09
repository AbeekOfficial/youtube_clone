import { Route, Routes } from "react-router-dom";
import {
  Channels,
  Main,
  Navbar,
  Search,
  Sidebar,
  VideoDetail,
} from "./components";

export default function App() {
  return (
    <>
      <div className="mt-20 fixed">
        <Sidebar />
      </div>
      <div className="sticky top-0 z-20 bg-white pb-[1px] mb-3 shadow-md shadow-secondary-border-bottom">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/channels/:id" element={<Channels />} />
        <Route path="video/:id" element={<VideoDetail />} />
        <Route path="search/:id" element={<Search />} />
      </Routes>
    </>
  );
}
