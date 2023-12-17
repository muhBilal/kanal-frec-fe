import Image from "next/image";
import {BiSolidChat} from "react-icons/bi";
import {FaMapLocationDot} from "react-icons/fa6";
import {SiGoogleforms} from "react-icons/si";
import { GiRadioTower } from "react-icons/gi";
import {CgProfile} from "react-icons/cg";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {getCookie} from "cookies-next";
import Link from "next/link";

export const getServerSideProps = async (ctx) => {
    const id = getCookie('ID')
    console.log('server', id)
    const router = useRouter()
    if(!id) {
        router.push("/auth/login")
    }
    return {
        props: {
            id: id,
        }
    }
}

const Sidebar = ({id}) => {
    const router = useRouter()
    useEffect(() => {
        // console.log("id: ", id)
            if(!id) {
            // console.log("id not found")
            // router.replace("/au
            // th/login")
        }
    }, []);

    return (
        <>
            <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar"
                    aria-controls="default-sidebar" type="button"
                    className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd"
                          d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside id="default-sidebar"
                   className="fixed top-0 left-0 z-40 w-24 h-screen transition-transform -translate-x-full sm:translate-x-0 pl-2 py-2"
                   aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-dark rounded-3xl">
                    <a href="#"
                       className="flex items-center p-2 text-gray-900 justify-center">
                        <Image src="/images/kominfo.png" alt="" width={55} height={55}
                               className={`bg-white rounded-full p-[4px]`}/>
                    </a>
                    <ul className="space-y-2 font-medium h-[78vh] flex flex-col justify-center items-center gap-10">
                        <li>
                            <a href="/submission"
                               className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-700 group justify-center group">
                                <SiGoogleforms className={`text-gray-400 text-2xl group-hover:text-white`}/>
                            </a>
                        </li>
                        <li>
                            <a href="/chat"
                               className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-700 group justify-center group">
                                <BiSolidChat className={`text-gray-400 text-2xl group-hover:text-white`}/>
                            </a>
                        </li>
                        <li>
                            <a href="/product"
                               className="flex items-center p-2 text-gray-800 rounded-lg hover:bg-gray-700 group justify-center group">
                                <GiRadioTower className={`text-gray-400 text-2xl group-hover:text-white`}/>
                            </a>
                        </li>
                        <li>
                            <a href="/maps"
                               className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-700 group justify-center group">
                                <FaMapLocationDot className={`text-gray-400 text-2xl group-hover:text-white`}/>
                            </a>
                        </li>
                    </ul>
                    <Link href="/profile"
                       className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-700 group justify-center group">
                        <CgProfile className={`text-gray-400 text-2xl group-hover:text-white`}/>
                    </Link>
                </div>
            </aside>
        </>
    )
}
export default Sidebar;