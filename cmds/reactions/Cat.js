const Command = require('../BaseCmd')

const ioTools = new (require('../../util/IOTools'))()

class Cat extends Command {
  constructor (client) {
    super(client, {
      name: 'cat',
      group: 'reactions',
      memberName: 'cat',
      throttling: { usages: 1, duration: 10 },
      description: 'Returns a random cat image or gif.',
      examples: ['+cat']
    })
  }

  async run (msg, args) {
    ioTools.getRandomImage('cats', args).then(image => {
      msg.channel.send('', { files: [image] })
    })
  }
}

module.exports = Cat
