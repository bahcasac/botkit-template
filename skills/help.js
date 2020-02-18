//
// Command: help
//
module.exports = function (controller) {

    controller.hears([/^ajuda/, "Ajuda"], 'direct_message', function (bot, message) {
        var text = "Aqui está o que eu sei fazer:";
        text += "\n- " + bot.appendMention(message, "procurar") + ": Procurar um espaço/sala que o bot participa";
        text += "\n- " + bot.appendMention(message, "pessoas") + ": Pesquisar as pessoas de um espaço/sala digitando o nome da sala";
        text += "\n- " + bot.appendMention(message, "ajuda") + ": Explica todas as minhas habilidades"
        bot.reply(message, text);
    });
}
