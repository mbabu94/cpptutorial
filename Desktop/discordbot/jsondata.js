const api = "https://jsonplaceholder.typicode.com/posts";
const snekfetch = require('snekfetch');


const snekfetch = require('snekfetch');


module.exports.run =async(bot,message,args) => {
    snekfetch.get(api).then(r => {
        let body = r.body;
        let id = args[0];
        if(!id) return message.channel.send("Suppy")
    });
}

module.exports.help = {
    name: "json"
}
