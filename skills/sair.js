module.exports = function (controller) {

    controller.hears([/^sair$/,/^cancelar$/], 'direct_message', function (bot, message) {

        bot.startConversation(message, function (err, convo) {
            convo.say("Cancelado!");
            convo.next();
            
        });
    });
};
