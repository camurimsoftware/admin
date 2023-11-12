import Head from "next/head";
import { api } from "~/utils/api";
import { useRef, useState } from "react";

export default function Home() {

    const [step, setStep] = useState(1);
    const [documentNumber, setDocumentNumber] = useState("");

    const { data } = api.user.getUser.useQuery({ document: documentNumber });

    const inputRef = useRef<HTMLInputElement | null>(null);

    return (
        <>
            <Head>
                <title>Camurim</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="preload" as="video" href="https://utfs.io/f/84148856-54b4-40f1-ad4d-70c53f27651b-1uswaj.mp4" />
            </Head>
            <main className="flex max-h-screen h-screen flex-col items-center justify-between bg-white py-10 lg:py-40">
                {step === 1 &&
                    <>
                        <h1 className="font-quick text-4xl font-bold">
                            Boas vindas na TV
                        </h1>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-2xl">CPF</label>
                                <input ref={inputRef} type="number" placeholder="Digite o CPF (apenas números)" className="bg-[#d9d9d9] rounded-3xl text-xl py-8 px-2 min-w-[350px] placeholder-zinc-500 " />
                            </div>
                            <button
                                onClick={() => {
                                    setStep(2)
                                    setDocumentNumber(inputRef?.current?.value ?? "")
                                    if (inputRef.current) {
                                        inputRef.current.value = ""
                                    }
                                }}
                                className="py-4 px-8 bg-primary text-white text-4xl rounded-3xl"
                            >
                                Iniciar
                            </button>
                        </div>
                        <div>
                            <img src="./logo-dark.svg" alt="" />
                        </div>
                    </>
                }
                {
                    (step === 2 && data) &&
                    <>
                        <video autoPlay muted loop className="full-screen-video" preload="auto">
                            <source src="https://utfs.io/f/84148856-54b4-40f1-ad4d-70c53f27651b-1uswaj.mp4" type="video/mp4" />
                        </video>
                        <div className="flex flex-col h-screen items-center justify-center relative z-10">
                            <h1 className="font-quick text-6xl text-white mb-2 text-center">
                                {`Bem-vindos ${data?.name?.toUpperCase()}${data?.guest ? ` e ${data?.guest?.toUpperCase()}` : ""}`}
                            </h1>
                            <p className="text-white text-2xl text-center">
                                à tranquilidade e ao charme da nossa pousada. Estamos aqui para tornar seus dias inesquecíveis.
                            </p>
                            <img src="./logo.svg" className="mt-40 mx-auto" alt="Logo" />
                        </div>
                    </>
                }
            </main>
            <div className="hidden">
                <video autoPlay muted loop className="full-screen-video" preload="auto">
                    <source src="https://utfs.io/f/84148856-54b4-40f1-ad4d-70c53f27651b-1uswaj.mp4" type="video/mp4" />
                </video>
            </div>
        </>
    );
}
