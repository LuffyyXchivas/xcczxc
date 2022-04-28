const { MessageEmbed } = require('discord.js');
const Main = require('../../Settings/Settings.json');
const config = require('../../Settings/Config.json');
const moment = require('moment');
const ms = require('ms');
const db = require('quick.db');

module.exports.beta = async(client, message, args) => {
  let atılmaay = moment(Date.now()).format("MM")
    let atılmagün = moment(Date.now()).format("DD")
    let atılmasaat = moment(Date.now()).format("HH:mm:ss")
    let kayıttarihi = `\`${atılmagün} ${atılmaay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${atılmasaat}\``
    moment.locale("tr")
    let yanlis = new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setColor('RED')
    if(![config.Yetkili.AbilityYT,config.Yetkili.jailYT].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(config.Diger.red)
    const uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!uye) return message.channel.send(yanlis.setDescription('Belirttiğiniz üyeyi bulamadım.')).then(x => x.delete({timeout: 2000}))
    let sebep = args.splice(1).join(" ")
    if(!sebep) return message.channel.send(yanlis.setDescription('Bir sebep belirtmen gerekiyor.')).then(x => x.delete({timeout: 2000}))
    let vmuteli = db.fetch(`vmuteli.${uye.id}.${message.guild.id}`)
    if(!vmuteli) {
    if(vmuteli == 'vmuteli') {
        await db.delete(`vmuteli.${uye.id}.${message.guild.id}`)
        await db.delete(`süre.${uye.id}.${message.author.id}`)
      const emoji = require('../../Settings/Emojis.json');
    client.channels.cache.get(config.Log.VMuteLog).send(new MessageEmbed().setFooter(Main.Footer).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setDescription(`
${emoji.voice} ${uye} (\`${uye.id}\`) Adlı Kullanıcının Ses Susturulması Kaldırıldı!

    ${emoji.kevzyyok} **Yetkili:** ${message.author} (\`${message.author.id}\`)
    ${emoji.kevzyyok} **Cezalı:** ${uye} (\`${uye.id}\`)
    ${emoji.kevzyyzaman} **Süre:** \`${kayıttarihi}\`

    ${emoji.Book} **Sebep:** \`${sebep}\``))
    await uye.roles.remove(config.Roller.VMuted)
    message.channel.send(new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setDescription(`${uye} (\`${uye.id}\`) adlı kullanıcının mute cezası kaldırıldı!`).setColor("BLACK").setFooter(Main.Footer))
     } else {
        message.channel.send(yanlis.setDescription(`Kişinin voice mutesi bulunmuyor.`)).then(x => x.delete({timeout: 2000}))
     }
    }
};

module.exports.config = { 
    name: 'unvmute',
    aliases: ['sesli-kaldır','un-vmute']
};