import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-background w-full border-t border-[#2F2F2F]">
      <div className="flex flex-col items-center gap-12 py-24 px-12 max-w-7xl mx-auto">
        <div className="text-lg font-heading tracking-[0.4em] text-[#808080]">
          SHH
        </div>
        <div className="flex gap-8">
          <Link href="#" className="font-sans uppercase tracking-[0.15em] text-[10px] text-[#808080] hover:text-[#C0C0C0] transition-all ease-in-out duration-300">Privacy</Link>
          <Link href="#" className="font-sans uppercase tracking-[0.15em] text-[10px] text-[#808080] hover:text-[#C0C0C0] transition-all ease-in-out duration-300">Terms</Link>
          <Link href="#" className="font-sans uppercase tracking-[0.15em] text-[10px] text-[#808080] hover:text-[#C0C0C0] transition-all ease-in-out duration-300">Shipping</Link>
          <Link href="#" className="font-sans uppercase tracking-[0.15em] text-[10px] text-[#808080] hover:text-[#C0C0C0] transition-all ease-in-out duration-300">Contact</Link>
        </div>
        <div className="font-sans uppercase tracking-[0.15em] text-[10px] text-[#2F2F2F] mt-8">
          © {new Date().getFullYear()} SHH REGIME. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
}
