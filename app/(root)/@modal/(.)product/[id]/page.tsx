import { ChooseProductModal } from "@/components/shared/modals";
import { notFound } from "next/navigation";
import { getProduct } from "@/shared/lib";

export default async function ProductModalPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await getProduct(id);

  if (!product) {
    return notFound();
  }

  return <ChooseProductModal product={product} />;
}
