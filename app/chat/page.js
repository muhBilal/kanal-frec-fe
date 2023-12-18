'use client'
import Layouts from "@/app/Components/layouts";
import Image from "next/image";
import {useEffect, useRef, useState} from "react";
import {FaClipboard} from "react-icons/fa";
import {SlDislike, SlLike} from "react-icons/sl";
import axios from "axios";
import {IoIosRadio} from "react-icons/io";
import {TbAntenna} from "react-icons/tb";
import {MdLocationCity} from "react-icons/md";
import Loading from "@/app/Components/splashScreen";
import {useSearchParams} from 'next/navigation'


export default function page() {
    const [day, setDay] = useState('')
    const [date, setDate] = useState()
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [alert, setAlert] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const merk = searchParams.get('merk')

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

        const hour = today.getHours();
        if (hour >= 0 && hour < 6) {
            setDay('Malam')
        } else if (hour < 12) {
            setDay('Pagi')
        } else if (hour < 18) {
            setDay('Siang')
        } else {
            setDay('Sore')
        }
        setIsLoading(false)
    }

    const sendMessage = async () => {
        if (input.trim() === '') return;
        const newMessages = [...messages, {text: input, sender: 'user'}];
        setMessages(newMessages);
        setInput('');
        try {
            const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                model: "gpt-3.5-turbo-0613",
                messages: [
                    {role: 'system', content: 'You are a friendly bot.'},
                    {role: 'user', content: input}
                ],
                max_tokens: 50,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer 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`,
                },
            });

            const botReply = response.data.choices[0].message.content.trim();
            const botMessages = [...newMessages, {text: botReply, sender: 'bot'}];
            setMessages(botMessages);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    }

    const handleCopy = (e) => {
        navigator.clipboard.writeText(e)
        setAlert(true)
        setTimeout(() => {
            setAlert(false);
        }, 3000)
    }

    useEffect(() => {
        getDate()
        if(id){
            setInput(`Carikan Spesifikasi lengkap untuk ${merk} tipe ${id}`)
        }
    }, []);

    return (
        <>
            {isLoading ? (
                <Loading/>
            ) : (
                <Layouts>
                    <h1 className={`text-center text-gray-500 mb-3`}>{date}</h1>
                    <section className={`max-w-4xl mx-auto`}>
                        <div className={`flex flex-col gap-3 h-[73vh] overflow-auto`}>

                            {
                                alert &&
                                <div
                                    className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50"
                                    role="alert">
                                    <span className="font-medium">Berhasil Menyalin teks!</span>
                                </div>
                            }

                            {messages.map((message, index) => (
                                <div key={index}>
                                    {message.sender === "user" ? (
                                        <div className={`p-5 rounded-xl flex gap-3`}>
                                            <div className={`w-[10%]`}>
                                                <Image src="/images/avatar.jpg" className={`rounded-full`} alt=""
                                                       width={200}
                                                       height={200}/>
                                            </div>
                                            <div className={`w-[80%]`}>
                                                <h1>{message.text}</h1>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className={`bg-blue-100 p-5 rounded-xl`}>
                                            <div className={`flex gap-3`}>
                                                <div className={`w-[10%]`}>
                                                    <Image src="/images/bot.png"
                                                           className={`bg-gray-100 rounded-full p-2`}
                                                           alt="" width={200}
                                                           height={200}/>
                                                </div>
                                                <div className={`w-[80%]`}>
                                                    <h1>{message.text}</h1>
                                                </div>
                                            </div>

                                            <div className={`flex justify-between text-gray-500 items-center mt-5`}>
                                                <div className={`flex gap-2`}>
                               <span className={`bg-gray-100 p-2 text-sm rounded-full cursor-pointer hover:text-black`}>
                                <SlLike/>
                               </span>
                                                    <span
                                                        className={`bg-gray-100 p-2 text-sm rounded-full cursor-pointer hover:text-black`}>
                                <SlDislike/>
                               </span>
                                                </div>
                                                <div>
                                <span
                                    onClick={() => handleCopy(message.text)}
                                    className={`bg-gray-100 px-3 py-2 text-sm rounded-full flex items-center gap-1 cursor-pointer hover:text-black`}>
                                    <FaClipboard/>
                                    <h1>Salin</h1>
                                </span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}

                            {
                                messages.length === 0 &&
                                (
                                    <>
                                        <section className={`flex flex-col md:flex-row items-center gap-10 mt-10`}>
                                            <Image src="/images/bot.png" className={`bg-gray-100 rounded-full p-2`}
                                                   alt="" width={200}
                                                   height={200}/>
                                            <h1 className={`font-bold text-3xl`}>Selamat {day}, Selamat datang kembali
                                                dengan <span className={`text-blue-300`}> KanalSensei</span>
                                            </h1>
                                        </section>
                                        <section className={`flex flex-col md:flex-row gap-3 justify-between mt-10`}>
                                            <div className={`bg-blue-100 rounded-xl p-3 cursor-pointer`}>
                                                <IoIosRadio className={`text-3xl text-gray-600`}/>
                                                <h1 className={`font-semibold my-1 mt-3`}>Kanal</h1>
                                                <p className={`font-thin text-gray-400`}>Bagimana cara melakukan
                                                    pengajuan
                                                    Terkait Frekuensi kanal! </p>
                                            </div>
                                            <div className={`bg-blue-100 rounded-xl p-3 cursor-pointer`}>
                                                <TbAntenna className={`text-3xl text-gray-600`}/>
                                                <h1 className={`font-semibold my-1 mt-3`}>Device</h1>
                                                <p className={`font-thin text-gray-400`}>Carikan Device apa saja yang
                                                    bisa
                                                    digunakan untuk frekuensi kanal! </p>
                                            </div>
                                            <div className={`bg-blue-100 rounded-xl p-3 cursor-pointer`}>
                                                <MdLocationCity className={`text-3xl text-gray-600`}/>
                                                <h1 className={`font-semibold my-1 mt-3`}>Tempat</h1>
                                                <p className={`font-thin text-gray-400`}>Carikan Tempat yanc cocok dan
                                                    tersedia
                                                    untuk mendirikan frekuensi kanal! </p>
                                            </div>
                                        </section>
                                    </>
                                )
                            }

                        </div>

                        <input type="text" id="default-input"
                               placeholder={`Ketik pesan...`}
                               onChange={(e) => setInput(e.target.value)}
                               onKeyDown={handleKeyDown}
                               value={input}
                               autoFocus={true}
                               className="mt-5 bg-gray-50 border placeholder-gray-400 border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full py-3 px-5"/>
                    </section>
                </Layouts>

            )
            }
        </>

    )
}