import Image from "next/image";

const Loading = () => {
    return (
        <section className={`flex justify-center items-center h-[100vh]`}>
            <Image src="/images/kominfo.png" alt="" width={300} height={300}
                   className={`bg-white rounded-full p-[4px]`}/>
        </section>
    );
}

export default Loading;