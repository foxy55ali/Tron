"use strict"

const config = require('./config.json')
const roleNames = config.roleNames;
const moment = require('moment-timezone')
const whyCmds = [
    "y",
    "why",
    "y tho",
    "but y",
    "but why",
    "why tho",
    "y though",
    "why though",
    "but y though",
    "but why though"
]

// ============================================================================================== //
var exports = module.exports = {}

// ========================== Standard Embeds Function ========================================== //
exports.embeds = function (msg, args, title, desc, thumbn, bot) {
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

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}
// ========================== MessageIs Function ================================================ //
exports.messageIs = function (msg, str) {
    let input = ""

    if (msg.content != undefined) {
        input = msg.content.toUpperCase()
    } else {
        input = msg.toUpperCase()
    }

    if (input != null) {
        let comparison = str.toUpperCase()
        return input === comparison
    } else {
        return null
    }
}

exports.messageStartsWith = function (msg, str) {
    let input = ""

    if (msg.content != undefined) {
        input = msg.content.toUpperCase()
    } else {
        input = msg.toUpperCase()
    }
    let comparison = str.toUpperCase()
    return input.startsWith(comparison)
}

exports.allowedRole = function (comparison) {
    let allowed = false;
    roleNames.forEach(function (curr, index, arr) {
        if (curr != null && curr.toLowerCase() == comparison) {
            allowed = true;
        }
    })

    return allowed;
}

function getRoleId(msg, comparison) {
    let id = "";

    msg.guild.roles.forEach(function (curr, index, values) {
        if (curr.name.toLowerCase() == comparison) {
            id = curr.id;
        }
    })

    return id;
}

exports.removeAllRoles = function (userId, msg, bot) {
    for (var x = 0; x < roleNames.length; x++) {
        let roleId = getRoleId(msg, roleNames[x].toLowerCase());
        msg.guild.removeMemberRole(userId, roleId);
    }

    bot.createMessage(msg.channel.id, "You've been removed from all the roles available to you.");
    msg.delete();
}

exports.addAllRoles = function (userId, msg, bot) {
    for (var x = 0; x < roleNames.length; x++) {
        let roleId = getRoleId(msg, roleNames[x].toLowerCase());
        msg.guild.addMemberRole(userId, roleId);
    }

    bot.createMessage(msg.channel.id, "You've been added to all the roles available to you.");
    msg.delete();
}
exports.getRoleId = function (msg, comparison) {
    let id = "";

    msg.guild.roles.forEach(function (curr, index, values) {
        if (curr.name.toLowerCase() == comparison) {
            id = curr.id;
        }
    })

    return id;
}

exports.concatArgs = function (args) {
    let str = "";

    if (args.length > 1) {
        args.forEach(function (curr, index, arr) {
            if (str.length > 1) {
                str += " " + curr.toLowerCase();
            } else {
                str += curr.toLowerCase();
            }
        })
    } else {
        str = args[0].toLowerCase()
    }

    return str;
}

exports.memberIsMod = function (msg) {
    let roles = msg.channel.guild.members.get(msg.author.id).roles;
    let found = false;

    roles.forEach(function (curr, index, arr) {
        console.log('curr = ' + curr);
        if (curr == '254970225642962949') {
            found = true;
        } else if (curr == '254970606565588992') {
            found = true;
        }
    })

    return found;
}

// ========================== NotificationChannel Embeds Function =============================== //
exports.notificationEmbeds = function (channel, title, desc, thumbn, bot) {
    let rolrray = channel.guild.members.get(bot.user.id).roles.map(r => channel.guild.roles.get(r).position)
    let toprole = rolrray.indexOf(Math.max.apply(Math, rolrray))
    bot.createMessage(config.notificationChannel, {
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
            color: 16007990
        }
    })

    console.log('test')
    console.log(channel.guild.members.get(bot.user.id).roles.map(r => channel.guild.roles.get(r).color)[toprole])
}

exports.getFormattedTimestamp = function () {
    return moment().tz(config.defaultTimezone).format('HH:mm:ss MM/DD/YYYY')
}

