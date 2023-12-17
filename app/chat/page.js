'use client'
import Layouts from "@/app/Components/layouts";
import Image from "next/image";
import {useEffect, useState} from "react";
import {FaClipboard} from "react-icons/fa";
import {SlDislike, SlLike} from "react-icons/sl";

export default function page() {
    const [date, setDate] = useState()
    const getDate = () => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        };
        const today = new Date();
        const formattedDate = new Intl.DateTimeFormat('id-ID', options).format(today);
        setDate(formattedDate)
    }

    useEffect(() => {
        getDate()
    }, []);

    return (
        <Layouts>
            <h1 className={`text-center text-gray-500 mb-10`}>{date}</h1>
            <section className={`max-w-4xl mx-auto`}>
                <div className={`flex flex-col gap-3 h-[75vh]`}>
                    <div className={`bg-blue-100 p-5 rounded-xl`}>
                        <div className={`flex gap-3`}>
                            <Image src="/images/bot.png" className={`bg-gray-100 rounded-full p-2`} alt="" width={70}
                                   height={70}/>
                            <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, rem?</h1>
                        </div>

                        <div className={`flex justify-between text-gray-500 items-center mt-5`}>
                            <div className={`flex gap-2`}>
                               <span className={`bg-gray-100 p-2 text-sm rounded-full cursor-pointer hover:text-black`}>
                                <SlLike/>
                               </span>
                                <span className={`bg-gray-100 p-2 text-sm rounded-full cursor-pointer hover:text-black`}>
                                <SlDislike/>
                               </span>
                            </div>
                            <div>
                                <span className={`bg-gray-100 px-3 py-2 text-sm rounded-full flex items-center gap-1 cursor-pointer hover:text-black`}>
                                    <FaClipboard/>
                                    <h1>Salin</h1>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={`p-5 rounded-xl flex gap-3`}>
                        <Image src="/images/avatar.jpg" className={`rounded-full`} alt="" width={70} height={70}/>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, rem?
                    </div>
                    <div className={`bg-blue-100 p-5 rounded-xl`}>
                        <div className={`flex gap-3`}>
                            <Image src="/images/bot.png" className={`bg-gray-100 rounded-full p-2`} alt="" width={70}
                                   height={70}/>
                            <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, rem?</h1>
                        </div>

                        <div className={`flex justify-between text-gray-500 items-center mt-5`}>
                            <div className={`flex gap-2`}>
                               <span className={`bg-gray-100 p-2 text-sm rounded-full cursor-pointer hover:text-black`}>
                                <SlLike/>
                               </span>
                                <span className={`bg-gray-100 p-2 text-sm rounded-full cursor-pointer hover:text-black`}>
                                <SlDislike/>
                               </span>
                            </div>
                            <div>
                                <span className={`bg-gray-100 px-3 py-2 text-sm rounded-full flex items-center gap-1 cursor-pointer hover:text-black`}>
                                    <FaClipboard/>
                                    <h1>Salin</h1>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <input type="text" id="default-input"
                       placeholder={`Ketik pesan...`}
                       className="bg-gray-50 border placeholder-gray-400 border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full py-3 px-5"/>
            </section>
        </Layouts>
    )
}