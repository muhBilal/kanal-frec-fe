'use client';
import Layouts from "@/app/Components/layouts";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import {getCookie} from "cookies-next";
import {db} from "/service/firebase";
import {addDoc, collection} from "firebase/firestore";

const schema = yup.object().shape({
    SUBSERVICE: yup.string().required(),
    UMUR_ISR: yup.string().required(),
    BWIDTH: yup.string().required(),
    CIRCUIT_LEN: yup.string().required(),
    EQ_PWR: yup.string().required(),
    ERP_PWR_DBM: yup.string().required(),
    FREQ: yup.string().required(),
    FREQ_PAIR: yup.string().required(),
    GAIN: yup.string().required(),
    HGT_ANT: yup.string().required(),
    LOSS: yup.string().required(),
    SID_LAT: yup.string().required(),
    SID_LONG: yup.string().required(),
});
export default function page() {
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        const headers = {
            'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
        };

        try {
            const response = await axios.post('http://127.0.0.1:5000/predict', data, { headers });
            const status = response.data.data.STATUS_SIMF;
            if (status === 'Granted') {
                Swal.fire({
                    title: "Sukses!",
                    text: "Permintaan Di Setujui!",
                    icon: "success"
                });

                await addDoc(collection(db, "Kanal"), {
                    UserID: getCookie('ID'),
                    SUBSERVICE: data.SUBSERVICE,
                    UMUR_ISR: data.UMUR_ISR,
                    BWIDTH: data.BWIDTH,
                    CIRCUIT_LEN: data.CIRCUIT_LEN,
                    EQ_PWR: data.EQ_PWR,
                    ERP_PWR_DBM: data.ERP_PWR_DBM,
                    FREQ: data.FREQ,
                    FREQ_PAIR: data.FREQ_PAIR,
                    GAIN: data.GAIN,
                    HGT_ANT: data.HGT_ANT,
                    LOSS: data.LOSS,
                    SID_LAT: data.SID_LAT,
                    SID_LONG: data.SID_LONG,
                    DATE: new Date()
                });
                alert('Data Berhasil Di Simpan');
            }else {
                Swal.fire({
                    icon: "error",
                    title: "Maaf...",
                    text: "Permintaan Di tolak!",
                });
            }
        } catch (error) {
            console.error('Error occurred:', error);
        }

    }

    return (
        <Layouts>
            <h1 className={`text-2xl font-semibold px-20 my-5`}>Form Pengajuan</h1>
            <div className={`max-w-4xl mt-14 mx-auto`}>
                <form>
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Jenis Pengajuan</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600 capitalize">Jenis freksuensi yang akan di
                                ajukan</p>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                {/*<div className="sm:col-span-3">*/}
                                {/*    <label htmlFor="first-name"*/}
                                {/*           className="block text-sm font-medium leading-6 text-gray-900">Status Simf</label>*/}
                                {/*    <div className="mt-2">*/}
                                {/*        <input type="text" name="first-name" id="first-name" autoComplete="given-name"*/}
                                {/*               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                <div className="sm:col-span-3">
                                    <label htmlFor="last-name"
                                           className="block text-sm font-medium leading-6 text-gray-900">Subservice</label>
                                    <div className="mt-2">
                                        <input type="text" name="last-name" id="last-name" placeholder="PP"
                                               {...register("SUBSERVICE")}
                                               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                        {
                                            errors.SUBSERVICE && <p className={`text-red-500`}>This field is required</p>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Alat Frekuensi</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600 capitalize">Spesifikasi Jenis Alat
                                freksuensi yang akan di ajukan</p>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label htmlFor="first-name"
                                           className="block text-sm font-medium leading-6 text-gray-900">Frekuensi</label>
                                    <div className="mt-2">
                                        <input type="text" name="first-name" id="first-name" autoComplete="given-name"
                                               {...register("FREQ")}
                                               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                        {
                                            errors.FREQ && <p className={`text-red-500`}>This field is required</p>
                                        }
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor="last-name"
                                           className="block text-sm font-medium leading-6 text-gray-900">Frekuensi
                                        Pasangan</label>
                                    <div className="mt-2">
                                        <input type="text" name="last-name" id="last-name"
                                               {...register("FREQ_PAIR")}
                                               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                        {
                                            errors.FREQ_PAIR && <p className={`text-red-500`}>This field is required</p>
                                        }
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="first-name"
                                           className="block text-sm font-medium leading-6 text-gray-900">Power
                                        (DBM)</label>
                                    <div className="mt-2">
                                        <input type="text" name="first-name" id="first-name" autoComplete="given-name"
                                               {...register("ERP_PWR_DBM")}
                                               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                        {
                                            errors.ERP_PWR_DBM && <p className={`text-red-500`}>This field is required</p>
                                        }
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor="last-name"
                                           className="block text-sm font-medium leading-6 text-gray-900">Power
                                        (Watt)</label>
                                    <div className="mt-2">
                                        <input type="text" name="last-name" id="last-name"
                                               {...register("EQ_PWR")}
                                               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                        {
                                            errors.EQ_PWR && <p className={`text-red-500`}>This field is required</p>
                                        }
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor="last-name"
                                           className="block text-sm font-medium leading-6 text-gray-900">Gain</label>
                                    <div className="mt-2">
                                        <input type="text" name="last-name" id="last-name"
                                               {...register("GAIN")}
                                               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                        {
                                            errors.GAIN && <p className={`text-red-500`}>This field is required</p>
                                        }
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor="last-name"
                                           className="block text-sm font-medium leading-6 text-gray-900">Loss</label>
                                    <div className="mt-2">
                                        <input type="text" name="last-name" id="last-name"
                                               {...register("LOSS")}
                                               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                        {
                                            errors.LOSS && <p className={`text-red-500`}>This field is required</p>
                                        }
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor="last-name"
                                           className="block text-sm font-medium leading-6 text-gray-900">Bandwith</label>
                                    <div className="mt-2">
                                        <input type="text" name="last-name" id="last-name"
                                               {...register("BWIDTH")}
                                               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                        {
                                            errors.BWIDTH && <p className={`text-red-500`}>This field is required</p>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Administrasi</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">Persayaratan Adminsitrasi Permohonan
                                Freksuensi</p>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label htmlFor="first-name"
                                           className="block text-sm font-medium leading-6 text-gray-900">Tinggi
                                        Antena</label>
                                    <div className="mt-2">
                                        <input type="text" name="first-name" id="first-name" autoComplete="given-name"
                                               {...register("HGT_ANT")}
                                               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                        {
                                            errors.HGT_ANT && <p className={`text-red-500`}>This field is required</p>
                                        }
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor="last-name"
                                           className="block text-sm font-medium leading-6 text-gray-900">Posisi
                                        Latitude</label>
                                    <div className="mt-2">
                                        <input type="text" name="last-name" id="last-name"
                                               {...register('SID_LAT')}
                                               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                        {
                                            errors.SID_LAT && <p className={`text-red-500`}>This field is required</p>
                                        }
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor="first-name"
                                           className="block text-sm font-medium leading-6 text-gray-900">Posisi
                                        Longitude</label>
                                    <div className="mt-2">
                                        <input type="text" name="first-name" id="first-name" autoComplete="given-name"
                                               {...register("SID_LONG")}
                                               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                        {
                                            errors.SID_LONG && <p className={`text-red-500`}>This field is required</p>
                                        }
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor="last-name"
                                           className="block text-sm font-medium leading-6 text-gray-900">Circuit
                                        LEN</label>
                                    <div className="mt-2">
                                        <input type="text" name="last-name" id="last-name"
                                               {...register("CIRCUIT_LEN")}
                                               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                        {
                                            errors.CIRCUIT_LEN && <p className={`text-red-500`}>This field is required</p>
                                        }
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor="first-name"
                                           className="block text-sm font-medium leading-6 text-gray-900">Umur
                                        ISR</label>
                                    <div className="mt-2">
                                        <input type="text" name="first-name" id="first-name" autoComplete="given-name"
                                               {...register("UMUR_ISR")}
                                               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                        {
                                            errors.UMUR_ISR && <p className={`text-red-500`}>This field is required</p>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button onClick={handleSubmit(onSubmit)}
                                className="btn-primary group  hover:bg-gradient-to-r px-8 py-2">
                            <span className="btn-primary-hover ease"></span>
                            <span className="relative">Simpan</span>
                        </button>
                    </div>
                </form>
            </div>
        </Layouts>
)
}