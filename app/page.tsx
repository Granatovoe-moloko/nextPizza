import { Container, Filters, Title, TopBar } from "@/components/shared";

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="xl" className="font-bold" />
      </Container>
      <TopBar />
      <Container className="flex gap-[60px] mt-5 pb-14">
        <div className="w-[250px]">
          <Filters />
        </div>
        <div>Список пицц</div>
      </Container>
    </>
  );
}
