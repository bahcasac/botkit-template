module.exports = function (controller) {

    controller.hears([/^color$/], 'direct_message,direct_mention', function (bot, message) {

        bot.startConversation(message, function (err, convo) {
            convo.say('Este é um exemplo do uso do BotKit usado para um chat.');

            convo.ask('Qual é a sua cor favorita?', function (response, convo) {
                convo.say("Que Legal, eu também gosto de'" + response.text);
                convo.next();
            });
        });

    });
};
