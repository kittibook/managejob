import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Component/Navbar";
import axios from "axios";
import Configurl from "../../config";

export default function Managereduceticket() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const id = urlSearchParams.get("id");
  const navigate = useNavigate();
  const [Info, setInfo] = useState();
  const [User, setUser] = useState();
  const [money, setmoney] = useState();
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
      console.log(res.data); // ตรวจสอบข้อมูลที่ได้จาก API
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
        Configurl.Url +  "/user",
        { userid: Number(id) } // body (ถ้าไม่มีให้เว้นว่างเป็น {})
      );
      if (res.data.status == 200) {
        const user = res.data.user;
        console.log(user); // ตรวจสอบข้อมูล user ที่ได้รับ
        setUser(user);
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
      title: "ยืนยันการลดตั๋ว?",
      text: "กรุณายืนยันการลดตั๋ว",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          if(money) {
            const res = await axios.post(
              Configurl.Url + "/reduceTicket",
              { userid: Number(id) , ticket : Number(money)} // body (ถ้าไม่มีให้เว้นว่างเป็น {})
            );
            console.log(res.data)
            if (res.data.status == 200) {
              Swal.fire("สำเร็จ!", "ข้อมูลได้ถูกบันทึกเรียบร้อย.", "success");
              fetchData();
              setmoney(0)
            } else {
              Swal.fire("ล้มเหลว!", "ข้อมูลล้มเหลว", "error");
            }
          }
          
        } catch (error) {
          console.error(
            "Error data:",
            error.response ? error.response.data : error.message
          );
        }
        // Swal.fire("สำเร็จ!", "ข้อมูลได้ถูกบันทึกเรียบร้อย.", "success");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-green-900 to-black font-sans text-white">
      <Navbar />

      <header className="w-full py-4 px-4 md:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="w-[50%] text-center">
          <button className="TITLENAV" data-text="Awesome">
            <span className="actual-text font-extrabold text-2xl">
              &nbsp;ลดตั๋ว&nbsp;
            </span>
            <span
              aria-hidden="true"
              className="hover-text font-extrabold text-2xl"
            >
              &nbsp;ลดตั๋ว&nbsp;
            </span>
          </button>
        </div>
      </header>

      <main className="w-full flex-grow flex items-center justify-center px-4 md:px-8 py-6">
        <div className="w-full max-w-5xl bg-black/40 rounded-lg p-6 md:p-8 shadow-lg">
          <section className="w-full flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-600 pb-4 mb-6">
            <div className="w-full md:w-1/2 mb-4 md:mb-0">
              <p className="text-xl md:text-2xl font-bold">
                {User && User.username ? User.username : "กำลังค้นหาข้อมูล..."}
              </p>
              <p className="text-sm md:text-md text-gray-300">
                งาน : {User && User.job ? User.job : "กำลังค้นหาข้อมูล..."}
              </p>
            </div>
            <div className="w-full md:w-1/2 text-left md:text-right">
              <p className="text-xl md:text-2xl font-semibold">
                ยอดเงินสุทธิ :{" "}
                <span className="text-green-400">
                  {User && User.Salary && User.Salary.length > 0
                    ? `${User.Salary[0].salary}` // เข้าถึงค่า salary ของตัวแรกใน Array
                    : "กำลังค้นหาข้อมูล..."}
                  .00
                </span>
              </p>
            </div>
          </section>

          <section className="w-full flex flex-wrap  items-center gap-4 mb-6">
            <button
              onClick={backhome}
              className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition font-medium"
            >
              กลับ
            </button>
          </section>

          <section className="pt-5 pl-20 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="bg-gray-800 p-5 rounded-lg shadow-md flex flex-col items-center justify-center">
              <p className="text-sm md:text-lg font-medium">เบิกเงินเดือน</p>
            </div>
            <div className="flex flex-col col-span-3">
              <input
                className="mt-2 p-3 bg-gray-800 text-white rounded-lg border border-gray-600 md:text-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="กรอกจำนวนตั๋ว"
                value={money}
                  onChange={e => setmoney(e.target.value)}
              />
            </div>
            <div className="flex justify-center items-center">
              <button
                type="submit"
                onClick={handleSubmit}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-green-500 transition font-semibold w-full md:w-auto"
              >
                ยืนยัน
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
