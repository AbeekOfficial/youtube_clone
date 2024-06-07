import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiService } from "../../services/api-data";
import { VideoProps, VideosDataType } from "../../types/videos";

const Search: React.FC<VideosDataType> = () => {
  const { id } = useParams<{ id: string }>();
  const [videos, setVideos] = useState<VideoProps["videos"]>([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const data: VideoProps = await ApiService.fetching(
          `search?part=snippet&q=${id}`
        );
        setVideos(data.videos);
        console.log(`Malumotlar`, data);
      } catch (error) {
        console.log("Malumot topilmadi", error);
      }
    };
    getData();
  }, [id]);
  return <div></div>;
};

export default Search;
