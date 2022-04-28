const Discord = require('discord.js')
const client = new Discord.Client({ fetchAllMembers: true })
const fs = require('fs')
const Main = require('./src/Settings/Settings.json');
const config = require('./src/Settings/Config.json');
const moment = require('moment');
const ms = require('ms');
const db = require('quick.db');
require('discord-buttons')(client)
const Activites = new Map();
const { settings } = require('cluster');

const express = require("express")
const app = express()
app.get("/foo", (req, res, next) => {
    const foo = JSON.parse(req.body.jsonString)
})
process.on("unhandledRejection", (reason, promise) => {})


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.cooldown = new Set();

client.on('ready', async () => {
client.user.setStatus("online");
setInterval(() => {
const oyun = Math.floor(Math.random() * (Main.oynuyor.length));
client.user.setActivity(`${Main.oynuyor[oyun]}`, {type: "LISTENING"});
}, 10000);
})
client.on("ready", () => {
setInterval(() => {
  client.channels.cache.get(Main.BotVoice).join(); //SES KANALI İDSİ GİRİN!
}, 750);
 });
client.on('voiceStateUpdate', async (___, newState) => {
  if (
  newState.member.user.bot &&
  newState.channelID &&
  newState.member.user.id == client.user.id &&
  !newState.selfDeaf
  ) {
  newState.setSelfDeaf(true);
  }
  });
console.log("Bot Kullanıma Hazır! Kevzyy Was Here")
fs.readdir('./src/Command/Moderation', (err, files) => { 
    files.forEach(fs => { 
    let command = require(`./src/Command/Moderation/${fs}`); 
    client.commands.set(command.config.name, command);
    if(command.config.aliases) command.config.aliases.forEach(Aliases => client.aliases.set(Aliases, command.config.name));
    });
  });

  fs.readdir('./src/Command//Register', (err, files) => { 
    files.forEach(fs => { 
    let command = require(`./src/Command/Register/${fs}`); 
    client.commands.set(command.config.name, command);
    if(command.config.aliases) command.config.aliases.forEach(Aliases => client.aliases.set(Aliases, command.config.name));
    });
  });

  fs.readdir('./src/Command/Guild', (err, files) => { 
    files.forEach(fs => { 
    let command = require(`./src/Command/Guild/${fs}`); 
    client.commands.set(command.config.name, command);
    if(command.config.aliases) command.config.aliases.forEach(Aliases => client.aliases.set(Aliases, command.config.name));
    });
  });

  fs.readdir('./src/Command/Stat', (err, files) => { 
    files.forEach(fs => { 
    let command = require(`./src/Command/Stat/${fs}`); 
    client.commands.set(command.config.name, command);
    if(command.config.aliases) command.config.aliases.forEach(Aliases => client.aliases.set(Aliases, command.config.name));
    });
  });

  client.on('message', async message => {
    if (!message.guild || message.author.bot || message.channel.type === 'dm') return;
    let prefix = Main.Prefix.filter(p => message.content.startsWith(p))[0]; 
    if (!prefix) return;
    let args = message.content.split(' ').slice(1);
    let command = message.content.split(' ')[0].slice(prefix.length); 
    let load = client.commands.get(command) || client.commands.get(client.aliases.get(command));
    
    if (load){
     if (!message.member.hasPermission(8) && client.cooldown.has(message.author.id)) return;
      client.cooldown.add(message.author.id);
      setTimeout(() => client.cooldown.delete(message.author.id), 5);
      load.beta(client, message, args);
    };
  });


client.on('guildMemberAdd', async member => {
    require('moment-duration-format')
    var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
    var üs = üyesayısı.match(/([0-9])/g)
    üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
    if(üs) {
     üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
       return {
         '0': `0`, 
         '1': `1`,
         '2': `2`,
         '3': `3`,
         '4': `4`,
         '5': `5`,
         '6': `6`,
         '7': `7`,
         '8': `8`,
         '9': `9`}[d];})}
         let user = client.users.cache.get(member.id);
         const kurulus = new Date().getTime() - user.createdAt.getTime();  
         const gecen = moment.duration(kurulus).format(` YY **[Yıl]** DD **[Gün]** HH **[Saat]**`) 
         var kontrol;
         if (kurulus < 1296000000) kontrol = `**güvenilir gözükmüyorsun** ${config.Diger.onay}`
         if (Date.now() - member.user.createdTimestamp <= 1000 * 60 * 60 * 24 * 7) {
    await member.setRoles(config.Roller.Jailed);
           await member.roles.remove(config.Register.unreg)
    client.channels.cache.get(config.Log.HosgeldinKanal).send(`
${member.toString()}, sunucumuza hoşgeldin. Hesabın 1 Hafatadan Önce Açıldığı İçin Cezalı Duruma Düştün!

Hesabın açılma tarihi: \`${moment(member.user.createdAt).format("LLL")}\`
	  `);
  } else {
         if (kurulus > 1296000000) kontrol = `**güvenilir gözüküyorsün.** ${config.Diger.onay}`
           moment.locale("tr");
     await member.roles.add(config.Register.unreg)
         await member.setNickname(Main.Tag + " İsim | Yaş")
         client.channels.cache.get(config.Log.HosgeldinKanal).send(`
<@`+ member + `> (\``+ member.id + `\`) Sunucumuza hoşgeldin.
         
Hesabın \``+gecen+`\` süresinde kurulduğu için `+kontrol+`

**__Sunucuya erşebilmek için solda bulunan ★ Confirmation odalarına geçerek kayıt olmalısın.__**

Ayrıca <#${config.Log.Kurallar}> kanalından kurallarımızı okumayı unutma!
         
🎉🎉🎉 Seninle beraber **`+üyesayısı+`** kişiye ulaştık. (<@&${config.Yetkili.registerYT}>) `)
  }
     });
client.on('guildMemberAdd', async (member) => {
  let muteli = db.fetch(`muteli.${member.id}.${member.guild.id}`)
  let zaman =  db.fetch(`süre.${member.id}.${member.guild.id}`)
  if(!muteli) return;
  if(muteli == 'muteli'){
    member.roles.add(config.Roller.Muted)
    client.channels.cache.get(config.Log.MuteLog).send(new Discord.MessageEmbed().setDescription(`${member} Sunucumuza giriş yaptı. Cezalıyken çıkış yaptığı için tekrardan cezasını verdim.`))
 
    setTimeout(async () => {
      client.channels.cache.get(config.Log.MuteLog).send(new Discord.MessageEmbed().setDescription(`${member} Yazılı kanallardan susturması sona erdi. Muhabbet etmeye devam edebilir.`))
      await db.delete(`muteli.${member.id}.${member.guild.id}`)
      await db.delete(`süre.${member.id}.${message.author.id}`)
      await member.roles.remove(config.Roller.Muted)
    }, ms(zaman));
  }
});

client.on('guildMemberAdd', async (member) => {
  let cezali = db.fetch(`cezalı.${member.id}.${member.guild.id}`)
  let zaman = db.fetch(`süre.${member.id}.${member.guild.id}`)
  if(!cezali) return;
  if(cezali == 'cezalı'){
    member.roles.cache.has(config.Roller.Booster) ? member.roles.set([config.Roller.Booster, config.Roller.Jailed]) : member.roles.set([config.Roller.Jailed])
    client.channels.cache.get(config.Log.JailLog).send(new Discord.MessageEmbed().setDescription(`${member} Sunucumuza giriş yaptı. Datasında kayıtlı ceza bulunduğu için bulunan cezayı tekrardan işledim.`))
    setTimeout(async () => {
      client.channels.cache.get(config.Log.JailLog).send(new Discord.MessageEmbed().setDescription(`${member} Sunucuda ki cezası kaldırıldı. Tekrardan sesli ve yazılı kanallara ulaşabilir.`))
      await db.delete(`cezalı.${member.id}.${message.guild.id}`)
      await db.delete(`süre.${member.id}.${message.author.id}`)
      await member.roles.remove(config.Roller.Jailed)
      await member.roles.add(config.Register.unreg)
    }, ms(zaman));
  }
});

client.on('guildMemberAdd', async (member) => {
  let vmuteli = db.fetch(`vmuteli.${member.id}.${member.guild.id}`)
  let zaman = db.fetch(`süre.${member.id}.${member.guild.id}`)
  if(!vmuteli) return;
  if(vmuteli == 'vmuteli'){
    client.channels.cache.get(config.Log.VMuteLog).send(new Discord.MessageEmbed().setDescription(`${member} Sunucumuza giriş yaptı. Datasında kayıtlı ceza bulunduğu için bulunan cezayı tekrardan işledim.`))
    await member.roles.add(config.Roller.VMuted)

    setTimeout(async () => {
      client.channels.cache.get(config.Log.MuteLog).send(new MessageEmbed().setDescription(`${member} Yazılı kanallardan susturması sona erdi. Muhabbet etmeye devam edebilir.`))
      await db.delete(`vmuteli.${member.id}.${member.guild.id}`)
      await db.delete(`süre.${member.id}.${member.author.id}`)
      await member.roles.remove(config.Roller.VMuted)
    }, ms(zaman));
}});



client.on("message" , message => {
    if(!message.guild) return;
   if (message.content.includes(`afk`)) return;
    let etiket = message.mentions.users.first()
    let uye = db.fetch(`user_${message.author.id}_${message.guild.id}`)
    let nickk = db.fetch(`nick_${message.author.id}_${message.guild.id}`)
    if(etiket){
      let reason = db.fetch(`sebep_${etiket.id}_${message.guild.id}`)
      let uye2 = db.fetch(`user_${etiket.id}_${message.guild.id}`)
      if(message.content.includes(uye2)){
      let time = db.fetch(`afktime_${message.guild.id}`);
      let timeObj = ms(Date.now() - time);
        message.channel.send(new Discord.MessageEmbed().setDescription(`${etiket} adlı kullanıcı **${reason}** sebebiyle \`${timeObj}\` süresi boyunca afk.`).setColor("RANDOM"))}}
  if(message.author.id === uye){  
      message.member.setNickname(nickk)
      db.delete(`sebep_${message.author.id}_${message.guild.id}`)
      db.delete(`user_${message.author.id}_${message.guild.id}`)
      db.delete(`nick_${message.author.id}_${message.guild.id}`)
      db.delete(`user_${message.author.id}_${message.guild.id}`);
      db.delete(`afktime_${message.guild.id}`)
      message.reply(`**Başarıyla \`AFK\` modundan çıkış yaptın.**`)
    }  
  });

client.on('message', async message => {
const maxTime = await db.fetch(`max.${message.guild.id}.${message.author.id}`);
const timeout = await db.fetch(`time.${message.guild.id}.${message.author.id}`);
db.add(`mesaj.${message.guild.id}.${message.author.id}`, 1)
if(timeout) {
const sayı = await db.fetch(`mesaj.${message.guild.id}.${message.author.id}`);
if(Date.now() < maxTime) {
 if (message.member.hasPermission("BAN_MEMBERS")) return ;
  return message.delete();
  
}
} else {
db.set(`time.${message.guild.id}.${message.author.id}`, 'ok');
db.set(`max.${message.guild.id}.${message.author.id}`, Date.now()+3000);
setTimeout(() => {
db.delete(`mesaj.${message.guild.id}.${message.author.id}`);
db.delete(`time.${message.guild.id}.${message.author.id}`);
}, 500)
}
});

client.on("messageDelete", async(message) => {
  if (message.channel.type === "dm" || !message.guild || message.author.bot) return;
  let snipe = {
    mesaj: message.content,
    mesajyazan: message.author.id,
    ytarihi: message.createdTimestamp,
    starihi: Date.now(), 
    kanal: message.channel.id
  }
await db.set(`snipe.${message.guild.id}`, snipe)
});

