const Discord = require('discord.js');
let csl = "965270193561534485"
let csr = "963778880156602488"

module.exports.beta = async(client, message, args) => {

if(!message.member.roles.cache.has(csr) && !message.member.hasPermission('ADMINISTRATOR')) return;

if(!args[0]) return message.channel.send(':x: Bir hata oluştu: Üyelerin bulunduğu kanalın idsini girmelisin.');
if(!message.guild.channels.cache.filter(a => a.type === 'voice').find(x => x.id === args[0])) return message.channel.send('Bir hata oluştu: '+args[0]+' idli bir kanal bulamadım.');

if(!args[1]) return message.channel.send(`Bir hata oluştu: ${args[0]} kanalında ki üyeleri taşayacağım kanalın idsini yazmadın.`);
if(!message.guild.channels.cache.filter(a => a.type === 'voice').find(x => x.id === args[1])) return message.channel.send('Bir hata oluştu: '+args[1]+' idli bir kanal bulamadım.');

let çekiliyor = message.guild.channels.cache.filter(a => a.type === 'voice').find(x => x.id === args[0])
let aktarılacak = message.guild.channels.cache.filter(a => a.type === 'voice').find(x => x.id === args[1]);
if(çekiliyor === aktarılacak) return message.channel.send(':x: Bir hata oluştu: Üyelerin çekileceği kanalın üyelerin taşınacağı kanal ile aynı olmaması gerekiyor.');
interval = 100,
increment = 1;
çekiliyor.members.forEach(function(member)  {
var runner = setTimeout(function() {
member.voice.setChannel(aktarılacak.id);
clearTimeout(runner);
}, interval * increment);
increment = increment +1;
});

message.channel.send(`Başarılı bi şekilde **${çekiliyor}** - \`${çekiliyor}\` kanalındaki üyeler **${aktarılacak}** - \`${aktarılacak}\` kanalına taşındı!`).then(msg => msg.delete({ timeout: 10000 }))
client.channels.cache.get(csl).send(`Toplu Çekme Uygulandı! komut\n kullanan yetkili: \`${message.author.tag}\` - (\`${message.author.id}\`)`);
}; 



module.exports.config = { 
    name: 'toplutaşı',
};