import React from "react";
import { cn } from "@/lib/utils";
import { CheckboxFiltersGroup, FilterCheckbox, Title } from ".";
import { Input, RangeSlider } from "../ui";

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn("", className)}>
      <Title size="sm" text="Фильтрация" className="font-bold mb-5" />

      <div className="flex flex-col gap-4">
        <FilterCheckbox text="Можно собирать" value="1" />
        <FilterCheckbox text="Новинки" value="2" />
      </div>

      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7 mb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input type="number" min={0} max={1000} defaultValue={0} />
          <Input type="number" min={0} max={1000} defaultValue={1000} />
        </div>
        <RangeSlider step={10} min={0} max={1000} value={[0, 1000]} />
      </div>

      <CheckboxFiltersGroup
        title={"Ингредиенты:"}
        limit={6}
        items={[
          {
            text: "Сырный соус",
            value: "1",
          },
          {
            text: "Моццарелла",
            value: "2",
          },
          {
            text: "Чеснок",
            value: "3",
          },
          {
            text: "Солённые огурчики",
            value: "4",
          },
          {
            text: "Красный лук",
            value: "5",
          },
          {
            text: "Томаты",
            value: "6",
          },
          {
            text: "Сырный соус",
            value: "7",
          },
          {
            text: "Моццарелла",
            value: "8",
          },
          {
            text: "Чеснок",
            value: "9",
          },
          {
            text: "Солённые огурчики",
            value: "10",
          },
          {
            text: "Красный лук",
            value: "11",
          },
          {
            text: "Томаты",
            value: "12",
          },
        ]}
      />
    </div>
  );
};
