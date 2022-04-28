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

    let yanlis = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor('RED')
    if(![config.Yetkili.AbilityYT,config.Yetkili.jailYT].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(config.Diger.red)
    const uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!uye) return message.channel.send(yanlis.setDescription('Belirttiğiniz üyeyi bulamadım.')).then(x => x.delete({timeout: 2000}))
    let cezalı = db.fetch(`cezalı.${uye.id}.${message.guild.id}`)
    if(cezalı == 'cezalı') {
    await db.delete(`cezalı.${uye.id}.${message.guild.id}`)
    await db.delete(`süre.${uye.id}.${message.guild.id}`)
      const emoji = require('../../Settings/Emojis.json');
    client.channels.cache.get(config.Log.JailLog).send(new MessageEmbed().setFooter(Main.Footer).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor("GREEN").setDescription(` 
    ${emoji.kevzyyjail} ${uye} Adlı Kullanıcı Karantinadan Çıkarıldı!

    ${emoji.kevzyyok} **Yetkili:** ${message.author} (\`${message.author.id}\`)
    ${emoji.kevzyyok} **Cezalı:** ${uye} (\`${uye.id}\`)
    ${emoji.kevzyyzaman} **Tarih:** \`${kayıttarihi}\`
`))

    await uye.roles.remove(config.Roller.Jailed)
    await uye.roles.add(config.Register.unreg)
    message.channel.send(new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setDescription(`${uye} (\`${uye.id}\`) adlı kullanıcının jail cezası kaldırıldı!`).setColor("BLACK").setFooter(Main.Footer))
    } else {
        message.channel.send(yanlis.setDescription('Kişinin jail cezası bulunmuyor.')).then(x => x.delete({timeout: 2000}))
    }
};

module.exports.config = { 
    name: 'unjail',
    aliases: ['un-jail','cezakaldır']
};