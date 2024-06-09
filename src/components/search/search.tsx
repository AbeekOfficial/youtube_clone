import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../../ui/container";
import Videos from "../videos/videos";
import Skeleton from "../../ui/skeleton";
import NotFound from "../404/404NotFound";

const Search = () => {
  const { id } = useParams<{ id: string }>();
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const url = `https://youtube-v31.p.rapidapi.com/search?q=${id}&part=snippet,id&regionCode=US&maxResults=50&order=date`;

      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "e44040c5f5msh4536aa04543e38ep1ab3b7jsn6210b8e96204",
          "x-rapidapi-host": "youtube-v31.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setVideos(data.items || []);
      } catch (error: any) {
        setError(error.message || "Malumot topilmadi");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <Container>
      <div className="lg:px-8 md:px-8 flex flex-col">
        <h1 className="text-xl font-bold mb-3">
          Search results for{" "}
          <span className="text-2xl text-rose-600">{id}</span>
        </h1>
        {loading && <Skeleton />}
        {error && <NotFound />}
        {!loading && !error && <Videos videos={videos} loading={loading} />}
      </div>
    </Container>
  );
};

export default Search;
