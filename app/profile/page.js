'use client';
import Layouts from "@/app/Components/layouts";
import Link from "next/link";
import {getCookie} from "cookies-next";
import {doc, getDoc, updateDoc} from "firebase/firestore";
import {db} from "/service/firebase";
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useEffect, useState} from "react";
import {UserAuth} from "@/context/auth";
import Loading from "@/app/Components/splashScreen";
import Swal from "sweetalert2";

const schema = yup.object().shape({
    name: yup.string(),
    email: yup.string(),
    phone: yup.string()
});
export default function profile() {
    const [isLoading, setIsLoading] = useState(true)
    const [userData, setUserData] = useState()
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(schema)
    });
    const {logout} = UserAuth()
    const id = getCookie('ID');
    const getData = async () => {
        const docRef = doc(db, "Users", id);
        const docSnap = await getDoc(docRef);
        setUserData(docSnap.data())
        setIsLoading(false)
    }

    const updateUser = async (data) => {
        const docRef = doc(db, "Users", id);
        await updateDoc(docRef, {
            Name: data.name,
            Phone: data.phone,
            Email: data.email,
        });
        Swal.fire({
            title: "Sukses!",
            text: "Berhasil memperbarui Profil!",
            icon: "success"
        });
    }

    const handleLogout = () => {
        logout()
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            {
                isLoading ? (
                    <Loading/>
                ) : (
                    <Layouts>
                        <section className={`flex justify-between`}>
                            <nav className="flex" aria-label="Breadcrumb">
                                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                                    <li className="inline-flex items-center">
                                        <Link href="/"
                                              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                                            <svg className="w-3 h-3 me-2.5" aria-hidden="true"
                                                 xmlns="http://www.w3.org/2000/svg"
                                                 fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                                            </svg>
                                            Home
                                        </Link>
                                    </li>
                                    <li aria-current="page">
                                        <div className="flex items-center">
                                            <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                                                 aria-hidden="true"
                                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                      strokeWidth="2" d="m1 9 4-4-4-4"/>
                                            </svg>
                                            <span
                                                className="ms-1 text-sm font-medium text-gray-500 md:ms-2 ">Edit Profile</span>
                                        </div>
                                    </li>
                                </ol>
                            </nav>

                            <button onClick={handleLogout}
                                    className="btn-danger group  hover:bg-gradient-to-r px-8 py-2">
                                <span className="btn-danger-hover ease"></span>
                                <span className="relative">Logout</span>
                            </button>
                        </section>

                        <section className={`mx-auto max-w-md mt-24`}>
                            <h1 className={`text-2xl font-semibold text-center`}>Edit Profile</h1>
                            <p className={`text-sm text-gray-600 my-5`}>Isi berdasarkan data diri pribadi anda</p>
                            <div className="mb-6">
                                <label htmlFor="default-input"
                                       className="block mb-2 text-gray-900 capitalize">Nama lengkap</label>
                                <input type="text" id="default-input"
                                       {...register('name')}
                                       defaultValue={userData?.Name}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
                                {
                                    errors.name && <p className={`text-red-500 text-xs mt-1`}>{errors.name.message}</p>
                                }
                            </div>
                            <div className="mb-6">
                                <label htmlFor="default-input"
                                       className="block mb-2 text-gray-900 capitalize">No. Telp</label>
                                <input type="text" id="default-input"
                                       {...register('phone')}
                                       defaultValue={userData?.Phone}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
                                {
                                    errors.phone &&
                                    <p className={`text-red-500 text-xs mt-1`}>{errors.phone.message}</p>
                                }
                            </div>
                            <div className="mb-6">
                                <label htmlFor="default-input"
                                       className="block mb-2 text-gray-900 capitalize">Email</label>
                                <input type="text" id="default-input"
                                       defaultValue={userData?.Email}
                                       {...register('email')}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
                                {
                                    errors.email &&
                                    <p className={`text-red-500 text-xs mt-1`}>{errors.email.message}</p>
                                }
                            </div>

                            <button onClick={handleSubmit(updateUser)}
                                    className="btn-primary group  hover:bg-gradient-to-r px-8 py-2">
                                <span className="btn-primary-hover ease"></span>
                                <span className="relative">Simpan</span>
                            </button>
                        </section>
                    </Layouts>
                )
            }
        </>
    )
}