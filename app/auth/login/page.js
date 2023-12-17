'use client';
import Link from "next/link";
import {FaFacebookF} from "react-icons/fa";
import {FcGoogle} from "react-icons/fc";
import {BsApple, BsGoogle} from "react-icons/bs";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {UserAuth} from "/context/auth";
import Loading from "../../Components/splashScreen";
import {useState} from "react";

const schema = yup.object().shape({
    email: yup.string().email().required('Email harus diisi'),
    password: yup.string().min(6).max(15).required('Password harus diisi'),
});
export default function page() {
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(schema),
    });

    const {signIn} = UserAuth()

    const submitForm = async (data) => {
        setIsLoading(true)
        signIn(data.email, data.password);
    }

    return (
        <>
            {isLoading ? (
                <Loading/>
            ) : (
                <section className="min-h-screen flex items-stretch text-white font-poppins">
                    <div
                        className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center"
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80')",
                        }}
                    >
                        <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
                        <div className="w-full px-24 z-10">
                            <h1 className="text-5xl font-bold text-left tracking-wide">
                                Keep it special
                            </h1>
                            <p className="text-3xl my-4">
                                Capture your personal memory in unique way, anywhere.
                            </p>
                        </div>
                        <div
                            className="bottom-0 absolute p-4 text-center text-3xl right-0 left-0 flex justify-center space-x-4">
            <span>
              <FaFacebookF className="text-white cursor-pointer"/>
            </span>
                            <span>
              <BsGoogle className="text-white"/>
            </span>
                            <span>
              <BsApple/>
            </span>
                        </div>
                    </div>
                    <div
                        className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0 bg-white text-black">
                        <div
                            className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center"
                            style={{
                                backgroundImage:
                                    "url('https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80')",
                            }}
                        >
                            <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
                        </div>
                        <div className="w-full py-6 z-20">
                            <h1 className="my-6 font-semibold text-4xl font-poppins">InfoKanal</h1>
                            <div className="py-6 flex justify-center gap-5 text-2xl">
                                <div className="border rounded-full p-2 border-gray-300 cursor-pointer">
                                    <FaFacebookF className="text-blue-600 cursor-pointer"/>
                                </div>
                                <div className="border rounded-full p-2 border-gray-300 cursor-pointer">
                                    <FcGoogle/>
                                </div>
                                <div className="border rounded-full p-2 border-gray-300 cursor-pointer">
                                    <BsApple/>
                                </div>
                            </div>
                            <p className="text-gray-700">atau gunakan email dan password</p>
                            <form action="" className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto">
                                <div className="pb-2 pt-4">
                                    <input
                                        type="email"
                                        name="email"
                                        {...register('email')}
                                        id="email"
                                        placeholder="Email"
                                        className="block w-full p-4 text-lg rounded-lg"
                                    />
                                </div>
                                <div className="pb-2 pt-4">
                                    <input
                                        className="block w-full p-4 text-lg rounded-lg"
                                        type="password"
                                        {...register('password')}
                                        name="password"
                                        id="password"
                                        placeholder="Password"
                                    />
                                </div>
                                <div className="px-4 pb-2 pt-10">
                                    <button onClick={handleSubmit(submitForm)}
                                            className="uppercase block w-full p-4 text-lg text-white rounded-full bg-primary hover:bg-indigo-600 focus:outline-none">
                                        Masuk
                                    </button>
                                </div>
                                <div className="text-left text-gray-600 mt-5">
                                    Belum mempunyai akun?{" "}
                                    <Link
                                        href="/auth/register"
                                        className="font-semibold text-blue-600 hover:text-indigo-600"
                                    >
                                        Daftar Sekarang!
                                    </Link>
                                </div>
                                <div
                                    className="p-4 text-center right-0 left-0 flex justify-center space-x-4 mt-16 lg:hidden ">
                                    <a href="#">
                                        <svg
                                            fill="#fff"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                                        </svg>
                                    </a>
                                    <a href="#">
                                        <svg
                                            fill="#fff"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                                        </svg>
                                    </a>
                                    <a href="#">
                                        <svg
                                            fill="#fff"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                        </svg>
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
