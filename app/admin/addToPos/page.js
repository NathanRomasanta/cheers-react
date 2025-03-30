"use client";
import React, { useState } from "react";
import TopBar from "../CashOutScreen/TopBar";
import MainForm from "./MainForm";

const AddToPosPage = () => {
  const [typeSelected, setTypeSelected] = useState("");
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 h-100 w-100">
      <div className="w-full mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-black">
          Create New POS Item
        </h1>
        <MainForm
          typeSelected={typeSelected}
          setTypeSelected={setTypeSelected}
        />
      </div>
    </div>
  );
};

export default AddToPosPage;
