"use client";

import { useState } from "react";

import { toast } from "react-toastify";
import { getSol } from "./actions/get-sol";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import "react-toastify/dist/ReactToastify.css";

export default function Home() {
    const [airDropAddress, setAirDropAddress] = useState("");
    const [solAmount, setSolAmount] = useState(0);
    const [solNetwork, setSolNetwork] = useState(
        "https://api.devnet.solana.com"
    );
    const [loading, setLoading] = useState(false);

    const getSolHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await getSol({
                solAddress: airDropAddress,
                solAmount,
                solNetwork,
            });
            toast("Airdrop successful: " + response?.signature);
        } catch (error) {
            toast(`${error}`);
        }
        setAirDropAddress("");
        setSolAmount(0);
        setSolNetwork("https://api.devnet.solana.com");
        setLoading(false);
    };

    return (
        <section className="flex flex-col w-full justify-center items-center">
            <h1 className="text-xl md:text-2xl text-center font-semibold">
                Solana airdrop (devnet/testnet)
            </h1>
            <form className="mt-10" onSubmit={getSolHandler}>
                <div className="flex flex-col">
                    <Input
                        type="text"
                        placeholder="Enter solana account address"
                        name="sol-address"
                        onChange={(e) => {
                            setAirDropAddress(e.target.value);
                        }}
                    />
                    <div className="w-full flex gap-10 items-center mt-10">
                        <Input
                            key={"inside"}
                            type="number"
                            placeholder="Airdrop amount"
                            onChange={(e) =>
                                setSolAmount(parseInt(e.target.value))
                            }
                        />

                        {/* <div className="flex flex-col justify-center gap-5"> */}
                        <select
                            className="px-2 py-1 rounded-md"
                            name="sol-network"
                            onChange={(e) => setSolNetwork(e.target.value)}
                        >
                            <option
                                className="px-2 py-1"
                                value={"https://api.devnet.solana.com"}
                            >
                                devnet
                            </option>
                            <option value={"https://api.testnet.solana.com"}>
                                testnet
                            </option>
                        </select>
                    </div>

                    <Button className="mt-5" type="submit">
                        {loading ? "Loading..." : "GET SOL"}
                    </Button>
                </div>
            </form>
        </section>
    );
}
