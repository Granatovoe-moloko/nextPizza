"use client";

import React from "react";
import { cn, convertIdFields } from "@/lib/utils";
import { Search } from "lucide-react";
import Link from "next/link";
import { useClickAway, useDebounce } from "react-use";

interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  categoryId: number;
}

interface Props {
  className?: string;
}

export const SearchInput: React.FC<Props> = ({ className }) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [focused, setFocused] = React.useState(false);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(false);
  const ref = React.useRef(null);

  useClickAway(ref, () => {
    setFocused(false);
  });

  useDebounce(
    async () => {
      if (!searchQuery.trim()) {
        setProducts([]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch("http://localhost:3001/products");

        if (!response.ok) {
          throw new Error("Ошибка при поиске");
        }

        const allProducts = await response.json();

        const filteredProducts = (allProducts).map(convertIdFields)
          .filter((product: Product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .slice(0, 5);

        setProducts(filteredProducts);
        
      } catch (error) {
        console.error("Search error:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    },
    250,
    [searchQuery]
  );

  const onClickItem = () => {
    setFocused(false);
    setSearchQuery("");
    setProducts([]);
  };

  return (
    <>
      {focused && (
        <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30" />
      )}

      <div
        ref={ref}
        className={cn(
          "flex rounded-2xl flex-1 justify-between relative h-11 z-30",
          className
        )}
      >
        <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
        <input
          className="rounded-2xl outline-none w-full bg-gray-100 pl-11"
          type="text"
          placeholder="Найти пиццу..."
          onFocus={() => setFocused(true)}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {focused && (products.length > 0 || loading || searchQuery.trim()) && (
          <div
            className={cn(
              "absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30",
              focused && "visible opacity-100 top-12"
            )}
          >
            {loading ? (
              <div className="flex items-center justify-center px-3 py-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                <span className="ml-2 text-gray-600">Поиск...</span>
              </div>
            ) : products.length > 0 ? (
              products.map((product) => (
                <Link
                  onClick={onClickItem}
                  key={product.id}
                  className="flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10"
                  href={`/product/${product.id}`}
                >
                  <img
                    className="rounded-sm h-8 w-8"
                    src={product.imageUrl}
                    alt={product.name}
                  />
                  <span>{product.name}</span>
                </Link>
              ))
            ) : searchQuery.trim() && !loading ? (
              <div className="px-3 py-4 text-center text-gray-500">
                Ничего не найдено по запросу "{searchQuery}"
              </div>
            ) : null}
          </div>
        )}
      </div>
    </>
  );
};
