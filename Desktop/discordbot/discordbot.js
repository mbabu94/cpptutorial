  
const Discord = require('discord.js');
const fetch = require('node-fetch');//Fetches our loveley data
const querystring = require('querystring');

const client = new Discord.Client();//Our lovely discord client
const prefix = '!';

const trim = (str, max) => str.length > max ? `${str.slice(0, max - 3)}...` : str;

client.once('ready', () => {
	console.log('Ready!');
});///Shows if we are ready.

client.on('message', async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'cat') {
		const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());//This will give a picture of a cat
		//Picture of a cat the cat one is buggy




		message.channel.send(file);
	} else if (command === 'urban') {
		if (!args.length) {// If theres nothing next to urban, this will print
			return message.channel.send('You need to supply a search term!');
		}

		const query = querystring.stringify({ term: args.join(' ') });

		const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json());//It will grab the first one in the list

		if (!list.length) {// if search does not exist
			return message.channel.send(`No results found for **${args.join(' ')}**.`);
		}

		const [answer] = list;

		

		message.channel.send(list[0].definition);//grab the first element :) and our data is posted. Once you guys finish editing i shall put brain.js for spelling errors
	}
});


const token = 'NzM2NjY3MTM1MDU2ODA1OTU5.XxyIuw.vOXg-in_rDkL-QUvjps1wopQVZs'
client.login(token);