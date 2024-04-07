export default function welcomeMessageUpsert(sock) {
	sock.ev.on("messages.upsert", async (messageInfoUpsert) => {
		const { messages } = messageInfoUpsert || {};
		if (messages && messages.length > 0) {
			for (const message of messages) {
				const { message: messageContent, key: { remoteJid } } = message || {}; // Obtém remoteJid do remetente
				if (messageContent && messageContent.conversation === "!pime") {
					console.log("Bem-Vindo");
					await sock.sendMessage(remoteJid, {
						text: "🎓🖥️ Bem vind@!\n\nVocê está buscando aprender programação de forma gratuita?\n\nTemos ótimas novidades para vocês! Estão disponíveis diversos cursos gratuitos para quem quer se aventurar no mundo da programação.\n\n🌟 Envie *_!cursos_* para receber nossa lista com os melhores cursos gratúitos!"
					});
				}
			}
		}
	});
}
