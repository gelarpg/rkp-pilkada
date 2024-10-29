import React from 'react'

interface Props{
    name:string
}
const ProcessingButton = ({name}:Props) => {
  return (
    <button
    type="button"
    className="py-2 px-3 inline-flex capitalize items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-300 text-gray-900 hover:bg-gray-700 disabled:opacity-50 disabled:pointer-events-none"
    disabled
  >
    <span className="loading"></span>{name}
  </button>
  )
}

export default ProcessingButton