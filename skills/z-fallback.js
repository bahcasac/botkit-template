//
// Fallback Command
//
module.exports = function (controller) {

    controller.hears([".*"], 'direct_message,direct_mention', function (bot, message) {
        var mardown = "Desculpe, eu não entendi.<br/>Try "
            + bot.appendMention(message, "help");
            
        bot.reply(message, mardown);
    });
}