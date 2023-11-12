/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect, useRef, type FormEvent } from "react";
import { MdChevronRight } from "react-icons/md";
import { FaSpinner } from "react-icons/fa";
import SignatureCanvas from 'react-signature-canvas';
import { useRouter } from 'next/navigation'

import { idGenerator } from "~/utils/idGenerator"
import { api } from "~/utils/api";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "~/utils/firebase";

export const checklistItems1 = [
  "Aproveite seus dias para descansar e recarregar suas energias, evitando fazer barulho após as 22h.",
  "Temos música ambiente, portanto, não é permitido o uso de caixas de som em qualquer área da pousada.",
  "Receber visitantes dentro das acomodações, mesmo que sejam familiares, viola as normas de privacidade da pousada.",
  "Nas acomodações, apenas as pessoas que contrataram a hospedagem são permitidas. Amigos e familiares podem aguardar nas áreas comuns da pousada.",
  "As Crianças são muito bem-vindas, no entanto, **pedimos a compreensão em não jogar bola, andar de bicicleta e fazer jogos em grupos** nas áreas comuns, como a piscina, restaurante, área do bar, a fim de manter o descanso de todos. Aproveitem a praia tranquila para essas atividades.",
];

export const checklistItems2 = [
  "Para realizar qualquer evento de comemoração, como aniversários, bodas, casamentos, fotografia profissional, etc., é necessário obter o aceite e **autorização** da direção da pousada.",
  "Não é permitida a entrada de bebidas na pousada, com exceção das bebidas alcoólicas destiladas, mediante o pagamento de uma taxa de rolha no valor de 68 reais, quando consumidas nas áreas comuns.",
  "A retirada de bebidas do frigobar no quarto para dar lugar a bebidas trazidas pelos hóspedes sem aviso prévio resultará na cobrança do valor integral do conteúdo do frigobar.",
  "Nossos apartamentos e restaurante são estritamente para **não fumantes**. O não cumprimento desta regra acarretará uma multa no valor de uma diária, e o hóspede não será mais aceito na pousada.",
  "Cobramos uma taxa de serviço de 10% sobre a hospedagem e o consumo. Ressaltamos que essa taxa é opcional.",
  "Declaro estar plenamente de acordo com o regulamento e etiqueta estabelecidos para esta ocasião."
];

type InputFormData = {
  document: string;
  referenceNumber: number;
  name: string;
  guest: string;
  roomNumber: number;
  startDate: string;
  endDate: string;
  signatureUrl: string;
}

