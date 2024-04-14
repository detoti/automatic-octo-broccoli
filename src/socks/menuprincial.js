import Cursos from "./Cursos.js";

export default function mainMenuMessageUpsert(sock) {
    sock.ev.on("messages.upsert", async (messageInfoUpsert) => {
        const { messages } = messageInfoUpsert || {};
        if (messages && messages.length > 0) {
            for (const message of messages) {
                const { message: messageContent, key: { remoteJid } } = message || {};
                if (messageContent && messageContent.conversation === "!começar") {
                    console.log("Menu-Principal");
                    await sock.sendMessage(remoteJid, {
                        text: "Menu Principal:\n\n" +
                              "1. Cursos\n" +
                              "2. Bootcamps\n" +
                              "3. Programas de mentorias\n" +
                              "4. Hackathons\n" +
                              "5. Vagas de emprego\n\n" +
                              "Por favor, escolha uma opção respondendo com o número correspondente."
                    });

                    // Define o estado do usuário para "esperandoEscolha" para acompanhar a resposta do usuário
                    userStates[remoteJid] = "esperandoEscolha";
                }

                // Verifica se o bot está esperando uma escolha do usuário
                if (userStates[remoteJid] === "esperandoEscolha" && messageContent && messageContent.conversation) {
                    const userChoice = messageContent.conversation.trim();
                    if (userChoice === "1") {
						const cursos = new Cursos(); // Crie uma instância da classe Cursos
                        await cursos.askAreaChoice(sock, remoteJid); // Pergunta ao usuário sobre a área de atuação
                        userStates[remoteJid] = "escolhendoArea"; 
                        await sock.sendMessage(remoteJid, {
                            text: "Você escolheu 'Cursos'. Vamos te enviar informações sobre os cursos disponíveis."
                        });
                    } else if (userChoice === "2") {
                        await sock.sendMessage(remoteJid, {
                            text: "Você escolheu 'Bootcamps'. Vamos te enviar informações sobre os bootcamps disponíveis."
                        });
                    } else if (userChoice === "3") {
                        await sock.sendMessage(remoteJid, {
                            text: "Você escolheu 'Programas de mentorias'. Vamos te enviar informações sobre os programas de mentorias disponíveis."
                        });
                    } else if (userChoice === "4") {
                        await sock.sendMessage(remoteJid, {
                            text: "Você escolheu 'Hackathons'. Vamos te enviar informações sobre os hackathons disponíveis."
                        });
                    } else if (userChoice === "5") {
                        await sock.sendMessage(remoteJid, {
                            text: "Você escolheu 'Vagas de emprego'. Vamos te enviar informações sobre as vagas disponíveis."
                        });
                    } else {
                        await sock.sendMessage(remoteJid, {
                            text: "Opção inválida. Por favor, escolha uma opção respondendo com o número correspondente (1-5)."
                        });
                    }

                    // Redefine o estado do usuário após lidar com a escolha
                    delete userStates[remoteJid];
                }
            }
        }
    });
}
