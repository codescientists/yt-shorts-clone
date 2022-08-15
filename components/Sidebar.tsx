import Link from 'next/link'
import { useRouter } from 'next/router';
import React from 'react'
import { FaBars, FaHome, FaYoutube } from "react-icons/fa"
import useHomeStore from '../store/homeStore';

let popularTopics = ['Web Development', 'Comedy', 'Gaming', 'Food', 'Entertainment', 'Beauty', 'Sports'];

const style = {
    selectedTopic: 'border-cyan-400 text-cyan-500',
}

const Sidebar = () => {
    const { toggleNavbar, navOpen } = useHomeStore();

    const router = useRouter();

    return (
        <div className={`${navOpen ? 'visible w-64 ' : 'invisible w-0 '} h-screen bg-neutral-800 z-10 duration-150`} >
            <div className="flex p-5">
                <button onClick={() => toggleNavbar(navOpen)} className="rounded h-10 w-10 flex items-center justify-center text-white hover:bg-neutral-700"><FaBars /></button>
                <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
                    <span className="ml-3 text-xl flex items-center justify-center"> <FaYoutube className="mr-2" /> Shorts</span>
                </a>
            </div>
            <Link href={`/`} passHref>
                <a className='h-10 text-lg w-full flex items-center px-4 py-1 hover:bg-neutral-700 font-semibold'>
                    <FaHome className='mr-2' /> Home
                </a>
            </Link>
            <div className='pl-4'>
                <h2 className='text-md text-gray-400'>Popular Topics</h2>
                <div className="flex flex-wrap">
                    {popularTopics.map((popularTopic) => (
                        <Link href={`/?topic=${popularTopic}`} key={popularTopic}>
                            <button className={`bg-neutral-700 hover:bg-neutral-600 px-4 py-1 m-1 rounded ${router.query.topic == popularTopic && style.selectedTopic} `}>{popularTopic}</button>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Sidebar