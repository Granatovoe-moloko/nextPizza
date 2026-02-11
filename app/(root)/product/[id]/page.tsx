import { Container } from "@/components/shared";
import { ProductCard } from "@/components/shared/product-card";
import { notFound } from "next/navigation";
import { getProduct } from "@/shared/lib";


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
