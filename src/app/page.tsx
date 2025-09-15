import Link from "next/link";
import { BsPersonArmsUp } from "react-icons/bs";

export default function Home() {
  return (
    <div className="h-full bg-yellow-100 flex flex-col">
      <main className="flex flex-1 flex-col lg:flex-row items-center justify-center px-10 py-16">
        <div className="lg:w-1/2 space-y-6">
          <h2 className="text-4xl lg:text-6xl font-bold text-black leading-tight">
            Tulis Ide Kamu <br /><span className="text-orange-700">Kapan Saja</span>, Dimana Saja.
          </h2>
          <Link
            href={"/auth/register"}
            className="bg-orange-700 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow hover:bg-orange-800"
          >
            Mulai Tulis Ide
          </Link>
        </div>
        <div className="lg:w-1/2 flex justify-center mt-10 lg:mt-0">
          <div className="bg-yellow-300 p-8 rounded-2xl shadow-xl w-80 h-96 relative">
            <h3 className="text-black text-xl font-bold mb-4">My Notes</h3>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
            <div className="absolute -bottom-4 -right-4 w-15 h-15 bg-orange-700 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
              <BsPersonArmsUp size={36} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
