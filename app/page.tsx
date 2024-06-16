'use client'
import { setCookie } from 'cookies-next';
import React, { useState, FormEvent } from "react";

export default function Home() {
  const [name, setName] = useState<string>();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCookie("name", name);
    alert("Данные сохранены в куки!");
    window.location.href = window.location.origin + "/euro2024"
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-white">
      <img src="/euro2024-logo.png" alt="Euro2024 Logo" className="mb-8" />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Вход</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Имя
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Войти
          </button>
        </div>
      </form>
    </main>
  );
}
