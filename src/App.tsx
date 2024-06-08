import { Route, Routes } from "react-router-dom";
import { Channels, Main, Navbar, Search, VideoDetail } from "./components";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/channels/:id" element={<Channels />} />
        <Route path="video/:id" element={<VideoDetail />} />
        <Route path="search/:id" element={<Search />} />
      </Routes>
    </>
  );
}
