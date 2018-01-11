//
// Displays the code of the specified skill
//
module.exports = function (controller) {

    controller.hears([/^show\s*(.*)$/, /^code\s*(.*)$/], 'direct_message,direct_mention', function (bot, message) {

        // Fetch value argument
        var skill = message.match[1];
        if (skill) {
            showSkill(skill, bot, message);
            return;
        }

        bot.startConversation(message, function (err, convo) {

            convo.ask(" Por favor, escolha uma habilidade entre 'color', 'restricted', 'show', 'storage', 'threads', 'variables', 'about', 'join', 'help'", [
                {
                    pattern: "^color|restricted|show|storage|threads|variables|about|join|help$",
                    callback: function (response, convo) {
                        // ends current conversation
                        convo.stop();

                        showSkill(response.text, bot, message);
                        return;
                    },
                },
                {
                    default: true,
                    callback: function (response, convo) {
                        convo.say("Desculpe, esta habilidade, não existe. Tente novamente...");
                        convo.repeat();
                        convo.next();
                    }
                }
            ]);
        });
    });
};

function showSkill(skill, bot, message) {
    // Append .js extension
    var skill_source = skill + ".js";

    // Read file contents
    var normalizedPath = require("path").join(__dirname, skill_source);
    require("fs").readFile(normalizedPath, 'utf8', function (err, data) {
        if (err) {
            bot.reply(message, "Não foi possível encontrar essa habilidade '" + skill + "'.  Tente novamente, uma outra habilidade");
            return;
        }

        // Post file contents back to Cisco Spark
        var code = "```javascript\n" + data + "\n```";
        bot.reply(message, code);
    });
}
