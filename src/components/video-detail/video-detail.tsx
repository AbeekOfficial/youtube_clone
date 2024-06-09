import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ApiService } from "../../services/api-data";
import VideoDetailsType from "../../types/video-details";
import { Avatar, Box, Chip } from "@mui/material";
import ReactPlayer from "react-player";
import {
  CheckCircleRounded,
  CommentOutlined,
  Reply,
  Tag,
  ThumbDown,
  ThumbUp,
} from "@mui/icons-material";
import ReactHtmlParser from "react-html-parser";
import { Download, Loader, MessageCircle } from "lucide-react";
import NumberDisplay from "../../library/number-display.tsx/numberDisplay";
import DateDisplay from "../../library/date/date-formatter";
import Videos from "../videos/videos";
import { Button } from "../button/Button";
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
    snippet: { title, description, channelTitle, publishedAt },
    statistics: { viewCount, likeCount, commentCount },
  } = videoDetail;

  return (
    <div className="px-8">
      <Box minHeight={"90vh"} mb={10} mt={5}>
        <Box
          display={"flex"}
          sx={{ flexDirection: { xs: "column", md: "row" } }}
        >
          <Box width={"75%"}>
            <div className="flex justify-center items-center h-screen bg-gray-800 p-4">
              <div
                className="relative w-full"
                style={{ paddingTop: "60.25%" /* 16:9 Aspect Ratio */ }}
              >
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${id}`}
                  playing
                  playbackRate={1.0}
                  width="100%"
                  height="100%"
                  controls
                  onClickPreview={() => null}
                  download={true}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    borderRadius: "50px",
                  }}
                />
              </div>
            </div>
            <h1 className="text-2xl font-bold my-3">{title}</h1>
            <div className="flex items-center justify-between mb-5 md:flex-wrap sm:flex-wrap">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Link to={`/channel/${videoDetail.snippet.channelId}`}>
                    <Avatar src={videoDetail.snippet.thumbnails.high.url} />
                  </Link>
                  <div className="flex flex-col">
                    <Link to={`/channel/${videoDetail.snippet.channelId}`}>
                      <div className="flex items-center gap-x-2">
                        <h3 className="text-lg font-semibold">
                          {channelTitle}
                        </h3>
                        <CheckCircleRounded
                          sx={{ color: "gray", fontSize: "14px" }}
                        />
                      </div>
                    </Link>
                    <NumberDisplay
                      value={Number(viewCount)}
                      className="text-[12px] font-medium mt-[-3px]"
                    >
                      subscribers
                    </NumberDisplay>
                  </div>
                  <Button
                    variant={"ghost"}
                    className="bg-gray-200 font-semibold ml-5 px-5 py-2 rounded-3xl"
                  >
                    Subscribe
                  </Button>
                </div>
              </div>
              <div className="flex gap-5 md:pt-3 sm:pt-3">
                <div className="flex items-center">
                  <Button
                    variant={"default"}
                    size={"default"}
                    className=" py-2 px-3 rounded-l-3xl flex items-center gap-2 mr-[-2px]"
                  >
                    <div className="flex items-center">
                      <ThumbUp />
                      <NumberDisplay
                        value={Number(likeCount)}
                        className="mx-2"
                      />
                    </div>{" "}
                  </Button>

                  <Button className=" py-2 px-3 rounded-r-3xl  flex items-center gap-2 ml-[-2px]">
                    <div className="flex items-center">
                      <ThumbDown className="mx-2" />
                      <NumberDisplay value={Number(commentCount)} />
                    </div>
                  </Button>
                </div>
                <Button className="py-2 px-3 rounded-3xl flex items-center gap-2">
                  <Reply />
                  Share
                </Button>
                <Button className="py-2 px-3 rounded-3xl flex items-center gap-2">
                  <Download />
                  Download
                </Button>
              </div>
            </div>
            <div className="rounded-2xl p-4 bg-gray-100 text-black">
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
                  sx={{ ml: 1, mb: 1, cursor: "pointer", color: "black" }}
                  variant="outlined"
                />
              ))}
              <p className="text-sm line-through-1">
                {ReactHtmlParser(description)}
              </p>
              <p className="mt-2 flex gap-2">
                <MessageCircle />
                {commentCount} Comments
              </p>
            </div>
          </Box>
          <div className="overflow-x-hidden w-[100%] md:w-[25%] flex-col max-h-[155vh] flex justify-center items-center overflow-y-auto">
            <Videos videos={relatedVideos} loading={loading} error={error} />
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default VideoDetail;
