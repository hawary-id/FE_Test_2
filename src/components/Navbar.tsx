'use client';

import { useSidebar } from '@/context/SidebarContext';
import { FaRegUserCircle } from 'react-icons/fa';
import { IoMdLogOut } from 'react-icons/io';
import { IoChevronBack } from 'react-icons/io5';
import { PiUserCircleGearLight } from 'react-icons/pi';
import { VscSettings } from 'react-icons/vsc';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger } from './ui/dropdown-menu';

interface INavbarProps {}

export default function Navbar() {
    const { isSidebarClose, toggleSidebar } = useSidebar();

   return (
        <div className="w-full sticky top-0 py-2 px-3 shadow-md bg-white flex items-center justify-between z-50">
            <div className="flex items-center gap-3">
                <Button onClick={toggleSidebar} variant="outline" className="rounded-full bg-blue-50" size="icon">
                    <IoChevronBack className={`text-xl text-gray-600 transition-all ease-in-out ${isSidebarClose && 'rotate-180'}`}/>
                </Button>
            </div>
            <div className="flex gap-3 items-center">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="rounded-full bg-blue-50" size="icon"><FaRegUserCircle className="text-xl text-gray-600"/></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-44">
                        <DropdownMenuItem>
                        Profile
                        <DropdownMenuShortcut><PiUserCircleGearLight className="text-xl"/></DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                        Log out
                        <DropdownMenuShortcut><IoMdLogOut className="text-xl"/></DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="rounded-full bg-blue-50" size="icon"><VscSettings className="text-2xl text-gray-600"/></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-44">
                        <DropdownMenuItem>
                        Profile
                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                        Log out
                        <DropdownMenuShortcut><IoMdLogOut/></DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
   );
}