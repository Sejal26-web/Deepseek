import React, { useState } from 'react'
import Image from 'next/image'
import { assets } from '@/assets/assets'

const ChatLabel = ({ openMenu, setopenMenu }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false)

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev)
  }

  return (
    <div className="flex items-center justify-between p-3 text-white bg-gray-800 rounded-lg text-sm cursor-pointer">
      <p className="group-hover:max-w-5/6 truncate">Chat Name here</p>

      <div
        className="group relative flex items-center justify-center h-6 w-6 aspect-square bg-black/60 rounded-lg"
        onClick={toggleDropdown}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            toggleDropdown()
          }
        }}
        aria-label="Toggle chat options"
      >
        <Image
          src={assets.three_dots}
          alt="Options"
          className={`w-4 ${openMenu.open ? '' : 'hidden'} group-hover:block`}
        />

        {dropdownVisible && (
          <div
            className={`absolute right-0 top-8 bg-gray-700 rounded-lg shadow-md w-max p-2 z-10`}
          >
            <div className="flex items-center gap-2 hover:bg-white/10 px-3 py-2 rounded-lg cursor-pointer">
              <Image src={assets.pencil_icon} alt="Rename icon" className="w-4" />
              <p>Rename</p>
            </div>
            <div className="flex items-center gap-2 hover:bg-white/10 px-3 py-2 rounded-lg cursor-pointer">
              <Image src={assets.delete_icon} alt="Delete icon" className="w-4" />
              <p>Delete</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatLabel
