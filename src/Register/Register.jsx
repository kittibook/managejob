import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; 
import Configurl from "../config";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordconfirm: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password || !formData.passwordconfirm) {
      Swal.fire({
        icon: "error",
        title: "กรุณากรอกข้อมูลให้ครบถ้วน",
      });
      return;
    }

    if (formData.password !== formData.passwordconfirm) {
      Swal.fire({
        icon: "error",
        title: "รหัสผ่านไม่ตรงกัน",
      });
      return;
    }

    try {
      const response = await axios.post(Configurl.Url + "/register", {
        username: formData.username,
        password: formData.password,
        passwordconfirm: formData.passwordconfirm,
      });

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "ลงทะเบียนสำเร็จ!",
          text: "คุณสามารถเข้าสู่ระบบได้แล้ว",
        }).then(() => {
          navigate("/login");
        });
      }
    } catch (error) {
      if (error.response) {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาดในการลงทะเบียน",
          text: error.response.data.message || "กรุณาลองใหม่อีกครั้ง",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-green-900 to-black flex items-center justify-center font-sans text-white">
      <div className="w-full max-w-lg bg-black/40 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block text-sm mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block text-sm mb-2" htmlFor="passwordconfirm">
              Confirm Password
            </label>
            <input
              type="password"
              id="passwordconfirm"
              name="passwordconfirm"
              value={formData.passwordconfirm}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition font-semibold"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-green-400 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
