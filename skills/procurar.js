const axios = require('axios')
const accesstoken = 'OTdmZTI3ZmItNTlkZS00MDUwLWI2YjYtMTM4NTllZjYzODBiZmM5NTE3M2YtZmQw_PF84_1eb65fdf-9643-417f-9974-ad72cae0e10f';
const url = 'https://api.ciscospark.com/v1/rooms';
let salas = [];

module.exports = function (controller) {

    controller.hears([/^procurar$/, /^pesquisar$/], 'direct_message,direct_mention', function (bot, message) {

        bot.startConversation(message, function (err, convo) {
            convo.say("Um momento vou buscar as salas que faço parte.");
            convo.next();
            convo.say("");
            //response.text = response.text.replace(" ", "%20");
            axios.get(url, {
                headers: {
                    Authorization: 'Bearer ' + accesstoken
                }
            }).then((response) => {
                if (response.data.items[0]) {

                    for (let i = 0; i < response.data.items.length; i++) {
                        salas = response.data.items[i];
                        convo.say((i + 1) + ": " + salas.title);
                        convo.next();
                        var tamanhoSala = response.data.items.length;

                    }
                    convo.next();
                    convo.ask("Digite o número do espaço que deseja pegar a lista de nomes e e-mails:", function (response, convo) {
                        convo.next();
                        convo.say("Vou buscar pelo número " + response.text + ".");
                        convo.next();
                        convo.say("");

                        var resposta = response.text;
                        if (resposta > tamanhoSala) {
                            convo.say("Desculpe, resposta inválida O número total de salas que tenho é " + tamanhoSala);
                            convo.next();


                        } else {
                            axios.get(url, {
                                headers: {
                                    Authorization: 'Bearer ' + accesstoken
                                }
                            }).then((response) => {
                                if (response.data.items[0]) {
                                    var sala = response.data.items[resposta - 1].title;
                                    var salaId = response.data.items[resposta - 1].id;

                                    axios.get("https://api.ciscospark.com/v1/memberships?roomId=" + salaId, {
                                        headers: {
                                            Authorization: 'Bearer ' + accesstoken
                                        }
                                    }).then((response) => {
                                        convo.next();
                                        convo.say("Buscando a sala: " + sala);
                                        convo.next();
                                        for (let i = 0; i < response.data.items.length; i++) {
                                            convo.next();
                                            convo.say(response.data.items[i].personDisplayName + " " + response.data.items[i].personEmail);
                                            convo.next();

                                        }

                                        convo.say("Finalizado!");

                                    }).catch((e) => {
                                        console.log(e);
                                    });

                                }

                            }).catch((e) => {
                                console.log(e);
                            });
                        }
                    })
                } else {
                    convo.say("Não foi possível realizar a busca, por favor, tente mais tarde.");
                }
            }).catch((e) => {
                console.log(e);
            });
        });
    });


};