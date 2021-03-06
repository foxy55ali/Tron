const { Client, MessageEmbed } = require('discord.js')  // Used for JSDoc/intellisense purposes

const config = require('./config.json')
const moment = require('moment-timezone')
const GphApiClient = require('giphy-js-sdk-core')
const giphy = GphApiClient(config.giphyKey)
const Chance = require('chance')
const chance = new Chance()
const UTC = 'UTC'

const colors = require('./colors')

const DEFAULT_DATE_FORMAT = 'MM.DD.Y @ HH:mm:ss'
const PRETTY_DATE_FORMAT = 'MM/DD/Y HH:mm:ss'

module.exports = class Tools {
  formatTime (format) {
    return moment.tz(config.defaultTimezone).format(format)
  }

  formatUnixInput (input) {
    return moment(input).tz(UTC).format(PRETTY_DATE_FORMAT)
  }

  formatUTCTime (format) {
    return moment.tz(UTC).format(format)
  }

  pickImage (images) {
    let random = this.getRandom(0, images.length)
    if (images[random] === undefined) return this.pickImage(images)
  }

  async queryGiphy (query, username, avatarUrl) {
    try {
      var results = await giphy.search('gifs', {'q': query})
      var random = this.getRandom(0, results.data.length)
      if (results.data[random] === undefined) return Promise.resolve(null)
      else var embedUrl = results.data[random].images.original.gif_url

      return Promise.resolve(new MessageEmbed()
        .setAuthor(username, avatarUrl, 'http://tronbot.info')
        .setColor(colors.Decimal.deepPurple.P500)
        .setFooter('Powered by Giphy.', 'https://s3.amazonaws.com/ionic-marketplace/ionic-giphy/icon.png')
        .setImage(embedUrl)
      )
    } catch (err) { return Promise.reject(err) }
  }

  get shortLogDate () {
    return moment.tz(UTC).format('Y-MM-DD')
  }

  get shortUTCTime () {
    return moment.tz(UTC).format('HH:mm:ss.SS')
  }

  get formattedTime () {
    return moment.tz(config.defaultTimezone).format(DEFAULT_DATE_FORMAT)
  }

  get utcTime () {
    return moment.tz(UTC).format()
  }

  get formattedUTCTime () {
    return moment.tz(UTC).format(DEFAULT_DATE_FORMAT)
  }

  get safeFormattedTime () {
    return moment.tz(config.defaultTimezone).format('MM.DD.Y_HH:mm:ss')
  }

  upperFirstC (string) {
    let temp = string.toLowerCase()
    return temp.charAt(0).toUpperCase() + temp.slice(1)
  }

  numberWithCommas (num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  /**
   * Returns a random integer between the min (inclusive) and max (exclusive).
   *
   * @param {*} min
   * @param {*} max
   */
  getRandom (min, max) {
    if (min < max) {
      return chance.integer({
        min: min,
        max: (max - 1)
      })
    } else {
      return 0
    }
  }

  /**
   *
   * @param {string} message
   * @param {Client} client
   */
  sendOwnerMessage (message, client) {
    return client.users.get('219270060936527873').send(message)
  }
}
