module.exports = function (controller) {

    controller.hears([/^color$/], 'direct_message,direct_mention', function (bot, message) {

        bot.startConversation(message, function (err, convo) {
            convo.say('This is a BotKit conversation sample.');

            convo.ask('Qual é a sua cor favorita?', function (response, convo) {
                convo.say("Que Legal, eu também gosto '" + response.text);
                convo.next();
            });
        });

    });
};
