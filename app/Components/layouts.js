'use client';
import Sidebar from "./sidebar"
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export default function Layouts({children}) {

    return (
        <section className={`bg-[#EEEEEE] font-poppins`}>
            <ProgressBar
                height="4px"
                color="#2563eb"
                options={{ showSpinner: false }}
                shallowRouting
            />
            <Sidebar/>

            <div className="py-2 pr-2 sm:ml-28">
                <div className="p-8 rounded-3xl bg-white shadow-lg h-[97vh] overflow-auto text-black">
                    {children}
                </div>
            </div>
        </section>
    )
}
