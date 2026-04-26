"use client";

import { useCartStore } from "@/lib/store";
import { useEffect, useState } from "react";
import Image from "next/image";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";

export function CartDrawer() {
  const { items, isOpen, setCartOpen, removeItem, increaseQuantity, decreaseQuantity } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-[#0B0B0B]/80 z-[60] transition-opacity duration-300" 
          onClick={() => setCartOpen(false)}
        />
      )}

      {/* Drawer */}
      <aside 
        className={`fixed right-0 top-0 h-full z-[70] flex flex-col p-8 bg-[#0B0B0B] text-[#E6E6E6] w-full md:w-96 border-l border-[#2F2F2F] shadow-[-20px_0_40px_rgba(0,0,0,0.8)] transition-transform duration-300 ease-out will-change-transform ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-[#C0C0C0] font-heading text-lg tracking-[0.3em] uppercase">Sacred_Chamber</h2>
          </div>
          <button 
            onClick={() => setCartOpen(false)}
            className="text-[#808080] hover:text-white transition-colors duration-300 focus:outline-none"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Tabs Mock */}
        <nav className="flex flex-col gap-4 mb-12 uppercase tracking-[0.2em] text-xs">
          <div className="flex items-center gap-4 p-4 bg-[#1A1A1A] text-white border-l-2 border-[#C0C0C0]">
            <ShoppingBag className="w-5 h-5" />
            <span>My_Bag ({items.length})</span>
          </div>
        </nav>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          {items.length === 0 ? (
            <p className="text-[#808080] text-xs uppercase tracking-widest text-center mt-12">Chamber is empty</p>
          ) : (
            <div className="space-y-8">
              {items.map((item) => (
                <div key={item.id} className="flex gap-6 pb-8 border-b border-[#2F2F2F]">
                  <div className="w-24 h-24 bg-[#1A1A1A] border border-[#2F2F2F] flex-shrink-0 relative overflow-hidden flex items-center justify-center">
                    <Image 
                      src={item.image || "/placeholder.jpg"} 
                      alt={item.name} 
                      fill
                      sizes="96px"
                      className="object-cover" 
                    />
                  </div>
                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="font-heading text-sm text-white mb-1 uppercase tracking-wider">{item.name}</h3>
                      <p className="text-xs text-[#808080] uppercase tracking-widest">{item.material}</p>
                    </div>
                    
                    <div className="flex justify-between items-end mt-4">
                      <div className="flex items-center gap-3 border border-[#2F2F2F] p-1">
                        <button onClick={() => decreaseQuantity(item.id)} className="p-1 text-[#808080] hover:text-white transition-colors"><Minus className="w-3 h-3" /></button>
                        <span className="text-xs font-mono">{item.quantity}</span>
                        <button onClick={() => increaseQuantity(item.id)} className="p-1 text-[#808080] hover:text-white transition-colors"><Plus className="w-3 h-3" /></button>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2">
                        <span className="font-mono text-sm text-[#C0C0C0]">${item.price * item.quantity}</span>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-[#808080] hover:text-[#7f1d1d] transition-colors focus:outline-none"
                        >
                          <span className="text-xs uppercase tracking-[0.2em]">Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer / Checkout */}
        <div className="mt-8 pt-8 border-t border-[#2F2F2F]">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xs uppercase tracking-[0.2em] text-[#808080]">Subtotal</span>
            <span className="font-heading text-xl text-white tracking-widest">${subtotal}</span>
          </div>
          <button 
            disabled={items.length === 0}
            onClick={() => {
              setCartOpen(false);
              window.location.href = "/checkout";
            }}
            className="w-full py-4 px-6 bg-[#C0C0C0] text-black text-xs uppercase tracking-[0.2em] hover:bg-white transition-all duration-300 focus:outline-none disabled:opacity-50 group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Proceed_To_Checkout
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}
