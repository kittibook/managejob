import React from "react";

export default function Navbar() {
  return (
    <>
      {/* navbar */}
      <div className="w-full h-20 flex justify-between text-white items-center">
        <div className="w-[50%] text-center">
          <button className="TITLENAV" data-text="Awesome">
            <span className="actual-text">&nbsp;MANAGEJOB&nbsp;</span>
            <span aria-hidden="true" className="hover-text">
              &nbsp;MANAGEJOB&nbsp;
            </span>
          </button>
        </div>
        <div className="w-[50%]">
          <div className="flex items-center justify-center">
            <div className="w-[20%] text-center">
              <button className="btnnav" data-text="Awesome">
                <span className="actual-text">&nbsp;USER&nbsp;</span>
                <span aria-hidden="true" className="hover-text">
                  &nbsp;USER&nbsp;
                </span>
              </button>
            </div>
            <div className="w-[30%] text-center">
              <button className="btnnav" data-text="Awesome">
                <span className="actual-text">&nbsp;Historyall&nbsp;</span>
                <span aria-hidden="true" className="hover-text">
                  &nbsp;Historyall&nbsp;
                </span>
              </button>
            </div>
            <div className="w-[20%] text-center">
              <button className="btnnav" data-text="Awesome">
                <span className="actual-text">&nbsp;CONTACT&nbsp;</span>
                <span aria-hidden="true" className="hover-text">
                  &nbsp;CONTACT&nbsp;
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
