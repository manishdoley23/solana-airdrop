import { getSol } from "@/app/actions/get-sol";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { toast } from "react-toastify";

const GetSolCard = () => {
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
        <section className="flex flex-col w-full justify-center items-center text-white">
            <h1 className="text-xl md:text-2xl text-center font-semibold"></h1>
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

                        <select
                            className="px-2 py-1 rounded-md bg-slate-950"
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
};

export default GetSolCard;
