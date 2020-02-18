// Author: Barbara Casac

const axios = require('axios')
const accesstoken = 'OTdmZTI3ZmItNTlkZS00MDUwLWI2YjYtMTM4NTllZjYzODBiZmM5NTE3M2YtZmQw_PF84_1eb65fdf-9643-417f-9974-ad72cae0e10f';
const url = 'https://api.ciscospark.com/v1/rooms';
var salaId = "";
var salas = [];
var flag = false;

module.exports = function (controller) {

    controller.hears([/^pessoa$/, /^pessoas$/], 'direct_message', function (bot, message) {

            bot.startConversation(message, function (err, convo) {
                    convo.say("Um momento...");
                    convo.next();
                    convo.say("");

                    axios.get(url, {
                        headers: {
                            Authorization: 'Bearer ' + accesstoken
                        }
                    }).then((response) => {
                            if (response.data.items[0]) {
                                tamanhoSala = response.data.items.length;

                                for (let i = 0; i < response.data.items.length; i++) {
                                    salas[i] = (response.data.items[i].title);

                                }
                                convo.next();
                                convo.ask("Digite o nome do espaço que deseja pegar a lista de nomes e e-mails:", function (response, convo) {
                                        convo.next();
                                        convo.say("Vou buscar por " + response.text + ".");
                                        convo.next();
                                        convo.say("");

                                        var resposta = response.text;                          
                                            if (salas.indexOf(resposta) === -1) flag = true;
                                            else flag = false;

                                    if (flag == true) {
                                        convo.next();
                                        convo.say("Desculpe, resposta inválida as sala que faço parte são: " + salas);
                                        convo.next();
                                    } else {
                                        axios.get(url, {
                                            headers: {
                                                Authorization: 'Bearer ' + accesstoken
                                            }
                                        }).then((response) => {
                                            if (response.data.items[0]) {

                                                for (let i = 0; i < response.data.items.length; i++) {

                                                    if (resposta == response.data.items[i].title) {

                                                        salaId = response.data.items[i].id;

                                                        axios.get("https://api.ciscospark.com/v1/memberships?roomId=" + salaId, {
                                                            headers: {
                                                                Authorization: 'Bearer ' + accesstoken
                                                            }
                                                        }).then((response) => {
                                                            for (let i = 0; i < response.data.items.length; i++) {

                                                                convo.next();
                                                                convo.say( response.data.items[i].personDisplayName + " " + response.data.items[i].personEmail);
                                                                convo.next();


                                                            }

                                                            convo.say("Pronto!");
                                                            convo.next();

                                                        }).catch((e) => {
                                                            console.log(e);
                                                        });
                                                    }
                                                }
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