import React, { useEffect, useState } from "react";
import Navbar from "../Component/Navbar";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Configurl from "../config";
export default function Home() {
  const navigate = useNavigate();
  const [rows, setrow] = useState();
  useEffect(() => {
    fetchInfo();
    fetchData();
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
        navigate("/login");
      }
    } catch (error) {
      console.error(
        "Error fetching data:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(
        Configurl.Url + "/userall",
        {}, // body (ถ้าไม่มีให้เว้นว่างเป็น {})
        Configurl.headers()
      );
      // console.log(res.data); // ตรวจสอบข้อมูลที่ได้จาก API
      if (res.data.status == 200) {
        const newRows = res.data.userall.map((player) => {
          // ตรวจสอบว่า player มีข้อมูลครบก่อนสร้างข้อมูลใหม่
          if (
            !player.id ||
            !player.username ||
            !player.job ||
            player.type !== null
          ) {
            const type =
            player.type == 1
              ? "ตั๋ว"
              : player.type == 0
              ? "เงินเดือน"
              : "ยังไม่ได้กรอก";

          return createData(player.id, player.username, player.job, type);
          }

          // 0 = เงินเดือน, 1 = ตั๋ว, 2 = ยังไม่ได้กรอก
          
        });

        // ลบรายการที่เป็น null หรือ undefined
        const filteredRows = newRows.filter((row) => row !== null);

        setrow(filteredRows);
        // console.log("Rows:", filteredRows); // ตรวจสอบ rows
      }
    } catch (error) {
      console.error(
        "Error fetching data:",
        error.response ? error.response.data : error.message
      );
    }
  };

  function createData(id, username, job, type) {
    return { id: id, Username: username, job: job, type: type };
  }

  const handleRowClick = (params) => {
    // console.log(params);
    navigate(`/manage?id=${params.row.id}`);
  };
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "Username", headerName: "Username", width: 400 },
    { field: "job", headerName: "งาน", width: 200 },
    {
      field: "type",
      headerName: "ประเภทเงินเดือน (เงินเดือน / ตั๋ว)",
      width: 200,
    },
  ];

  // const rows = [
  //   { id: 1, Username: "Snow", type : "เงินเดือน"},
  //   { id: 2, Username: "Lannister",type : "เงินเดือน"},
  //   { id: 3, Username: "Lannister", type : "เงินเดือน"},
  //   { id: 4, Username: "Stark", type : "ตั๋ว"},
  //   { id: 5, Username: "Targaryen", type : "เงินเดือน"},
  //   { id: 6, Username: "Melisandre", type : "ตั๋ว"},
  //   { id: 7, Username: "Clifford", type : "เงินเดือน"},
  //   { id: 8, Username: "Frances", type : "ตั๋ว"},
  //   { id: 9, Username: "Roxie", type : "ตั๋ว"},
  // ];

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <div className="w-full h-screen bg-gradient-to-r from-black via-green-900 to-black">
      <Navbar />
      <div className="w-full h-20 flex justify-between text-white items-center">
        <div className="w-[50%] text-center">
          <button className="TITLENAV" data-text="Awesome">
            <span className="actual-text poppins-bold">
              &nbsp;USERALL&nbsp;
            </span>
            <span aria-hidden="true" className="hover-text poppins-bold">
              &nbsp;USERALL&nbsp;
            </span>
          </button>
        </div>
        <div className="w-[50%]"></div>
      </div>
      <div className="w-full h-[70%] flex items-center justify-center">
        <div className="w-[80%] h-[100%] flex items-center">
          {rows ? (
            <Paper sx={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                onRowClick={handleRowClick}
                sx={{ border: 0 }}
              />
            </Paper>
          ) : (
            "กำลังค้าหาข้อมูล..."
          )}
        </div>
      </div>
    </div>
  );
}
