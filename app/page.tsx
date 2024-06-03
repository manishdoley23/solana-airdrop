"use client";

import { useEffect, useRef, useState } from "react";

import { toast } from "react-toastify";
import { getSol } from "./actions/get-sol";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LampContainer, LampDemo } from "@/components/ui/lamp";
import { motion } from "framer-motion";

import "react-toastify/dist/ReactToastify.css";
import GetSolCard from "@/components/get-sol-card";
import { DoubleArrowDownIcon } from "@radix-ui/react-icons";

export default function Home() {
    const [showSection, setShowSection] = useState(false);
    const [hitbottom, setHitbottom] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        setTimeout(() => {
            setShowSection(true);
        }, 2000);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - 100
            ) {
                setHitbottom(true);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="flex flex-col justify-center pb-10 bg-slate-950">
            <div className="h-screen relative w-screen">
                <LampContainer>
                    <motion.h1
                        initial={{ opacity: 0.5, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.3,
                            duration: 0.8,
                            ease: "easeInOut",
                        }}
                        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
                    >
                        Solana airdrop (devnet/testnet)
                    </motion.h1>
                </LampContainer>
                {!hitbottom && (
                    <p className="text-white absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 items-center">
                        Scroll down{" "}
                        <DoubleArrowDownIcon className="animate-bounce" />
                    </p>
                )}
            </div>
            <div className="h-screen relative w-screen flex items-center justify-center">
                <GetSolCard />
            </div>
            <span ref={ref} />
        </div>
    );
}
