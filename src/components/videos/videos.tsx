import React from "react";
import { VideosDataType } from "../../types/videos";
import VideosCard from "../videos-card/VideosCard";
import Skeleton from "../../ui/skeleton";

type VideosProps = {
  videos: VideosDataType[];
  loading?: boolean;
  error?: string | null;
};

const Videos: React.FC<VideosProps> = ({ videos, loading, error }) => {
  console.log("Videos malumotlari", videos);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] px-20">
      {loading
        ? new Array(8).fill(null).map((_, index) => <Skeleton key={index} />)
        : videos?.map((video) => (
            <VideosCard key={video.id.videoId} video={video} />
          ))}
    </div>
  );
};

export default Videos;
