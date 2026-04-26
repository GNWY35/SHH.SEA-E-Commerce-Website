export type Product = {
  id: string;
  name: string;
  category: "jewelry" | "apparel";
  price: number;
  description: string;
  material: string;
  inStock: boolean;
  image: string;
};

export const mockProducts: Product[] = [
  {
    id: "p_1",
    name: "Chrome Spine Chain",
    category: "jewelry",
    price: 300,
    description: "Heavy cast chrome necklace mimicking spinal vertebrae. Cold to the touch. Features a custom locking clasp.",
    material: "Solid Sterling Silver / Chrome finish",
    inStock: true,
    image: "/images/chain.jpg"
  },
  {
    id: "p_2",
    name: "Cross Yadom Pendant",
    category: "jewelry",
    price: 499,
    description: "A cross necklace with abilities to heal and protect. ",
    material: "Silver-toned pendant, black cord",
    inStock: true,
    image: "/images/cross-yadom.jpg"
  },
  {
    id: "p_3",
    name: "Angel AirPods",
    category: "jewelry",
    price: 699,
    description: "An Angel ear-cuff that is a symbol of protection and faith",
    material: "Black Plastic",
    inStock: false,
    image: "/images/earpod.jpg"
  },
  {
    id: "p_4",
    name: "Binding Faith T-Shirt",
    category: "apparel",
    price: 599,
    description: "A black T-Shirt with a strap sewed on the back.",
    material: "100% Cotton",
    inStock: false,
    image: "/images/tshirt.jpg"
  },
];

export async function getProducts(category?: string) {
  // simulate DB delay
  await new Promise(resolve => setTimeout(resolve, 500));
  if (category) {
    return mockProducts.filter(p => p.category === category);
  }
  return mockProducts;
}

export async function getProduct(id: string) {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockProducts.find(p => p.id === id);
}
