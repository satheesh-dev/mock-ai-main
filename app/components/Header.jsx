import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="py-6 px-4 md:px-6 lg:px-8 flex items-center justify-between">
      <Link
        href="/"
        className=" flex items-center justify-center gap-3 text-2xl font-bold text-gray-900"
      >
        <Image
          src="/logo.svg"
          width={60}
          height={50}
          alt="logo"
          className="w-12 h-12"
        />
        MockAI
      </Link>
    </header>
  );
}
