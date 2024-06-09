import React from "react";
import CategoryType from "../../types/categoryType";
import { categories } from "../../data/category";
import { Button } from "../button/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CategoryProps {
  selectedCategoryHandler: (category: string) => void;
  selectedCategory: string;
}

const Category: React.FC<CategoryProps> = ({
  selectedCategoryHandler,
  selectedCategory,
}) => {
  const [leftIcon, setLeftIcon] = React.useState(false);
  const [rightIcon, setRightIcon] = React.useState(false);

  return (
    <div className="overflow-x-hidden relative px-8 ml-10 pb-4">
      <div className="flex whitespace-nowrap gap-3 transition-transform w-[max-content]">
        {categories.map((category: CategoryType) => (
          <Button
            onClick={() => selectedCategoryHandler(category.name)}
            key={category.id}
            variant={selectedCategory === category.name ? "dark" : "default"}
            className="py-2 px-4 rounded-lg whitespace-nowrap text-[16px] font-medium"
          >
            {category.name}
          </Button>
        ))}
      </div>

      {leftIcon && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-white from-50% to-transparent w-24 h-full">
          <Button
            onClick={() => setLeftIcon(false)}
            variant="ghost"
            size={"icon"}
          >
            <ChevronLeft />
          </Button>
        </div>
      )}

      {rightIcon && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-white from-50% to-transparent w-24 h-full flex justify-end">
          <Button
            onClick={() => setRightIcon(false)}
            variant="ghost"
            size={"icon"}
          >
            <ChevronRight />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Category;
