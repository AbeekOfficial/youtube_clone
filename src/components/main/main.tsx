import React, { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import Category from "../category/category";
import Videos from "../videos/videos";
import { ApiService } from "../../services/api-data";
import { Video } from "../../types/videos";
import Sidebar from "../sidebar/sidebar";

const Main: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const selectedCategoryHandler = (category: string) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setError(null);
        setLoading(true);
        const data = await ApiService.fetching(
          `search?part=snippet&q=${selectedCategory}`
        );
        setVideos(data.items);
      } catch (err: any) {
        setError("Maalumot topilmadi");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [selectedCategory]);

  return (
    <Stack>
      <div className="flex">
        <Category
          selectedCategoryHandler={selectedCategoryHandler}
          selectedCategory={selectedCategory}
        />
      </div>
      <div>
        <Videos videos={videos} loading={loading} error={error} />
      </div>
    </Stack>
  );
};

export default Main;
