import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios"; 
import Configurl from "../config";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(Configurl.Url + "/login", {
        username: formData.username,
        password: formData.password,
      });
      console.log(response)
      if (response.data.status === 200) {  
        localStorage.setItem("BX_Token", response.data.token);
        Swal.fire({
          title: "เข้าสู่ระบบสำเร็จ!",
          text: "ยินดีต้อนรับเข้าสู่ระบบ",
          icon: "success",
          confirmButtonText: "ตกลง",
        }).then(() => {
          if(response.data.success){
          navigate("/admin"); 

          } else {
            navigate("/user"); 

          }
        });
      } else {
        Swal.fire({
          title: "เข้าสู่ระบบล้มเหลว",
          text:  response.data.message,
          icon: "error",
          confirmButtonText: "ตกลง",
        });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "เข้าสู่ระบบล้มเหลว";
      setError(errorMessage);
      Swal.fire({
        title: "เข้าสู่ระบบล้มเหลว",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "ตกลง",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-green-900 to-black flex items-center justify-center font-sans text-white">
      <div className="w-full max-w-lg bg-black/40 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">เข้าสู่ระบบ</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-2" htmlFor="username">
              ชื่อผู้ใช้
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
              รหัสผ่าน
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

          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition font-semibold"
          >
            เข้าสู่ระบบ
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          ยังไม่มีบัญชี?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-green-400 hover:underline"
          >
            สมัครสมาชิก
          </button>
        </p>
      </div>
    </div>
  );
}
