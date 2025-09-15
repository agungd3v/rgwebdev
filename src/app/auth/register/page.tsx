"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [disable, setDisable] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDisable(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/login");
      toast.success("Pendaftaran Berhasil");
    } else {
      const data = await res.json();
      toast.error(data.message || "Pendaftaran Gagal");
    }

    setDisable(false);
  };

  return (
    <div className="flex justify-center items-center mt-36 px-5">
      <form onSubmit={handleSubmit} className="bg-yellow-300 p-6 rounded-2xl border-4 border-orange-700 w-96">
        <h1 className="text-2xl font-bold mb-4 text-orange-700">Register</h1>
        <div className="h-3" />
        <input
          name="name"
          placeholder="Nama Lengkap"
          autoComplete="off"
          value={form.name}
          onChange={handleChange}
          className="border-2 border-orange-700 w-full px-2 py-3 mb-4 text-black rounded-xl outline-none"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          autoComplete="off"
          value={form.email}
          onChange={handleChange}
          className="border-2 border-orange-700 w-full px-2 py-3 mb-4 text-black rounded-xl outline-none"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="border-2 border-orange-700 w-full px-2 py-3 mb-4 text-black rounded-xl outline-none"
          required
        />
        <div className="h-3" />
        <button
          type="submit"
          className="bg-orange-700 text-yellow-100 w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer disabled:cursor-auto"
          disabled={disable}
        >
          {disable &&
            <div className="w-4 h-4 border-2 border-yellow-100 border-t-transparent border-solid rounded-full animate-spin"></div>
          }
          Register
        </button>
        <button
          type="button"
          className="bg-transparent text-orange-700 w-full py-4 rounded-xl font-bold flex items-center justify-center cursor-pointer"
          onClick={() => router.push("/auth/login")}
        >
          Login
        </button>
      </form>
    </div>
  );
}
