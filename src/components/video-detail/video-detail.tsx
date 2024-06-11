import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ApiService } from "../../services/api-data";
import { Avatar, Box, Chip } from "@mui/material";
import ReactPlayer from "react-player";
import {
  CheckCircleRounded,
  Reply,
  Tag,
  ThumbDown,
  ThumbUp,
} from "@mui/icons-material";
import { Download, MessageCircle } from "lucide-react";
import NumberDisplay from "../../library/number-display.tsx/numberDisplay";
import DateDisplay from "../../library/date/date-formatter";
import Videos from "../videos/videos";
import { Button } from "../button/Button";
import Loader from "../../ui/Loader/Loader";
// Define VideoDetailsType
export type VideoDetailsType = {
  contentDetails: {
    duration: string;
    definition: string;
    caption: string;
  };
  id: string;
  snippet: {
    categoryId: string;
    channelId: string;
    channelTitle: string;
    description: string;
    liveBroadcastContent: string;
    publishedAt: string;
    defaultAudioLanguage: string;
    defaultLanguage: string;
    tags: string[];
    localized: {
      title: string;
      description: string;
    };
    thumbnails: {
      default: {
        url: string;
      };
      high: {
        url: string;
      };
      maxres: {
        url: string;
      };
      medium: {
        url: string;
      };
      standard: {
        url: string;
      };
    };
    title: string;
  };
  statistics: {
    commentCount: string;
    dislikeCount: string;
    favoriteCount: string;
    likeCount: string;
    viewCount: string;
  };
};

// Define VideosDataType
export interface VideosDataType {
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      };
      medium: {
        url: string;
        width: number;
        height: number;
      };
      high: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: string;
  };
}

const VideoDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [videoDetail, setVideoDetail] = useState<VideoDetailsType | null>(null);
  const [relatedVideos, setRelatedVideos] = useState<VideosDataType[]>([]);
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

        // Transform related videos data to match VideosDataType
        const transformedRelatedVideos: VideosDataType[] =
          relatedData.items.map((item: any) => ({
            id: {
              kind: item.id.kind,
              videoId: item.id.videoId,
            },
            snippet: {
              publishedAt: item.snippet.publishedAt,
              channelId: item.snippet.channelId,
              title: item.snippet.title,
              description: item.snippet.description,
              thumbnails: item.snippet.thumbnails,
              channelTitle: item.snippet.channelTitle,
              liveBroadcastContent: item.snippet.liveBroadcastContent,
              publishTime: item.snippet.publishTime,
            },
          }));

        setRelatedVideos(transformedRelatedVideos);
      } catch (error) {
        setError("Video details could not be retrieved");
        console.error("Video details could not be retrieved", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      getData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center mt-48">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center mt-40">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!videoDetail) {
    return (
      <div className="flex items-center justify-center mt-40">
        <p>No video details available</p>
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
            <div className=" mb-[-150px] bg-white">
              <div
                className="relative w-full ml-20"
                style={{ paddingTop: "60.25%" /* 16:9 Aspect Ratio */ }}
              >
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${id}`}
                  playing
                  playbackRate={1.0}
                  width="85%"
                  height="70%"
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
            <h1 className="text-2xl font-bold my-3 ml-20">{title}</h1>
            <div className="flex items-center justify-between mb-5 md:flex-wrap sm:flex-wrap ml-20">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Link to={`/channel/${videoDetail.snippet.channelId}`}>
                    <Avatar
                      src={
                        videoDetail.snippet.thumbnails.high?.url &&
                        videoDetail.snippet.thumbnails.standard?.url
                      }
                    />
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
              <div className="flex gap-5 md:pt-3 sm:pt-3 md:flex-wrap">
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
            <div className="rounded-2xl p-4 bg-gray-100 text-black ml-20">
              <div className="flex items-center mb-5">
                <NumberDisplay value={viewCount} className="mr-1" />
                views
                <DateDisplay date={publishedAt} className="ml-3 " />
              </div>
              {videoDetail.snippet.tags?.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  icon={<Tag />}
                  onDelete={() => {}}
                  sx={{ ml: 1, mb: 1, cursor: "pointer", color: "black" }}
                  variant="outlined"
                />
              ))}
              <p className="text-sm line-through-1">{description}</p>
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
