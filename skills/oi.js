module.exports = function (controller) {

    controller.hears([/^oi$/,/^ola$/,/^olá$/,/^hi$/,/^hello$/,/^Oi$/,/^ola$/], 'direct_message', function (bot, message) {

        bot.startConversation(message, function (err, convo) {
            convo.say("Olá, eu sou o Charles, um bot assistente criado para te ajudar a encontrar as pessoas de um espaço.");
            convo.next();
            
        });
    });
};
