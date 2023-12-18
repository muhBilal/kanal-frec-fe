'use client'
import Layouts from "@/app/Components/layouts";
import Image from "next/image";
import {useRouter} from "next/navigation";
import perangkat from '../../static/perangkat.json'
import {useEffect, useState} from "react";
import Loading from "@/app/Components/splashScreen";

export default function page() {
    const router = useRouter()
    const [perangkatData, setPerangkatData] = useState([])
    const [isLoding, setIsLoding] = useState(true)
    const [keyword, setKeyword] = useState('')
    const answer = (id, merk) => {
        // router.push(`/chat?id=${id}`)
        router.push(`/chat?id=${id}&merk=${merk}`)
    }

    const getDevice = () => {
        const perangkatKeys = Object.keys(perangkat.perangkat);
        const perangkatInfo = perangkatKeys.map((tipe) => {
            const data = perangkat.perangkat[tipe];
            return {
                tipe: tipe,
                merk: data.EQ_MFR,
                freqMin: data.FREQ_min,
                freqMax: data.FREQ_max,
                EX_PWR: data.EX_PWR,
                BandwidthMax: data.BWIDTH_min,
                BandwidthMin: data.BWIDTH_max,
            };
        });
        setPerangkatData(perangkatInfo);
        setIsLoding(false);
    }

    const handleFilter = (value) => {
        setKeyword(value)
        const filter = perangkatData.filter((item) => {
            return item.tipe.toLowerCase().includes(keyword.toLowerCase())
        })
        setPerangkatData(filter)
    }

    const handleReset = () => {
        setKeyword('')
        getDevice()
    }
    useEffect(() => {
        getDevice()
    }, [])

    return (
        <>
            {
                isLoding ? (
                    <Loading/>
                ) : (
                    <Layouts>
                        <h1 className={`text-2xl font-semibold mb-10`}>Perangkat</h1>
                        <section className={`max-w-2xl mx-auto flex gap-3`}>
                            <form className={`w-full`}>
                                <label htmlFor="default-search"
                                       className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                <div className="relative">
                                    <div
                                        className="absolute inset-y-0 start-0 flex items-center ps-5 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                                  stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                        </svg>
                                    </div>
                                    <input type="search" id="default-search"
                                           value={keyword}
                                           onChange={
                                               (e) => handleFilter(e.target.value)
                                           }
                                           className="block w-full p-4 ps-12 shadow-sm text-sm text-gray-900 border border-gray-500 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                           placeholder="Search Mockups, Logos..." required/>
                                </div>
                            </form>
                            {
                                keyword !== '' && (
                                    <button onClick={handleReset}
                                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none">Reset
                                    </button>
                                )
                            }
                        </section>

                        <section className={`grid grid-cols-4 gap-5 max-w-5xl mx-auto mt-10`}>

                            {
                                perangkatData.map((item, index) => {
                                    return (
                                        <div className={`group shadow-lg rounded-xl hover:shadow-xl p-5`} key={index}>
                                            <Image src="/images/bot.png" alt="" width={300} height={350}/>
                                            <div>
                                                <p className={`group-hover:hidden font-semibold text-center`}>{item.tipe.substring(0, 10)}</p>
                                                <p className={`group-hover:hidden font-semibold text-center`}>Frequency {item.freqMin} - {item.freqMax}</p>
                                                <div className={`hidden group-hover:flex justify-center`}>
                                                    <button
                                                        onClick={() => answer(item.tipe, item.merk)}
                                                        className="btn-primary group hover:bg-gradient-to-r px-8 py-2 mx-auto">
                                                        <span className="btn-primary-hover ease"></span>
                                                        <span className="relative">Tanyakan Bot</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </section>
                    </Layouts>
                )
            }
        </>
    )
}