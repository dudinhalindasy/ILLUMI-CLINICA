document.addEventListener("DOMContentLoaded", function () {

    /* ===============================
       MENU
    =============================== */

    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const destino = document.querySelector(
                this.getAttribute("href")
            );

            if (destino) {

                event.preventDefault();

                destino.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });


    /* ===============================
       HORÁRIOS
       08:00 ATÉ 18:00
       DE 30 EM 30 MINUTOS
    =============================== */

    const campoHorario =
        document.querySelector("#horario");

    if (campoHorario) {

        campoHorario.innerHTML =
            '<option value="">Selecione o horário</option>';

        for (let hora = 8; hora <= 18; hora++) {

            for (let minutos = 0; minutos < 60; minutos += 30) {

                if (hora === 18 && minutos > 0) {
                    continue;
                }

                const horario =
                    String(hora).padStart(2, "0") +
                    ":" +
                    String(minutos).padStart(2, "0");

                const opcao =
                    document.createElement("option");

                opcao.value = horario;
                opcao.textContent = horario;

                campoHorario.appendChild(opcao);
            }
        }
    }


    /* ===============================
       IMPEDIR DATA PASSADA
    =============================== */

    const campoData =
        document.querySelector("#data");

    if (campoData) {

        const hoje = new Date();

        const ano = hoje.getFullYear();

        const mes =
            String(hoje.getMonth() + 1)
                .padStart(2, "0");

        const dia =
            String(hoje.getDate())
                .padStart(2, "0");

        campoData.min =
            `${ano}-${mes}-${dia}`;
    }


    /* ===============================
       BOTÕES AGENDAR
    =============================== */

    const botoesAgendar =
        document.querySelectorAll(".btn-agendar");

    botoesAgendar.forEach(function (botao) {

        botao.addEventListener("click", function () {

            const procedimento =
                this.dataset.procedimento;

            const select =
                document.querySelector("#procedimento");

            if (select) {
                select.value = procedimento;
            }

            const agendamento =
                document.querySelector("#agendamento");

            if (agendamento) {

                agendamento.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });


    /* ===============================
       MÁSCARA TELEFONE
    =============================== */

    const telefone =
        document.querySelector("#telefone");

    if (telefone) {

        telefone.addEventListener("input", function () {

            let valor =
                this.value.replace(/\D/g, "");

            valor =
                valor.substring(0, 11);

            if (valor.length <= 10) {

                valor = valor.replace(
                    /^(\d{2})(\d)/,
                    "($1) $2"
                );

                valor = valor.replace(
                    /(\d{4})(\d)/,
                    "$1-$2"
                );

            } else {

                valor = valor.replace(
                    /^(\d{2})(\d)/,
                    "($1) $2"
                );

                valor = valor.replace(
                    /(\d{5})(\d)/,
                    "$1-$2"
                );
            }

            this.value = valor;

        });
    }


    /* ===============================
       FORMULÁRIO
    =============================== */

    const formulario =
        document.querySelector("#formAgendamento");

    if (formulario) {

        formulario.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const nome =
                    document.querySelector("#nome")
                        .value.trim();

                const telefone =
                    document.querySelector("#telefone")
                        .value.trim();

                const procedimento =
                    document.querySelector("#procedimento")
                        .value;

                const data =
                    document.querySelector("#data")
                        .value;

                const horario =
                    document.querySelector("#horario")
                        .value;


                if (!nome) {
                    alert("Digite seu nome.");
                    return;
                }

                if (!telefone) {
                    alert("Digite seu telefone.");
                    return;
                }

                if (!procedimento) {
                    alert("Escolha um procedimento.");
                    return;
                }

                if (!data) {
                    alert("Escolha uma data.");
                    return;
                }

                if (!horario) {
                    alert("Escolha um horário.");
                    return;
                }


                const partes =
                    data.split("-");

                const dataFormatada =
                    `${partes[2]}/${partes[1]}/${partes[0]}`;


                const agendamento = {

                    nome: nome,

                    telefone: telefone,

                    procedimento: procedimento,

                    data: dataFormatada,

                    horario: horario

                };


                let agendamentos =
                    JSON.parse(
                        localStorage.getItem(
                            "agendamentosIllumi"
                        )
                    ) || [];


                agendamentos.push(agendamento);


                localStorage.setItem(
                    "agendamentosIllumi",
                    JSON.stringify(agendamentos)
                );


                alert(
                    "Agendamento realizado com sucesso!\n\n" +
                    "Nome: " + nome +
                    "\nProcedimento: " + procedimento +
                    "\nData: " + dataFormatada +
                    "\nHorário: " + horario +
                    "\n\nA Clínica Illumi agradece!"
                );


                formulario.reset();

            }
        );
    }


    /* ===============================
       PRODUTOS
    =============================== */

    const produtos = {

        protetorSolar: {

            titulo: "Protetor Solar",

            descricao:
                "Produto desenvolvido para ajudar a proteger a pele contra os efeitos da exposição solar.",

            beneficios:
                "Auxilia na proteção da pele, ajuda a prevenir danos causados pela radiação solar e complementa a rotina diária de cuidados.",

            uso:
                "Aplicar sobre a pele conforme as orientações do fabricante e reaplicar conforme a necessidade."
        },


        sabonete: {

            titulo: "Sabonete Facial",

            descricao:
                "Produto destinado à limpeza da pele do rosto, ajudando a remover impurezas e oleosidade.",

            beneficios:
                "Auxilia na higienização da pele e prepara o rosto para os demais produtos da rotina de skincare.",

            uso:
                "Aplicar no rosto úmido, massagear suavemente e enxaguar."
        },


        serum: {

            titulo: "Sérum Hialurônico",

            descricao:
                "Sérum voltado para hidratação e cuidado da pele.",

            beneficios:
                "Ajuda a manter a pele hidratada e proporciona uma aparência mais macia e viçosa.",

            uso:
                "Aplicar algumas gotas sobre a pele limpa e espalhar suavemente."
        },


        protetorLabial: {

            titulo: "Protetor Labial",

            descricao:
                "Produto para cuidados diários dos lábios.",

            beneficios:
                "Ajuda a manter os lábios hidratados e protegidos contra ressecamento.",

            uso:
                "Aplicar diretamente nos lábios sempre que necessário."
        },


        vitaminaD: {

            titulo: "Sérum Vitamina D",

            descricao:
                "Produto cosmético destinado ao cuidado e à rotina de skincare.",

            beneficios:
                "Pode complementar a rotina de cuidados, ajudando a manter a pele com aparência saudável.",

            uso:
                "Aplicar conforme as orientações presentes na embalagem do produto."
        },


        mascara: {

            titulo: "Máscara Facial",

            descricao:
                "Produto destinado a um momento de cuidado e tratamento cosmético da pele.",

            beneficios:
                "Pode auxiliar na hidratação e no cuidado da pele, dependendo da composição da máscara.",

            uso:
                "Aplicar sobre a pele limpa pelo tempo indicado pelo fabricante e remover conforme orientação."
        },


        necessaire: {

            titulo: "Necessaire Illumi",

            descricao:
                "Necessaire personalizada para organizar seus produtos de skincare e itens de cuidado pessoal.",

            beneficios:
                "Facilita a organização dos produtos e pode ser utilizada em viagens ou no dia a dia.",

            uso:
                "Utilizar para guardar e transportar produtos e acessórios de cuidados pessoais."
        }

    };


    const botoesProdutos =
        document.querySelectorAll(".btn-produto");

    const modal =
        document.querySelector("#modalProduto");

    const fecharModal =
        document.querySelector("#fecharModal");

    const modalTitulo =
        document.querySelector("#modalTitulo");

    const modalDescricao =
        document.querySelector("#modalDescricao");

    const modalBeneficios =
        document.querySelector("#modalBeneficios");

    const modalUso =
        document.querySelector("#modalUso");


    botoesProdutos.forEach(function (botao) {

        botao.addEventListener("click", function () {

            const produto =
                produtos[this.dataset.produto];

            if (!produto) {
                return;
            }

            modalTitulo.textContent =
                produto.titulo;

            modalDescricao.textContent =
                produto.descricao;

            modalBeneficios.textContent =
                produto.beneficios;

            modalUso.textContent =
                produto.uso;

            modal.classList.add("ativo");

            document.body.style.overflow = "hidden";
        });

    });


    /* FECHAR MODAL */

    if (fecharModal) {

        fecharModal.addEventListener(
            "click",
            fecharProduto
        );
    }


    if (modal) {

        modal.addEventListener(
            "click",
            function (event) {

                if (event.target === modal) {
                    fecharProduto();
                }

            }
        );
    }


    function fecharProduto() {

        modal.classList.remove("ativo");

        document.body.style.overflow = "";
    }


    /* ===============================
       COPIAR PIX
    =============================== */

    const copiarPix =
        document.querySelector("#copiarPix");

    const pixChave =
        document.querySelector("#pixChave");

    if (copiarPix && pixChave) {

        copiarPix.addEventListener(
            "click",
            function () {

                navigator.clipboard.writeText(
                    pixChave.textContent.trim()
                );

                alert(
                    "Chave Pix copiada!"
                );

            }
        );
    }


    /* ===============================
       ANO
    =============================== */

    const anoAtual =
        document.querySelector("#anoAtual");

    if (anoAtual) {

        anoAtual.textContent =
            new Date().getFullYear();
    }

});