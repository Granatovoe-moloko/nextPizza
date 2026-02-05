import { Container, Filters, Title, TopBar } from "@/components/shared";
import { ProductCard } from "@/components/shared/product-card";
import { ProductsGroupList } from "@/components/shared/products-group-list";

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="xl" className="font-bold" />
      </Container>
      <TopBar />
      <Container className="flex gap-[80px] mt-5 pb-14">
        <div className="w-[250px]">
          <Filters />
        </div>
        <div className="flex-1">
          <div className="flex flex-col gap-16">
            <ProductsGroupList
              title="Пиццы"
              categoryId={0}
              items={[
                {
                  id: 1,
                  name: "Сырный козленок",
                  imageUrl:
                    "https://media.dodostatic.net/image/r:584x584/019ac604bad37209b1ec496bbdd98560.avif",
                  price: 550,
                  items: [{ price: 550 }],
                },
                {
                  id: 2,
                  name: "Сырный цыпленок2",
                  imageUrl:
                    "https://media.dodostatic.net/image/r:584x584/019ac604bad37209b1ec496bbdd98560.avif",
                  price: 550,
                  items: [{ price: 550 }],
                },
                {
                  id: 3,
                  name: "Сырный цыпленок",
                  imageUrl:
                    "https://media.dodostatic.net/image/r:584x584/019ac604bad37209b1ec496bbdd98560.avif",
                  price: 550,
                  items: [{ price: 550 }],
                },
                {
                  id: 4,
                  name: "Сырный цыпленок",
                  imageUrl:
                    "https://media.dodostatic.net/image/r:584x584/019ac604bad37209b1ec496bbdd98560.avif",
                  price: 550,
                  items: [{ price: 550 }],
                },
                {
                  id: 5,
                  name: "Сырный цыпленок",
                  imageUrl:
                    "https://media.dodostatic.net/image/r:584x584/019ac604bad37209b1ec496bbdd98560.avif",
                  price: 550,
                  items: [{ price: 550 }],
                },
                {
                  id: 6,
                  name: "Сырный цыпленок",
                  imageUrl:
                    "https://media.dodostatic.net/image/r:584x584/019ac604bad37209b1ec496bbdd98560.avif",
                  price: 550,
                  items: [{ price: 550 }],
                },
              ]}
            />
            <ProductsGroupList
              title="Комбо"
              categoryId={1}
              items={[
                {
                  id: 1,
                  name: "Сырный цыпленок",
                  imageUrl:
                    "https://media.dodostatic.net/image/r:584x584/019ac604bad37209b1ec496bbdd98560.avif",
                  price: 550,
                  items: [{ price: 550 }],
                },
                {
                  id: 2,
                  name: "Сырный цыпленок",
                  imageUrl:
                    "https://media.dodostatic.net/image/r:584x584/019ac604bad37209b1ec496bbdd98560.avif",
                  price: 550,
                  items: [{ price: 550 }],
                },
                {
                  id: 3,
                  name: "Сырный цыпленок",
                  imageUrl:
                    "https://media.dodostatic.net/image/r:584x584/019ac604bad37209b1ec496bbdd98560.avif",
                  price: 550,
                  items: [{ price: 550 }],
                },
                {
                  id: 4,
                  name: "Сырный цыпленок",
                  imageUrl:
                    "https://media.dodostatic.net/image/r:584x584/019ac604bad37209b1ec496bbdd98560.avif",
                  price: 550,
                  items: [{ price: 550 }],
                },
                {
                  id: 5,
                  name: "Сырный цыпленок",
                  imageUrl:
                    "https://media.dodostatic.net/image/r:584x584/019ac604bad37209b1ec496bbdd98560.avif",
                  price: 550,
                  items: [{ price: 550 }],
                },
                {
                  id: 6,
                  name: "Сырный цыпленок",
                  imageUrl:
                    "https://media.dodostatic.net/image/r:584x584/019ac604bad37209b1ec496bbdd98560.avif",
                  price: 550,
                  items: [{ price: 550 }],
                },
              ]}
            />
          </div>
        </div>
      </Container>
    </>
  );
}
