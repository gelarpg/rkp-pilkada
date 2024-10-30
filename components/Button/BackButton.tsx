"use client";
import { useRouter } from "next/navigation";
import React, { SyntheticEvent } from "react";
import { BsArrowLeft } from "react-icons/bs";

const BackButton = ({name}:{name:string}) => {
  const router = useRouter();
  const handleBack = (e: SyntheticEvent) => {
    e.preventDefault();
    router.back();
  };
  return (
    <>
      <button
        onClick={handleBack}
        className="text-indigo-600 bg-indigo-100  rounded-lg text-sm flex items-center gap-2 w-fit px-3 py-1 "
      >
        <BsArrowLeft size={18} />
        {name}
      </button>
    </>
  );
};

export default BackButton;
