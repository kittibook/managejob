import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Component/Navbar";
import axios from "axios";
import Configurl from "../../config";

export default function ManageUser() {
  const navigate = useNavigate();
  const urlSearchParams = new URLSearchParams(window.location.search);
  const id = urlSearchParams.get("id");

  const [User, setUser] = useState();
  const [name, setname] = useState();
  const [job, setjob] = useState();
  const [type, settype] = useState();
  useEffect(() => {
    fetchData(); // เรียกใช้งานฟังก์ชัน
    fetchInfo();
  }, []); // [] เพื่อรันเพียงครั้งเดียวหลัง mount

  // ฟังก์ชัน async สำหรับคำขอ API
  const fetchInfo = async () => {
    try {
      const res = await axios.post(
        Configurl.Url + "/info",
        {}, // body (ถ้าไม่มีให้เว้นว่างเป็น {})
        Configurl.headers()
      );
      // console.log(res.data); // ตรวจสอบข้อมูลที่ได้จาก API
      if (res.data.status == 200) {
      } else {
        navigate("/admin");
      }
    } catch (error) {
      console.error(
        "Error fetching data:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // ฟังก์ชัน async สำหรับคำขอ API
  const fetchData = async () => {
    try {
      const res = await axios.post(
        Configurl.Url + "/user",
        { userid: Number(id) } // body (ถ้าไม่มีให้เว้นว่างเป็น {})
      );
      if (res.data.status == 200) {
        const user = res.data.user;
        // console.log(user); // ตรวจสอบข้อมูล user ที่ได้รับ
        if (user) {
          setUser(user);
          setname(user.username);
          setjob(user.job)
          settype(user.type)
        }
      }
    } catch (error) {
      console.error(
        "Error fetching data:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const backhome = () => {
    navigate("/manage?id=" + id);
  };

  const handleSubmit = () => {
    Swal.fire({
      title: "ยืนยันการบันทึกข้อมูล?",
      text: "กรุณายืนยันการเบิกเงินเดือน",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Swal.fire("สำเร็จ!", "ข้อมูลได้ถูกบันทึกเรียบร้อย.", "success");
        try {
            const res = await axios.post(
              Configurl.Url + "/updateuser",
              { userid: Number(id), name : name, job : job, type : Number(type)} // body (ถ้าไม่มีให้เว้นว่างเป็น {})
            );
            console.log(res.data)
            if (res.data.status == 200) {
              Swal.fire("สำเร็จ!", "ข้อมูลได้ถูกบันทึกเรียบร้อย.", "success");
              fetchData();
            } else {
              Swal.fire("ล้มเหลว!", "ข้อมูลล้มเหลว", "error");
            }
        } catch (error) {
          console.error(
            "Error data:",
            error.response ? error.response.data : error.message
          );
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-green-900 to-black font-sans text-white">
      <Navbar />

      <header className="w-full py-4 px-4 md:px-8 flex justify-center">
        <h1 className="font-bold text-3xl text-white">เบิกเงิน</h1>
      </header>

      <main className="w-full flex-grow flex items-center justify-center px-4 md:px-8 py-6">
        <div className="w-full max-w-lg bg-black/40 rounded-lg p-6 shadow-lg">
          <div className="mb-6">
            <p className="text-2xl font-bold text-white">
              {User && User.username ? User.username : "กำลังค้นหาข้อมูล..."}
            </p>
            <p className="text-lg text-gray-300">
              งาน : {User && User.job ? User.job : "กำลังค้นหาข้อมูล..."}
            </p>
            <p className="text-2xl font-semibold mt-2 text-white">
              ยอดเงินสุทธิ :{" "}
              <span className="text-green-400">
                {User && User.Salary && User.Salary.length > 0
                  ? `${User.Salary[0].salary}` // เข้าถึงค่า salary ของตัวแรกใน Array
                  : "กำลังค้นหาข้อมูล..."}
                .00
              </span>
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-lg font-medium text-white mb-1">
                ชื่อ
              </label>
              <input
                value={name}
                onChange={(e) => setname(e.target.value)}
                type="text"
                placeholder="กรอกชื่อ"
                className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-white mb-1">
                งาน
              </label>
              <input
              value={job}
              onChange={(e) => setjob(e.target.value)}
                type="text"
                placeholder="กรอกงาน"
                className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-white mb-1">
                ประเภทเงินเดือน
              </label>
              <select value={type} onChange={e => settype(e.target.value)} className="select select-bordered w-full h-20 text-xl bg-gray-700 rounded hover:bg-gray-600">
                <option disabled selected>
                ประเภทเงินเดือน
                </option>
                <option value="0">เงินเดือน</option>
                <option value="1">ตั๋ว</option>
              </select>
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-4">
            <button
              onClick={backhome}
              className="px-4 py-2 bg-gray-700 text-lg text-white rounded-lg hover:bg-gray-600 transition font-medium"
            >
              กลับ
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-green-500 text-lg text-white rounded-lg hover:bg-green-600 transition font-medium"
            >
              ยืนยัน
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
