export type CartStateItem = {
  id: number;
  quantity: number;
  name: string;
  imageUrl: string;
  price: number;
  disabled?: boolean;
  pizzaSize?: number | null;
  pizzaType?: number | null;
  ingredients: Array<{ name: string; price: number }>;
};

interface ReturnProps {
  items: CartStateItem[];
  totalAmount: number;
}

export const getCartDetails = (data: any): ReturnProps => {
  const items = data.items.map((item: { id: any; quantity: any; productItem: { product: { name: any; imageUrl: any; }; size: any; pizzaType: any; }; }) => ({
    id: item.id,
    quantity: item.quantity,
    name: item.productItem.product.name,
    imageUrl: item.productItem.product.imageUrl,
    price: 500,
    pizzaSize: item.productItem.size,
    pizzaType: item.productItem.pizzaType,
    disabled: false,
    
  })) as CartStateItem[];

  return {
    items,
    totalAmount: data.totalAmount,
  };
};
