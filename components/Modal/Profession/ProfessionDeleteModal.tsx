"use client"
import { Profession } from '@/lib/types/professionType';
import { deleteProfession } from '@/redux/features/profession/professionSlice';
import { AppDispatch, RootState } from '@/redux/store';
import React, { SyntheticEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux';

interface Props{
  profession?:Profession
  onClose: () => void;
}
const ProfessionDeleteModal = ({profession, onClose}:Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.profession);

  const handleDelete = async (e:SyntheticEvent) =>{
    e.preventDefault()
    try {
      if(profession){
        dispatch (deleteProfession({id:profession.id}))
        onClose()
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-gray-900 bg-opacity-80 overflow-x-auto overflow-y-auto">
    <div className="bg-white rounded-lg shadow-lg w-full sm:max-w-lg">
      <div className="flex justify-between items-center py-3 px-4 border-b">
        <h3 className="font-bold text-gray-800">Hapus pekerjaan</h3>
      </div>
      <form onSubmit={handleDelete}>
        <div className="p-4 overflow-y-auto">
          <h5>Anda akan menghapus pekerjaan ini?</h5>
        </div>
        <div className="flex justify-end items-center gap-3 py-3 px-4 ">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex flex-shrink-0 justify-center items-center p-2 rounded-lg bg-gray-200 w-fit text-gray-800 text-sm"
            >
              Batal
            </button>
            {loading ? (
              <button
                type="button"
                className="inline-flex flex-shrink-0 justify-center items-center p-2 rounded-lg bg-gray-500 w-fit text-gray-800 text-sm"
                disabled={true}
              >
                Menghapus..
              </button>
            ) : (
              <button
                type="submit"
                className="inline-flex flex-shrink-0 justify-center items-center p-2 rounded-lg bg-gray-200 w-fit text-gray-800 text-sm"
              >
                Hapus
              </button>
            )}
          </div>
      </form>
    </div>
  </div>
  )
}

export default ProfessionDeleteModal