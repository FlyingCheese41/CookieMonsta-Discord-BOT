const Discord = require("discord.js");
const os = require("os");
const CustomFunctions = require("../../functions/funcs.js");
const CookieMonsta = require("../../CookieMonstaBOT.js");
const BotVersion = require("../../package.json");

const szBotVersionNow = BotVersion.version;

module.exports.run = (bot, message, args) =>
{
    const DiscordRichEmbed = new Discord.RichEmbed()
    .setAuthor("Cookie Monsta | BOT Stats", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL :  bot.user.avatarURL)
    .setColor("#c8ede6")
    .setThumbnail("https://i.imgur.com/Crt8oBJ.png")
    .addField(":bar_chart: Client Stats", "**" + bot.guilds.size + "** servers\n**" + bot.channels.size + "** channels\n**" + bot.users.size + "** users\n**" + CookieMonsta.iCommandNumber + "** commands", true)
    .addField(":chart_with_upwards_trend: Server Stats", "Running on: **" + os.platform() + "**\nArchitecture: **" + os.arch() + "**\nVs: **" + os.release() + "**\nRAM: **" + CustomFunctions.bytesToSize(process.memoryUsage().heapUsed) + "**/**" + CustomFunctions.bytesToSize(os.totalmem()) + "**", true)
    .addField(":chart: Various Stats", "Version: **v" + szBotVersionNow + "**\nCommands Used: **" + iCountCommandsUsed + "**\nNode.JS: **" + process.version + "**\nDiscord.JS: **" + Discord.version + "**", true)
    .setFooter("🖥️ CPU: " + os.cpus()[0].model.toString() + " • CORES: " + parseInt(os.cpus().length))

    message.channel.send({ embed: DiscordRichEmbed });
};

module.exports.help =
{
    name: "stats"
};