const CookieMonsta = require("../CookieMonstaBOT.js");
const ConsoleColors = require("colors");
const DatabaseImport = require("../database/database.js");
const SpamCmd = require("../events/message.js");

let AsciiArt = "\n\n\t\t\t\t\tStarting process:\n\n  #####                                   #     #                                   \n #     #  ####   ####  #    # # ######    ##   ##  ####  #    #  ####  #####   ##   \n #       #    # #    # #   #  # #         # # # # #    # ##   # #        #    #  #  \n #       #    # #    # ####   # #####     #  #  # #    # # #  #  ####    #   #    # \n #       #    # #    # #  #   # #         #     # #    # #  # #      #   #   ###### \n #     # #    # #    # #   #  # #         #     # #    # #   ## #    #   #   #    # \n  #####   ####   ####  #    # # ######    #     #  ####  #    #  ####    #   #    # \n                                                                                    \n\n\n";

global.bUserHasGift = {};
global.bAlreadyOpeningGift = {};

module.exports = async (bot) =>
{
    console.log(ConsoleColors.rainbow(AsciiArt));
    console.log(`\x1b[31m*\x1b[0m Cookie Monsta [BOT] has started, with \x1b[34m${bot.users.size}\x1b[0m users, in \x1b[32m${bot.channels.size}\x1b[0m channels of \x1b[35m${bot.guilds.size}\x1b[0m guilds.`);

    bot.user.setStatus("dnd");
    bot.user.setActivity("If you type !help for info.", { type: 'WATCHING' }).catch(() => {});

    iStatusUpdateInterval = setInterval (function ()
    {
        const ActivityUpdate =
        [
            ["If you type !help for info.", 'WATCHING'],
            ["On: (" + bot.guilds.size + ") servers.", 'WATCHING'],
            ["🍪 ME WANT COOKIES 🍪", 'PLAYING'],
            ["If you type !hello to say hi to me", 'LISTENING'],
            ["!help | 🍪  Munching cookies...", 'PLAYING'],
            ["I wonder where is Elmo", 'PLAYING'],
            ["Onion rings are just vegetable donuts.", 'WATCHING'],
            ["OMM NOM NOM NOM.", 'LISTENING'],
            ["Thinking about cookies... 🍪", 'WATCHING'],
            ["#CONTROLMESELF", 'PLAYING'],
            ["Soon new things will come to life.", 'LISTENING'],
            ["Early bird gets the worm. But cookie taste better than worm.", 'LISTENING'],
            ["Sometimes I think, what is friend? 🍪", 'PLAYING'],
            ["COOKIES? 👀", 'WATCHING'],
            ["Over (" + bot.users.size + ") users.", 'WATCHING'],
            ["(" + bot.users.size + ") user requests 👂", 'LISTENING'],
            ["Save the EARTH! It's the only planet with cookies! 🍪", 'PLAYING'],
            ["If you want to steal me cookies?! 🍪🍪🍪 👀", 'WATCHING'],
            ["(Ginger Pubes DUBSTEP) 🔊", 'LISTENING'],
            ["Some questionable command requests", 'WATCHING'],
            ["!sound list | 🔊", 'LISTENING'],
            ["#WITHMESELF", 'PLAYING']
        ];

        let StatusArray = ActivityUpdate[Math.floor(Math.random() * ActivityUpdate.length)];

        bot.user.setActivity(StatusArray[0], { type: StatusArray[1] }).catch(() => {});

    }, 1 * 60000);

    await DatabaseImport.CookieMonsta_InitialiseDatabase();

    // --| Assign to everyone gift to 0
    for(user of bot.users)
    {
        if(!user[1].bot)
        {
            bUserHasGift[user[1].id] = 0;
            bAlreadyOpeningGift[user[1].id] = false;
        }
    }
};