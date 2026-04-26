"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/store";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export function Header() {
  const { items, toggleCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-background/95 border-b border-border/50 px-6 py-6 flex justify-between items-center transition-all duration-500">
        <div className="flex items-center gap-4">
          <button 
            className="md:hidden text-primary hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Mobile Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Link href="/" className="font-heading text-xl tracking-[0.4em] text-primary hover:text-white transition-colors duration-500 uppercase">
            SHH.SEA
          </Link>
        </div>
        
        {/* Navigation Links (Desktop) perfectly centered */}
        <nav className="hidden md:flex items-center gap-8 text-xs tracking-[0.2em] uppercase text-[#808080] absolute right-1/2 translate-x-1/2">
          <Link href="/products" className="hover:text-white transition-colors duration-300">All_Artifacts</Link>
          <Link href="/products?category=jewelry" className="hover:text-white transition-colors duration-300">Jewelry</Link>
          <Link href="/products?category=apparel" className="hover:text-white transition-colors duration-300">Apparel</Link>
        </nav>

        <button onClick={toggleCart} className="text-xs tracking-[0.2em] uppercase text-primary hover:text-white transition-colors duration-500">
          Cart [{mounted ? itemCount : 0}]
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-[#0B0B0B] flex flex-col p-8 animate-in slide-in-from-top-full duration-500">
          <div className="flex justify-end mb-16">
            <button 
              className="text-[#808080] hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close Mobile Menu"
            >
              <X className="w-8 h-8" />
            </button>
          </div>
          <nav className="flex flex-col gap-12 items-center text-center mt-12">
            <Link onClick={() => setMobileMenuOpen(false)} href="/products" className="font-heading text-2xl tracking-[0.3em] uppercase text-white hover:text-[#C0C0C0] transition-colors">All Artifacts</Link>
            <Link onClick={() => setMobileMenuOpen(false)} href="/products?category=jewelry" className="font-heading text-2xl tracking-[0.3em] uppercase text-white hover:text-[#C0C0C0] transition-colors">Jewelry</Link>
            <Link onClick={() => setMobileMenuOpen(false)} href="/products?category=apparel" className="font-heading text-2xl tracking-[0.3em] uppercase text-white hover:text-[#C0C0C0] transition-colors">Apparel</Link>
          </nav>
        </div>
      )}
    </>
  );
}
