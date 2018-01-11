//
// Command: help
//
module.exports = function (controller) {

    controller.hears([/^help$/], 'direct_message,direct_mention', function (bot, message) {
        var text = "Aqui estão minhas habilidades:";
        text += "\n- " + bot.appendMention(message, "color") + ": pergunta por uma cor";
        text += "\n- " + bot.appendMention(message, "restricted") + ": deixa um usuário escolher uma cor dentro de um leque de opções";
        text += "\n- " + bot.appendMention(message, "storage") + ": armazena a cor preferida do usuário";
        text += "\n- " + bot.appendMention(message, "threads") + ": um grupo de threads";
        text += "\n- " + bot.appendMention(message, "variables") + ": relação das threads dos usuários";
        text += "\n\n eu também entendo:";
        text += "\n- " + bot.appendMention(message, "about") + ": sobre mim";
        text += "\n- " + bot.appendMention(message, "help") + ": lista de habilidades";
        text += "\n- " + bot.appendMention(message, "show [skill]") + ": mostra o código de uma habilidade específica";
        bot.reply(message, text);
    });
}
