const Discord = require("discord.js");
const gm = require("gm").subClass({ imageMagick: true });
const Jimp = require("jimp");
const DefChannel = require("../functions/defaultchannel.js");
const CustomFunctions = require("../functions/funcs.js");

// --| Image path | Font color
const szRandomHalloweenBanners =
[
    ["/BOTImages/Banner/halloween_01.png", "#ffffff"], ["/BOTImages/Banner/halloween_02.png", "#ff580a"],
    ["/BOTImages/Banner/halloween_03.png", "#ffffff"], ["/BOTImages/Banner/halloween_04.png", "#ff580a"],
    ["/BOTImages/Banner/halloween_05.png", "#ffffff"], ["/BOTImages/Banner/halloween_06.png", "#ff580a"],
    ["/BOTImages/Banner/halloween_07.png", "#ffffff"]
];

// --| Image path | Font color
const szRandomChristmasBanners =
[
    ["/BOTImages/Banner/christmas_01.png", "#3232FF"], ["/BOTImages/Banner/christmas_02.png", "#ffffff"],
    ["/BOTImages/Banner/christmas_03.png", "#ffffff"], ["/BOTImages/Banner/christmas_04.png", "#ffffff"],
    ["/BOTImages/Banner/christmas_05.png", "#82d1dd"], ["/BOTImages/Banner/christmas_06.png", "#ffffff"],
    ["/BOTImages/Banner/christmas_07.png", "#ff1a35"], ["/BOTImages/Banner/christmas_08.png", "#ffffff"],
    ["/BOTImages/Banner/christmas_09.png", "#ffffff"], ["/BOTImages/Banner/christmas_10.png", "#ffffff"]
];

// --| Image path | Font color
const szRandomGreetBanners =
[
    ["/BOTImages/Banner/01.png", "#ffffff"], ["/BOTImages/Banner/02.png", "#ffa500"],
    ["/BOTImages/Banner/03.png", "#000000"], ["/BOTImages/Banner/04.png", "#244c96"],
    ["/BOTImages/Banner/05.png", "#ffffff"], ["/BOTImages/Banner/06.png", "#1c1c39"],
    ["/BOTImages/Banner/07.png", "#ffffff"], ["/BOTImages/Banner/08.png", "#ffffff"],
    ["/BOTImages/Banner/09.png", "#ffffff"], ["/BOTImages/Banner/10.png", "#ff0000"]
];

module.exports = async (bot, member, guild) =>
{
    if(member)
    {
        let GetUserAvatar = (member.user.avatarURL === null) ? member.user.defaultAvatarURL : member.user.avatarURL;
        let GetUserName = member.user.username.replace(/'/g, "`").trim();

        let szRandomBanner = "";
        let szRandomBannerFont = "";
        let iRandomIndex = [];

        if(CustomFunctions.CheckHalloween())
        {
            iRandomIndex[0] = Math.floor(Math.random() * szRandomHalloweenBanners.length);

            szRandomBanner = szRandomHalloweenBanners[iRandomIndex[0]][0];
            szRandomBannerFont = szRandomHalloweenBanners[iRandomIndex[0]][1];
        }

        else if(CustomFunctions.CheckChristmas())
        {
            iRandomIndex[1] = Math.floor(Math.random() * szRandomChristmasBanners.length);

            szRandomBanner = szRandomChristmasBanners[iRandomIndex[1]][0];
            szRandomBannerFont = szRandomChristmasBanners[iRandomIndex[1]][1];
        }

        else
        {
            iRandomIndex[2] = Math.floor(Math.random() * szRandomGreetBanners.length);

            szRandomBanner = szRandomGreetBanners[iRandomIndex[2]][0];
            szRandomBannerFont = szRandomGreetBanners[iRandomIndex[2]][1];
        }

        await Jimp.read(__basedir + szRandomBanner).then(async (image) =>
        {
            await Jimp.read(GetUserAvatar).then(async (image2) =>
            {
                await image2.resize(184, Jimp.AUTO);
                await image.composite(image2, 59, 59).getBuffer(Jimp.MIME_PNG, async (err, buffer) =>
                {
                    if(err)
                    {
                        return console.log("\x1b[31m*\x1b[0m Whoops! There is your error: \x1b[31m" + err + "\x1b[0m");
                    }

                    await gm(buffer)
                    .font("./BOTFonts/Agency-FB.ttf", (GetUserName.length >= 32) ? 28 : 40 )
                    .fill(szRandomBannerFont)
                    .draw(["text 264, 130 '" + member.user.tag + "'"])
                    .font("./BOTFonts/Agency-FB.ttf", 42)
                    .fill(szRandomBannerFont)
                    .draw(["text 264, 220 'Member: #"  + member.guild.memberCount + "'"])
                    .toBuffer("banner.png", async function (err, buffer2)
                    {
                        if(err)
                        {
                            return console.log("\x1b[31m*\x1b[0m Whoops! There is your error: \x1b[31m" + err + "\x1b[0m");
                        }

                        let channel = DefChannel.getDefaultChannel(member.guild);

                        if(channel && channel.permissionsFor(member.guild.me).has('SEND_MESSAGES'))
                        {
                            await channel.send(new Discord.Attachment(buffer2, "welcome.png"));
                        }
                    });
                });
            });
        });
    }
};