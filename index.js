const { DisconnectReason, useMultiFileAuthState } = require("@whiskeysockets/baileys");

const makeWASocket = require("@whiskeysockets/baileys").default;

async function connectWA() {
	const { state, saveCreds } = await useMultiFileAuthState("auth_info_baileys")
	const sock = makeWASocket({
		printQRInTerminal: true,
		auth: state,
	});

	sock.ev.on("connection.update", async (update) => {
		const { connection, lastDiconnect, qr } = update || {};

		if (qr) {
			console.log(qr);
		}
		if (connection === 'close') {
			const shouldReconnect = lastDiconnect?.error?.output?.statusCode != DisconnectReason.loggedOut;

			if (shouldReconnect) {
				connectWA();
			}
		}
	})

	//ADD SOCKS HERE

	sock.ev.on("creds.update", saveCreds);
}
connectWA();