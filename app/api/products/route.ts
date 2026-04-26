import { NextResponse } from "next/server";

export type Product = {
  id: string;
  name: string;
  category: "jewelry" | "apparel";
  price: number;
  description: string;
  material: string;
  inStock: boolean;
};

const mockProducts: Product[] = [
  {
    id: "p_1",
    name: "Chrome Spine Chain",
    category: "jewelry",
    price: 450,
    description: "Heavy cast chrome necklace mimicking spinal vertebrae. Cold to the touch. Features a custom locking clasp.",
    material: "Solid Sterling Silver / Chrome finish",
    inStock: true,
  },
  {
    id: "p_2",
    name: "Obsidian Signet Ring",
    category: "jewelry",
    price: 280,
    description: "Brutalist signet ring featuring a raw cut obsidian stone set in brushed charcoal steel.",
    material: "Black Steel / Obsidian",
    inStock: true,
  },
  {
    id: "p_3",
    name: "Layered Ritual Hoodie",
    category: "apparel",
    price: 320,
    description: "Oversized silhouette with extreme texture layering. Matte black heavy cotton with subtle tonal embroidery.",
    material: "100% Heavyweight Cotton",
    inStock: false,
  },
  {
    id: "p_4",
    name: "Sacred Blade Pendant",
    category: "jewelry",
    price: 190,
    description: "Angel/blade hybrid pendant suspended on a micro-chain. Minimalist expression of power.",
    material: "Gunmetal",
    inStock: true,
  }
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  let products = mockProducts;
  if (category) {
    products = products.filter(p => p.category === category);
  }

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  return NextResponse.json({ products });
}
