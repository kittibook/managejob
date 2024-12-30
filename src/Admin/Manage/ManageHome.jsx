import React from "react";
import Navbar from "../../Component/Navbar";

export default function ManageHome() {
  return (
    <>
      <div className="w-full h-screen bg-gradient-to-r from-black via-green-900 to-black">
        <Navbar />
        <div className="w-full h-20 flex justify-between text-white items-center">
          <div className="w-[50%] text-center">
            <button className="TITLENAV" data-text="Awesome">
              <span className="actual-text poppins-bold">
                &nbsp;ManageUser&nbsp;
              </span>
              <span aria-hidden="true" className="hover-text poppins-bold">
                &nbsp;ManageUser&nbsp;
              </span>
            </button>
          </div>
          <div className="w-[50%]"></div>
        </div>
        <div className="w-full h-[70%] flex items-center justify-center">
          <div className="w-[80%] h-[100%] bg-black/40">
            <div className="w-full h-20 flex justify-between text-white items-center">
              <div className="w-[50%] text-start mx-20 poppins-black ">
                <p className="text-lg">ตัดอ้อยแมน .........</p>
                <p className="text-sm">ตัดอ้อยแมนเช็ค Fps</p>
              </div>
              
              <div className="w-[50%] text-end mx-20">
              <p className="text-xl">ยอดเงินสทุธิ : 20000.00</p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
