export enum OrderStatus {
    PENDING = "PENDING",
    SUCCEEDED = "SUCCEEDED",
    CANCELLED = "CANCELLED"
  }
  
  export enum UserRole {
    USER = "USER",
    ADMIN = "ADMIN"
  }

  export interface User {
    id: number;
    fullName: string;
    email: string;
    password: string;
    role: UserRole;
    verified: string | null;
    provider?: string;
    providerId?: string;
    createdAt: string;
    updatedAt: string;
    cart?: Cart;
    orders?: Order[];
    verificationCode?: VerificationCode;
  }
  
  export interface Category {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    products?: Product[];
  }
  
  export interface Product {
    id: number;
    name: string;
    imageUrl: string;
    categoryId: number;
    createdAt: string;
    updatedAt: string;
    category?: Category;
    ingredients?: Ingredient[];
    items?: ProductItem[];
  }
  
  export interface ProductItem {
    id: number;
    productId: number;
    price: number;
    size?: number;
    pizzaType?: number;
    product?: Product;
    cartItems?: CartItem[];
  }
  

  export interface Ingredient {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
    products?: Product[];
    cartItems?: CartItem[];
  }
  
  export interface Cart {
    id: number;
    userId?: number;
    token: string;
    totalAmount: number;
    createdAt: string;
    updatedAt: string;
    user?: User;
    items?: CartItem[];
  }
  
  export interface CartItem {
    id: number;
    cartId: number;
    productItemId: number;
    quantity: number;
    createdAt: string;
    updatedAt: string;
    cart?: Cart;
    productItem?: ProductItem;
    ingredients?: Ingredient[];
  }
  
  export interface Order {
    id: number;
    userId?: number;
    token: string;
    totalAmount: number;
    status: OrderStatus;
    paymentId?: string;
    items: any;
    fullName: string;
    email: string;
    phone: string;
    address: string;
    comment?: string;
    createdAt: string;
    updatedAt: string;
    user?: User;
  }
  
  export interface VerificationCode {
    id: number;
    userId: number;
    code: string;
    createdAt: string;
    user?: User;
  }
  
  export interface Story {
    id: number;
    previewImageUrl: string;
    createdAt: string;
    items?: StoryItem[];
  }
  
  export interface StoryItem {
    id: number;
    storyId: number;
    sourceUrl: string;
    createdAt: string;
    story?: Story;
  }