'use client';
import React from "react";
import { mockCategoryData } from "@/app/lib/mockCategoryData";
import CategoryCard from "@/app/components/category/CategoryCard";

const CategoryPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold uppercase mb-8 text-center">
        Shop by Category
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockCategoryData.map((item) => (
          <CategoryCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
