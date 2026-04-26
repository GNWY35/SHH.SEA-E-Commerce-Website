import Link from "next/link";
import Image from "next/image";
import { getProducts } from "@/lib/data";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const resolvedParams = await searchParams;
  const category = resolvedParams.category;
  
  const products = await getProducts(category);

  return (
    <div className="min-h-screen flex flex-col pt-12 px-6 lg:px-16 animate-in fade-in duration-1000">
      <header className="mb-24 flex flex-col gap-4">
        <h1 className="font-heading text-4xl md:text-6xl uppercase tracking-[0.15em] text-primary">
          {category ? category.toUpperCase() : "The Collection"}
        </h1>
        <p className="text-muted-foreground font-light tracking-widest uppercase text-sm">
          {products.length} Artifacts
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
        {products.map((product) => (
          <Link 
            key={product.id} 
            href={`/products/${product.id}`}
            className="group flex flex-col gap-6"
          >
            <div className="aspect-[4/5] bg-secondary/30 relative overflow-hidden flex items-center justify-center border border-border/20 transition-colors duration-700 group-hover:bg-secondary/50 group-hover:border-primary/20">
              <Image 
                src={product.image || "/placeholder.jpg"} 
                alt={product.name} 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/50" />
            </div>
            
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <h2 className="font-heading text-lg tracking-wider text-primary uppercase">
                  {product.name}
                </h2>
                <span className="text-primary font-mono text-sm">${product.price}</span>
              </div>
              <p className="text-muted-foreground text-sm font-light uppercase tracking-widest">
                {product.inStock ? "Available" : "Archived"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
