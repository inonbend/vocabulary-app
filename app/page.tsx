"use client";
import Image from 'next/image'
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import WordDiv from "@/app/Word";
import data from './data.json'
import {unshiftLoader} from "next/dist/build/webpack/config/helpers";
import {Word} from "@/app/types";
import FlipCard from "@/app/flipCard";

function getData(): Word[] {
    // const res = await fetch('https://api.example.com/...', { cache: 'force-cache' });
    // return res.json();
    return data

}

export default function Home() {
    const [isOpen, setIsOpen] = useState(false)
    const [words, setWords] = useState(getData())
    const [selected, setSelected] = useState(-1)
    const [seen, setSeen] = useState(new Set([-1]))

    useEffect(
        ()=>{
            randomPeak()
        }
    ,[])

    function selectWord(i: number): void {
        setSelected(i)
        setIsOpen(false)
    }

    function approved(i: number){
        seen.add(i)
        randomPeak()
    }


    function randomPeak() {
        if (seen.size === words.length){
            window.alert("Congratulations you finished!!!")
        }
        let i = Math.floor(Math.random() * words.length + 1);
        while (seen.has(i)){
            i++
        }
        selectWord(i)
    }

    function show(): void{
        setIsOpen(!isOpen)
    }

    function removerSelection() : string {
        seen.delete(selected)
        return ""
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {words.length == 0 ? null :
                <div>
                    <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-lg lg:flex">
                        <h1 className="fixed  left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                            Vocabulary
                        </h1>
                        <div
                            className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
                            <a
                                className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
                            >
                                By{' '}
                                <Image
                                    src="/logo.svg"
                                    alt="Vercel Logo"
                                    className="dark:invert"
                                    width={100}
                                    height={24}
                                    priority
                                />
                            </a>
                        </div>
                    </div>

                    <div className="d-flex justify-content-between">
                        {words[selected] ?
                            <FlipCard word={words[selected]} V={()=>approved(selected)} X={randomPeak}/>:null}

                    </div>

                    {/*<div>*/}
                    {/*    <button onClick={()=>approved(selected)}>V</button>*/}
                    {/*    {words[selected] ? <FlipCard word={words[selected].word} meaning={words[selected].meaning} examples={words[selected].examples}/>:null}*/}

                    {/*    <button onClick={randomPeak}>X</button>*/}
                    {/*</div>*/}

                    <div
                        className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-center">
                        {words.length > 0 ?
                            words.map((w, i) => {
                                return (
                                    <h2
                                        key={i}
                                        className={`${seen.has(i)? 'border-green-600': 'border-transparent' } group rounded-lg border  px-2 py-2 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30`}
                                        onClick={() => selectWord(i)}
                                    >
                                        {w.word}
                                    </h2>
                                )
                            })
                            : null
                        }

                    </div>

                </div>
            }
        </main>
    )
}