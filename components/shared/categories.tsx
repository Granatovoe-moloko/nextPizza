"use client";

import React, { useState, useEffect } from "react";
import { cn, convertIdFields } from "@/shared/lib/utils";
import { useCategoryStore } from "@/shared/store/category";

interface Category {
  id: number;
  name: string;
}

interface Props {
  items: Category[];
  className?: string;
}

export const Categories: React.FC<Props> = ({ className }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  const categoryActiveId = useCategoryStore((state) => state.activeId);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3001/categories");
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data.map(convertIdFields));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div
      className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}
    >
      {categories.map((category) => (
        <a
          key={category.id}
          className={cn(
            "flex items-center font-bold h-11 rounded-2xl px-5",
            categoryActiveId === category.id &&
              "bg-white shadow-md shadow-gray-200 text-primary"
          )}
          href={`/#${category.name}`}
        >
          <span>{category.name}</span>
        </a>
      ))}
    </div>
  );
};
