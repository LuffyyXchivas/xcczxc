const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const Main = require('../../Settings/Settings.json');
const config = require('../../Settings/Config.json');
const moment = require('moment');
require('moment-duration-format');
moment.locale('tr');

module.exports.beta = async(client, message, args) => {

    if(![config.Yetkili.AbilityYT,config.Yetkili.registerYT].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(config.Diger.red)

let embed = new MessageEmbed()
.setAuthor(message.author.username, message.author.avatarURL({ dynamic: true, size: 2048 }))
.setTitle("Bot Komutları | Kevzyy Chivas")
.setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
.setColor("ffffff")
.setDescription(`
[Genel Bot Komutları](https://discord.gg/montana)

\`.snipe\`
\`.afk <sebeb>\`
\`.avatar\`
\`.git <@kullanıcı>\`
\`.kilit\`
\`.nuke\`
\`.rolbilgi <@rol>\`
\`.rolal <@kullanıcı> <@rol>\`
\`.rolver <@kullanıcı> <@rol>\`
\`.say\`
\`.çek <@kullanıcı>\`

[Moderasyon Bot Komutları](https://discord.gg/montana)

\`.ban <@kullanıcı> <sebeb>\`
\`.jail <@kullanıcı> <zaman> <sebeb>\`
\`.mute <@kullanıcı> <zaman> <sebeb>\`
\`.vmute <@kullanıcı> <zamna> <sebeb>\`
\`.sicil <@kullanıcı>\`
\`.unban <@kullanıcı> <sebeb>\`
\`.unjail <@kullanıcı> <sebeb>\`
\`.unmute <@kullanıcı> <sebeb>\`
\`.unvmute <@kullanıcı> <sebeb>\`
\`.cpuansıfırla <@kullanıcı>\`
\`.cezapuan <@kullanıcı>\`
\`.herkesitaşı\`
\`.nerede\`
\`.sil <miktar>\`
\`.yasaklıtag <tag>\`
\`.ysay\`
\`.zengin <isim> <yaş>\`

[Register Bot Komutları](https://discord.gg/montana)

\`.seskes <@kullanıcı>\`
\`.isim <@kullanıcı> <isim> <yaş>\`
\`.isimler <@kullanıcı>\`
\`.isimverisıfırla <@kullanıcı>\`
\`.kayıt <@kullanıcı> <isim> <yaş>\`
\`.kayıtsız <@kullanıcı>\`
\`.kayıtverisıfırla <@kullanıcı>\`
\`.kontrol\`
\`.taglıalım <aç/kapat>\`
\`.teyit\`
\`.topteyit\`

[Stat Bot Komutları](https://discord.gg/montana)

\`.stathelp\`: yazarak komutları görürsünüz!

`)
return message.channel.send(embed)










    };

module.exports.config = { 
    name: 'yardım',
    aliases: ['help']
};