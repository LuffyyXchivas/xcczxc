const { MessageEmbed } = require('discord.js');
const Main = require('../../Settings/Settings.json');
const config = require('../../Settings/Config.json');
const moment = require('moment');
const ms = require('ms');
const db = require('quick.db');

module.exports.beta = async(client, message, args) => {
  
  let embed = new MessageEmbed().setFooter(Main.Footer).setColor("ffffff")

  let user = message.mentions.members.first() || message.members.cache.get(args[0])
        if (!user) return message.channel.send("Geçerli bir kullanıcı etiketle!")
        let sonuc; if (!user.voice.channelID) sonuc = `**${user}** kullanıcısı herhangi bir ses kanalında değil.`; if (user.voice.channelID) sonuc = `${user} kullanıcısı \`${user.voice.channel.name}\` isimli sesli odada.`
        message.channel.send(embed.setDescription(sonuc))

}


module.exports.config = { 
    name: 'nerede',
};