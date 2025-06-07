import { assets } from '@/assets/assets';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useClerk, UserButton } from '@clerk/nextjs';
import { useAppContext } from '../context/AppContext';
import ChatLabel from './ChatLabel';

const Sidebar = ({ expand, setExpand }) => {
  const { openSignIn } = useClerk();
  const { user } = useAppContext();
  const [openMenu , setopenMenu] = useState({id: 0 , open : false});
  const [showQR, setShowQR] = useState(false);

  const handleToggleQR = () => {
    setShowQR((prev) => !prev);
  };

  useEffect(() => {
    if (!expand) {
      setShowQR(false);
    }
  }, [expand]);

  return (
    <div
      className={`flex flex-col justify-between bg-[#212327] pt-5 transition-all duration-300 z-50 max-md:absolute max-md:h-screen ${
        expand ? 'p-3 w-48 min-w-[192px]' : 'w-16 min-w-[64px] max-md:overflow-hidden'
      }`}
    >
      <button
        className={`mt-6 flex items-center justify-center cursor-pointer relative ${
          expand
            ? 'bg-blue-500 hover:bg-blue-600 rounded-xl gap-2 p-2 w-max'
            : 'group h-10 w-10 mx-auto hover:bg-gray-500/30 rounded-lg'
        }`}
        aria-label="New Chat"
      >
        <Image
          className={expand ? 'w-5' : 'w-6'}
          src={expand ? assets.chat_icon : assets.chat_icon_dull}
          alt="Chat icon"
          width={expand ? 20 : 24}
          height={expand ? 20 : 24}
        />
        {expand && <p className="text-white text-sm font-medium">New Chat</p>}
        {!expand && (
          <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition bg-black text-white text-xs px-2 py-1 rounded-lg shadow-lg pointer-events-none whitespace-nowrap">
            New Chat
            <div className="w-2 h-2 absolute bg-black rotate-45 -left-1 top-1/2 -translate-y-1/2"></div>
          </div>
        )}
      </button>

      <div>
        <div className={`flex ${expand ? 'flex-row gap-6' : 'flex-col items-center gap-8'}`}>
          <Image
            className={expand ? 'w-32' : 'w-10'}
            src={expand ? assets.logo_text : assets.logo_icon}
            alt="Deepseek logo"
            width={expand ? 128 : 40}
            height={expand ? 36 : 40}
          />
          <div
            onClick={() => setExpand(!expand)}
            className="group relative flex items-center justify-center hover:bg-gray-500/25 transition-all duration-300 h-10 w-10 aspect-square rounded-lg cursor-pointer"
            aria-label={expand ? 'Close sidebar' : 'Open sidebar'}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setExpand(!expand);
              }
            }}
          >
            <Image src={assets.menu_icon} alt="Menu icon" className="md:hidden" width={20} height={20} />
            <Image
              src={expand ? assets.sidebar_close_icon : assets.sidebar_icon}
              alt="Sidebar toggle"
              className="hidden md:block w-6"
              width={24}
              height={24}
            />
            <div
              className={`absolute w-max ${
                expand ? 'left-1/2 -translate-x-1/2 top-[-40px]' : 'top-12 left-0'
              } opacity-0 group-hover:opacity-100 transition bg-black text-white text-xs px-2 py-1 rounded-lg shadow-lg pointer-events-none`}
            >
              {expand ? 'Close sidebar' : 'Open sidebar'}
              <div
                className={`w-2 h-2 absolute bg-black rotate-45 ${
                  expand ? 'left-1/2 -top-1 translate-x-1/2' : 'left-3 -bottom-1'
                }`}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className={`mt-6 text-white/25 text-xs ${expand ? 'block' : 'hidden'}`}>
        <p className="mb-1">Recents</p>
        <ChatLabel openMenu={openMenu} setopenMenu = {setopenMenu} />
      </div>

      <div className="mt-6 relative flex flex-col items-center gap-2">
        <Image
          className={expand ? 'w-5' : 'w-6 mx-auto'}
          src={expand ? assets.phone_icon : assets.phone_icon_dull}
          alt="Phone icon"
          width={expand ? 20 : 24}
          height={expand ? 20 : 24}
        />
        {expand && (
          <div
            onClick={handleToggleQR}
            className="cursor-pointer flex items-center gap-2 mt-1 group hover:bg-gray-600/30 px-3 py-1.5 rounded-lg transition select-none"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleToggleQR();
              }
            }}
            aria-label="Toggle Get App QR code"
          >
            <span className="text-white text-xs font-medium">Get App</span>
            <Image alt="New icon" src={assets.new_icon} className="w-4 h-4" width={16} height={16} />
          </div>
        )}
        {showQR && (
          <div className="relative w-max bg-black text-white text-xs p-2 rounded-lg shadow-lg mt-2">
            <Image src={assets.qrcode} alt="QR code" className="w-36" width={144} height={144} />
            <p className="mt-1 text-center text-[10px] select-none">Scan to get Deepseek App</p>
            <div className="w-2.5 h-2.5 absolute bg-black rotate-45 left-3 -bottom-1"></div>
          </div>
        )}
      </div>

      <div
        onClick={user ? undefined : openSignIn}
        className={`flex items-center ${
          expand ? 'hover:bg-white/10 rounded-md' : 'justify-center w-full'
        } gap-3 text-white/60 text-xs p-2 mt-2 cursor-pointer select-none`}
        role={user ? undefined : 'button'}
        tabIndex={user ? undefined : 0}
        onKeyDown={(e) => {
          if (!user && (e.key === 'Enter' || e.key === ' ')) {
            openSignIn();
          }
        }}
        aria-label={user ? 'User profile menu' : 'Sign in'}
      >
        {user ? (
          <UserButton />
        ) : (
          <Image src={assets.profile_icon} alt="Profile icon" className="w-6" width={24} height={24} />
        )}
        {expand && <span className="select-none">My Profile</span>}
      </div>
    </div>
  );
};

export default Sidebar;
