const { MessageEmbed } = require('discord.js');
const db = require('quick.db')
const Main = require('../../Settings/Settings.json');
const config = require('../../Settings/Config.json');
const emoji = require('../../Settings/Emojis.json');
const kevzyy = require("discord.js")
const buttons = require('discord-buttons');
const moment = require('moment');
const ms = require('ms');

module.exports.beta = async(client, message, args) => {   
  
  let atılmaay = moment(Date.now()).format("MM")
    let atılmagün = moment(Date.now()).format("DD")
    let atılmasaat = moment(Date.now()).format("HH:mm:ss")
    let kayıttarihi = `\`${atılmagün} ${atılmaay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${atılmasaat}\``
    moment.locale("tr")
    if(![config.Yetkili.AbilityYT].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(config.Diger.red)
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) 
  if (!member) return message.channel.send("**Bir Kullanıcı Belirtmelisin!**").then(x => x.delete({timeout: 5000}));
var evethayır = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
        .setFooter(member.user.username, member.user.displayAvatarURL({ dynamic: true }))
        .setColor('#5555dd')
        .setTimestamp()
        .setDescription(`${member} adlı kullanıcının isim verilerini sıfırlamak istiyormusunuz?`)
        .setThumbnail(message.guild.iconURL({ dynamic: true }));
        var evt = new buttons.MessageButton()
        .setStyle('green')
        .setLabel('Sıfırla')
        .setID('evet');
        var hyr = new buttons.MessageButton()
        .setStyle('red')
        .setLabel('İptal')
        .setID('hayır');
        var row = new buttons.MessageActionRow()
        .addComponents([evt, hyr]);
        if (!message.member.permissions.has(config.Yetkili.AbilityYT)) {
            evt.setDisabled(true);
            hyr.setDisabled(true);
        };
        return message.channel.send({ embed: evethayır, components: [ row ] }).then(async (s) => {
            var filter = m => m.clicker.user.id == message.author.id;
            var collector = s.createButtonCollector(filter);
            collector.on('collect', async (button) => {
                button.reply.defer();
                if (button.id == "evet") {
db.delete(`isimler.${member.id}`)
db.delete(`sayı.${member.id}`)
  const log = new kevzyy.MessageEmbed()
.setColor("BLACK")
.setDescription(`
${emoji.kevzyyduyuru} **${member} Adlı Kullanıcının İsim Verileri Silindi!**

**•** \`Detaylar;\` 

${emoji.kevzyyok} ** Kullanıcı =** ${member}-\`( ${member.id} )\`
${emoji.kevzyyok} ** Yetkili =** ${message.author}-\`( ${message.author.id} )\`
${emoji.kevzyyzaman} ** Tarih =** ${kayıttarihi}
`)
.setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
.setFooter(Main.Footer)
.setTimestamp()
client.channels.cache.get(config.Log.RegisterLog).send(log)
                   var embeds = new MessageEmbed()
                    .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
                    .setFooter(member.user.username, member.user.displayAvatarURL({ dynamic: true }))
                    .setColor('#5555dd')
                    .setTimestamp()
                    .setDescription(`${member} Adlı kullanıcının İsim verileri sıfırlandı.`)
                    .setThumbnail(button.message.guild.iconURL({ dynamic: true }));
       return s.edit({ embed: embeds }).then(async (sm) => {
                        s.delete({ timeout: 5000 });
                    });
                } else if (button.id == "hayır") {
                                   
                    var embeds = new MessageEmbed()
                    .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
                    .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                    .setColor('#5555dd')
                    .setTimestamp()
                    .setDescription(`İşlem iptal edildi!`)
                    .setThumbnail(button.message.guild.iconURL({ dynamic: true }));
                    return s.edit({ embed: embeds }).then(async (sm) => {
                        s.delete({ timeout: 5000 });
                    });
                }
            });
        });
   
};

module.exports.config = { 
    name: 'isimverisıfırla',
};