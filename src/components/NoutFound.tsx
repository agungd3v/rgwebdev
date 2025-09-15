import { BsFillSignStopFill } from "react-icons/bs";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center mt-36 px-5">
      <div className="flex flex-col items-center gap-3">
        <BsFillSignStopFill className="text-orange-700" size={80} />
        <p className="font-bold text-xl">Halaman tidak ditemukan</p>
      </div>
    </div>
  );
}