import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiService } from "../../services/api-data";
import { VideosDataType } from "../../types/videos";
import Container from "../../ui/container";

const Search = () => {
  const { id } = useParams<{ id: string }>();
  const [videos, setVideos] = useState<VideosDataType["videos"]>([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await ApiService.fetching(`search?part=snippet&q=${id}`);
        setVideos(data.videos);
        console.log(`Malumotlar`, data);
      } catch (error) {
        console.log("Malumot topilmadi", error);
      }
    };
    getData();
  }, [id]);
  return (
    <Container>
      <div className="lg:px-8 md:px-8 flex"> hello world</div>
    </Container>
  );
};

export default Search;