client.on('voiceStateUpdate', async (oldState, newState) => {
  let LogKanal = newState.guild.channels.cache.get(config.Log.SesLog);
  if (!oldState.channelID && newState.channelID) return LogKanal.send(`\`${newState.guild.members.cache.get(newState.id).displayName}\` üyesi \`${newState.guild.channels.cache.get(newState.channelID).name}\` adlı sesli kanala **katıldı!**`).catch();
  if (oldState.channelID && !newState.channelID) return LogKanal.send(`\`${newState.guild.members.cache.get(newState.id).displayName}\` üyesi \`${newState.guild.channels.cache.get(oldState.channelID).name}\` adlı sesli kanaldan **ayrıldı!**`).catch();
  if (oldState.channelID && newState.channelID && oldState.channelID != newState.channelID) return LogKanal.send(`\`${newState.guild.members.cache.get(newState.id).displayName}\` üyesi ses kanalını **değiştirdi!** (\`${newState.guild.channels.cache.get(oldState.channelID).name}\` => \`${newState.guild.channels.cache.get(newState.channelID).name}\`)`).catch();
  if (oldState.channelID && oldState.selfMute && !newState.selfMute) return LogKanal.send(`\`${newState.guild.members.cache.get(newState.id).displayName}\` (**${newState.guild.members.cache.get(newState.id).id}**) üyesi \`${newState.guild.channels.cache.get(newState.channelID).name}\` adlı sesli kanalda kendi susturmasını **kaldırdı!**`).catch();
  if (oldState.channelID && !oldState.selfMute && newState.selfMute) return LogKanal.send(`\`${newState.guild.members.cache.get(newState.id).displayName}\` (**${newState.guild.members.cache.get(newState.id).id}**) üyesi \`${newState.guild.channels.cache.get(newState.channelID).name}\` adlı sesli kanalda kendini **susturdu!**`).catch();
  if (oldState.channelID && oldState.selfDeaf && !newState.selfDeaf) return LogKanal.send(`\`${newState.guild.members.cache.get(newState.id).displayName}\ (**${newState.guild.members.cache.get(newState.id).id}**) üyesi \`${newState.guild.channels.cache.get(newState.channelID).name}\` adlı sesli kanalda kendi sağırlaştırmasını **kaldırdı!**`).catch();
  if (oldState.channelID && !oldState.selfDeaf && newState.selfDeaf) return LogKanal.send(`\`${newState.guild.members.cache.get(newState.id).displayName}\` (**${newState.guild.members.cache.get(newState.id).id}**) üyesi \`${newState.guild.channels.cache.get(newState.channelID).name}\` adlı sesli kanalda kendini **sağırlaştırdı!**`).catch();
});


client.on("channelDelete",async (channel, message) => {
  const entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'}).then(audit => audit.entries.first());
  let embed = new Discord.MessageEmbed();
  embed

  .setAuthor(
    channel.guild.name + ": Bir Kanal Silindi",
    channel.guild.iconURL())
    .setDescription(

      `**#${channel.name}**(\`${channel.id}\`) Adlı Kanal Silindi.\n\n Silen Kişi **<@${entry.executor.id}>** (\`${entry.executor.id}\`) \n\n Silinen Kanal Türü : **${channel.type}**`
    )
    .setThumbnail(entry.executor.avatarURL({dynamic:true}))
    .setColor("#E70000");
    return client.channels.cache.get(config.Log.ModLog).send(embed);
});

client.on("channelCreate", async function(channel)  {
  const entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_CREATE'}).then(audit => audit.entries.first());
  let embed = new Discord.MessageEmbed();
  embed.setAuthor(
    channel.guild.name + ": Bir Kanal Oluşturuldu",
    channel.guild.iconURL() )
      .setDescription(
     `<#${channel.id}>(\`${channel.id}\`) Adlı Kanal Oluşturuldu.\n\n Oluşturan Kişi : <@${entry.executor.id}> (\`${entry.executor.id}\`) \n\n Oluşturulan Kanal Türü : **${channel.type}**`
 )
    .setThumbnail (entry.executor.avatarURL({dynamic:true}))
    .setColor("#E70000");

  return client.channels.cache.get(config.Log.ModLog).send(embed);
});

client.on("channelPinsUpdate", async function(channel, time) {

  const entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_UPDATE'}).then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed();

  embed

    .setAuthor(channel.guild.name + ": Sabitlemelerde Değişiklik Yapıldı", channel.guild.iconURL())

    .setDescription(

      ` **#${channel.name}**(\`${channel.id}\`) adlı kanal'da Sabitlemelerde Değişiklik Tespit Edildi.\n\n Yapan Kişi : <@${entry.executor.id}>(\`${entry.executor.id}\`) \n\n Yapılan Zaman : **${time}**`

    )

. setThumbnail (entry.executor.avatarURL({dynamic:true}))

    .setColor("#E70000");

  return client.channels.cache.get(config.Log.ModLog).send(embed);

});

client.on("channelUpdate", async function(oldChannel, newChannel) {
let channel = oldChannel;
  const entry = await channel.guild.fetchAuditLogs({type : "CHANNEL_UPDATE"}).then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed();

  

  embed

    .setAuthor(

      channel.guild.name + ": Bir Kanal Güncellendi",

      channel.guild.iconURL()

    )

    .setDescription(

      ` **#${channel.name}**(\`${channel.id}\`) Adlı Kanal'da Değişiklik Yapıldı.\n\n Yapan Kişi : **<@${entry.executor.id}>**(\`${entry.executor.id}\`) \n\n Değişiklik Yapılan Kanal Türü : ${channel.type}`

    )

    .setColor("#E70000");

  return client.channels.cache.get(config.Log.ModLog).send(embed);

});

