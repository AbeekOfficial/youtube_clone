import { Link } from "react-router-dom";
import { VideosDataType } from "../../types/videos";
import { Avatar, Box } from "@mui/material";
import { CheckCircleRounded } from "@mui/icons-material";
import moment from "moment";

export default function VideosCard({ video }: VideosDataType) {
  return (
    <div key={video.id.videoId}>
      <Link
        to={`/video/${video.id?.videoId}`}
        className="relative aspect-video"
      >
        <img
          className="rounded-xl block w-full h-[200px] object-cover"
          src={video.snippet.thumbnails.medium.url}
          alt={video.snippet.title}
          width="100%"
        />
      </Link>
      <Link to={`/video/${video.id?.videoId}`}></Link>
      <div className="flex gap-4 mt-2 relative">
        <Avatar src={video.snippet.thumbnails.medium.url} />
        <h3 className="text-[16px] font-bold">{video.snippet.title}</h3>
      </div>
      <div className="ml-14">
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-medium text-gray-500">
            {video.snippet.channelTitle}
          </h4>
          <CheckCircleRounded sx={{ color: "gray", fontSize: "14px" }} />
        </div>
        <p className="text-sm text-gray-500">
          {moment(video.snippet.publishedAt).fromNow()}
        </p>
      </div>
    </div>
  );
}
