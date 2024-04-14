class Cursos {
    constructor() {
        // Defina as opções de cursos por área de atuação
        this.cursosPorArea = {
            Backend: [
                {
                    nome: "Programação do Zero [RockeatSeat]",
                    link: "https://www.rocketseat.com.br/discover?utm_source=google&utm_medium=cpc&utm_campaign=lead&utm_term=perpetuo&utm_content=publicofrio-lead-discover-texto-lead-kws-none-none-discover-aprendadozero-none-br-sitelink&utm_term=rocketseat&utm_campaign=PROGRAMAS-ALL-BRANDKWS-SEM&utm_source=adwords&utm_medium=cpc&hsa_acc=8545075154&hsa_cam=16048648686&hsa_grp=135825188594&hsa_ad=579096962131&hsa_src=g&hsa_tgt=kwd-679159515078&hsa_kw=rocketseat&hsa_mt=b&hsa_net=adwords&hsa_ver=3&gad_source=1&gclid=CjwKCAjw_e2wBhAEEiwAyFFFo_ShQuApIKIAXl2hqspst-NzqFEK3m9U3qlpm3NhGp7JIaJYkPCXJBoCVzwQAvD_BwE",
                },
                {
                    nome: "Linguagem de Programação Python - Básico [Fundação Bradesco]",
                    link: "https://www.ev.org.br/cursos/linguagem-de-programacao-python-basico",
                },
            ],
            Frontend: [
                {
                    nome: "Desenvolvendo Aplicações Mobile com Android Studio [Fundação Bradesco]",
                    link: "https://www.ev.org.br/cursos/desenvolvendo-aplicacoes-mobile-com-android-studio",
                },
                {
                    nome: "Programador Web em Tecnologias Front-end [IFMG]",
                    link: "https://mais.ifmg.edu.br/maisifmg/enrol/index.php?id=66",
                },
            ],
            Dados: [
                {
                    nome: "Introdução à Ciência de Dados [FGV]",
                    link: "https://educacao-executiva.fgv.br/cursos/online/curta-media-duracao-online/introducao-ciencia-de-dados",
                },
                {
                    nome: "Governança de Dados [EV.G]",
                    link: "https://www.escolavirtual.gov.br/curso/270",
                },
            ],
            Testes: [
                {
                    nome: "Operador e programador de sistemas automatizados: práticas iniciais com CLP [IFMG]",
                    link: "https://mais.ifmg.edu.br/maisifmg/enrol/index.php?id=107",
                },
            ]
        };
    }

    // Função para lidar com a escolha da área de atuação
    async handleAreaChoice(sock, remoteJid, area) {
        console.log(`Opção escolhida pelo usuário ${remoteJid}: ${userChoice}`)
        console.log(`Opção escolhida pelo usuário ${area}: ${userChoice}`)
        if (this.cursosPorArea[area]) {
            let mensagem = `Cursos disponíveis em ${area}:\n\n`;
            this.cursosPorArea[area].forEach(curso => {
                mensagem += `- ${curso.nome}: [Clique aqui](${curso.link})\n`;
            });
            await sock.sendMessage(remoteJid, {
                text: mensagem
            });
        } else {
            await sock.sendMessage(remoteJid, {
                text: "Área de atuação inválida. Por favor, escolha entre: Backend, Frontend, Dados ou Testes."
            });
        }
    }

    async askAreaChoice(sock, remoteJid) {
        await sock.sendMessage(remoteJid, {
            text: "🧩 Por favor, escolha uma área de atuação:\n\n" +
                  "Backend\n" +
                  "Frontend\n" +
                  "Dados\n" +
                  "Testes\n\n" +
                  "🥇 Responda com o nome correspondente"
        });
    }
}

export default Cursos;
