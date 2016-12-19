"use strict"

// ============================================================================================== //
var exports = module.exports = {}

// ========================== Standard Embeds Function ========================================== //
exports.embeds = function(msg, args, title, desc, thumbn) {
    let rolrray = msg.channel.guild.members.get(bot.user.id).roles.map(r => msg.channel.guild.roles.get(r).position)
    let toprole = rolrray.indexOf(Math.max.apply(Math, rolrray))
    bot.createMessage(msg.channel.id, {
        content: ' ',
        embed: {
            title: title,
            description: desc,
            thumbnail: {
                url: thumbn
            },
            author: {
                name: msg.author.username,
                url: msg.author.avatarURL,
                icon_url: msg.author.avatarURL
            },
            color: msg.channel.guild.members.get(bot.user.id).roles.map(r => msg.channel.guild.roles.get(r).color)[toprole]
        }
    })
}

// ========================== MessageIs Function ================================================ //
exports.messageIs = function(msg, str) {
    let input = msg.content.toUpperCase()
    let comparison = str.toUpperCase()
    return input === comparison
}

// ========================== NotificationChannel Embeds Function =============================== //
exports.notificationEmbeds = function(channel, title, desc, thumbn) {
    let rolrray = channel.guild.members.get(bot.user.id).roles.map(r => channel.guild.roles.get(r).position)
    let toprole = rolrray.indexOf(Math.max.apply(Math, rolrray))
    bot.createMessage(channel.id, {
        content: ' ',
        embed: {
            title: title,
            description: desc,
            thumbnail: {
                url: thumbn
            },
            author: {
                name: bot.username,
                url: bot.avatarURL,
                icon_url: bot.avatarURL
            },
            color: channel.guild.members.get(bot.user.id).roles.map(r => channel.guild.roles.get(r).color)[toprole]
        }
    })
}

// ========================== Puppet the Bot =================================================== //
// const readline = require('readline')
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// })
//
// rl.on('line', (input) => {
//     let intake = input.split(' ')
//     switch (intake[0]) {
//         case 'morty':
//             bot.createMessage(mortysRoomId, intake[1])
//             break;
//         case 'secret':
//             bot.createMessage(secretStuffRoomId, intake[1])
//             break;
//     }
// })
