import { Container, Filters, Title, TopBar } from "@/components/shared";
import { ProductsGroupList } from "@/components/shared/products-group-list";
import { GetSearchParams, findPizzas } from "@/lib/find-pizza";

export default async function Home({ searchParams }: { searchParams: GetSearchParams }) {

  const categories = await findPizzas(searchParams);
  
  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="xl" className="font-bold" />
      </Container>
      <TopBar categories={categories.filter((category) => category.products.length > 0)}/>
      <Container className="flex gap-[80px] mt-5 pb-14">
        <div className="w-[250px]">
          <Filters />
        </div>
        <div className="flex-1">
          <div className="flex flex-col gap-16">
          {categories.map(
                (category) =>
                  category.products.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      title={category.name}
                      categoryId={category.id}
                      items={category.products}
                    />
                  ),
              )}
          </div>
        </div>
      </Container>
    </>
  );
}
