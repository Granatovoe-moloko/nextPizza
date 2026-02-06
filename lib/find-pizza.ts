import { Category, Product, ProductItem, Ingredient } from "@/types";

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

interface RawProduct extends Omit<Product, 'ingredients'> {
    ingredientIds?: number[];
  }

  async function loadAllData() {
    try {
      const [categories, rawProducts, allIngredients, productItems] = await Promise.all([
        fetch('http://localhost:3001/categories').then(r => r.json()),
        fetch('http://localhost:3001/products').then(r => r.json()),
        fetch('http://localhost:3001/ingredients').then(r => r.json()),
        fetch('http://localhost:3001/productItems').then(r => r.json()),
      ]);
  
      const products: Product[] = (rawProducts as RawProduct[]).map(rawProduct => {
        const ingredientIds = rawProduct.ingredientIds || [];
        const ingredients: Ingredient[] = ingredientIds
          .map(id => allIngredients.find((ingredient: Ingredient) => ingredient.id === id))
          .filter(Boolean) as Ingredient[];
        
        return {
          ...rawProduct,
          ingredients,
          ingredientIds,
        } as Product & { ingredientIds?: number[] };
      });
  
      return { 
        categories: categories as Category[], 
        products,
        productItems: productItems as ProductItem[]
      };
    } catch (error) {
      console.error('Error loading data:', error);
      throw error;
    }
  }

  export const findPizzas = async (params: GetSearchParams): Promise<Category[]> => {
    try {
      const sizes = params.sizes?.split(',').map(Number);
      const pizzaTypes = params.pizzaTypes?.split(',').map(Number);
      const ingredientsIdArr = params.ingredients?.split(',').map(Number);
  
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
      }, {} as Record<number, Product[]>);
  
      const resultCategories = categories.map((category: Category) => {
        const categoryProducts = productsByCategoryId[category.id] || [];
  
        const filteredProducts = categoryProducts
          .filter(product => {
            if (ingredientsIdArr && ingredientsIdArr.length > 0) {
              const productWithIds = product as Product & { ingredientIds?: number[] };
              const productIngredientIds = productWithIds.ingredientIds || [];
              
              const hasAnyIngredient  = ingredientsIdArr.some(id => 
                productIngredientIds.includes(id)
              );
              if (!hasAnyIngredient ) return false;
            }
  

            const items = productItemsByProductId[product.id] || [];
            const hasValidItem = items.some(item => {
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
          .map(product => {

            const filteredItems = (productItemsByProductId[product.id] || [])
              .filter(item => item.price >= minPrice && item.price <= maxPrice)
              .sort((a, b) => a.price - b.price);
  
            return {
              ...product,
              items: filteredItems,
            } as Product;
          });
  
        return {
          ...category,
          products: filteredProducts,
        } as Category;
      });
  
      return resultCategories.filter(category => 
        category.products && category.products.length > 0
      );
  
    } catch (error) {
      console.error('Error in findPizzas:', error);
      return [];
    }
  };