import { Container } from "@/components/shared";
import {
  Product,
  ProductItem,
  Ingredient,
  ProductWithRelations,
} from "@/types";
import { ProductCard } from "@/components/shared/product-card";
import { notFound } from "next/navigation";
import { convertIdFields } from "@/shared/lib/utils";

interface RawProduct extends Omit<Product, "ingredients"> {
  ingredientIds?: number[];
}

async function loadAllData() {
  try {
    const [baseProducts, baseAllIngredients, baseProductItems] =
      await Promise.all([
        fetch("http://localhost:3001/products").then((r) => r.json()),
        fetch("http://localhost:3001/ingredients").then((r) => r.json()),
        fetch("http://localhost:3001/productItems").then((r) => r.json()),
      ]);

    const products = baseProducts.map(convertIdFields);
    const allIngredients = baseAllIngredients.map(convertIdFields);
    const productItems = baseProductItems.map(convertIdFields);

    return {
      products: products as RawProduct[],
      allIngredients: allIngredients as Ingredient[],
      productItems: productItems as ProductItem[],
    };
  } catch (error) {
    console.error("Error loading data:", error);
    throw error;
  }
}

async function getProduct(id: string): Promise<ProductWithRelations | null> {
  try {
    const { products, productItems, allIngredients } = await loadAllData();

    const rawProduct = products.find(
      (p) => (p as RawProduct).id === Number(id)
    ) as RawProduct;

    if (!rawProduct) {
      return null;
    }

    const ingredientIds = rawProduct.ingredientIds || [];
    const ingredients: Ingredient[] = ingredientIds
      .map((id: number) =>
        allIngredients.find((ingredient) => ingredient.id === id)
      )
      .filter(Boolean) as Ingredient[];

    const items = productItems.filter(
      (item) => item.productId === rawProduct.id
    );

    return {
      ...rawProduct,
      ingredients,
      items,
    } as ProductWithRelations;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default async function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await getProduct(id);

  if (!product) {
    return notFound();
  }

  const minPrice =
    product.items.length > 0
      ? Math.min(...product.items.map((item) => item.price))
      : 0;

  return (
    <Container className="flex flex-col my-10">
      <ProductCard
        key={product.id}
        id={product.id}
        name={product.name}
        imageUrl={product.imageUrl}
        ingredients={product.ingredients}
        price={minPrice}
      />
    </Container>
  );
}
