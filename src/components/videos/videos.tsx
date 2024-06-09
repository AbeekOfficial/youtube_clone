import React from "react";
import { VideosDataType } from "../../types/videos";
import VideosCard from "../videos-card/VideosCard";
import Skeleton from "../../ui/skeleton";

const Videos: React.FC<VideosDataType> = ({ videos, loading }) => {
  console.log("Videos malumotlari", videos);

  return (
    <div className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] px-20 ">
      {loading
        ? new Array(8).fill(null).map((_, index) => <Skeleton key={index} />)
        : videos.map((video) => <VideosCard video={video} />)}
    </div>
  );
};

export default Videos;
