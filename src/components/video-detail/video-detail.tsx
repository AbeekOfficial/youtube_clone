import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiService } from "../../services/api-data";
import VideoDetailsType from "../../types/video-details";
import { Avatar, Box, Chip, Paper } from "@mui/material";
import ReactPlayer from "react-player";
import Container from "../../ui/container";
import {
  CheckCircleRounded,
  Reply,
  Tag,
  ThumbDown,
  ThumbUp,
} from "@mui/icons-material";
import ReactHtmlParser from "react-html-parser";
import { Loader } from "lucide-react";
import NumberDisplay from "../../library/number-display.tsx/numberDisplay";
import DateDisplay from "../../library/date/date-formatter";
import Videos from "../videos/videos";
const VideoDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [videoDetail, setVideoDetail] = useState<VideoDetailsType | null>(null);
  const [relatedVideos, setRelatedVideos] = useState<VideoDetailsType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await ApiService.fetching(
          `videos?part=snippet,statistics&id=${id}`
        );
        setVideoDetail(data.items[0]);
        const relatedData = await ApiService.fetching(
          `search?part=snippet&relatedToVideoId=${id}&type=video&maxResults=10`
        );
        setRelatedVideos(relatedData.items);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError("Video details could not be retrieved");
        console.error("Video details could not be retrieved", error);
      }
    };
    if (id) {
      getData();
    }
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!videoDetail) {
    return (
      <div className="flex items-center justify-center mt-40">
        <Loader />
      </div>
    );
  }

  const {
    snippet: { title, description, channelId, channelTitle, publishedAt },
    statistics: { viewCount, likeCount, commentCount },
  } = videoDetail;

  return (
    <Container>
      <Box minHeight={"90vh"} mb={10} mt={5}>
        <Box
          display={"flex"}
          sx={{ flexDirection: { xs: "column", md: "row" } }}
        >
          <Box width={"75%"}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              playing
              playbackRate={1.0}
              width={"100%"}
              height={500}
            />
            <h1 className="text-2xl font-bold my-3">{title}</h1>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Avatar src={videoDetail.snippet.thumbnails.high.url} />
                  <div className="flex flex-col">
                    <div className="flex items-center gap-x-2">
                      <h3 className="text-lg font-semibold">{channelTitle}</h3>
                      <CheckCircleRounded
                        sx={{ color: "gray", fontSize: "14px" }}
                      />
                    </div>
                    <NumberDisplay
                      value={Number(viewCount)}
                      className="text-[12px] font-medium mt-[-3px]"
                    >
                      subscribers
                    </NumberDisplay>
                  </div>
                  <button className="bg-gray-200 text-black font-semibold ml-5 px-5 py-2 rounded-3xl">
                    Subscribe
                  </button>
                </div>
              </div>
              <div className="flex gap-5">
                <button className="bg-[#222222] py-2 px-3 text-white rounded-3xl flex items-center">
                  <div className="flex items-center">
                    <ThumbUp />
                    <NumberDisplay value={Number(likeCount)} className="mx-2" />
                  </div>{" "}
                  |
                  <div className="flex items-center">
                    <ThumbDown className="mx-2" />
                    <NumberDisplay value={Number(commentCount)} />
                  </div>
                </button>
                <Chip
                  icon={<Reply sx={{ color: "white" }} />}
                  label="Share"
                  sx={{
                    paddingY: "20px",
                    paddingX: "5px",
                    borderRadius: "20px",
                    background: "#222222",
                    fontWeight: "500",
                    color: "white",
                  }}
                />
              </div>
            </div>
            <Paper
              sx={{
                padding: "20px",
                background: "#272727",
                color: "white",
                borderRadius: 2,
              }}
            >
              <div className="flex items-center mb-5">
                <NumberDisplay value={viewCount} className="mr-1" />
                views
                <DateDisplay date={publishedAt} className="ml-3 " />
              </div>
              {videoDetail.snippet.tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  icon={<Tag />}
                  onDelete={() => {}}
                  sx={{ ml: 1, mb: 1, cursor: "pointer", color: "white" }}
                  variant="outlined"
                />
              ))}
              <p>{ReactHtmlParser(description)}</p>
            </Paper>
          </Box>
          <Box
            width={{ xs: "100%", md: "25%" }}
            flexDirection={"column"}
            maxHeight={"100vh"}
            overflow={"auto"}
            justifyContent={"center"}
            justifyItems={"center"}
          >
            <Videos videos={relatedVideos} loading={loading} error={error} />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default VideoDetail;
