"use client";
import MainInput from "@/components/Input/MainInput";
import { loginAuth } from "@/redux/features/auth/authSlice";
import { AppDispatch, RootState } from "@/redux/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const currentYear = new Date().getFullYear();

const SignForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [validation, setValidation] = useState("");
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { user, message, code, access_token } = useSelector(
    (state: RootState) => state.auth
  );

  const handleSignin = async (e: any) => {
    e.preventDefault();
    setLoading(false);
    try {
      await dispatch(
        loginAuth({
          username: username,
          password: password,
        })
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    if (code === 200) {
      localStorage.setItem("access_token", access_token);
      router.push("/dashboard");
      setValidation(message);
      setLoading(true);
    }
    if (code === 400) {
      setValidation(message);
      setLoading(false);
    }
  }, [user, code, access_token, router, message]);
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center justify-center">
        <Image
          alt="Your Company"
          src={"/images/sirada_logo.png"}
          width={20}
          height={20}
          className="h-28 w-28"
          unoptimized={true}
        />
        <h1 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sistem Rekap Data Pilkada
        </h1>
        <h2 className="mt-1 text-center text-xl leading-9 tracking-tight text-gray-900">
          Silahkan masukan username dan password
        </h2>
      </div>

      <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSignin} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Username
            </label>
            <div className="mt-2">
              <MainInput
                type="text"
                name="username"
                value={username}
                placeholder="Username"
                disable={false}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <MainInput
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                disable={false}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          {validation && (
            <p className="text-red-500 text-sm text-center font-semibold ">
              {validation}
            </p>
          )}
          {!loading ? (
            <>
              <button
                type="submit"
                className={`py-3 px-4 w-full text-center gap-x-2 text-sm font-semibold rounded-xl text-white ${
                  username && password
                    ? "bg-indigo-500 hover:bg-indigo-600"
                    : "bg-slate-400 cursor-not-allowed"
                }`}
                // disabled={!username && !password}
              >
                Masuk
              </button>
            </>
          ) : (
            <button
              className="py-3 px-4 w-full text-center flex justify-center disabled:bg-slate-400  gap-x-2 text-sm font-semibold rounded-xl  bg-indigo-500/20 hover:bg-indigo-500/20 text-white hover:bg-indigo-600"
              disabled={true}
            >
              Harap tunggu
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-solid border-slate-500 border-t-transparent"></div>
            </button>
          )}
        </form>

        <p className="mt-3 text-sm text-gray-500 flex justify-center items-center gap-1">
          Copyright &copy; {currentYear}
        </p>
      </div>
    </div>
  );
};

export default SignForm;
