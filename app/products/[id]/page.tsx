import { notFound } from "next/navigation";
import Image from "next/image";
import { getProduct } from "@/lib/data";
import { AddToCartButton } from "@/components/product/AddToCartButton";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 pt-[88px] animate-in fade-in duration-1000">
      {/* Left: Sticky Details */}
      <div className="order-2 lg:order-1 flex flex-col justify-between p-6 lg:p-16 lg:sticky lg:top-[88px] lg:h-[calc(100vh-88px)]">
        <div className="flex flex-col gap-12">
          <header className="flex flex-col gap-4">
            <h1 className="font-heading text-4xl lg:text-5xl uppercase tracking-[0.1em] text-primary">
              {product.name}
            </h1>
            <p className="font-mono text-xl text-primary">${product.price}</p>
          </header>

          <div className="space-y-6">
            <p className="text-muted-foreground font-light leading-relaxed max-w-md">
              {product.description}
            </p>
            <div className="border-t border-border/50 pt-6">
              <span className="block text-xs uppercase tracking-widest text-muted-foreground/60 mb-2">Material</span>
              <p className="text-primary text-sm uppercase tracking-wider">{product.material}</p>
            </div>
          </div>
        </div>

        <div className="mt-12 lg:mt-0 flex flex-col gap-4">
          <AddToCartButton product={product} />
        </div>
      </div>

      {/* Right: Immersive Media */}
      <div className="order-1 lg:order-2 aspect-[3/4] lg:aspect-auto lg:h-full bg-secondary/20 relative overflow-hidden flex items-center justify-center border-b lg:border-b-0 lg:border-l border-border/20">
        <Image 
          src={product.image || "/placeholder.jpg"} 
          alt={product.name} 
          fill 
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover" 
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-background/20 to-background/50 z-10 pointer-events-none" />
      </div>
    </div>
  );
}