client.on("emojiCreate", async function(emoji) {

  const entry = await emoji.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'}).then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed();

  let emojis = emoji;

  embed

    .setAuthor(emoji.guild.name + ": Bir Emoji Eklendi", emoji.guild.iconURL())

    .setDescription(`Sunucuya Yeni Bir Emoji Eklendi => (${emoji}) \n\n Emojiyi Ekleyen Kişi : **<@${entry.executor.id}>**(\`${entry.executor.id}\`)`)

    .setColor("#E70000")

  .setThumbnail(entry.executor.avatarURL({dynamic:true}));

  return client.channels.cache.get(config.Log.ModLog).send(embed);

});

client.on("emojiDelete", async function(emoji) {

  const entry = await emoji.guild.fetchAuditLogs({type:'CHANNEL_DELETE'}).then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed();

  let emojise = emoji;

  embed

    .setAuthor(emoji.guild.name + ":Bir Emoji Silindi", emoji.guild.iconURL())

    .setDescription(`**${emoji.name}** (\`${emoji.id}\`) Adlı Emoji Sunucudan Silindi.\n\n Silen Kişi : **<@${entry.executor.id}> ** (\`${entry.executor.id}\`)`)

    .setColor("#E70000")

  . setThumbnail (entry.executor.avatarURL({dynamic:true}));

  return client.channels.cache.get(config.Log.ModLog).send(embed);

});

client.on("emojiUpdate", async function(oldEmoji, newEmoji) {

  const entry = await oldEmoji.guild.fetchAuditLogs({type : 'CHANNEL_DELETE'}).then(autdit => autdit.entries.first());

  let embed = new Discord.MessageEmbed();

  let channel = oldEmoji;

  embed

    .setAuthor(channel.guild.name + ": Emoji Güncellendi", channel.guild.iconURL())

    .setDescription(`Bir Emoji Güncellendi Güncellenen Emoji => **${newEmoji}**(\`${newEmoji.id}\`) \n\n Emojiyi Güncelleyen Kişi :** <@${entry.executor.id}>**(\`${entry.executor.id}\`)`)

    .setColor("#E70000")

  .setThumbnail(entry.executor.avatarURL({dynamic:true}));

  return client.channels.cache.get(config.Log.ModLog).send(embed);

});



client.on("guildBanAdd", async(guild, user) => {


const entry = await guild.fetchAuditLogs().then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed();
embed




   

    .setDescription(

      `**${user.username}**(\`${user.id}\`) Adlı Kullanıcı Sunucudan Banlandi\n\n Banlayan Kişi **<@${entry.executor.id}>**(\`${entry.executor.id}\`)`

    )
. setThumbnail (entry.executor.avatarURL({dynamic:true}))
    .setColor("#E70000")



.setTimestamp()


client.channels.cache.get(config.Log.ModLog).send(embed)

})

client.on("guildBanRemove", async(guild, user, message) => {


const entry = await guild.fetchAuditLogs({type: "MEMBER_BAN_REMOVE"}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()

  

  embed

 
. setThumbnail (entry.executor.avatarURL({dynamic:true}))
    .setDescription(

      `**${user.username}**(\`${user.id}\`) Adlı Kullanıcının Banı Açıldı.\n\n Banını Açan Kişi : **<@${entry.executor.id}>**(\`${entry.executor.id}\`)`

    )

    .setColor("#E70000")




.setTimestamp()
                                 


client.channels.cache.get(config.Log.ModLog).send(embed)

})
client.on("guildMemberAdd", function(member) {

  let embed = new Discord.MessageEmbed();

  embed

    .setAuthor(`${member.guild.name}: Sunucuya Biri Katıldı`, member.guild.iconURL())

    .setColor("#E70000")

 . setThumbnail (member.user.avatarURL({dynamic:true}))

    .setDescription(

      `**${member.user.tag}**(\`${member.id}\`) Sunucuya Katıldı \n\n Hesapının Kuruluş Tarihi : **${member.user.createdAt}**`

    );

  return client.channels.cache.get(config.Log.ModLog).send(embed);

});

client.on("guildMemberRemove", function(member) {

  let embed = new Discord.MessageEmbed();

  embed

    .setAuthor(`${member.guild.name}: Sunucudan Biri Ayrıldı`, member.guild.iconURL())

    .setColor("#E70000")

 
 . setThumbnail (member.user.avatarURL({dynamic:true}))
    .setDescription(

      `**${member.user.tag}**(\`${member.id}\`) Sunucudan Ayrıldı`

    );

  return client.channels.cache.get(config.Log.ModLog).send(embed);

});


client.on("guildUpdate", function(oldGuild, newGuild) {

  let guild = oldGuild;

  let embed = new Discord.MessageEmbed();

  embed

    .setAuthor(`${guild.name}: Sunucu Güncellendi`, guild.iconURL())

    .setColor("#E70000")

    .setDescription(`Sunucu Güncellendi\n\n Güncellenmiş Olabilecek Şeyler : İsim, Sunucu İcon , Sunucu Banner vs`);

  return client.channels.cache.get(config.Log.ModLog).send(embed);

});

client.on("messageDelete", async function(message) {

  let embed = new Discord.MessageEmbed();

  if (message.partial) {

   

    embed

      .setAuthor(

        `${message.guild.name}: Bir Mesaj Silindi`,

        message.guild.iconURL()

      )
    .setThumbnail(message.author.avatarURL({dynamic:true}))
      .setColor("#E70000")

      .setDescription(`Bir Mesaj Silindi. \n Silinen Kanal : <#${message.channel.id}>`)



    return client.channels.cache.get(config.Log.ModLog).send(embed);

  }

  embed

    .setAuthor(

      `${message.guild.name}: Bir Mesaj Silindi`,

      message.guild.iconURL()

    )

  

    .setColor("#E70000")

    .setDescription(

      `${message.author.username}(\`${message.author.id}\`) bir mesaj sildi.\n Sildiği Kanal : <#${message.channel.id}>`

    )

    .addField("Bir Mesaj Silindi", message.content || "Bilgi Yok")

    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }));

  return client.channels.cache.get(config.Log.ModLog).send(embed);

});

