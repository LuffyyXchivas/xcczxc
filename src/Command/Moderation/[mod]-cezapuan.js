const { MessageEmbed, Message } = require('discord.js');
const emoji = require('../../Settings/Emojis.json');
const db = require('quick.db')

module.exports.beta = async(client, message, args) => {

    let uye = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
    let cpuan = db.get(`cezapuan.${uye.id}.${message.guild.id}`);
    
    message.channel.send(new MessageEmbed().setColor("BLACK").setDescription(`${emoji.kevzyy} ${uye} adlı üyenin ceza puanı; ${cpuan || '0'}`))

};

module.exports.config = { 
    name: 'cezapuan',
    aliases: ['cpuan', 'cezapuan',]
};