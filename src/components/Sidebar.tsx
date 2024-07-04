'use client';
import { useAppContext } from '@/context/useAppContext';
import { MENU_DATA } from '@/lib/constant';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { IoChevronDown } from 'react-icons/io5';

interface ISidebarProps {}

export default function Sidebar() {
    const pathname = usePathname();
    const { isSidebarClose } = useAppContext();
    const [isOpen, setIsOpen] = useState(false);
    const toggleSubMenu = () => {
      setIsOpen(!isOpen);
    };
   return (
    <div className={`bg-white shadow-md py-5 px-3 min-h-screen transition-all ease-in-out duration-300 ${isSidebarClose ? 'w-[68px]' : 'w-[13%]'}`}>
        <div className="flex items-center gap-2 mb-8">
            <img src="/images/logo-jm.png" alt="" className="h-9" />
            {!isSidebarClose && <h1 className="uppercase font-bold text-primary">Jasa Marga</h1>}
        </div>
        <ul className="space-y-6">
            {MENU_DATA.map((item,i) => (
                <li key={i+1}>
                    {item.subMenu ? (
                        <div className={`flex flex-col ${isSidebarClose && 'items-center'}`}>
                            <button onClick={toggleSubMenu} className={`flex items-center justify-between text-gray-500 transition-all ease-in-out hover:text-primary hover:bg-blue-50 p-3 rounded-full ${isOpen ? 'text-primary' : 'text-gray-500'} `}>
                                <div className="flex items-center gap-2">
                                    {isOpen ? item.iconActive : item.icon}
                                    {!isSidebarClose && item.label}
                                </div>
                                {!isSidebarClose && <IoChevronDown className={`transition-all ease-in-out ${isOpen && 'rotate-180'}`}/>}
                            </button>
                            {isOpen && (
                                <div className="space-y-6 mt-6">
                                    {item.subMenu.map((sub,i) => (
                                        <Link href={sub.url} className={`flex items-center gap-2 p-3 rounded-full ${pathname.startsWith(sub.url) ? 'text-primary bg-blue-50' : 'hover:text-primary text-gray-500 hover:bg-blue-50'}`} key={i+1}>
                                            {pathname.startsWith(sub.url) ? sub.iconActive : sub.icon}
                                            {!isSidebarClose && sub.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ):(
                        <Link
                            href={item.url}
                            className={`flex items-center gap-2 p-3 rounded-full ${
                                isSidebarClose && "justify-center"
                            } ${
                                pathname === item.url && item.url === '/'
                                ? "text-primary bg-blue-50"
                                : pathname.startsWith(item.url) && item.url !== '/'
                                ? "text-primary bg-blue-50"
                                : "hover:text-primary text-gray-500 hover:bg-blue-50"
                            }`}
                            >
                            {pathname === item.url && item.url === '/' ? item.iconActive : item.icon} 
                            {!isSidebarClose && item.label}
                        </Link>


                    )}
                </li>
            ))}
        </ul>
    </div>
   );
}