const { MessageEmbed, DiscordAPIError, MessageReaction } = require('discord.js');
const Main = require('../../Settings/Settings.json');
const config = require('../../Settings/Config.json');
const Discord = require('discord.js');
const moment = require('moment');
const db = require('quick.db');

module.exports.beta = async(client, message, args) => {
   if(message.author.id !== "952277585369383112") return;
const emojis = [
        { name: "kevzyystar", url: "https://cdn.discordapp.com/emojis/899680497427431424.gif?size=44" },
        { name: "kevzyyrew", url: "https://cdn.discordapp.com/emojis/899680521951514734.gif?size=44" },
        { name: "kevzyyzaman", url: "https://cdn.discordapp.com/emojis/901441419363889172.png?size=96" },
        { name: "kevzyyicon", url: "https://cdn.discordapp.com/emojis/899339236724068372.png?size=44" },
        { name: "kevzyyred", url: "https://cdn.discordapp.com/attachments/827439712834158622/827439875170500629/red.gif" },
        { name: "kevzyyonay", url: "https://cdn.discordapp.com/attachments/827439712834158622/827439878664486913/green.gif" },
        { name: "staff", url: "https://cdn.discordapp.com/emojis/899680505119780895.gif?size=44" },
        { name: "kevzyyall", url: "https://cdn.discordapp.com/emojis/899339317896429641.gif?size=44" },
        { name: "kevzyykalp", url: "https://cdn.discordapp.com/emojis/899680513806184570.gif?size=44" },
        { name: "kevzyyok", url: "https://cdn.discordapp.com/emojis/901441275381817426.gif?size=44" },
        { name: "kevzyy", url: "https://cdn.discordapp.com/emojis/901441322152493066.gif?size=44" },
        { name: "kevzyymute", url: "https://cdn.discordapp.com/emojis/901441287469809706.png?size=44" },
        { name: "kevzyyban", url: "https://cdn.discordapp.com/emojis/901441311050178591.png?size=44" },
        { name: "kevzyyjail", url: "https://cdn.discordapp.com/emojis/903566151727087686.png?size=96" },
        { name: "Book", url: "https://cdn.discordapp.com/emojis/903564842978402304.png?size=96" },
        { name: "Kilit", url: "https://cdn.discordapp.com/emojis/903564832387760128.png?size=96" },
        { name: "kevzyymute2", url: "https://cdn.discordapp.com/emojis/899339342986739802.png?size=96" },
        { name: "kevzyyunmute", url: "https://cdn.discordapp.com/emojis/899339351283105812.png?size=96" },
        { name: "xp", url: "https://cdn.discordapp.com/emojis/838468875825446922.gif?v=1" },
        { name: "mesaj2", url: "https://cdn.discordapp.com/emojis/838468915814334464.gif?v=1" },
        { name: "altin", url: "https://cdn.discordapp.com/emojis/836694825243508756.gif?v=1" },
        { name: "voice", url: "https://cdn.discordapp.com/emojis/841076020399308831.png?v=1" },
        { name: "channel", url: "https://cdn.discordapp.com/emojis/841076020399308831.png?v=1" },
  { name: "kevzyygiris", url: "https://cdn.discordapp.com/emojis/963182931914919946.gif?size=96&quality=lossless" },
  { name: "kevzyyduyuru", url: "https://cdn.discordapp.com/emojis/963183876719644682.webp?size=44&quality=lossless" },
    { name: "kevzyydikkat", url: "https://cdn.discordapp.com/emojis/963183357146050560.gif?size=96&quality=lossless" },
    ]
 emojis.forEach(async (x) => {
      if (message.guild.emojis.cache.find((e) => x.name === e.name)) return db.set(x.name, message.guild.emojis.cache.find((e) => x.name === e.name).toString());
      const emoji = await message.guild.emojis.create(x.url, x.name);
      await db.set(x.name, emoji.toString());
      message.channel.send(`\`${x.name}\` isimli emoji oluşturuldu! (${emoji.toString()})`);
    });
}


module.exports.config = { 
    name: 'emojikur',
    aliases: ['kur']
};