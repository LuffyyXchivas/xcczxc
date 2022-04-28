const { MessageEmbed } = require('discord.js');
const Main = require('../../Settings/Settings.json');
const config = require('../../Settings/Config.json');
const moment = require('moment');
const db = require('quick.db');

module.exports.beta = async(client, message, args) => {

    if(![config.Yetkili.AbilityYT,config.Yetkili.BanYT,config.Yetkili.jailYT,config.Yetkili.muteYT,config.Yetkili.vmuteYT].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(config.Diger.red)

let Etiket = "3001"
    let embed = new MessageEmbed().setColor("BLACK").setFooter(Main.Footer)
let tag = message.guild.members.cache.filter(member => member.user.username.includes(Main.Tag)).size
let ses = message.guild.members.cache.filter(x => x.voice.channel).size
let bot = message.guild.members.cache.filter(s => s.voice.channel && s.user.bot).size
let üyesayısı = message.guild.members.cache.size
 let Etiketiniz = message.guild.members.cache.filter(u => u.user.discriminator.includes(Etiket)).size;
let aktif = message.guild.members.cache.filter(m => m.presence.status !== "offline").size
let booster = message.guild.premiumSubscriptionCount
let boostLevel =  message.guild.premiumTier
message.channel.send(embed.setDescription(`
\`❯\` Şu anda toplam **${ses-bot || "0"}** (**+${bot || "0"} bot**) kişi seslide.
\`❯\` Sunucuda **${üyesayısı}** adet üye var (**${aktif || "0"}** Aktif)
\`❯\` Toplamda **${tag || "0"}** kişi normal tagımızı **${Etiketiniz || "0"}** kişi etiket tagımızı alarak bizi desteklemiş.
\`❯\` Toplamda **${booster}** adet boost basılmış! ve Sunucu **${boostLevel}** seviye`))
};

module.exports.config = { 
    name: 'say',
    aliases: ['sunucu-istatik']
};