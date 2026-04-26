"use client";

import { useCartStore } from "@/lib/store";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function CheckoutPage() {
  const { items } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<"shipping" | "payment">("shipping");

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-[#C0C0C0] selection:text-[#0B0B0B] font-sans">
      <main className="max-w-[1440px] w-full mx-auto px-6 md:px-16 py-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Form */}
        <div className="lg:col-span-7 flex flex-col gap-12">
          {step === "shipping" ? (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <Link href="/products" className="inline-flex items-center gap-2 text-[#808080] hover:text-white transition-colors duration-300 mb-12 group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                <span className="text-xs uppercase tracking-[0.2em]">Return_To_Cart</span>
              </Link>
              
              <div className="mb-12">
                <h1 className="font-heading text-4xl text-white mb-4 uppercase tracking-[0.1em]">Shipping_Details</h1>
                <p className="text-lg text-[#808080] font-light">Provide your coordinates for the delivery of your relics.</p>
              </div>

              <form className="space-y-12">
                {/* Contact */}
                <div className="space-y-8">
                  <h2 className="font-heading text-xl text-[#C0C0C0] tracking-wider uppercase">Contact</h2>
                  <div className="border-b border-[#2F2F2F] focus-within:border-[#C0C0C0] transition-colors pb-2">
                    <label htmlFor="email" className="block text-xs text-[#808080] mb-2 uppercase tracking-[0.2em]">Email_Address</label>
                    <input id="email" name="email" type="email" required autoComplete="email" placeholder="your@email.com" className="w-full bg-transparent border-none p-0 text-white placeholder-[#2F2F2F] focus:ring-0 outline-none" />
                  </div>
                </div>

                {/* Delivery */}
                <div className="space-y-8 pt-8">
                  <h2 className="font-heading text-xl text-[#C0C0C0] tracking-wider uppercase">Delivery_Address</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="border-b border-[#2F2F2F] focus-within:border-[#C0C0C0] transition-colors pb-2">
                      <label htmlFor="firstName" className="block text-xs text-[#808080] mb-2 uppercase tracking-[0.2em]">First_Name</label>
                      <input id="firstName" name="firstName" type="text" required autoComplete="given-name" placeholder="Given Name" className="w-full bg-transparent border-none p-0 text-white placeholder-[#2F2F2F] focus:ring-0 outline-none" />
                    </div>
                    <div className="border-b border-[#2F2F2F] focus-within:border-[#C0C0C0] transition-colors pb-2">
                      <label htmlFor="lastName" className="block text-xs text-[#808080] mb-2 uppercase tracking-[0.2em]">Last_Name</label>
                      <input id="lastName" name="lastName" type="text" required autoComplete="family-name" placeholder="Surname" className="w-full bg-transparent border-none p-0 text-white placeholder-[#2F2F2F] focus:ring-0 outline-none" />
                    </div>
                  </div>
                  <div className="border-b border-[#2F2F2F] focus-within:border-[#C0C0C0] transition-colors pb-2">
                    <label htmlFor="address" className="block text-xs text-[#808080] mb-2 uppercase tracking-[0.2em]">Street_Address</label>
                    <input id="address" name="address" type="text" required autoComplete="street-address" placeholder="Apt, Suite, Unit, etc." className="w-full bg-transparent border-none p-0 text-white placeholder-[#2F2F2F] focus:ring-0 outline-none" />
                  </div>
                </div>

                <div className="pt-12">
                  <button 
                    onClick={(e) => { e.preventDefault(); setStep("payment"); }}
                    className="w-full bg-[#C0C0C0] text-[#0B0B0B] text-xs py-6 uppercase tracking-[0.2em] hover:bg-white transition-all duration-500 hover:shadow-[0_0_15px_rgba(192,192,192,0.3)]"
                  >
                    Continue_To_Payment
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <button onClick={() => setStep("shipping")} className="inline-flex items-center gap-2 text-[#808080] hover:text-white transition-colors duration-300 mb-12 group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                <span className="text-xs uppercase tracking-[0.2em]">Back_To_Shipping</span>
              </button>

              <section className="mb-12">
                <h1 className="font-heading text-4xl text-white mb-4 uppercase tracking-[0.1em]">Final_Authorization</h1>
                <p className="text-lg text-[#808080] font-light">SECURE_YOUR_RELIC._ALL_TRANSACTIONS_ARE_ENCRYPTED_AND_FINAL.</p>
              </section>

              <form>
                {/* Payment Method */}
                <section className="flex flex-col gap-8">
                  <h2 className="text-xs tracking-[0.2em] uppercase text-[#808080] border-b border-[#2F2F2F] pb-4">Payment_Method</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="cursor-pointer relative flex flex-col p-6 border border-[#C0C0C0] bg-[#1A1A1A]/50 transition-colors duration-300">
                      <input type="radio" name="payment_method" className="peer sr-only" defaultChecked />
                      <div className="flex items-center justify-between">
                        <span className="text-xs tracking-[0.2em] uppercase text-white">Credit_Card</span>
                      </div>
                    </label>
                    <label className="cursor-pointer relative flex flex-col p-6 border border-[#2F2F2F] bg-[#0B0B0B] hover:bg-[#1A1A1A] transition-colors duration-300">
                      <input type="radio" name="payment_method" className="peer sr-only" />
                      <div className="flex items-center justify-between">
                        <span className="text-xs tracking-[0.2em] uppercase text-[#808080]">Crypto_Wallet</span>
                      </div>
                    </label>
                  </div>
                </section>

                {/* Card Input Form */}
                <section className="flex flex-col gap-12 pt-8 mt-8 border-t border-[#2F2F2F]">
                  <div className="relative w-full group">
                    <label htmlFor="cc-name" className="absolute -top-6 left-0 text-xs tracking-[0.2em] uppercase text-[#808080] group-focus-within:text-[#C0C0C0] transition-colors">Cardholder_Name</label>
                    <input id="cc-name" name="cc-name" type="text" required autoComplete="cc-name" placeholder="AS_IT_APPEARS_ON_CARD" className="w-full bg-transparent border-0 border-b border-[#2F2F2F] focus:ring-0 focus:border-[#C0C0C0] outline-none text-white pb-2 px-0 transition-colors" />
                  </div>
                  <div className="relative w-full group">
                    <label htmlFor="cc-number" className="absolute -top-6 left-0 text-xs tracking-[0.2em] uppercase text-[#808080] group-focus-within:text-[#C0C0C0] transition-colors">Card_Number</label>
                    <input id="cc-number" name="cc-number" type="text" required autoComplete="cc-number" placeholder="XXXX_XXXX_XXXX_XXXX" className="w-full bg-transparent border-0 border-b border-[#2F2F2F] focus:ring-0 focus:border-[#C0C0C0] outline-none text-white pb-2 px-0 transition-colors" />
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="relative w-full group">
                      <label htmlFor="cc-exp" className="absolute -top-6 left-0 text-xs tracking-[0.2em] uppercase text-[#808080] group-focus-within:text-[#C0C0C0] transition-colors">Expiration</label>
                      <input id="cc-exp" name="cc-exp" type="text" required autoComplete="cc-exp" placeholder="MM/YY" className="w-full bg-transparent border-0 border-b border-[#2F2F2F] focus:ring-0 focus:border-[#C0C0C0] outline-none text-white pb-2 px-0 transition-colors" />
                    </div>
                    <div className="relative w-full group">
                      <label htmlFor="cc-csc" className="absolute -top-6 left-0 text-xs tracking-[0.2em] uppercase text-[#808080] group-focus-within:text-[#C0C0C0] transition-colors">Security_Code</label>
                      <input id="cc-csc" name="cc-csc" type="text" required autoComplete="cc-csc" placeholder="CVV" className="w-full bg-transparent border-0 border-b border-[#2F2F2F] focus:ring-0 focus:border-[#C0C0C0] outline-none text-white pb-2 px-0 transition-colors" />
                    </div>
                  </div>
                </section>
                
                <div className="pt-12">
                  <button type="submit" onClick={(e) => { e.preventDefault(); }} className="w-full bg-[#C0C0C0] text-[#0B0B0B] text-xs py-6 px-8 text-center uppercase tracking-[0.2em] hover:bg-white hover:shadow-[0_0_20px_rgba(192,192,192,0.3)] transition-all duration-500 outline-none">
                    Complete_Purchase
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5 relative mt-16 lg:mt-0">
          <div className="sticky top-32 bg-[#1A1A1A] border border-[#2F2F2F] p-8 flex flex-col gap-8">
            <h3 className="font-heading text-xl text-white border-b border-[#2F2F2F] pb-4 uppercase tracking-wider">Order_Summary</h3>
            
            <div className="flex flex-col gap-6">
              {items.map(item => (
                <div key={item.id} className="flex items-start gap-6">
                  <div className="w-20 h-24 bg-[#0B0B0B] border border-[#2F2F2F] flex-shrink-0 relative overflow-hidden">
                    <Image src={item.image || "/placeholder.jpg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex flex-col gap-2 flex-grow">
                    <span className="text-xs tracking-[0.2em] uppercase text-white">{item.name}</span>
                    <span className="text-xs text-[#808080] uppercase tracking-widest">Qty: {item.quantity}</span>
                    <span className="font-mono text-sm text-white mt-auto pt-2">${item.price * item.quantity}</span>
                  </div>
                </div>
              ))}
              {items.length === 0 && (
                <p className="text-[#808080] text-xs tracking-widest uppercase">Your chamber is empty.</p>
              )}
            </div>

            <div className="flex flex-col gap-4 border-t border-[#2F2F2F] pt-8">
              <div className="flex justify-between items-center text-xs tracking-[0.2em] uppercase">
                <span className="text-[#808080]">Subtotal</span>
                <span className="text-white">${subtotal}</span>
              </div>
              <div className="flex justify-between items-center text-xs tracking-[0.2em] uppercase">
                <span className="text-[#808080]">Secure_Shipping</span>
                <span className="text-white">Complimentary</span>
              </div>
            </div>

            <div className="flex justify-between items-end border-t border-[#2F2F2F] pt-8 mt-4">
              <span className="text-xs tracking-[0.2em] uppercase text-white">Total_Amount</span>
              <span className="font-heading text-2xl tracking-widest text-white">${subtotal}</span>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
