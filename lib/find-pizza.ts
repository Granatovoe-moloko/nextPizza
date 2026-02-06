import {
  Category,
  Product,
  ProductItem,
  Ingredient,
  ProductWithRelations,
  CategoryWithProducts,
} from "@/types";
import { convertIdFields } from "./utils";

export interface GetSearchParams {
  query?: string;
  sortBy?: string;
  sizes?: string;
  pizzaTypes?: string;
  ingredients?: string;
  priceFrom?: string;
  priceTo?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000;

interface RawProduct extends Omit<Product, "ingredients"> {
  ingredientIds?: number[];
}

async function loadAllData() {
  try {
    const [baseCategories, baseProducts, baseAllIngredients, baseProductItems] =
      await Promise.all([
        fetch("http://localhost:3001/categories").then((r) => r.json()),
        fetch("http://localhost:3001/products").then((r) => r.json()),
        fetch("http://localhost:3001/ingredients").then((r) => r.json()),
        fetch("http://localhost:3001/productItems").then((r) => r.json()),
      ]);

    const categories = baseCategories.map(convertIdFields);
    const rawProducts = baseProducts.map(convertIdFields);
    const allIngredients = baseAllIngredients.map(convertIdFields);
    const productItems = baseProductItems.map(convertIdFields);

    const products: ProductWithRelations[] = (rawProducts as RawProduct[]).map(
      (rawProduct) => {
        const ingredientIds = rawProduct.ingredientIds || [];
        const ingredients: Ingredient[] = ingredientIds
          .map((id) =>
            allIngredients.find(
              (ingredient: Ingredient) => Number(ingredient.id) === id
            )
          )
          .filter(Boolean) as Ingredient[];

        return {
          id: Number(rawProduct.id),
          name: rawProduct.name,
          imageUrl: rawProduct.imageUrl,
          categoryId: rawProduct.categoryId,
          createdAt: rawProduct.createdAt,
          updatedAt: rawProduct.updatedAt,
          ingredients,
          items: [],
        };
      }
    );

    return {
      categories: categories as Category[],
      products,
      productItems: productItems as ProductItem[],
      allIngredients: allIngredients as Ingredient[],
    };
  } catch (error) {
    console.error("Error loading data:", error);
    throw error;
  }
}

export const findPizzas = async (
  params: GetSearchParams
): Promise<CategoryWithProducts[]> => {
  try {
    const sizes = params.sizes?.split(",").map(Number);
    const pizzaTypes = params.pizzaTypes?.split(",").map(Number);
    const ingredientsIdArr = params.ingredients?.split(",").map(Number);

    const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE;
    const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE;

    const { categories, products, productItems } = await loadAllData();

    const productItemsByProductId = productItems.reduce((acc, item) => {
      if (!acc[item.productId]) acc[item.productId] = [];
      acc[item.productId].push(item);
      return acc;
    }, {} as Record<number, ProductItem[]>);

    const productsByCategoryId = products.reduce((acc, product) => {
      if (!acc[product.categoryId]) acc[product.categoryId] = [];
      acc[product.categoryId].push(product);
      return acc;
    }, {} as Record<number, ProductWithRelations[]>);

    const resultCategories: CategoryWithProducts[] = categories.map((category: Category) => {
      const categoryProducts = productsByCategoryId[category.id] || [];

      const filteredProducts = categoryProducts
        .filter((product) => {
          if (ingredientsIdArr && ingredientsIdArr.length > 0) {
            const productIngredientIds = product.ingredients.map(
              (ing) => ing.id
            );

            const hasAnyIngredient = ingredientsIdArr.some((id) =>
              productIngredientIds.includes(id)
            );
            if (!hasAnyIngredient) return false;
          }

          const items = productItemsByProductId[product.id] || [];
          const hasValidItem = items.some((item) => {
            if (sizes && sizes.length > 0 && item.size) {
              if (!sizes.includes(item.size)) return false;
            }

            if (pizzaTypes && pizzaTypes.length > 0 && item.pizzaType) {
              if (!pizzaTypes.includes(item.pizzaType)) return false;
            }

            return item.price >= minPrice && item.price <= maxPrice;
          });

          return hasValidItem;
        })
        .sort((a, b) => b.id - a.id)
        .map((product) => {
          const filteredItems = (productItemsByProductId[product.id] || [])
            .filter((item) => item.price >= minPrice && item.price <= maxPrice)
            .sort((a, b) => a.price - b.price);

          return {
            ...product,
            items: filteredItems,
          } as Product;
        });

      return {
        ...category,
        products: filteredProducts,
      } as CategoryWithProducts;
    });

    return resultCategories.filter(
      (category) => category.products && category.products.length > 0
    );
  } catch (error) {
    console.error("Error in findPizzas:", error);
    return [];
  }
};
