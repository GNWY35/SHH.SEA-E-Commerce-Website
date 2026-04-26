import Link from "next/link";
import Image from "next/image";
import { getProducts } from "@/lib/data";

export default async function Home() {
  // Fetch products and just slice the first 3 to act as "Featured"
  const allProducts = await getProducts();
  const featuredProducts = allProducts.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Minimalist Hero Section */}
      <section className="relative min-h-[80vh] w-full flex flex-col items-center justify-center pt-32 pb-24 px-6 md:px-16 border-b border-[#2F2F2F]">
        <div className="text-center flex flex-col items-center gap-12 w-full max-w-[1440px] mx-auto mt-16 animate-in fade-in zoom-in-95 duration-1000">
          <h1 className="font-heading text-6xl md:text-8xl lg:text-[110px] text-chrome-gradient tracking-widest uppercase max-w-6xl mx-auto leading-none">
            WEAR YOUR DARKNESS
          </h1>
          <h2 className="font-heading text-lg md:text-2xl text-[#808080] tracking-[0.3em] uppercase max-w-3xl mx-auto leading-relaxed">
            SILENCE SPEAKS POWER.
          </h2>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-32 px-6 md:px-16 w-full max-w-[1440px] mx-auto" id="collection">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {featuredProducts.map((product, index) => (
            <Link 
              href={`/products/${product.id}`} 
              key={product.id}
              className={`group cursor-pointer ${index === 1 ? 'md:mt-16' : ''}`}
            >
              <div className="bg-[#1A1A1A] aspect-[4/5] overflow-hidden mb-6 relative border border-transparent group-hover:border-[#2F2F2F] transition-colors duration-500">
                <Image 
                  src={product.image || "/placeholder.jpg"} 
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 mix-blend-luminosity group-hover:mix-blend-normal group-hover:scale-105 transform"
                />
              </div>
              <div className="flex justify-between items-start">
                <h3 className="font-sans text-[10px] text-white uppercase tracking-widest font-semibold">{product.name}</h3>
                <span className="font-mono text-sm text-[#808080]">${product.price}</span>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-24 flex justify-center">
          <Link
            href="/products"
            className="group flex items-center justify-center border border-[#C0C0C0]/20 bg-background px-12 py-6 text-xs uppercase tracking-[0.2em] text-[#C0C0C0] transition-all duration-700 ease-out hover:border-[#C0C0C0]/60 hover:bg-[#C0C0C0]/5 hover:shadow-[0_0_30px_rgba(192,192,192,0.1)]"
          >
            Explore_Full_Collection
          </Link>
        </div>
      </section>
    </div>
  );
}
