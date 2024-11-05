"use client";
import LogoutModal from "@/components/Modal/Auth/LogoutModal";
import { getUser } from "@/redux/features/user/userSlice";
import { AppDispatch, RootState } from "@/redux/store";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { HiMiniBars3, HiXMark } from "react-icons/hi2";
import { PiGear } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  const navigation = [
    { name: "Dashboard", href: `/dashboard` },
    // { name: "Data TPS", href: `/tps` },
  ];

  useEffect(() => {
    dispatch(getUser()).unwrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-8xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <HiMiniBars3
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <HiXMark
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-center sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Image
                alt="Your Company"
                src={"/images/sirada_logo.png"}
                width={20}
                height={20}
                className="h-16 w-16"
                unoptimized={true}
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="bg-gray-900  text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    {item.name}
                  </Link>
                ))}
                {user?.role === 2 && (
                  <Link
                    href={`/members/${user?.team_id.id}`}
                    className="bg-gray-900  text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Anggota
                  </Link>
                )}
                {user?.role === 3 && (
                  <Link
                    href={`/members/${user?.team_id.id}`}
                    className="bg-gray-900  text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Anggota
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex items-center gap-1 rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <p className="text-white font-semibold w-20 lg:w-fit line-clamp-1">
                    {" "}
                    Hai, {user?.fullname}
                  </p>
                  {user?.role === 1 ? (
                    <Image
                      width={32}
                      height={32}
                      alt=""
                      src={"/images/admin.jpg"}
                      className="h-8 w-8 rounded-full"
                    />
                  ) : (
                    <Image
                      width={32}
                      height={32}
                      alt=""
                      src={"/images/default_profile.jpeg"}
                      className="h-8 w-8 rounded-full"
                    />
                  )}
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <MenuItem>
                  <Link
                    href="/account-setting"
                    className=" px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 flex justify-start items-center gap-2"
                  >
                    <PiGear size={20} />
                    Pengaturan Akun
                  </Link>
                </MenuItem>
                <MenuItem>
                  <LogoutModal />
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="bg-gray-900 text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              {item.name}
            </Link>
          ))}
          {user?.role === 2 && (
            <Link
              href={`/members/${user?.team_id.id}`}
              className="bg-gray-900 text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Anggota
            </Link>
          )}
          {user?.role === 3 && (
            <Link
              href={`/members/${user?.team_id.id}`}
              className="bg-gray-900 text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Anggota
            </Link>
          )}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default Navbar;
