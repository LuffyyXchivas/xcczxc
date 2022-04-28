const { MessageEmbed, DiscordAPIError, MessageReaction } = require('discord.js');
const Main = require('../../Settings/Settings.json');
const config = require('../../Settings/Config.json');
const Discord = require('discord.js');
const moment = require('moment');
const db = require('quick.db');

module.exports.beta = async(client, message, args) => {
 

  
      
  if (!message.member.premiumSince) return message.channel.send("Bu komutu kullanabilmek için boost basmış olmanız gerekmektedir!");
    if (!message.member.manageable) return message.channel.send("Bu üyenin adını değiştiremiyorum!");

    const username = args.join(" ");
    if (!username) return message.channel.send( "Bir kullanıcı adı belirtmelisiniz!");
    if (username.length >= 32) return message.channel.send("Kullanıcı adınız en fazla 32 karakter olabilir!");
    message.member.setNickname(username);
    message.channel.send(`Kullanıcı adınız başarıyla ${username} olarak değiştirildi!`)
}

module.exports.config = { 
    name: 'zengin',
    aliases: ['booster']
};