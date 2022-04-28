const { MessageEmbed, Client, Message } = require("discord.js");
const Discord = require('discord.js');
const disbut = require("discord-buttons");
const client = global.client;
const Main = require('../../Settings/Settings.json');
const config = require('../../Settings/Config.json');
const moment = require('moment');
const db = require('quick.db');

module.exports.beta = async(client, message, args) => {
    let ozi = new disbut.MessageMenuOption()
 .setLabel("Sunucuya Katılma Tarihiniz")
 .setValue("ozi")
.setEmoji("963180036050018354")

 let ozi1 = new disbut.MessageMenuOption()
 .setLabel("Üzerinde Bulunan Rollerin Listesi")
 .setValue("ozi1")
 .setEmoji("963180036050018354")
 

 let ozi2 = new disbut.MessageMenuOption()
 .setLabel("Hesabınızın Açılış Tarihi")
 .setValue("ozi2")
  .setEmoji("963180036050018354")

 let ozi3 = new disbut.MessageMenuOption()
 .setLabel("İsim Bilgileriniz")
 .setValue("ozi3")
 .setEmoji("963180036050018354")

 let ozi4 = new disbut.MessageMenuOption()
 .setLabel("Tekrar Kayıt Olma")
 .setValue("ozi4")
  .setEmoji("963180036050018354")

 let ozi5 = new disbut.MessageMenuOption()
 .setLabel("Sunucu Bilgileri")
 .setValue("ozi5")
  .setEmoji("963180036050018354")
 
 let ozi6 = new disbut.MessageMenuOption()
 .setLabel("Sunucu Bilgileri")
 .setValue("ozi6")
 .setEmoji("963180036050018354")


 let kpanel = new disbut.MessageMenu();
 kpanel.setID("kpanel");
 kpanel.setPlaceholder(`Kullanıcı Menüsü`)
 kpanel.addOptions(ozi,ozi1,ozi2,ozi3,ozi4,ozi5,ozi6);

  
 message.channel.send(` **Merhaba \`Merrain\` Üyeleri!** \nSunucumuz içerisinde ulaşmak istediğiniz bilgilere menüden tıklamanız yeterli olucaktır.`, kpanel);

    

    client.on("clickMenu", async (menu) => {
      const member = menu.clicker.member;
      menu.reply.think(true)
      ////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////////

let data = await db.get(`isimler.${member.id}`)
  let sayı = await db.get(`sayı.${member.id}`) || "0"
  let isimler = data.length > 0 ? data.map((value, index) => `${index + 1}. \`${value.isimleri}\` ${value.role ? value.role : " "} (${value.Tür})`).join(`\n`)  : "Bu üyenin isim kayıtı bulunamadı!";

////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////


 let cpuan = db.get(`cezapuan.${member.id}.${message.guild.id}`) || 0
    let data2 = db.get(`moderasyon.${member.id}.${message.guild.id}`) || [];
    
    let sicil = data2.length > 0 ? data2.map((value, index) => `\`${index+1}.\`${client.users.cache.get(value.Yetkili) || value.Yetkili} tarafından [**${value.Sebep}**] sebebiyle cezalandırılmış.  `).join("\n") : "Bu Üyenin Ceza Bilgisi Bulunamadı."


////////////////////////////////////////////////////////////////////////////////////////////

      if (menu.values[0] === "ozi") {
        menu.reply.think(true)
        menu.reply.edit(`Sunucuya Katılma Tarihiniz :  \`${moment(menu.clicker.member.joinedAt).format('D/MMMM/YYYY')}\``)
    }

    if (menu.values[0] === "ozi1") {
      menu.reply.think(true)
        menu.reply.edit(`Üzerinde Bulunan Rollerin Listesi ;
        
${(menu.clicker.member.roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(' ') ? menu.clicker.member.roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(', ') : 'Hiç yok.')}`)
    }

    if (menu.values[0] === "ozi2") {
      menu.reply.think(true)
        menu.reply.edit(`Hesabınızın Açılış Tarihi :  \`${moment(menu.clicker.member.user.createdAt).format("LLL")}\``)
    }

    if (menu.values[0] === "ozi3") {
      menu.reply.think(true)
        menu.reply.edit(`
${menu.clicker.member.toString()}, üyesinin toplam ${sayı} isim verisi bulundu! 

\`İsim Detayları;\`

${isimler}
`)
    }

    if (menu.values[0] === "ozi4") {
      menu.reply.think(true)
        await member.roles.set(Main.Register.unreg);

        menu.reply.edit(`${menu.clicker.member.toString()} üyesi başarıyla kayıtsıza atıldı!`)
    }

    if (menu.values[0] === "ozi5") {
      menu.reply.think(true)
        menu.reply.edit(`
> Sesli kanallardaki üye sayısı : \`${(menu.guild.members.cache.filter((x) => x.voice.channel).size)}\`
> Sunucudaki toplam üye sayısı : \`${(menu.guild.memberCount)}\`
> Sunucunun oluşturulma tarihi: \`${moment(menu.guild.createdAt).locale("tr").format("LLL")}\`
> Sunucu destek numarası : \`${(menu.guild.id)}\`
`)
    }
 if (menu.values[0] === "ozi6") {
   menu.reply.think(true)
        menu.reply.edit(`
${menu.clicker.member.toString()}, üyesinin ${cpuan} ceza puanı bulunmakta!

\`Sicil Detayları;\`

${sicil}
`)
    }
    

    
    
    }
              )
}

module.exports.config = { 
    name: 'menuselect2',
    aliases: []
};