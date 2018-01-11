//
// Stores a user choice in botkit 'users' storage, so that the value can be retreived later
//
module.exports = function (controller) {

    controller.hears([/^storage$/], 'direct_message,direct_mention', function (bot, message) {

        // Check if a User preference already exists
        var userId = message.raw_message.actorId;
        controller.storage.users.get(userId, function (err, data) {
            if (err) {
                bot.reply(message, 'não pude acessar o storage, err: ' + err.message, function (err, message) {
                    bot.reply(message, 'desculpe, eu não estou me sentindo bem \uF613! tente mais uma vez...');
                });
                return;
            }

            // User preference found
            if (data) {
                // Show user preference
                showUserPreference(controller, bot, message, userId, data.value);
                return;
            }

            // Ask for favorite color
            askForFavoriteColor(controller, bot, message, userId);
        });
    });
}

function showUserPreference(controller, bot, message, userId, color) {
    bot.startConversation(message, function (err, convo) {

        convo.sayFirst(`Oi, Eu conheço você <@personId:${userId}>!<br/> '${color}' is your favorite color.`);

        // Remove user preferences if supported
        if (!controller.storage.users.remove) {
            convo.say("_Para apagar suas preferências, reinicie o bot_");
            convo.next();
            return;
        }

        convo.ask("Posso apagar suas preferências (sim/não)", [
            {
                pattern: "^sim|si|ai|si|oui$",
                callback: function (response, convo) {

                    controller.storage.users.remove(userId, function (err) {
                        if (err) {
                            convo.say(message, 'desculpe, eu não acessei seu storage, err: ' + err.message);
                            convo.repeat();
                            return;
                        }

                        convo.say("Removida sua cor com sucesso!");
                        convo.next();
                    });

                },
            },
            {
                default: true,
                callback: function (response, convo) {
                    convo.say("Remova sua preferência de cor");
                    convo.next();
                }
            }
        ]);
    });
}

function askForFavoriteColor(controller, bot, message, userId) {
    bot.startConversation(message, function (err, convo) {

        convo.ask("Qual é a sua cor favorita?", [
            {
                pattern: "^blue|green|pink|red|yellow$",
                callback: function (response, convo) {

                    // Store color as user preference
                    var pickedColor = convo.extractResponse('answer');
                    var userPreference = { id: userId, value: pickedColor };
                    controller.storage.users.save(userPreference, function (err) {
                        if (err) {
                            convo.say(message, 'desculpe, não consegui acessar o storage, err: ' + err.message);
                            convo.next();
                            return;
                        }

                        convo.transitionTo("success", `_preferência armazenada_`);
                    });

                },
            },
            {
                default: true,
                callback: function (response, convo) {
                    convo.say("Desculpe, Eu não conheço esta cor. Tente outra...");
                    convo.repeat();
                    convo.next();
                }
            }
        ], { key: "answer" });

        // Success thread
        convo.addMessage(
            "Legal, Eu também gosto muito de '{{responses.answer}}'",
            "success");
    });
}
