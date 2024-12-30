import React from "react";
import Navbar from "../Component/Navbar";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
export default function Home() {
  const columns = [
    { field: "id", headerName: "ID", width: 250 },
    { field: "Username", headerName: "Username", width: 400 },
    { field: "type", headerName: "ประเภทเงินเดือน (เงินเดือน / ตั๋ว)", width: 400 },
  ];

  const rows = [
    { id: 1, Username: "Snow", type : "เงินเดือน"},
    { id: 2, Username: "Lannister",type : "เงินเดือน"},
    { id: 3, Username: "Lannister", type : "เงินเดือน"},
    { id: 4, Username: "Stark", type : "ตั๋ว"},
    { id: 5, Username: "Targaryen", type : "เงินเดือน"},
    { id: 6, Username: "Melisandre", type : "ตั๋ว"},
    { id: 7, Username: "Clifford", type : "เงินเดือน"},
    { id: 8, Username: "Frances", type : "ตั๋ว"},
    { id: 9, Username: "Roxie", type : "ตั๋ว"},
  ];

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
          <Paper sx={{ height: 400, width: "100%"  }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10]}
              sx={{ border: 0, }}
            />
          </Paper>
        </div>
      </div>
    </div>
  );
}
