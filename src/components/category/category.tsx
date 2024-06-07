import React from "react";
import CategoryType from "../../types/categoryType";
import { categories } from "../../constants/category";
import { Stack } from "@mui/material";
import Container from "../../ui/container";

interface CategoryProps {
  selectedCategoryHandler: (category: string) => void;
  selectedCategory: string;
}

const Category: React.FC<CategoryProps> = ({
  selectedCategoryHandler,
  selectedCategory,
}) => {
  return (
    <Container>
      <Stack
        className="no-scrollbar"
        direction={"row"}
        spacing={2}
        m={2}
        sx={{ overflowX: "scroll" }}
      >
        {categories.map((category: CategoryType) => (
          <button
            key={category.id}
            className={`text-white bg-[#272727] px-4 py-2 rounded-xl hover:bg-[#333333] ${
              selectedCategory === category.name
                ? "bg-[#f1f1f1] text-[#000]"
                : ""
            }`}
            onClick={() => selectedCategoryHandler(category.name)}
          >
            {category.name}
          </button>
        ))}
      </Stack>
    </Container>
  );
};

export default Category;
