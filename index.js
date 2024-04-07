import { makeWASocket, DisconnectReason, useMultiFileAuthState } from "@whiskeysockets/baileys";
import welcomeMessageUpsert from "./src/socks/bemvindo.js";

async function connectWA() {
	const { state, saveCreds } = await useMultiFileAuthState("auth_info_baileys")
	const sock = makeWASocket({
		printQRInTerminal: true,
		auth: state,
	});

	sock.ev.on("connection.update", async (update) => {
		const { connection, lastDisconnect, qr } = update || {};

		if (qr) {
			console.log(qr);
		}
		if (connection === 'close') {
			const shouldReconnect = lastDisconnect?.error?.output?.statusCode != DisconnectReason.loggedOut;

			if (shouldReconnect) {
				connectWA();
			}
		}
	});

	//ADD SOCKS HERE
	welcomeMessageUpsert(sock);

	sock.ev.on("creds.update", saveCreds);
}

connectWA();
