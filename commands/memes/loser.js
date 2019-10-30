const Discord = require("discord.js");
const Jimp = require("jimp");

module.exports.run = async (bot, message, args) =>
{
    let GuildMember = message.mentions.members.first();

    if(!GuildMember)
    {
        return await message.reply(" :no_entry: not happening! Please mention a valid member of this server! :boy:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));;
    }

    message.channel.startTyping();

    let MemberAvatar = (GuildMember.user.avatarURL === null) ? GuildMember.user.defaultAvatarURL : GuildMember.user.avatarURL;

    let i1 = await Jimp.read(MemberAvatar);
    let i2 = await Jimp.read("./BOTImages/Loser/loser.png");

    await Promise.all([i1, i2]).then(async images =>
    {
        await images[0].resize(90, 90).rotate(16).quality(100);
        await images[1].composite(images[0], 586, 532).quality(100).getBuffer(Jimp.MIME_PNG, async (err, buffer) =>
        {
            if(err)
            {
                return console.log("\x1b[31m*\x1b[0m Whoops! There is your error: \x1b[31m" + err + "\x1b[0m");
            }

            await message.channel.send(new Discord.Attachment(buffer, "loser.png")).then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
        });
    });

}

module.exports.help =
{
    name: "loser"
};