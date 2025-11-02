'use client';
import React, { useState } from "react";
import CategoryCard from "@/app/components/category/CategoryCard";
import { useGetAllCategoryQuery } from "@/app/redux/services/catrgoryApis";
import { Category } from "@/app/types/product";
import SectionHeader from "@/app/components/shared/SectionHeader";
import { Button } from "@/components/ui/button";
import { useGetAllSubCategoryQuery } from "@/app/redux/services/subcategoryApis";

const CategoryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: categoryData, isLoading: categoryLoading } = useGetAllCategoryQuery(undefined);
  const { data: subCategoryData, isLoading: subCategoryLoading } = useGetAllSubCategoryQuery(
    { category_id: selectedCategory as string },
    { skip: !selectedCategory }
  );

  // Loading states (optional, for better UX)
  if (categoryLoading || subCategoryLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-lg font-medium">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl border-x-[0.2px] border-[var(--border-color)] min-h-[calc(100vh-400px)] mx-auto px-2 py-8">
      <SectionHeader
        title={
          selectedCategory
            ? "Explore Subcategories"
            : "Shop by Category"
        }
        className="mb-2 mt-0 px-2"
      />

      {selectedCategory && (
        <div className="my-2">
          <Button
            className="border-[0.2px] border-[var(--border-color)] bg-[var(--purple-light)] text-white cursor-pointer rounded-none"
            variant="outline"
            onClick={() => setSelectedCategory(null)}
          >
            ← Back to Categories
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {!selectedCategory
          ? categoryData?.data?.map((item: Category) => (
            <CategoryCard
              key={item._id}
              item={item}
              onSelectCategory={(id) => setSelectedCategory(id)}
            />
          ))
          : subCategoryData?.data?.map((sub: Category) => (
            <CategoryCard
              key={sub._id}
              item={sub}
              onSelectCategory={(id) => console.log("Selected Subcategory:", id)}
            />
          ))}
      </div>
    </div>
  );
};

export default CategoryPage;
