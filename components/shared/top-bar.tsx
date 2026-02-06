import React from "react";
import { cn } from "@/lib/utils";
import { Categories, Container, SortPoup } from ".";
import { Category } from "@/types";

interface Props {
  categories: Category[];
  className?: string;
}

export const TopBar: React.FC<Props> = ({ categories, className }) => {
  return (
    <div className={cn("sticky top-0 bg-white py-5 shadow-lg shadow-black/5", className)}>
      <Container className="flex items-center justify-between">
        <Categories items={categories}/>
        <SortPoup />
      </Container>
    </div>
  );
};
