const { MessageEmbed, DiscordAPIError, MessageReaction } = require('discord.js');
const Main = require('../../Settings/Settings.json');
const config = require('../../Settings/Config.json');
const Discord = require('discord.js');
const moment = require('moment');
const db = require('quick.db');

module.exports.beta = async(client, message, args) => {
   if(message.author.id !== "952277585369383112") return;

        const parent = await message.guild.channels.create('Kevzyy Log', { type: 'category' });
    await message.guild.channels.create('voice-log', { type: 'text', parent: parent.id });
    await message.guild.channels.create('taglı-log', { type: 'text', parent: parent.id });
    await message.guild.channels.create('yasaklı-tag', { type: 'text', parent: parent.id });
    await message.guild.channels.create('rol-log', { type: 'text', parent: parent.id });
    await message.guild.channels.create('mod-log', { type: 'text', parent: parent.id });
    await message.guild.channels.create('invite-log', { type: 'text', parent: parent.id });
    await message.guild.channels.create('komut-log', { type: 'text', parent: parent.id });
  await message.guild.channels.create('ceza-puan-log', { type: 'text', parent: parent.id });
   await message.guild.channels.create('ban-log', { type: 'text', parent: parent.id });
   await message.guild.channels.create('jaillog', { type: 'text', parent: parent.id });
   await message.guild.channels.create('mute-log', { type: 'text', parent: parent.id });
   await message.guild.channels.create('vmute-log', { type: 'text', parent: parent.id });
    message.channel.send(`Bot loglarının kurulumu başarıyla tamamlanmıştır.`)
    
}


module.exports.config = { 
    name: 'logkur',
    aliases: ['']
};