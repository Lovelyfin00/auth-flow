import React, { useEffect, useRef } from "react";

const ModalLayout = ({children, onClose}) => {
  const modalRef = null;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div  className=" fixed inset-0 z-50 overflow-y-auto bg-[#04324B] bg-opacity-60">
      <div className="modal-layout flex items-center justify-center min-h-screen">
        <div
        ref={modalRef}
          className={`relative max-w-screen-sm md:max-w-screen-md text-[1rem] font-[500] w-[90%] md:w-[60%] lg:w-[40%] p-4 mx-4 md:mx-16 my-8 overflow-hidden bg-white rounded-lg shadow-xl`}>
          <div className="p-8">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default ModalLayout;
