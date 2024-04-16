"use client";

import { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { getSol } from "./actions/get-sol";

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
		} catch {
			toast("Airdrop failed.");
		}
		setAirDropAddress("");
		setSolAmount(0);
		setSolNetwork("https://api.devnet.solana.com");
		setLoading(false);
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
			<form onSubmit={getSolHandler}>
				<div className="flex flex-col">
					<Input
						key={"inside"}
						type="text"
						label="Enter solana account address"
						labelPlacement={"inside"}
						radius="sm"
						name="sol-address"
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
							name="sol-amount"
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

					<Button className="mt-5" radius="sm" type="submit">
						{loading ? "Loading..." : "GET SOL"}
					</Button>
				</div>
			</form>
		</section>
	);
}
