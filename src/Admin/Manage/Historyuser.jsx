import React, { useEffect, useState } from "react";
import Navbar from "../../Component/Navbar";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Configurl from "../../config";
export default function HistoryUser() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const id = urlSearchParams.get("id");
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
        {},
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

  const fetchData = async () => {
    try {
      const res = await axios.post(
        Configurl.Url + "/userhistory",
        {userid : Number(id)}
      );
      console.log(res.data.history)
      if (res.data.status == 200) {
        const newRows = res.data.history.History.map((player) => {
          if (
            !player.id ||
            !player.amount ||
            !player.typelabel ||
            player.createAt !== null
          ) {
          return createData(player.id, player.typelable, player.amount, player.createAt);
          }
        });
        const filteredRows = newRows.filter((row) => row !== null);
        setrow(filteredRows);
      }
    } catch (error) {
      console.error(
        "Error fetching data:",
        error.response ? error.response.data : error.message
      );
    }
  };

  function createData(id, typelabel, amount, createAt) {
    return { id: id, typelabel: typelabel, amount: amount, createAt: createAt };
  }

  const handleRowClick = (params) => {
    // console.log(params);
    navigate(`/manage?id=${params.row.id}`);
  };
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "typelabel", headerName: "การกระทำ", width: 400 },
    { field: "amount", headerName: "จำนวน", width: 200 },
    {
      field: "createAt",
      headerName: "เวลา",
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
              &nbsp;HISTORY&nbsp;
            </span>
            <span aria-hidden="true" className="hover-text poppins-bold">
              &nbsp;HISTORY&nbsp;
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
