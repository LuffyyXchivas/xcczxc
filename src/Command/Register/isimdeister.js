const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const Main = require('../../Settings/Settings.json');
const config = require('../../Settings/Config.json');
const emoji = require('../../Settings/Emojis.json');
const moment = require('moment');

module.exports.beta = async(client, message, args) => {
  
  let atılmaay = moment(Date.now()).format("MM")
    let atılmagün = moment(Date.now()).format("DD")
    let atılmasaat = moment(Date.now()).format("HH:mm:ss")
    let kayıttarihi = `\`${atılmagün} ${atılmaay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${atılmasaat}\``
    moment.locale("tr")

    let yanlis = new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setColor('RED').setFooter(Main.Footer)
    
    if(![config.Yetkili.AbilityYT,config.Yetkili.registerYT].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(config.Diger.red)
    const uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let Name = args[1]
    let Age = args[2]
    if(!uye) return message.channel.send(yanlis.setDescription('Bir kullanıcı belirtmelisin. <@Kevzyy/ID>')).then(x => x.delete({timeout: 5000}));
    if(!Name || !Age ) return message.channel.send(yanlis.setDescription(`Lütfen İsim ve Yaş Belirtin! ${Main.Prefix}isim <@Kevzyy/ID> <İsim> <Yaş>`)).then(x => x.delete({timeout: 5000}));
    if(uye.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(yanlis.setDescription('Belirttiğiniz kullanıcı sizden Üst veya Aynı konumda bulunuyor.')).then(x => x.delete({timeout: 5000}));
let data = await db.get(`sayı.${uye.id}`) || 0
db.add(`yetkili.${message.author.id}.isim`, 1)
  db.add(`sayı.${uye.id}`, +1)
    const İsim = `${uye.user.username.includes(Main.Tag) ? Main.Tag : Main.UnTag} ${Name} | ${Age}`

    await uye.setNickname(İsim);
     message.react(emoji.kevzyyonay)
     message.channel.send(new MessageEmbed().setDescription(`
${uye.toString()} Adlı Kullanıcının İsmi \`${İsim}\` Olarak Değiştirildi!

Kullanıcının toplamda **${data}** isim kayıtı bulundu!
`)
.setAuthor(uye.displayName, uye.user.displayAvatarURL({ dynamic: true }))
.setFooter(`Kullanıcın İsimlerini Görmek İçin .isimler @Kevzyy/ID`))

     const log = new MessageEmbed()
.setColor("#1a4cee")
.setDescription(`
${emoji.kevzyyduyuru} **${uye} Adlı Kullanıcının İsmi Değiştirildi!**

**•** \`Detaylar;\` 

${emoji.kevzyyok}** Kullanıcı =** ${uye}-\`( ${uye.id} )\`
${emoji.kevzyyok}** Yetkili =** ${message.author}-\`( ${message.author.id} )\`
${emoji.kevzyyok}** İsim =** \`${İsim}\`
${emoji.kevzyyzaman}** Tarih =** ${kayıttarihi}
`)
.setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
.setFooter(Main.Footer)
.setTimestamp()
client.channels.cache.get(config.Log.RegisterLog).send(log)

  
     await db.push(`isimler.${uye.id}`, {
        userID: uye.id,
        isimleri: İsim,
        teyitciid: message.author.id,
        Tür: "**İsim Değiştirme**"
    })
};

module.exports.config = { 
    name: 'isim',
    aliases: ['isim-değiştir','setnickname']
};