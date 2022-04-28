const { MessageEmbed } = require('discord.js');
const Main = require('../../Settings/Settings.json');
const config = require('../../Settings/Config.json');
const moment = require('moment');
const ms = require('ms');
const db = require('quick.db');

module.exports.beta = async(client, message, args) => {

    let yanlis = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor('RED')
        if(![config.Yetkili.AbilityYT,config.Yetkili.jailYT].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(config.Diger.red)
    const uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!uye) return message.channel.send(yanlis.setDescription('Belirttiğiniz üyeyi bulamadım.')).then(x => x.delete({timeout: 2000}))
    let sebep = args.splice(1).join(" ")
    if(!sebep) return message.channel.send(yanlis.setDescription('Bir sebep belirtmen gerekiyor.')).then(x => x.delete({timeout: 2000}))

    let atılmaay = moment(Date.now()).format("MM")
    let atılmagün = moment(Date.now()).format("DD")
    let atılmasaat = moment(Date.now()).format("HH:mm:ss")
    let kayıttarihi = `\`${atılmagün} ${atılmaay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${atılmasaat}\``
    moment.locale("tr")

    let cezaID = db.get(`cezaid.${message.guild.id}`)+1
    db.add(`cezapuan.${uye.id}.${message.guild.id}`, +20);
    let cpuan = db.get(`cezapuan.${uye.id}.${message.guild.id}`);
    db.add(`cezaid.${message.guild.id}`, +1);
    db.push(`moderasyon.${uye.id}.${message.guild.id}`, { Yetkili: message.author.id,Cezalı: uye.id ,ID: cezaID, Komut: 'JAİL',Puan: '+20', Tarih: kayıttarihi, Sebep: sebep })
    db.set(`moderasyon.${cezaID}.${message.guild.id}`, { Yetkili: message.author.id,Cezalı: uye.id ,ID: cezaID, Komut: 'JAİL',Puan: '+20', Tarih: kayıttarihi, Sebep: sebep})

    db.set(`cezalı.${uye.id}.${message.guild.id}`, 'cezalı')
const emoji = require('../../Settings/Emojis.json');
    await uye.roles.cache.has(config.Roller.Booster) ? uye.roles.set([config.Roller.Booster, config.Roller.Jailed]) : uye.roles.set([config.Roller.Jailed])
    let baban = new MessageEmbed()
    .setColor("ffffff")
    .setFooter(Main.Footer)
    .setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
    .setDescription(` 
   ${emoji.kevzyyjail} ${uye} Adlı Kullanıcı Karantinaya Gönderildi!

    ${emoji.kevzyyok} **Yetkili:** ${message.author} (\`${message.author.id}\`)
    ${emoji.kevzyyok} **Cezalı:** ${uye} (\`${uye.id}\`)
    ${emoji.kevzyyzaman} **Tarih:** \`${kayıttarihi}\`
    
    ${emoji.Book} **Sebep:** \`${sebep}\`
    `)
    client.channels.cache.get(config.Log.JailLog).send(baban)
    message.channel.send(new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setDescription(`${uye} (\`${uye.id}\`) adlı kullanıcı karantinaya atıldı!`).setColor("BLACK").setFooter(Main.Footer))
    client.channels.cache.get(config.Log.CezaPuanLog).send(`${emoji.kevzyy} ${uye}: aldığınız **#${cezaID}**  ID'li ceza ile **${cpuan}** ceza puanına ulaştınız.`)

  
};

module.exports.config = { 
    name: 'jail',
    aliases: ['cezalandır', 'cezalı']
};