client.on("messageDeleteBulk", function(messages) {

  let embed = new Discord.MessageEmbed();

  embed

    .setAuthor(

      `${messages.array()[0].guild.name}: Çoklu Mesaj Silindi!`,

      messages.array()[0].guild.iconURL()

    )

    .setColor("#E70000")

    .setDescription(

      `**${messages.array()[0].author.username}**(\`${
        messages.array()[0].author.id
      }\`) Adlı Kullanıcı **${messages.size}** adet Mesaj Sildi! ** \n\n Sildiği Kanal :<#${
        messages.array()[0].channel.id
      }>**`

    );

  return client.channels.cache.get(config.Log.ModLog).send(embed);

});

client.on("messageReactionAdd", async function(messageReaction, user) {

  let message;

  try {

    message = await messageReaction.fetch();

  } catch (err) {

    message = messageReaction;

  }

  let embed = new Discord.MessageEmbed();

  embed

    .setAuthor(

      `${message.message.channel.guild.name}: Bir Mesaja Emoji Eklendi!`,

      message.message.channel.guild.iconURL()

    )

    .setColor("#E70000")

    .setDescription(`Bir Mesaja Tepki Eklendi!`)

    .addField(

      "Mesaj Bilgileri",

      `ID: ${message.message.id}\nMesaj: ${message.message.content ||
        "Mesaj Bilgisi Yok"}\n Yapan: ${message.message.author.username ||
        "Bulunamadı!"}`

    )

    .addField(

      "Emoji Bilgileri",

      `Ekleyen Kişi: ${user.username}\nID: ${user.id}\nEmoji: ${message._emoji.name}`

    )

    .setThumbnail(user.displayAvatarURL({ formate: "jpg" }));

  return client.channels.cache.get(config.Log.ModLog).send(embed);

});

client.on("messageReactionRemove", async function(messageReaction, user) {

  let message;

  try {

    message = await messageReaction.fetch();

  } catch (err) {

    message = messageReaction;

  }

  let embed = new Discord.MessageEmbed();

  embed

    .setAuthor(

      `${message.message.channel.guild.name}: Tepki Kaldırıldı`,

      message.message.channel.guild.iconURL()

    )

    .setColor("#E70000")

    .setDescription(`Bir Mesajdan Tepki Kaldırıldı`)

    .addField(

      "Mesaj Bilgileri Aşağıda",

      `ID: ${message.message.id}\n Mesaj: ${message.message.content ||
        "Mesaj Bilgisi Yok"}\n Yapan: ${message.message.author.username ||
        "Yok"}`

    )

    .addField(

      "Tepki Bilgisi",

      `Tepkiyi Kaldıran: ${user.username}\nID: ${user.id}\nEmoji: ${message._emoji.name}`

    )

    .setThumbnail(user.displayAvatarURL({ formate: "jpg" }));

  return client.channels.cache.get(config.Log.ModLog).send(embed);

});

client.on("messageReactionRemoveAll", async function(message) {
const entry = await message.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'}).then(audit => audit.entries.first());


let embed = new Discord.MessageEmbed();

  embed

    .setAuthor(

      `${message.guild.name}: Bir Mesajdaki Bütün Emojiler Kaldırıldı!`,

      message.guild.iconURL()

    )
. setThumbnail (entry.executor.avatarURL({dynamic:true}))
    .setColor("YELLOW")

    .setDescription(

      ` **<#${message.channel.id}>** (\`${message.channel.id}\`) Adlı Kanal'da Bir Mesajdaki Emojiler Silindi!\n\n Kaldıran Kişi <@${entry.executor.id}>(\`${entry.executor.id}\`)`

    );

  return client.channels.cache.get(config.Log.ModLog).send(embed);

});

client.on("messageUpdate", async function(oldMessage, newMessage) {

  let main = await oldMessage.fetch();

  if (oldMessage.content === newMessage.content) return;

  let message = newMessage;

  let embed = new Discord.MessageEmbed();

  embed

    .setAuthor(`${message.guild.name}: Mesaj Düzenlendi`, message.guild.iconURL())

    .setColor("#E70000")

  .setThumbnail(oldMessage.author.avatarURL({dynamic:true}))

  .addField("Eski Mesajı",`\`${oldMessage.content}\``)

  .addField("Yeni Mesajı",`\`${newMessage.content}\``)

    .setDescription(`<#${message.channel.id}> Adlı Kanal'da Bir Mesaj Düzenlendi.\n Düzenleyen : **${main.author}**\n Düzenlenen Mesaj İçin: [TIKLA](https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`

    );

  return client.channels.cache.get(config.Log.ModLog).send(embed);

});



client.on("roleCreate",async function(role) {
const entry = await role.guild.fetchAuditLogs().then(audit => audit.entries.first());


let embed = new Discord.MessageEmbed();

  embed

    .setAuthor(role.guild.name + ": Bir Rol Oluşturuldu!!", role.guild.iconURL())

    .setDescription(

      ` **${role.name}**(\`${role.id}\`) Adlı Rol Oluşturuldu!\n\n Oluşturan Kişi : <@${entry.executor.id}>(\`${entry.executor.id}\`)`

    )

  . setThumbnail (entry.executor.avatarURL({dynamic:true}))
    .setColor("#E70000");

  return client.channels.cache.get(config.Log.ModLog).send(embed);

});

client.on("roleDelete", async function(role) {
const entry = await role.guild.fetchAuditLogs().then(audit => audit.entries.first());


let embed = new Discord.MessageEmbed();

  embed

    .setAuthor(role.guild.name + ": Bir Rol Silindi!", role.guild.iconURL())

    .setDescription(`**${role.name}**(\`${role.id}\`) Adlı Rol Silindi!\n\n Silen Kişi : <@${entry.executor.id}>(\`${entry.executor.id}\`)`)
. setThumbnail (entry.executor.avatarURL({dynamic:true}))
    .setColor("#E70000");

  return client.channels.cache.get(config.Log.ModLog).send(embed);

});



