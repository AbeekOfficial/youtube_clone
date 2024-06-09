import React from "react";
import { VideosDataType } from "../../types/videos";
import Skeleton from "../../ui/skeleton";
import VideosCard from "../videos-card/VideosCard";

const Videos: React.FC<VideosDataType> = ({ videos, loading, error }) => {
  console.log("Videos malumotlari", videos);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] px-20 ">
      {loading
        ? new Array(8).fill(null).map((_, index) => <Skeleton key={index} />)
        : videos.map((video) => <VideosCard video={video} />)}
    </div>
  );
};

export default Videos;
