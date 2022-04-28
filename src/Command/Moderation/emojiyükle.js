const { MessageEmbed, DiscordAPIError, MessageReaction } = require('discord.js');
const Main = require('../../Settings/Settings.json');
const config = require('../../Settings/Config.json');
const Discord = require('discord.js');
const moment = require('moment');
const db = require('quick.db');

module.exports.beta = async(client, message, args) => {
    if(!message.member.hasPermission("MANAGE_EMOJIS")) return message.channel.send(new Discord.MessageEmbed().setTitle('Hata!').setColor('#ff0000').setDescription(`${message.author} bu komutu kullanabilmek için \`Emojileri Yönet\` Yetkisine sahip olmalısın.`));
    let link = args[0]
    let isim = args[1];
    let guild = message.guild;
    if (!link) return message.channel.send('Link Girmelisin');
    if (!isim) return message.channel.send('Emojiye isim seçmelisin');

    guild.emojis.create(`${link}`, `${isim}`)
        .then(emoji => 
         message.channel.send(` \`${isim}\` adlı emojiyi sunucuya ekledim.`))
  
        .catch(console.error);
};

module.exports.config = { 
    name: 'emojiyükle',
    aliases: ['yasakla']
};