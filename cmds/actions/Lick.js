const Command = require('../BaseCmd')

const IOTools = require('../../util/IOTools')
const ioTools = new IOTools()

module.exports = class Lick extends Command {
  constructor (client) {
    super(client, {
      name: 'lick',
      group: 'actions',
      memberName: 'lick',
      guildOnly: true,
      throttling: { usages: 1, duration: 10 },
      description: 'Returns a random lick gif and includes the mentioned users username.',
      examples: ['+lick @Alcha#2625'],
      argsType: 'multiple'
    })
  }

  async run (msg, args) {
    if (msg.mentions.users.size > 0) {
      var content = `${this.getMentionedUsernames(msg)}, you've been licked by **${msg.author.username}**. :tongue:`
    }

    ioTools.getRandomImage('lick', args).then(image => {
      msg.channel.send(content, { files: [image] })
    }).catch(err => console.error(err))
  }
}
