"use client";

import { Link } from "@nextui-org/link";
import { Code } from "@nextui-org/code";
import { Snippet } from "@nextui-org/snippet";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function Home() {
	const [airDropAddress, setAirDropAddress] = useState("");
	const [solAmount, setSolAmount] = useState(0);
	const [solNetwork, setSolNetwork] = useState("");

	const getSolHandler = async () => {
		if (solNetwork === "" || solAmount === 0 || airDropAddress === "") {
			toast("Please fill all the fields");
			return;
		}

		const connection = new Connection(solNetwork, "confirmed");
		const address = new PublicKey(airDropAddress);
		const signature = await connection.requestAirdrop(
			address,
			solAmount * LAMPORTS_PER_SOL
		);
		const { blockhash, lastValidBlockHeight } =
			await connection.getLatestBlockhash();
		const res = await connection.confirmTransaction({
			blockhash,
			lastValidBlockHeight,
			signature,
		});
		console.log("res", res);
	};

	return (
		<section className="flex w-full justify-center items-center">
			<ToastContainer
				position="bottom-center"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
				transition={Bounce}
			/>
			<div className="flex flex-col">
				<Input
					key={"inside"}
					type="text"
					label="Enter solana account address"
					labelPlacement={"inside"}
					radius="sm"
					onChange={(e) => {
						setAirDropAddress(e.target.value);
					}}
				/>
				<div className="w-full flex gap-10 items-center mt-10">
					<Input
						key={"inside"}
						type="number"
						label="Airdrop amount"
						labelPlacement={"inside"}
						radius="sm"
						endContent={"SOL"}
						onChange={(e) => setSolAmount(parseInt(e.target.value))}
					/>

					<div className="flex flex-col justify-center gap-5">
						<Button
							onClick={() =>
								setSolNetwork("https://api.devnet.solana.com")
							}
							variant="bordered"
							radius="sm"
						>
							DEVNET
						</Button>
						<Button
							onClick={() =>
								setSolNetwork("https://api.testnet.solana.com")
							}
							variant="bordered"
							radius="sm"
						>
							TESTNET
						</Button>
					</div>
				</div>

				{solNetwork !== "" && (
					<p className="bg-green-800 px-3 py-1 text-white rounded-md mt-5">
						{solNetwork}
					</p>
				)}

				<Button onClick={getSolHandler} className="mt-5" radius="sm">
					GET SOL
				</Button>
			</div>
		</section>
	);
}