exports.messageIsWhyCmd = function (msg) {
    let content = msg.content
    let found = false

    if (content.includes("?")) {
        content = content.substring(0, content.indexOf("?"))
    }

    whyCmds.forEach(function (cmd) {
        if (exports.messageIs(content, cmd)) {
            found = true
        }
    })

    return found
}

exports.pickKillImage = function () {
    let images = [
        "https://i.imgur.com/Db0ghmE.gif", "https://i.imgur.com/rBYOkZq.gif",
        "https://i.imgur.com/gMylE3v.gif", "https://i.imgur.com/NeD9pVR.gif"
    ];

    let random = getRandom(0, 4);

    return {
        url: images[random]
    }
};

exports.pickBiteImage = function () {
    let images = [
        "https://i.imgur.com/2t4yRJL.gif", "https://i.imgur.com/pCRB4bm.gif",
        "https://i.imgur.com/A1UWYE0.gif", "https://i.imgur.com/TmUUJzF.gif",
        "https://i.imgur.com/T88sRvd.gif", "https://i.imgur.com/GV4mBag.gif",
        "https://i.imgur.com/wpQmQag.gif", "https://i.imgur.com/Yr6uo41.gif",
        "https://i.imgur.com/66aDTjt.gif", "https://i.imgur.com/DtMIIRp.gif",
        "https://i.imgur.com/CJ1kNDg.gif"
    ];

    let random = getRandom(0, 11);

    return {
        url: images[random]
    }
};

exports.pickMikaImage = function () {
    let images = ["https://i.imgur.com/WtdWRrt.png"];

    let random = getRandom(0, images.length);

    return {
        url: images[random]
    }
}

exports.pickKickImage = function () {
    let images = [
        "https://i.imgur.com/B0EvFzc.gif", "https://i.imgur.com/5oZkxax.gif",
        "https://i.imgur.com/5oZkxax.gif", "https://i.imgur.com/5oZkxax.gif",
        "https://i.imgur.com/955TDwD.gif", "https://i.imgur.com/8X13K1z.gif",
        "https://i.imgur.com/lP0kfb7.gif", "https://i.imgur.com/4vcwdhp.gif"
    ];

    let random = getRandom(0, images.length);

    return {
        url: images[random]
    }
}

exports.pickRektImage = function () {
    let images = ["https://media.giphy.com/media/vSR0fhtT5A9by/giphy.gif"]

    let random = getRandom(0, images.length);

    return {
        url: images[random]
    }
}

exports.pickHugImage = function () {
    let images = [
        "http://i.imgur.com/Lz2E3KQ.gif", "http://i.imgur.com/EjZ3EZF.gif",
        "http://i.imgur.com/9JkgObE.gif", "http://i.imgur.com/znBb48H.gif",
        "http://i.imgur.com/1DrVOy9.gif", "http://i.imgur.com/WisHWD1.gif",
        "http://i.imgur.com/cJ2UgeJ.gif", "http://i.imgur.com/Uv61Pc1.gif",
        "http://i.imgur.com/MdqyZwH.gif", "http://i.imgur.com/Zg7JRkI.gif",
        "http://i.imgur.com/MdqyZwH.gif", "http://i.imgur.com/PeGeJHx.gif",
        "http://i.imgur.com/UZKKA1p.gif", "http://i.imgur.com/3P9iz7F.gif",
        "http://i.imgur.com/zn43njB.gif", "http://i.imgur.com/RcE4Q39.gif",
        "http://i.imgur.com/gU4GyQW.gif", "http://i.imgur.com/1eijPRd.gif",
        "http://i.imgur.com/1eijPRd.gif", "http://i.imgur.com/qe9rhLw.gif",
        "http://i.imgur.com/VJrLyEK.gif", "http://i.imgur.com/SFfDubn.gif",
        "http://i.imgur.com/bwap4d8.gif", "http://i.imgur.com/C9ta1Sa.gif",
        "http://i.imgur.com/uJFvpy8.gif", "http://i.imgur.com/LE9wpHg.gif",
        "http://i.imgur.com/HN7xy34.gif", "http://i.imgur.com/Wlzh53b.gif",
        "http://i.imgur.com/0tFzfoS.gif", "http://i.imgur.com/toGIV2F.gif",
        "http://i.imgur.com/Hc4a4qy.gif", "http://i.imgur.com/t7jkk6Z.gif",
        "http://i.imgur.com/NTomm7O.gif", "http://i.imgur.com/qIRjVY5.gif",
        "http://i.imgur.com/Y2kcaZT.gif", "http://i.imgur.com/m8Dogv7.gif",
        "http://i.imgur.com/GaLRCro.gif", "http://i.imgur.com/hjLZk23.gif",
        "http://i.imgur.com/b9eQ6ZN.gif", "http://i.imgur.com/F34uEVD.gif",
        "http://i.imgur.com/QEvMlAf.gif", "http://i.imgur.com/fkDph6U.gif",
        "http://i.imgur.com/LQj1kvn.gif", "http://i.imgur.com/tcjdQI8.gif",
        "http://i.imgur.com/EnmebIW.gif", "http://i.imgur.com/RaCDnpI.gif",
        "http://i.imgur.com/5OWXPFe.gif"
    ];

    let random = getRandom(0, images.length);

    return {
        url: images[random]
    }
}

