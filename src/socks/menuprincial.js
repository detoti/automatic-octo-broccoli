import Cursos from "./Cursos.js";

// Definir userStates como um objeto global para rastrear o estado de cada usuário
let userStates = {};

export default function mainMenuMessageUpsert(sock) {
    sock.ev.on("messages.upsert", async (messageInfoUpsert) => {
        const { messages } = messageInfoUpsert || {};
        if (messages && messages.length > 0) {
            for (const message of messages) {
                const { message: messageContent, key: { remoteJid } } = message || {};

                // Verifica se a mensagem é "!começar"
                if (messageContent && messageContent.conversation === "!começar") {
                    console.log("Menu Principal");
                    await sock.sendMessage(remoteJid, {
                        text: "Menu Principal:\n\n" +
                              "1. Cursos\n" +
                              "2. Bootcamps\n" +
                              "3. Programas de mentorias\n" +
                              "4. Hackathons\n" +
                              "5. Vagas de emprego\n\n" +
                              "Por favor, escolha uma opção respondendo com o número correspondente."
                    });

                    userStates[remoteJid] = "esperandoEscolha";
                }

                // Verifica se o bot está esperando uma escolha do usuário
                if (userStates[remoteJid] === "esperandoEscolha" && messageContent && messageContent.conversation) {
                    const userChoice = messageContent.conversation.trim();
                    console.log(`Opção escolhida pelo usuário ${remoteJid}: ${userChoice}`);

                    if (userChoice === "1") {
                        const cursos = new Cursos(); 
                        await cursos.askAreaChoice(sock, remoteJid); 
                        userStates[remoteJid] = "escolhendoArea"; 
                    } else if (userChoice === "2") {
                        await sock.sendMessage(remoteJid, {
                            text: "Você escolheu 'Bootcamps'. Vamos te enviar informações sobre os bootcamps disponíveis em breve."
                        });
                        delete userStates[remoteJid]; 
                    } else if (userChoice === "3") {
                        await sock.sendMessage(remoteJid, {
                            text: "Você escolheu 'Programas de mentorias'. Vamos te enviar informações sobre os programas de mentorias disponíveis em breve."
                        });
                        delete userStates[remoteJid]; 
                    } else if (userChoice === "4") {
                        await sock.sendMessage(remoteJid, {
                            text: "Você escolheu 'Hackathons'. Vamos te enviar informações sobre os hackathons disponíveis em breve."
                        });
                        delete userStates[remoteJid]; 
                    } else if (userChoice === "5") {
                        await sock.sendMessage(remoteJid, {
                            text: "Você escolheu 'Vagas de emprego'. Vamos te enviar informações sobre as vagas disponíveis em breve."
                        });
                        delete userStates[remoteJid];
                    } else {
                        await sock.sendMessage(remoteJid, {
                            text: "Opção inválida. Por favor, escolha uma opção respondendo com o número correspondente (1-5)."
                        });
                    }

                    // Verifica se o usuário escolheu uma área de atuação
                    if (userStates[remoteJid] === "escolhendoArea" && messageContent && messageContent.conversation) {
                        const areaChoice = messageContent.conversation.trim().toLowerCase();
                        if (["backend", "frontend", "dados", "testes"].includes(areaChoice)) {
                            const cursos = new Cursos(); 
                            await cursos.handleAreaChoice(sock, remoteJid, areaChoice);
                            delete userStates[remoteJid]; 
                        } else {
                            await sock.sendMessage(remoteJid, {
                                text: "Área de atuação inválida. Por favor, escolha entre: backend, frontend, dados ou testes."
                            });
                        }
                    }
                }
            }
        }
    });
}