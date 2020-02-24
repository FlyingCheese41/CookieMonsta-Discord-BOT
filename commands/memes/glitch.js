const Discord = require("discord.js");
const BotConfig = require("../../config/botconfig.json");
const ameClient = require("amethyste-api");

const ameApi = new ameClient(BotConfig.AmeAPI_Token.trim());

module.exports.run = async (bot, message, args) =>
{
    const GuildMember = message.mentions.members.first();

    if(!GuildMember)
    {
        return await message.reply(" :no_entry: not happening! Please mention a valid member of this server! :facepalm:  :no_entry:");
    }

    await message.channel.startTyping();

    const GetUserAvatar = (GuildMember.user.avatarURL === null) ? GuildMember.user.defaultAvatarURL : GuildMember.user.avatarURL;

    await ameApi.generate("glitch", { url: GetUserAvatar }).then(async (szImageBuffer) =>
    {
        await message.channel.send(new Discord.Attachment(szImageBuffer, "h04x3d.png")).then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "glitch"
};