export default function Home() {
  const [step, setStep] = useState(1);
  const formDataRef = useRef<InputFormData | null>(null);
  const { mutate, isLoading } = api.user.create.useMutation();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleUpload = async (image: string) => {
    if (!image) return;
    setLoading(true);
    const base64Response = await fetch(image);
    const blob = await base64Response.blob();
    const id = idGenerator();
    const imageRef = ref(storage, `images/${id}`)
    const { ref: uploadedFileRef } = await uploadBytes(imageRef, blob);
    const url = await getDownloadURL(uploadedFileRef);
    if (formDataRef?.current) {
      formDataRef.current.signatureUrl = url;
      mutate(formDataRef.current);
    }
    setLoading(false);
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    formDataRef.current = {
      document: formData.get("document") as string,
      referenceNumber: Number(formData.get("referenceNumber") as string),
      name: formData.get("name") as string,
      guest: formData.get("guest") as string,
      roomNumber: Number(formData.get("roomNumber") as string),
      startDate: formData.get("startDate") as string,
      endDate: formData.get("endDate") as string,
      signatureUrl: ""
    };
    setStep(2);
  }

  const signPadRef = useRef<SignatureCanvas>(null);

  useEffect(() => {
    if (step !== 1 && window?.document) {
      window?.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }, [step])

  return (
    <>
      <Head>
        <title>Camurim</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <link rel="preload" as="image" href="./pool.jpg" />
      <link rel="preload" as="image" href="./beach.jpg" />
      <link rel="preload" as="video" type="video/mp4" href="https://utfs.io/f/84148856-54b4-40f1-ad4d-70c53f27651b-1uswaj.mp4" />
      <main className="scroll-auto flex min-h-screen flex-col items-center justify-between bg-blue pt-4 pb-4">
        {step === 1 &&
          <>
            <div>
              <img src="./logo.svg" alt="Camurim Logo" className="w-[400px] mb-10" />
            </div>
            <form className="max-w-lg flex flex-col" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2 mb-4">
                <label className="text-lg text-white">CPF:</label>
                <input name="document" type="number" placeholder="Digite o CPF (apenas números)" className="focus:outline-none rounded-3xl text-xl py-4 mb-2 px-6 min-w-[350px] placeholder-zinc-500 " />
              </div>
              <div className="flex flex-col gap-2 mb-4">
                <label className="text-lg text-white">Número de reserva:</label>
                <input name="referenceNumber" type="number" placeholder="Número de reserva" className="focus:outline-none rounded-3xl text-xl py-4 mb-2 px-6 min-w-[350px] placeholder-zinc-500 " />
              </div>
              <div className="flex flex-col gap-2 mb-4">
                <label className="text-lg text-white">Hóspede 1:</label>
                <input name="name" placeholder="Hóspede 1" className="focus:outline-none rounded-3xl text-xl py-4 mb-2 px-6 min-w-[350px] placeholder-zinc-500 " />
              </div>
              <div className="flex flex-col gap-2 mb-4">
                <label className="text-lg text-white">Hóspede 2:</label>
                <input name="guest" placeholder="Hóspede 2" className="focus:outline-none rounded-3xl text-xl py-4 mb-2 px-6 min-w-[350px] placeholder-zinc-500 " />
              </div>
              <div className="flex flex-col gap-2 mb-4">
                <label className="text-lg text-white">Número do AP:</label>
                <input name="roomNumber" type="number" placeholder="Número do AP" className="focus:outline-none rounded-3xl text-xl py-4 mb-2 px-6 min-w-[350px] placeholder-zinc-500 " />
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-lg text-white">Data de check in:</label>
                  <input name="startDate" type="date" className="focus:outline-none rounded-3xl text-xl py-4 mb-2 px-6 placeholder-zinc-500 " />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-lg text-white">Data de check out:</label>
                  <input name="endDate" type="date" className="focus:outline-none rounded-3xl text-xl py-4 mb-2 px-6 placeholder-zinc-500 " />
                </div>
              </div>
              <button type="submit" className="py-4 px-16 bg-primary text-white text-xl rounded-xl my-10 mx-auto">Avançar</button>
            </form>
          </>
        }
        {
          step === 2 &&
          <>
            <video autoPlay muted loop className="full-screen-video" preload="auto">
              <source src="https://utfs.io/f/84148856-54b4-40f1-ad4d-70c53f27651b-1uswaj.mp4" type="video/mp4" />
            </video>
            <div className="relative z-10 pt-10">
              <img src="./logo.svg" alt="Camurim Logo" className="mx-auto" />

              <div className="mt-28 max-w-2xl rounded-lg bg-white/60 flex flex-col items-center justify-center px-14 py-16 backdrop-blur-md">
                <h1 className="font-quick text-4xl text-black mb-10 text-center font-normal">
                  Sejam muito bem-vindos
                </h1>
                <p className="text-2xl text-black mb-4 text-center">Vamos iniciar o seu check-in.</p>
                <p className="text-lg text-black text-center leading-tight">Por favor, leia e concorde com este documento para <br /> garantir a segurança e o bem-estar de nossos hóspedes.</p>
                <button onClick={() => setStep(3)} className="py-2 px-16 bg-secondary text-white text-xl rounded-xl mt-5">
                  Iniciar check in
                </button>
              </div>
            </div>
          </>
        }
        {
          step === 3 &&
          <>
            <div className="flex flex-1 w-full flex-col items-center bg-white -mt-4 -mb-4 lg:-mt-28 lg:-mb-32">
              <img src="./pool.jpg" alt="Piscina" className="h-[363px] w-full object-cover" />
              <h1 className="text-3xl mt-10 mb-20 font-quick">
                Regras e normas da pousada.
              </h1>
              <div className="px-10">
                {checklistItems1.map(item => {
                  const parts = item.split("**");
                  if (parts.length > 1) {
                    return <div key={item} className="flex gap-8 mb-3">
                      <input type="checkbox" className="w-10 h-10 flex-shrink-0 accent-[#4E4934] border-[#4E4934]" />
                      <p className="text-lg">
                        {parts[0]}
                        <span className="font-bold">{parts[1]}</span>
                        {parts[2]}
                      </p>
                    </div>
                  }
                  return <div key={item} className="flex gap-8 mb-3">
                    <input type="checkbox" className="w-10 h-10 flex-shrink-0 accent-[#4E4934] border-[#4E4934]" />
                    <p className="text-lg">
                      {item}
                    </p>
                  </div>
                })}
              </div>
              <div className="flex items-center w-full justify-between px-10 mt-20 mb-10">
                <img src="./logo-dark.svg" alt="Camurim Logo" className="max-w-[234px]" />
                <button onClick={() => setStep(4)} className="flex items-center gap-2 py-2 px-8 bg-secondary text-white text-xl rounded-xl mt-5">
                  Avançar
                  <MdChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </>
        }
        {
          step === 4 &&
          <>
            <div className="flex flex-1 w-full flex-col items-center bg-white -mt-4 -mb-4 lg:-mt-28 lg:-mb-32">
              <img src="./beach.jpg" alt="Piscina" className="h-[363px] w-full object-cover" />
              <h1 className="text-3xl mt-10 mb-20 font-quick">
                Regras e normas da pousada.
              </h1>
              <div className="px-10">
                {checklistItems2.map(item => {
                  const parts = item.split("**");
                  if (parts.length > 1) {
                    return <div key={item} className="flex gap-8 mb-3">
                      <input type="checkbox" className="w-10 h-10 flex-shrink-0 accent-[#4E4934] border-[#4E4934]" />
                      <p className="text-lg">
                        {parts[0]}
                        <span className="font-bold">{parts[1]}</span>
                        {parts[2]}
                      </p>
                    </div>
                  }
                  return <div key={item} className="flex gap-8 mb-3">
                    <input type="checkbox" className="w-10 h-10 flex-shrink-0 accent-[#4E4934] border-[#4E4934]" />
                    <p className="text-lg">
                      {item}
                    </p>
                  </div>
                })}
              </div>
              <div className="flex items-center w-full justify-between px-10 mt-20 mb-10">
                <img src="./logo-dark.svg" alt="Camurim Logo" className="max-w-[234px]" />
                <button onClick={() => setStep(5)} className="flex items-center gap-2 py-2 px-8 bg-secondary text-white text-xl rounded-xl mt-5">
                  Avançar
                  <MdChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </>
        }
        {step === 5 &&
          <>
            <div>
              <img src="./logo.svg" alt="Camurim Logo" />
            </div>
            <div className="flex gap-16 w=full">
              <h1 className="text-white text-4xl max-w-[245px] leading-snug"> Você está prestes a desfrutar de todas as comodidades da nossa pousada.</h1>
              <div className="text-lg text-white max-w-[269px]">
                <p className="mb-4">
                  Nossos horários de serviços
                </p>
                <p className="mb-4">
                  <strong className="block">Café da manhã:</strong>
                  começa às 7h30 e é servido a qualquer momento do dia!
                </p>
                <p className="mb-4">
                  <strong className="block">Jantar no Restaurante:</strong>
                  Nosso jantar é servido das 19h às 21h30.
                </p>
                <p className="mb-4">
                  <strong className="block">Chá da tarde:</strong>
                  Nosso chá da tarde é servido todos os dias às 16h30.
                </p>
                <p className="mb-4">
                  <strong className="block">Spa:</strong>
                  Das 14h às 20h massagem disponível antes do horário sob consulta.
                </p>
                <p className="mb-4">
                  <strong className="block">Loja:</strong>
                  Das 9h às 18h.
                </p>
              </div>
            </div>
            <div className="my-20">
              <div className="flex items-center justify-between mb-2">
                <p className="text-white text-lg">Assinatura</p>
                <button onClick={() => signPadRef?.current?.clear()} className="text-white text-lg rounded-md bg-secondary px-5 py-2">Limpar</button>
              </div>
              <SignatureCanvas
                ref={signPadRef}
                penColor='black'
                canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
              />
            </div>
            <button disabled={(isLoading || loading)} onClick={() => {
              const base64Img = signPadRef?.current?.toDataURL() as string;
              if (base64Img) {
                void handleUpload(base64Img);
                setStep(6);
                setTimeout(() => {
                  router.push("/")
                }, 10000)
              }
            }} className="py-2 px-16 bg-primary text-white text-xl rounded-xl my-5">
              {(isLoading || loading) ? (
                <FaSpinner className="ml-2 h-6 w-6 animate-spin text-white" />
              ) : (
                'Salvar'
              )}
            </button>
          </>
        }
        {
          step === 6 &&
          <Link href="/">
            <div className="flex flex-col items-center justify-center w-full h-full">
              <h1 className="font-quick text-white text-6xl mb-48 mt-[50%]">Obrigado!</h1>
              <img src="./logo.svg" alt="Camurim Logo" />
            </div>
          </Link>
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
