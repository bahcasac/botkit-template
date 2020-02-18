//
// Fallback Command
//
module.exports = function (controller) {

    controller.hears([".*"], 'direct_message,direct_mention', function (bot, message) {
        var mardown = "Desculpa, não entendi.<br/>Tente "
            + bot.appendMention(message, "ajuda");
            
        bot.reply(message, mardown);
    });
}