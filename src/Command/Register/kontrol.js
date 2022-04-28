const { MessageEmbed } = require('discord.js');
const db = require('quick.db')
const Main = require('../../Settings/Settings.json');
const config = require('../../Settings/Config.json');
const moment = require('moment');
const disbut = require("discord-buttons");
const ms = require('ms');

module.exports.beta = async(client, message, args) => {
    let yanlis = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor('RED')
    
    if(![config.Yetkili.AbilityYT,config.Yetkili.registerYT].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(config.Diger.red)
    
    let kullanıcı = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;
let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author);

 
       let ekipRolu = config.Register.TagRol
       
       let atılmaay = moment(Date.now()).format("MM")
    let atılmagün = moment(Date.now()).format("DD")
    let atılmasaat = moment(Date.now()).format("HH:mm:ss")
    let kayıttarihi = `\`${atılmagün} ${atılmaay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${atılmasaat}\``
    moment.locale("tr")
 
     let taglilar = message.guild.members.cache.filter(s => s.user.username.includes(Main.Tag) && !s.roles.cache.has(ekipRolu))
    let ozicim = message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0)


let tagrol = new disbut.MessageButton().setStyle('green').setLabel('Tag Rol Dağıt').setID('tagrol')
let kayıtsızdagit = new disbut.MessageButton().setStyle('blurple').setLabel('Kayıtsız Rol Dağıt').setID('kayıtsızdagit')

let ozi = new MessageEmbed()
.setDescription(`
${message.member.toString()}, \`${kayıttarihi}\` tarihinden  itibaren \`${message.guild.name}\` rolü olmayan üyelerin rol dağıtım tablosu aşağıda belirtilmiştir.
`)

.addFields(
{ name: "__**Taglı Rol**__", value: `
\`\`\`fix
${taglilar.size} kişi
\`\`\`
`, inline: true },
{ name: "__**Kayıtsız Rol**__", value: `
\`\`\`fix
${ozicim.size} kişi
\`\`\`
`, inline: true }
)

.setColor("BLACK")
.setFooter(message.author.tag, message.author.avatarURL())
.setTimestamp()
.setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
 
 
  let msg = await message.channel.send({ buttons : [tagrol,kayıtsızdagit], embed: ozi})
 
    var filter = (button) => button.clicker.user.id === message.author.id;
   
    let collector = await msg.createButtonCollector(filter, { time: 30000 })

      collector.on("collect", async (button) => {

  



    if (button.id === 'tagrol') {
 
      let taglilar = message.guild.members.cache.filter(s => s.user.username.includes(Main.Tag) && !s.roles.cache.has(ekipRolu))

    button.reply.send(`
Tagı olup rolü olmayan \`${taglilar.size}\` kullanıcıya rol verildi.
**Tag Rolü verilen kullanıcılar;**
${taglilar.map(x => x || "Rolü olmayan Kullanıcı bulunmamaktadır.")}`)

    message.guild.members.cache.filter(s => s.user.username.includes(Main.Tag) && !s.roles.cache.has(ekipRolu)).map(x=> x.roles.add(config.Register.TagRol))                
    }

    if (button.id === 'kayıtsızdagit') {
 
    let ozicim = message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0)

    button.reply.send(`
Kayıtsız rolü olmayan \`${ozicim.size}\` kullanıcıya kayıtsız rolü verildi !
**Kayıtsız Rolü verilen kullanıcılar;**
${ozicim.map(x => x || "Rolü olmayan Kullanıcı bulunmamaktadır.")} `)

    message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0).map(x=> x.roles.add(config.Register.unreg))

    }
       });
};

module.exports.config = { 
    name: 'kontrol',
    aliases: ['control']
};