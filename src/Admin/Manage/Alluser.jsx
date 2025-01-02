import React from "react";
import Navbar from "../../Component/Navbar";
import { FaEye } from "react-icons/fa";

export default function Alluser() {
  const users = [
    { name: "Name 1", typeSalary: "Type Salary" },
    { name: "Name 2", typeSalary: "Type Salary" },
    { name: "Name 3", typeSalary: "Type Salary" },
    { name: "Name 4", typeSalary: "Type Salary" },
    { name: "Name 5", typeSalary: "Type Salary" },
    { name: "Name 6", typeSalary: "Type Salary" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-green-900 to-black font-sans text-white">
      <Navbar />

      <header className="text-center py-8">
        <h1 className="text-3xl font-bold uppercase tracking-widest">
          User All
        </h1>
      </header>

      <main className="flex justify-center items-center px-4 py-6">
        <div className="w-full max-w-4xl bg-black/50 rounded-lg shadow-lg p-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left text-sm md:text-lg text-white border-b border-gray-600">
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Type Salary</th>
                <th className="py-2 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-700 transition-colors border-b border-gray-700"
                >
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.typeSalary}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      className="p-2 bg-gray-800 rounded-full hover:bg-gray-600 transition-colors"
                      aria-label="View Details"
                    >
                      <FaEye className="text-white" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
