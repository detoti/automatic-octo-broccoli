export default function mainMenuMessageUpsert(sock) {
	sock.ev.on("messages.upsert", async (messageInfoUpsert) => {
		const { messages } = messageInfoUpsert || {};
		if (messages && messages.length > 0) {
			for (const message of messages) {
				const { message: messageContent, key: { remoteJid } } = message || {};
				if (messageContent && messageContent.conversation === "!começar") {
					console.log("Menu-Principal");
					await sock.sendMessage(remoteJid, {
						text: "Esse é o Menu(WIP)"
					});
				}
			}
		}
	});
}
