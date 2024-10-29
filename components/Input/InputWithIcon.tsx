import React from "react";

interface Props {
  type: string;
  name: string;
  value: any;
  placeholder: string;
  disable?:boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const InputWithIcon = (props: Props) => {
  const { type, name, value, placeholder, disable, onChange } = props;
  return (
    <>
      <input
        name={name}
        type={type}
        className="w-full rounded-xl border-[1.5px] border-stroke bg-white peer py-3 ps-10 block font-normal text-md outline-none transition text-gray-900 focus:border-primary-600 active:border-primary-600  active:bg-white disabled:cursor-default disabled:bg-white"
          placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disable}
      />
    </>
  );
};

export default InputWithIcon;
