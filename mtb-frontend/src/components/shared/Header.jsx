import React from 'react'
import mainLogo from "../../assets/bookMyScreen.png"
import { FaSearch } from "react-icons/fa"
import { useLocation } from '../../context/LocationContext.jsx';
import map from "../../assets/pin.gif"

function Header() {

    const { location, loading, error } = useLocation();
    return (
        <div className="w-full text-sm bg-white">
            <div className="px-4 md:px-8">
                <div className='max-w-screen-xl mx-auto flex justify-between items-center py-3'>
                    <div className='flex items-center space-x-4'>
                        <img src={mainLogo} alt="logo" className='h-8 object-contain cursor-pointer' />
                    </div>
                    <div className='relative'>
                        <input
                            type="text"
                            placeholder='Search for movies, events, plays, sports and activities' className='w-[400px] text-sm outline-none h-10 px-4 py-1.5 border border-gray-300' />
                        <FaSearch className="absolute right-2 top-2.5 text-gray-500 cursor-pointer" />
                    </div>

                    <div className='flex items-center space-x-6'>
                        <div className='text-sm font-medium cursor-pointer flex'>
                            {loading ? (
                                <img src={map} alt="Loading..." className="w-7 h-7" />
                            ) : (
                                <>
                                    <span>{location || "Select Location"}</span>
                                    <span className="text-gray-500">▼</span>
                                </>
                            )}
                        </div>
                        <button className='bg-red-600 text-white px-4 py-1.5 rounded text-sm font-medium cursor-pointer'>Sign in</button>
                    </div>
                </div>
            </div>
            <div className="bg-[#F2F2F2] px-4 md:px-8">
                <div className="max-w-screen-xl mx-auto flex justify-between items-center py-2 text-gray-700">
                    <div className="flex items-center space-x-6 font-medium">
                        <span className="cursor-pointer hover:text-red-500">Movies</span>
                        <span className="cursor-pointer hover:text-red-500">Events</span>
                        <span className="cursor-pointer hover:text-red-500">Plays</span>
                        <span className="cursor-pointer hover:text-red-500">Sports</span>
                        <span className="cursor-pointer hover:text-red-500">Activities</span>
                    </div>
                    <div className="flex item-center space-x-6 text-sm">
                        <span className="cursor-pointer hover:underline">ListYourShow</span>
                        <span className="cursor-pointer hover:underline">Corporates</span>
                        <span className="cursor-pointer hover:underline">Offers</span>
                        <span className="cursor-pointer hover:underline">Gift Cards</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
