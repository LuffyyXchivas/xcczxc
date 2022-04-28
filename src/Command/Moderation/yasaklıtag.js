const { MessageEmbed } = require('discord.js');
const db = require('quick.db')
const Discord = require("discord.js");
const moment = require('moment');
const Main = require('../../Settings/Settings.json');
const config = require('../../Settings/Config.json');

module.exports.beta = async(client, message, args) => {
  
  let embed = new MessageEmbed().setColor("ffffff").setFooter(Main.Footer)

     if(![config.Yetkili.AbilityYT,config.Yetkili.registerYT].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(config.Diger.red)
  
        let cmd = args[0]
        
        if (cmd === 'ekle') {
            let hedef = args[1]
            if (!hedef) return message.channel.send(embed.setDescription(`Geçerli bir tag ve sebep belirtmelisin.`))
            if(db.has(`yasaklıtag.${message.guild.id}`) && db.get(`yasaklıtag.${message.guild.id}`).includes(args[1])) return message.channel.send(embed.setDescription(`${message.member}, Bu tag zaten yasaklı listede mevcut.`))
            db.push(`yasaklıtag.${message.guild.id}`, {
              Tag: args[1],
              adminID: message.member.id,
              guildID: message.guild.id,
               Date: Date.now()
            })
        let lol1 = db.fetch(`yasaklıtag.${message.guild.id}`).join("  ,  ")
          
                message.channel.send(embed.setDescription(`\`${hedef}\` tagı başarılı bir şekilde yasaklı listeye eklendi!`))
                message.guild.members.cache.filter(s => s.user.tag.toLowerCase().includes(hedef)).forEach(async m => {
                    await m.roles.set([config.Roller.Jailed]).catch(e => {});
                    await m.setNickname('Yasaklı Tag').catch(e => {})
                
            })
        } else if (cmd === 'liste') {
            let veriler = db.fetch(`yasaklıtag.${message.guild.id}`)
            if (!veriler) return message.channel.send(embed.setDescription(`Sunucuya ait yasaklı tag verisi bulunamadı!`))
            let map = veriler.length > 0 ? veriler.map((value, index) => `\`${value.Tag}\` - ${message.guild.members.cache.get(value.adminID)} **${moment(value.Date).locale('tr').format('LLL')}**`).join('\n') : "Sunucuya ait veri bulunamadı."
            message.channel.send(embed.setDescription(`
${map}
`))
        } else if (cmd === 'sil') {
          let veriler = db.fetch(`yasaklıtag.${message.guild.id}`)
            if (!veriler && !veriler.length) return message.channel.send(embed.setDescription(`Sunucuya ait yasaklı tag verisi bulunmadığından silme işlemi yapılamaz!`))
            let hedef = args[1]
            if (!hedef) return;
            if (!veriler.some(s => s.Tag === hedef)) return message.channel.send(embed.setDescription(`Bu tag yasaklı listede zaten bulunmamakta!`))

            await db.delete(`yasaklıtag.${message.guild.id}`, hedef)
                message.channel.send(embed.setDescription(`\`${hedef}\` tagı yasaklı listeden kaldırıldı!`))
                message.guild.members.cache.filter(s => s.user.tag.toLowerCase().includes(hedef)).forEach(async m => {
                    await m.roles.set(config.Register.unreg).catch(e => {});
                    await m.setNickname('• İsim Yaş')
                
            }).catch(err => console.error('Silinemedi!'))

        } else if (cmd === 'bilgi') {
          let veriler = db.fetch(`yasaklıtag.${message.guild.id}`)
            let hedef = args[1]
            if (!hedef) return;
            if (!veriler.map(s => s.Tag).includes(hedef)) return message.channel.send(embed.setDescription(`Belirttiğiniz tag yasaklı listede bulunmamakta!`))
            message.channel.send(embed.setDescription(`
**${hedef}** tagı ile ilgili bilgiler;

Tagdaki üye sayısı: **${message.guild.members.cache.filter(s => s.user.tag.toLowerCase().includes(hedef)).size}**
Tagı ekleyen: ${veriler.filter(s => s.Tag === hedef).map(s => `${message.guild.members.cache.get(s.adminID)}`)}
Tag eklenme tarihi: **${veriler.filter(s => s.Tag === hedef).map(s => `${moment(s.Date).locale('tr').format('LLL')}`)}**
`))
} else {
   
    message.channel.send(embed.setDescription(`
    **Yasaklı tag işlemleri;**

   ▫️ \`.yasaklıtag ekle [TAG]\` **Belirttiğiniz tagı yasaklı listeye ekler.**
   ▫️ \`.yasaklıtag sil [TAG]\` **Belirttiğiniz tagı yasaklı listeden siler.**
   ▫️ \`.yasaklıtag liste\` **Sunucunun yasaklı taglarını listeler.**
   ▫️ \`.yasaklıtag bilgi [TAG]\` **Belirttiğiniz yasaklı tag ile ilgili bilgileri listeler.**
    `))
}  
};

module.exports.config = { 
    name: 'yasaklıtag',
    aliases: ['ytag']
};