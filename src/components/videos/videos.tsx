import React from "react";
import { Avatar, Box, Stack } from "@mui/material";
import moment from "moment";
import Container from "../../ui/container";
import { CheckCircleRounded } from "@mui/icons-material";
import { VideosDataType } from "../../types/videos";
import { Link } from "react-router-dom";
import Skeleton from "../../ui/skeleton";

const Videos: React.FC<VideosDataType> = ({ videos, loading, error }) => {
  console.log("Videos malumotlari", videos);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      <Stack
        width={"100%"}
        direction={"row"}
        flexWrap="wrap"
        justifyContent="start"
        alignItems="start"
        gap={3}
      >
        {loading
          ? new Array(8).fill(null).map((_, index) => <Skeleton key={index} />)
          : videos.map((video) => (
              <Box
                key={video.id.videoId}
                padding={2}
                borderRadius={2}
                width={320}
              >
                <Link to={`/video/${video.id?.videoId}`}>
                  <img
                    className="rounded-lg"
                    src={video.snippet.thumbnails.medium.url}
                    alt={video.snippet.title}
                    width="100%"
                  />
                </Link>
                <Link to={`/video/${video.id?.videoId}`}></Link>
                <div className="flex gap-4 mt-2 relative">
                  <Avatar src={video.snippet.thumbnails.medium.url} />
                  <h3 className="text-[16px] font-bold">
                    {video.snippet.title}
                  </h3>
                </div>
                <div className="ml-14">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-medium text-gray-500">
                      {video.snippet.channelTitle}
                    </h4>
                    <CheckCircleRounded
                      sx={{ color: "gray", fontSize: "14px" }}
                    />
                  </div>
                  <p className="text-sm text-gray-500">
                    {moment(video.snippet.publishedAt).fromNow()}
                  </p>
                </div>
              </Box>
            ))}
      </Stack>
    </Container>
  );
};

export default Videos;
