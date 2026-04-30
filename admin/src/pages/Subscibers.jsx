import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App' 
import { toast } from 'react-toastify'

const Subscribers = ({ token }) => {

    const [list, setList] = useState([])

    const fetchSubscribers = async () => {
        try {
            if (!token) return;

            const response = await axios.get(backendUrl + '/api/user/subscribers-list', { 
                headers: { token } 
            })

            if (response.data.success) {
                setList(response.data.subscribers.reverse());
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.error(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchSubscribers()
    }, [token])

    return (
        <div className='w-full'>
            <p className='mb-4 text-xl font-bold'>Newsletter Subscribers</p>

            <div className='flex flex-col gap-3'>
                {/* Table Header (Sirf Desktop par dikhega) */}
                <div className='hidden md:grid grid-cols-[0.5fr_2fr_2fr_1fr] items-center py-2 px-4 border bg-gray-100 text-sm font-semibold'>
                    <span>#</span>
                    <span>Account Email (User)</span>
                    <span>Newsletter Email (Input)</span>
                    <span className='text-center'>Date</span>
                </div>

                {/* Subscribers List */}
                {list.length > 0 ? (
                    list.map((item, index) => (
                        <div 
                            key={index} 
                            className='grid grid-cols-[1fr_3fr] md:grid-cols-[0.5fr_2fr_2fr_1fr] items-center gap-2 md:gap-4 py-3 px-4 border text-sm hover:bg-gray-50'
                        >
                            <p className='font-medium'>{index + 1}</p>
                            
                            <div className='flex flex-col md:block'>
                                <span className='md:hidden text-[10px] font-bold text-gray-400 uppercase'>Account:</span>
                                <p className='break-all'>{item.accountEmail}</p>
                            </div>

                            <div className='flex flex-col md:block'>
                                <span className='md:hidden text-[10px] font-bold text-gray-400 uppercase'>Subscribed:</span>
                                <p className='text-blue-600 break-all'>{item.newsletterEmail}</p>
                            </div>

                            <div className='flex flex-col md:items-center'>
                                <span className='md:hidden text-[10px] font-bold text-gray-400 uppercase text-left'>Date:</span>
                                <p className='text-gray-500'>{new Date(item.date).toLocaleDateString()}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className='text-center py-20 text-gray-400'>Abhi tak koi subscriber nahi mila.</p>
                )}
            </div>
        </div>
    )
}

export default Subscribers