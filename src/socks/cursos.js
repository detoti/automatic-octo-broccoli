class Cursos {
    constructor() {
        // Defina as opções de cursos por área de atuação
        this.cursosPorArea = {
            backend: [
                {
                    nome: "Programação do Zero [RockeatSeat]",
                    link: "https://www.rocketseat.com.br/discover?utm_source=google&utm_medium=cpc&utm_campaign=lead&utm_term=perpetuo&utm_content=publicofrio-lead-discover-texto-lead-kws-none-none-discover-aprendadozero-none-br-sitelink&utm_term=rocketseat&utm_campaign=PROGRAMAS-ALL-BRANDKWS-SEM&utm_source=adwords&utm_medium=cpc&hsa_acc=8545075154&hsa_cam=16048648686&hsa_grp=135825188594&hsa_ad=579096962131&hsa_src=g&hsa_tgt=kwd-679159515078&hsa_kw=rocketseat&hsa_mt=b&hsa_net=adwords&hsa_ver=3&gad_source=1&gclid=CjwKCAjw_e2wBhAEEiwAyFFFo_ShQuApIKIAXl2hqspst-NzqFEK3m9U3qlpm3NhGp7JIaJYkPCXJBoCVzwQAvD_BwE",
                },
                {
                    nome: "Linguagem de Programação Python - Básico [Fundação Bradesco]",
                    link: "https://www.ev.org.br/cursos/linguagem-de-programacao-python-basico",
                },
            ],
            frontend: [
                {
                    nome: "Desenvolvendo Aplicações Mobile com Android Studio [Fundação Bradesco]",
                    link: "https://www.ev.org.br/cursos/desenvolvendo-aplicacoes-mobile-com-android-studio",
                },
                {
                    nome: "Programador Web em Tecnologias Front-end [IFMG]",
                    link: "https://mais.ifmg.edu.br/maisifmg/enrol/index.php?id=66",
                },
            ],
            dados: [
                {
                    nome: "Introdução à Ciência de Dados [FGV]",
                    link: "https://educacao-executiva.fgv.br/cursos/online/curta-media-duracao-online/introducao-ciencia-de-dados",
                },
                {
                    nome: "Governança de Dados [EV.G]",
                    link: "https://www.escolavirtual.gov.br/curso/270",
                },
            ],
            testes: [
                {
                    nome: "Operador e programador de sistemas automatizados: práticas iniciais com CLP [IFMG]",
                    link: "https://mais.ifmg.edu.br/maisifmg/enrol/index.php?id=107",
                },
            ]
        };
    }

    // Função para lidar com a escolha da área de atuação
    async handleAreaChoice(sock, remoteJid, area) {
        // Verifica se a área escolhida é válida
        if (this.cursosPorArea[area]) {
            // Monta a mensagem com a lista de cursos disponíveis na área escolhida
            let mensagem = `Cursos disponíveis em ${area}:\n\n`;
            this.cursosPorArea[area].forEach(curso => {
                mensagem += `- ${curso.nome}: [Clique aqui](${curso.link})\n`;
            });

            // Envia a mensagem para o usuário com a lista de cursos disponíveis
            await sock.sendMessage(remoteJid, {
                text: mensagem
            });
        } else {
            await sock.sendMessage(remoteJid, {
                text: "Área de atuação inválida. Por favor, escolha entre: backend, frontend, dados ou testes."
            });
        }
    }

    // Função para iniciar a interação com o usuário sobre a escolha da área de atuação
    async askAreaChoice(sock, remoteJid) {
        await sock.sendMessage(remoteJid, {
            text: "Por favor, escolha uma área de atuação:\n\n" +
                  "1. Backend\n" +
                  "2. Frontend\n" +
                  "3. Dados\n" +
                  "4. Testes\n\n" +
                  "Responda com o número correspondente (1-4)."
        });
    }
}

export default Cursos;