exports.pickBlushImage = function () {
    let images = [
        'https://i.imgur.com/TeK0xVr.gif', 'https://i.imgur.com/O85hPMc.gif', 'https://i.imgur.com/bLMZFxX.gif',
        'https://i.imgur.com/Bi2NBuI.gif', 'https://i.imgur.com/ns6jCfe.gif', 'https://i.imgur.com/ryThkzW.gif',
        'https://i.imgur.com/oy4objp.gif', 'https://i.imgur.com/1qdEuZd.gif', 'https://i.imgur.com/YV0C1p7.gif',
        'https://i.imgur.com/PWcQafM.gif', 'https://i.imgur.com/Yf6bxXP.gif', 'https://i.imgur.com/govlkd2.gif',
        'https://i.imgur.com/Y3qEgA9.gif', 'https://i.imgur.com/wXA6eEC.gif', 'https://i.imgur.com/3LrpXdI.gif',
        'https://i.imgur.com/oBtfUgJ.gif', 'https://i.imgur.com/jejjR3r.gif', 'https://i.imgur.com/jMJEBmu.gif',
        'https://i.imgur.com/QyfxIPl.gif', 'https://i.imgur.com/0JR3i83.gif', 'https://i.imgur.com/auT3qyB.gif',
        'https://i.imgur.com/tNgjyaU.gif', 'https://i.imgur.com/hbrF22m.gif', 'https://i.imgur.com/MawaNKI.gif',
        'https://i.imgur.com/cpz1EJz.gif', 'https://i.imgur.com/httCGTV.gif', 'https://i.imgur.com/IDFinuB.gif',
        'https://i.imgur.com/Ip7vqHc.gif', 'https://i.imgur.com/Sd33j3T.gif', 'https://i.imgur.com/5uswmLW.gif',
        'https://i.imgur.com/XlKMOtG.gif', 'https://i.imgur.com/sd7GS3C.gif', 'https://i.imgur.com/0ENFxMs.gif',
        'https://i.imgur.com/LMM959w.gif', 'https://i.imgur.com/AYKjFJn.gif', 'https://i.imgur.com/9rIYmT1.gif',
        'https://i.imgur.com/CYQyDnP.gif', 'https://i.imgur.com/TDcflKr.gif', 'https://i.imgur.com/rAj1g3h.gif',
        'https://i.imgur.com/HUYn6IX.gif', 'https://i.imgur.com/XqQviel.gif', 'https://i.imgur.com/ob9W3gT.gif',
        'https://i.imgur.com/mlBpkZK.gif', 'https://i.imgur.com/jKluGnJ.gif', 'https://i.imgur.com/xQaAA6G.gif',
        'https://i.imgur.com/yZi3E90.gif', 'https://i.imgur.com/3DYcQfC.gif'
    ]

    let random = getRandom(0, images.length)
    return {
        url: images[random]
    }
}

// ========================== Puppet the Bot =================================================== //
const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.on('line', (input) => {
    let intake = input.split(' ')
    switch (intake[0]) {
        case 'morty':
            bot.createMessage(mortysRoomId, intake[1])
            break;
        case 'secret':
            bot.createMessage(secretStuffRoomId, intake[1])
            break;
    }
})
