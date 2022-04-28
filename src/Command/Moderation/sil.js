const { MessageEmbed } = require('discord.js');
const Main = require('../../Settings/Settings.json');
const config = require('../../Settings/Config.json');
const moment = require('moment');
const ms = require('ms');
const db = require('quick.db');

module.exports.beta = async(client, message, args) => {
  
  let embed = new MessageEmbed().setFooter(Main.Footer).setColor("ffffff")

   if (!message.member.hasPermission('MANAGE_MESSAGES')) return;
    if (!args[0]) return message.channel.send("Bir miktar belirtmelisin!");
    if (isNaN(args[0])) return message.channel.send("Belirttiğin miktar bir sayı olmalı!");
    await message.delete();
    await message.channel.bulkDelete(args[0]);
    message.channel.send(embed.setDescription(`${config.Diger.onay} ${args[0]} adet mesaj silindi!`));


}


module.exports.config = { 
    name: 'sil',
};