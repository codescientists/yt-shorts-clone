import { GoogleLogin, googleLogout } from '@react-oauth/google'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { FaBars, FaSearch, FaYoutube } from 'react-icons/fa'
import useAuthStore from '../store/userStore'
import useHomeStore from '../store/homeStore'
import { createOrGetUser } from '../utils'

import { AiOutlineLogout, AiOutlineVideoCameraAdd } from "react-icons/ai";
import Link from 'next/link'

const Navbar = () => {
    const { userProfile, addUser, removeUser } = useAuthStore();

    const { toggleNavbar, navOpen } = useHomeStore();

    useEffect(() => {
        console.log(navOpen)
    }, [])


    return (
        <header className="text-gray-400 bg-neutral-800 absolute w-full">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <button onClick={() => toggleNavbar(navOpen)} className="rounded h-10 w-10 flex items-center justify-center text-white hover:bg-neutral-700"><FaBars /></button>
                <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
                    <span className="ml-3 text-xl flex items-center justify-center"> <FaYoutube className="mr-2" /> Shorts</span>
                </a>
                <div className="mx-auto w-96 h-10 flex items-center">
                    <input type="search" name="search" id="search" placeholder="Search" className="text-white h-10 w-[85%] outline-none bg-neutral-900 border border-neutral-700 pl-2" />
                    <button className="bg-neutral-700 text-white w-[15%] h-full flex items-center justify-center"><FaSearch /></button>
                </div>
                <div>
                    {userProfile ?
                        <div className='flex items-center justify-center'>
                            <Link href={`/upload`}>
                                <a className="h-10 w-10 text-white text-xl mr-2 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700"> <AiOutlineVideoCameraAdd /> </a>
                            </Link>
                            <Image src={userProfile?.image} alt={userProfile?.userName} height={40} width={40} title={userProfile?.userName} className="rounded-full" />
                            <button title='logout' onClick={() => { googleLogout(); removeUser(); }} className="rounded-full h-10 w-10 bg-white text-red-500 text-xl flex items-center justify-center ml-2"><AiOutlineLogout /></button>
                        </div>
                        :
                        <GoogleLogin
                            theme='outline'
                            onSuccess={credentialResponse => {
                                createOrGetUser(credentialResponse, addUser)
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />
                    }
                </div>
            </div>
        </header>

    )
}

export default Navbar