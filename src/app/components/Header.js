import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          AYUSH
        </Link>
        <div className="space-x-4">
          <Link
            href="/"
            className="hover:text-gray-300 transition duration-300"
          >
            Home
          </Link>
          <Link
            href="/chatbot"
            className="hover:text-gray-300 transition duration-300"
          >
            Chatbot
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
