const { Discord, MessageEmbed } = require('discord.js');
const db = require('quick.db')
const Main = require('../../Settings/Settings.json');
const config = require('../../Settings/Config.json');

module.exports.beta = async(client, message, args) => {    
   if(![config.Yetkili.AbilityYT,config.Yetkili.registerYT].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(config.Diger.red)
 const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if (!member) return message.channel.send("Bir üye belirtmelisin!").then(x=>x.delete({timeout:5000})) 
      
        if(!member.voice.channel) return message.channel.send("Bağlantısını kesmek istediğiniz kullanıcı sesli odalarda bulunmuyor.", message.author, message.channel)
        if(message.member.roles.highest.rawPosition < member.roles.highest.rawPosition) return message.channel.send("Rolleri senden yüksek birinin ses kanallarında ki bağlantısını kesemezsin.", message.author, message.channel)
        member.voice.kick()
  const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
        .setDescription("<@"+member+"> adlı kişinin **"+member.voice.channel.name+"** adlı ses kanalından çıkarıldı.-!")
        .setColor("BLACK")
         message.channel.send(embed)
        
       




};

module.exports.config = { 
    name: 'bağlantıkes',
    aliases: ['top-teyit','kayıt-liste']
};