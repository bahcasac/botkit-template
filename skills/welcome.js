//
// Welcome message 
// sent as the bot is added to a Cisco Spark space
//
module.exports = function (controller) {

    controller.on('bot_space_join', function (bot, event) {

        var welcome = `Oi <@personId:${event.actorId}>, estou feliz em conhecer você!`;

        if (this.identity) {
            welcome += `<br/>Eu sou o **${this.identity.displayName}** bot`;
        }

        bot.say ({
            text: welcome,
            channel: event.channel
        }, function (err, rawMessage) {
            if (err) {
                console.log("Erro ao dar a mensagem de boas vindas, err: " + err.message)
                return;
            }

            var help = "Digite `help` para aprender sobre minhas habilidades.";

            if (rawMessage.roomType == "group") {
                help = "Percebi que estou em um 'Group' Space. Vou responder se apenas for mencionado.<br/>";
                help += "Para aprender sobre minhas habilidades, digite " + bot.appendMention(rawMessage, "help");
            }

            bot.say({
                text: `_${help}_`,
                channel: rawMessage.roomId
            }, function (err, messageAck) {
                if (err) {
                    console.log("Erro ao postar mensagem help, err: " + err.message)
                    return;
                }
            });
        });
    });
}
