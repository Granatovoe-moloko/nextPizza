import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Title } from ".";

interface Props {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  className?: string;
}

export const ProductCard: React.FC<Props> = ({
    id,
  name,
  price,
  imageUrl,
  className,
}) => {
  return (
    <div className={cn("", className)}>
      <Link href={`/product/${id}`}>
        <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
          <img className="w-[215px] h-[215px]" src={imageUrl} alt={name} />
          <Title text={name} size='sm' />
          <p>
          Цыпленок, моцарелла, сыры чеддер и пармезан, сырный соус, томаты, соус альфредо, чеснок
          </p>
        </div>
      </Link>
    </div>
  );
};
