'use client'
import Layouts from "@/app/Components/layouts";
import Image from "next/image";
import {useRouter} from "next/navigation";

export default function page() {
    const router = useRouter()
    const answer = (id) => {
        router.push(
            "/chat",
            {
                query: { param1: "value1", param2: "value2" },
                scroll: true, // Optional scroll behavior
            }
        );

    }

    return (
        <div>
            <Layouts>
                <h1 className={`text-2xl font-semibold mb-10`}>Perangkat</h1>
                <form className={`max-w-2xl mx-auto`}>
                    <label htmlFor="default-search"
                           className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-5 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                      stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="search" id="default-search"
                               className="block w-full p-4 ps-12 shadow-sm text-sm text-gray-900 border border-gray-500 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                               placeholder="Search Mockups, Logos..." required/>
                    </div>
                </form>

                <section className={`grid grid-cols-4 max-w-5xl mx-auto mt-10`}>
                    <div className={`group shadow-lg rounded-xl hover:shadow-xl p-5`}>
                        <Image src="/images/bot.png" alt="" width={300} height={350}/>
                        <div>
                            <p className={`group-hover:hidden font-semibold text-center`}>Kanal</p>
                            <p className={`group-hover:hidden font-semibold text-center`}>Frequency 34 </p>
                            <div className={`hidden group-hover:flex justify-center`}>
                                <button
                                    onClick={() => answer('testt')}
                                    className="btn-primary group hover:bg-gradient-to-r px-8 py-2 mx-auto">
                                    <span className="btn-primary-hover ease"></span>
                                    <span className="relative">Tanyakan Bot</span>
                                </button>
                            </div>
                        </div>
                    </div>

                </section>
            </Layouts>
        </div>
    )
}