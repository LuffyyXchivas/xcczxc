const { MessageEmbed } = require('discord.js');
const Main = require('../../Settings/Settings.json');
const config = require('../../Settings/Config.json');
const moment = require('moment');
const ms = require('ms');
const db = require('quick.db');
let table = require("string-table");

module.exports.beta = async(client, message, args) => {
  
  let embed = new MessageEmbed().setFooter(Main.Footer).setColor("ffffff")

 if (!message.guild) return;
 if(![config.Yetkili.AbilityYT].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return;

    let YetkiliRol = config.Yetkili.registerYT
    const sec = args[0]
    if (!sec) {

	  let Ozi = message.guild.members.cache.filter(member => {
			return member.roles.cache.has(YetkiliRol) && !member.voice.channel && member.presence.status !== "offline" && !member.user.bot && !Main.owners.includes(member.user.id)
		  }).map(member => ("<@" + member.user.id + ">")).join(",");
      let SesteOlmayanYetkili = message.guild.members.cache
        .filter(member => {
          return member.roles.cache.has(YetkiliRol) && !member.voice.channel && member.presence.status !== "offline" && !member.user.bot && !Main.owners.includes(member.user.id)
        }).size;

      let ToplamYetkili = message.guild.roles.cache.get(YetkiliRol).members.size
      let SesteOlanYetkili = message.guild.members.cache.filter(member => member.roles.cache.has(YetkiliRol) && member.voice.channel && !member.user.bot && !Main.owners.includes(member.user.id)).size;
      let AktifYetkili = message.guild.members.cache.filter(member => member.roles.cache.has(YetkiliRol) && !member.user.bot && !Main.owners.includes(member.user.id) && (member.presence.status !== "offline")).size;
      let OfflineYetkili = message.guild.members.cache.filter(member => member.roles.cache.has(YetkiliRol) && !member.user.bot && !Main.owners.includes(member.user.id) && member.presence.status == "offline").size;

      let tablo = [{
        "TOPLAM": ToplamYetkili + " kişi",
        "AKTİF": AktifYetkili + " kişi",
        "ÇEVRİMDIŞI": OfflineYetkili + " kişi",
        "SESTE": SesteOlanYetkili + " kişi",
        "SESTE OLMAYAN": SesteOlmayanYetkili + " kişi"
      }]

      message.channel.send(table.create(tablo), {
        code: "md",
        split: true
      })
      message.channel.send(Ozi, {code: "md", split: { char: "," }})
    }


}

module.exports.config = { 
    name: 'ysay',
  
};