client.on("inviteCreate", async function (message)  {

  

const entry = await message.guild.fetchAuditLogs({type: 'INVITE_CREATE'}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed();

  embed

  .setAuthor(message.guild.name+ ": Bir Davet Oluşturuldu",message.guild.iconURL())

  .setColor('#E70000')

  .setThumbnail(entry.executor.avatarURL({dynamic:true}))

  .setDescription(`Davet Link : ${message} \n\n Daveti Oluşturan :** <@${entry.executor.id}>**(\`${entry.executor.id}\`)`)

 return client.channels.cache.get(config.Log.ModLog).send(embed);

});

client.on("inviteDelete",async function (message) {

  const entry = await message.guild.fetchAuditLogs({type: 'INVITE_DELETE'}).then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed();

  embed

  .setAuthor(message.guild.name+": Bir Davet Silindi ", message.guild.iconURL())

  .setColor('#E70000')

  . setThumbnail (entry.executor.avatarURL({dynamic:true}))

  .setDescription (`Silinen Davet Linki : ${message} \n\n Daveti Silen Kişi **<@${entry.executor.id}>**(\`${entry.executor.id}\`)`)

 return client.channels.cache.get(config.Log.ModLog).send(embed);

  });


client.on("guildMemberRoleRemove", async(member, role) => {
  const entry = await member.guild.fetchAuditLogs({type: ''}).then(audit => audit.entries.first());
 

          let embed = new Discord.MessageEmbed();
          embed
                .setAuthor(`${member.user.username}${member.user.discriminator}`, member.user.avatarURL({dynamic:true}))
                .setColor('#E70000')
                .setFooter(client.user.username, client.user.avatarURL())
                .setDescription(`✍️ <@${member.user.id}> **Adlı Kişiden Rol alındı!**`)
                .addField("Alınan Rol:", `${client.emotes.no} ${role}`, true)
  .addField(`Rolü Alan Kişi`, `**<@${entry.executor.id}>**(\`${entry.executor.id}\`)`)
                .setThumbnail(member.user.avatarURL({dynamic:true}))
                .setTimestamp();
client.channels.cache.get(config.Log.ModLog).send(embed);
        
});
client.on("guildMemberRoleAdd",async (member, role) => {
const entry = await member.guild.fetchAuditLogs({type: ''}).then(audit => audit.entries.first());
 

          let embed = new Discord.MessageEmbed();
embed
                .setAuthor(`${member.user.username}${member.user.discriminator}`, member.user.avatarURL({dynamic:true}))

                .setColor('#E70000')

                .setFooter(client.user.username, client.user.avatarURL())

                .setDescription(`✍️ <@${member.user.id}> **Kullanıcıya Bir Rol Verildi!**`)

                .addField("Verilen Rol:", `${client.emotes.yes} ${role}`, true)
.addField(`Rolü Veren Kişi`, `**<@${entry.executor.id}>**(\`${entry.executor.id}\`)`)
                .setThumbnail(member.user.avatarURL({dynamic:true}))

                .setTimestamp();
client.channels.cache.get(config.Log.ModLog).send(embed);
        

});

client.on("guildMemberNicknameUpdate", async(member, oldNickname, newNickname) => {
  const entry = await member.guild.fetchAuditLogs({type: ''}).then(audit => audit.entries.first());
 

          let embed = new Discord.MessageEmbed();
             embed   .setAuthor(`${member.user.username}${member.user.discriminator}`, member.user.avatarURL({dynamic:true}))
                .setColor('#E70000')
                .setFooter(client.user.username, client.user.avatarURL())
                .setDescription(`✍️ <@${member.user.id}> **Adlı Kullanicinin İsmi Sunucu'da Değişti!.** \n\n Değiştiren Kişi : **<@${entry.executor.id}>**(\`${entry.executor.id}\`)`)
                .addField("Eski İsim: ", `\`\`\`${oldNickname}\`\`\`` || `\`\`\`${member.user.username}\`\`\``, true)
                .addField("Yeni İsim: ", `\`\`\`${newNickname}\`\`\`` || `\`\`\`${member.user.username}\`\`\``, true)
                .setThumbnail(member.user.avatarURL({dynamic:true}))
                .setTimestamp();
client.channels.cache.get(config.Log.ModLog).send(embed);
    
});
client.on("guildMemberBoost", (member) => {
    
              let embed = new Discord.MessageEmbed();
                 embed   .setAuthor(`${member.guild.name}`, member.user.avatarURL({dynamic:true}))
                    .setColor("#E70000")
                    .setFooter(client.user.username, client.user.avatarURL())
                    .setDescription(`${client.emotes.boost} **<@${member.user.id}>**(\`${member.user.id}\`) Adlı Kullanıcı** Sunucuya Boost Bastı!**`)
                    .setThumbnail(member.user.avatarURL({dynamic:true}))
                    .setTimestamp();
    
  client.channels.cache.get(config.Log.ModLog).send(embed);
});

client.on("guildMemberUnboost", (member) => {
  
    
             let embed = new Discord.MessageEmbed();
                    embed.setAuthor(`${member.guild.name}`, member.user.avatarURL({dynamic:true}))
                    .setColor("#E70000")
                    .setFooter(client.user.username, client.user.avatarURL())
                    .setDescription(`${client.emotes.boost} **<@${member.user.id}>**(\`${member.user.id}\`) **Adlı Kullanıcı Boostunu Çekti!**`)
                    .setThumbnail(member.user.avatarURL({dynamic:true}))
                    .setTimestamp();
    
          
  client.channels.cache.get(config.Log.ModLog).send(embed);
});

client.on("guildBoostLevelUp", (guild, oldLevel, newLevel) => {
     
    
              let embed = new Discord.MessageEmbed();
                 embed   .setAuthor(`${guild.name}`, guild.iconURL({dynamic:true}))
                    .setColor("#E70000")
                    .setFooter(client.user.username, client.user.avatarURL())
                    .setDescription(`${client.emotes.boost} **Sunucunun Boost Seviyesi Arttı!**`)
                    .addField("Eski Level: ", `\`\`\`${oldLevel}\`\`\``, true)
                    .addField("Yeni Level: ", `\`\`\`${newLevel}\`\`\``, true)
                    .setThumbnail(guild.iconURL({dynamic:true}))
                    .setTimestamp();
    
         
  client.channels.cache.get(config.Log.ModLog).send(embed);
});

client.on("guildBoostLevelDown", (guild, oldLevel, newLevel) => {
   
    
              let embed = new Discord.MessageEmbed();
                embed    .setAuthor(`${guild.name}`, guild.iconURL({dynamic:true}))
                   .setColor("#E70000")
                    .setFooter(client.user.username, client.user.avatarURL())
                    .setDescription(`${client.emotes.boost} **Sunucunun Boost Seviyesi Düştü!!**`)
                    .addField("Eski Level: ", `\`\`\`${oldLevel}\`\`\``, true)
                    .addField("Yeni Level: ", `\`\`\`${newLevel}\`\`\``, true)
                    .setThumbnail(guild.iconURL({dynamic:true}))
                    .setTimestamp();
    
             
  client.channels.cache.get(config.Log.ModLog).send(embed);
});

client.on('guildRegionUpdate',async (guild, oldRegion, newRegion) => {
    
      const oldUpper = oldRegion.charAt(0).toUpperCase() + oldRegion.substring(1);
      const newUpper = newRegion.charAt(0).toUpperCase() + oldRegion.substring(1);
          
  
              let embed = new Discord.MessageEmbed();
                 embed .setAuthor(guild.name, guild.iconURL({dynamic:true}))
                .setColor("#E70000")
                  .setFooter(client.user.username, client.user.avatarURL({dynamic:true}))
                  .setDescription(`⚒️ **Sunucu Bölgesi Değiştirildi!** `)
                  .addField("Eski Bölge ", `\`\`\`${oldUpper}\`\`\``, true)
                  .addField("Yeni Bölge ", `\`\`\`${newUpper}\`\`\``, true)
  .setThumbnail(guild.iconURL({dynamic:true}))
                  .setTimestamp();
  
            
  client.channels.cache.get(config.Log.ModLog).send(embed);
});

client.on("guildBannerAdd", (guild, bannerURL) => {
      
  
              let embed = new Discord.MessageEmbed();
                 embed  .setAuthor(guild.name, guild.iconURL({dynamic:true}))
                  .setColor("#E70000")
                  .setFooter(client.user.username, client.user.avatarURL({dynamic:true}))
                  .setDescription('⚒️ **Sunucu Banner Değişti!**')
                  .setImage(bannerURL)
                  .setTimestamp();
  
              
  client.channels.cache.get(config.Log.ModLog).send(embed);
});

client.on("guildVanityURLAdd", (guild, vanityURL) => {
      
            let embed = new Discord.MessageEmbed();
               embed   .setAuthor(guild.name, guild.iconURL({dynamic:true}))
                   .setColor("#E70000")
                  .setFooter(client.user.username, client.user.avatarURL({dynamic:true}))
                  .setDescription('⚒️ **Özel URL Eklendi!**')
                  .addField('Özel URL:', vanityURL, false)
                  .setThumbnail(guild.iconURL({dynamic:true}))
                  .setTimestamp();
  
             
  client.channels.cache.get(config.Log.ModLog).send(embed);
});
client.on("guildVanityURLRemove", (guild, vanityURL) => {
      
  
              let embed = new Discord.MessageEmbed();
                embed  .setAuthor(guild.name, guild.iconURL({dynamic:true}))
                   .setColor("#E70000")
                  .setFooter(client.user.username, client.user.avatarURL({dynamic:true}))
                  .setDescription('⚒️ **Özel URL Kaldırıldı!!**')
                  .addField('Özel URL:', `\`\`\`${vanityURL}\`\`\``, false)
                  .setThumbnail(guild.iconURL({dynamic:true}))
                  .setTimestamp();
  
             
  client.channels.cache.get(config.Log.ModLog).send(embed);
});

client.on("guildVanityURLUpdate", (guild, oldVanityURL, newVanityURL) => {
      
  
          let embed = new Discord.MessageEmbed();
                  embed .setAuthor(guild.name, guild.iconURL({dynamic:true}))
                 .setColor("#E70000")
                  .setFooter(client.user.username, client.user.avatarURL({dynamic:true}))
                  .setDescription('⚒️ **Özel URL Değiştirildi!**')   
                  .addField('Eski Özel URL:', `\`\`\`${oldVanityURL}\`\`\``, true)
                  .addField('Yeni Özel URL:', `\`\`\`${newVanityURL}\`\`\``, true)
                  .setThumbnail(guild.iconURL({dynamic:true}))
                  .setTimestamp();
  
              
  client.channels.cache.get(config.Log.ModLog).send(embed);
});

client.on("guildOwnerUpdate", (oldGuild, newGuild) => {
     
  
              let embed = new Discord.MessageEmbed();
                  embed .setAuthor(newGuild.name, newGuild.iconURL({dynamic:true}))
                  .setColor("#E70000")
                  .setFooter(client.user.username, client.user.avatarURL({dynamic:true}))
                  .setDescription('⚒️ **Sunucu Sahipi Değişti !**')   
                  .addField('Eski Sunucu Sahipi:', `<@${oldGuild.owner.id}>`, true)
                  .addField('Yeni Sunucu Sahipi:', `<@${newGuild.owner.id}>`, true)
                  .setThumbnail(newGuild.iconURL({dynamic:true}))
                  .setTimestamp();
  

  client.channels.cache.get(config.Log.ModLog).send(embed);
});

client.login(process.env.token).catch(() => console.log('Tokeni kontrol ediniz.'))


client.on("userUpdate", async function(oldUser, newUser) { 
    const guildID = "963393789043564664"
    const roleID = "963430328674975796"
    const tag = "ꐟ"
    const etiket = "3001"
    const chat = "965298332354351215"
    const taglog = "965270189996392488"
  
    const guild = client.guilds.cache.get(guildID)
    const role = guild.roles.cache.find(roleInfo => roleInfo.id === roleID)
    const member = guild.members.cache.get(newUser.id)
    const embed = new Discord.MessageEmbed().setAuthor(member.displayName, member.user.avatarURL({ dynamic: true })).setColor('#ff0010').setTimestamp().setFooter('Kevzyy Was Here!');
    if (newUser.username !== oldUser.username) {
        if (oldUser.username.includes(tag) && !newUser.username.includes(tag)) {
            member.roles.remove(roleID)
            client.channels.cache.get(taglog).send(embed.setDescription(`${newUser} Kullanıcısı tagımızı çıkardığı için taglı rolü alındı!`))
        } else if (!oldUser.username.includes(tag) && newUser.username.includes(tag)) {
            member.roles.add(roleID)
            client.channels.cache.get(chat).send(`**Mükemmel! ${newUser} Tagımızı alarak ailemize katıldı!**`)
            client.channels.cache.get(taglog).send(embed.setDescription(`${newUser} Kullanıcısı tagımızı aldığı için taglı rolü verildi!`))
        }
    }
   if (newUser.discriminator !== oldUser.discriminator) {
        if (oldUser.discriminator == (etiket) && newUser.discriminator !== (etiket)) {
            member.roles.remove(roleID)
            client.channels.cache.get(taglog).send(embed.setDescription(`${newUser} Kullanıcısı etiket tagımızı çıkardığı için taglı rolü alındı!`))
        } else if (oldUser.discriminator !== (etiket) && newUser.discriminator == (etiket)) {
            member.roles.add(roleID)-
            client.channels.cache.get(taglog).send(embed.setDescription(`${newUser} Kullanıcısı etiket tagımızı aldığı için taglı rolü verildi!`))
            client.channels.cache.get(chat).send(`**Mükemmel! ${newUser} Etiket tagımızı alarak ailemize katıldı!**`)
        }
    }
  
  })



     
     let iltifatSayi = 0;
let iltifatlar = [
  "Kevzyy Seni Çok Seviyor.",
  "Kevzyy Yazmanı Bekliyor.",
    "Yaşanılacak en güzel mevsim sensin.",
    "Sıradanlaşmış her şeyi, ne çok güzelleştiriyorsun.",
    "Gönlüm bir şehir ise o şehrin tüm sokakları sana çıkar.",
    "Birilerinin benim için ettiğinin en büyük kanıtı seninle karşılaşmam.",
    "Denize kıyısı olan şehrin huzuru birikmiş yüzüne.",
    "Ben çoktan şairdim ama senin gibi şiiri ilk defa dinliyorum.",
    "Gece yatağa yattığımda aklımda kalan tek gerçek şey sen oluyorsun.",
    "Ne tatlısın sen öyle. Akşam gel de iki bira içelim.",
    "Bir gamzen var sanki cennette bir çukur.",
    "Gecemi aydınlatan yıldızımsın.",
    "Ponçik burnundan ısırırım seni",
    "Bu dünyanın 8. harikası olma ihtimalin?",
    "fıstık naber?",
    "Dilek tutman için yıldızların kayması mı gerekiyor illa ki? Gönlüm gönlüne kaydı yetmez mi?",
    "Süt içiyorum yarım yağlı, mutluluğum sana bağlı.",
    "Müsaitsen aklım bu gece sende kalacak.",
    "Gemim olsa ne yazar liman sen olmadıktan sonra...",
    "Gözlerimi senden alamıyorum çünkü benim tüm dünyam sensin.",
    "Sabahları görmek istediğim ilk şey sensin.",
    "Mutluluk ne diye sorsalar- cevabı gülüşünde ve o sıcak bakışında arardım.",
    "Hayatım ne kadar saçma olursa olsun, tüm hayallerimi destekleyecek bir kişi var. O da sensin, mükemmel insan.",
    "Bir adada mahsur kalmak isteyeceğim kişiler listemde en üst sırada sen varsın.",
    "Sesini duymaktan- hikayelerini dinlemekten asla bıkmayacağım. Konuşmaktan en çok zevk aldığım kişi sensin.",
    "Üzerinde pijama olsa bile, nasıl oluyor da her zaman bu kadar güzel görünüyorsun? Merhaba, neden bu kadar güzel olduğunu bilmek istiyorum.",
    "Çok yorulmuş olmalısın. Bütün gün aklımda dolaşıp durdun.",
    "Çocukluk yapsan da gönlüme senin için salıncak mı kursam?",
    "Sen birazcık huzur aradığımda gitmekten en çok hoşlandığım yersin.",
    "Hangi çiçek anlatır güzelliğini? Hangi mevsime sığar senin adın. Hiçbir şey yeterli değil senin güzelliğine erişmeye. Sen eşsizsin...",
    "Rotanızı geçen her geminin ışığıyla değil, yıldızlara göre ayarlayın.",
    "Telaşımı hoş gör, ıslandığım ilk yağmursun.",
    "Gülüşün ne güzel öyle- cumhuriyetin gelişi gibi..."
];
     
     client.on("message", async (message) => {
    if (!message.guild) return 
    let iltifat = iltifatlar[Math.floor(Math.random() * iltifatlar.length)];
    if (message.channel.id === "965298332354351215") 
        iltifatSayi++;
        if (iltifatSayi >= 20){
            iltifatSayi = 0;
            message.reply(iltifat);
    };
     
     
     
   })

 client.on("message", async message => {
   if ([".tag", "!tag", "tag"].some(x => message.content === x)) {
        message.channel.send(`\`${Main.Tag}\``)
    }
 })



client.on('message', async message => {
if (message.content === '.fakekatıl') { // . yerine prefixi yaz
  client.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
    }
})



