import React, { useEffect, useState } from "react";

import Navbar from "../../Component/Navbar";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Configurl from "../../config";

export default function ManageHome() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const id = urlSearchParams.get("id");
  const navigate = useNavigate();
  const [User, setUser] = useState();
  const [type, settype] = useState();
  const [das, setdas] = useState();
  useEffect(() => {
    fetchData(); // เรียกใช้งานฟังก์ชัน
    fetchInfo();
    fetchDatadas();
  }, []); // [] เพื่อรันเพียงครั้งเดียวหลัง mount

  // ฟังก์ชัน async สำหรับคำขอ API
  const fetchInfo = async () => {
    try {
      const res = await axios.post(
        Configurl.Url + "/info",
        {}, // body (ถ้าไม่มีให้เว้นว่างเป็น {})
        Configurl.headers()
      );
      if (res.data.status == 200) {
      } else {
        navigate("/login");
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
      console.log(res.data); // ตรวจสอบข้อมูลที่ได้จาก API
      if (res.data.status == 200) {
        const user = res.data.user;
        // console.log(user); // ตรวจสอบข้อมูล user ที่ได้รับ
        settype(user.type);
        setUser(user);
      }
    } catch (error) {
      
    }
  };

  const fetchDatadas = async () => {
    try {
      const res = await axios.post(
        Configurl.Url + "/getdas",
        { userid: Number(id) } // body (ถ้าไม่มีให้เว้นว่างเป็น {})
      );
      // console.log(res.data.history); // ตรวจสอบข้อมูลที่ได้จาก API
      if (res.data.status == 200) {
        setdas(res.data.history)
        // const user = res.data.user;
        // console.log(user); // ตรวจสอบข้อมูล user ที่ได้รับ
        // settype(user.type);
        // setUser(user);
      }
    } catch (error) {
      
    }
  };

  const deluser  = async () => {
    Swal.fire({
      title: "ยืนยันการเบิกเงินเดือน?",
      text: "กรุณายืนยันการเบิกเงินเดือน",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
            const res = await axios.post(
              Configurl.Url + "/deluser",
              { userid: Number(id)} // body (ถ้าไม่มีให้เว้นว่างเป็น {})
            );
            // console.log(res.data)
            if (res.data.status == 200) {
              Swal.fire("สำเร็จ!", "ข้อมูลได้ถูกบันทึกเรียบร้อย.", "success");
              fetchData();
              navigate("/admin")
            } else {
              Swal.fire("ล้มเหลว!", "ข้อมูลล้มเหลว", "error");
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
  }



  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-green-900 to-black font-sans text-white">
      <Navbar />

      <header className="w-full py-4 px-4 md:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="w-[50%] text-center">
          <button className="TITLENAV" data-text="Awesome">
            <span className="actual-text font-extrabold text-2xl">
              &nbsp;ManageUser&nbsp;
            </span>
            <span
              aria-hidden="true"
              className="hover-text font-extrabold text-2xl"
            >
              &nbsp;ManageUser&nbsp;
            </span>
          </button>
        </div>
      </header>

      <main className="w-full flex-grow flex items-center justify-center px-4 md:px-8 py-6">
        <div className="w-full max-w-5xl bg-black/40 rounded-lg p-6 md:p-8 shadow-lg">
          {/* User Info Section */}
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
                    : "0"}
                  .00
                </span>
              </p>
            </div>
          </section>

          <section className="w-full flex flex-wrap justify-center items-center gap-4 mb-6">
            {type == 1 ? (
              <>
              <button onClick={e => navigate('/manageticket?id='+ id)} className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition font-medium">
                  จัดการตั๋ว 
                </button>
                <button onClick={e => navigate('/manageaddticket?id='+ id)} className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition font-medium">
                  เพิ่มตั๋ว 
                </button>
                <button onClick={e => navigate('/managereduceticket?id='+ id)} className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition font-medium">
                  ลดตั๋ว
                </button>
              </>
            ) : type == 0 ? (
              <>
                <button
                  onClick={e => navigate('/managesalary?id='+ id)}
                  className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition font-medium"
                >
                  จัดการเงินเดือน
                </button>
              </>
            ) : (
              <>
                <button onClick={e => navigate('/manageaddtype?id='+ id)} className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition font-medium">
                  เพิ่มประเภทเงินเดือน
                </button>
              </>
            )}

            <button  onClick={e => navigate('/managereducesalary?id='+ id)} className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition font-medium">
              เบิกเงิน
            </button>
            <button  onClick={e => navigate('/managehistory?id='+ id)} className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition font-medium">
              ประวัติเบิกเงิน
            </button>
            <button onClick={e => navigate('/manageuser?id='+ id)} className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition font-medium">
              แก้ไข
            </button>
            <button onClick={deluser} className="px-4 py-2 bg-red-600 rounded hover:bg-red-500 transition font-medium">
              ลบ
            </button>
          </section>

          <section className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-800 p-5 rounded-lg shadow-md flex flex-col items-center">
              <p className="text-sm md:text-lg font-medium">เงินเดือน</p>
              <p className="text-lg md:text-2xl font-bold">{User && User.Salary && User.Salary.length > 0
                    ? `${User.Salary[0].salary}` // เข้าถึงค่า salary ของตัวแรกใน Array
                    : "0"}
                  .00</p>
            </div>
            <div className="bg-gray-800 p-5 rounded-lg shadow-md flex flex-col items-center">
              <p className="text-sm md:text-lg font-medium">เบิกเงิน</p>
              <p className="text-lg md:text-2xl font-bold">{das}.00</p>
            </div>
            {/* <div className="bg-gray-800 p-5 rounded-lg shadow-md flex flex-col items-center">
              <p className="text-sm md:text-lg font-medium">
                เงินเดือนหลังเบิก
              </p>
              <p className="text-lg md:text-2xl font-bold">170,000.00</p>
            </div> */}
            <div className="bg-gray-800 p-5 rounded-lg shadow-md flex flex-col items-center">
              <p className="text-sm md:text-lg font-medium">ตั๋ว</p>
              <p className="text-lg md:text-2xl font-bold">{User && User.Salary && User.Salary.length > 0
                    ? `${User.Salary[0].ticket}` // เข้าถึงค่า salary ของตัวแรกใน Array
                    : "0"}
                  .00</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
