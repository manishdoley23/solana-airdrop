"use server";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

export async function getSol(data: {
	solAddress: string;
	solAmount: number;
	solNetwork: string;
}) {
	try {
		const address = new PublicKey(data.solAddress);
		const connection = new Connection(data.solNetwork, "confirmed");
		const signature = await connection.requestAirdrop(
			address,
			data.solAmount * LAMPORTS_PER_SOL
		);
		const { blockhash, lastValidBlockHeight } =
			await connection.getLatestBlockhash();
		await connection.confirmTransaction({
			blockhash,
			lastValidBlockHeight,
			signature,
		});
		return {
			signature,
		};
	} catch (error) {
		throw Error("Airdrop failed.");
	}
}
