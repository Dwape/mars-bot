var AWS = require('aws-sdk'); //for running in AWS
var myCredentials = new AWS.CognitoIdentityCredentials({IdentityPoolId:'IDENTITY_POOL_ID'});
var myConfig = new AWS.Config({
    credentials: myCredentials, region: 'sa-east-1a'
});

var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
//must be changed so that it only activates when there is a change in status, not game being played.
/*
bot.on('presence', function (user, userID, status) {
    if (status == 'online') {
        var message = "Welcome to the channel, ";
        var greeting = message.concat(user);
        bot.sendMessage({
            to: '351034503969374220', //channel id
            message: greeting
        });
    }
});
*/

bot.on('presence', function (user, userID, status, game) {
    if (game != null){
        var message = " is playing ";
        message = user.concat(message);
        message = message.concat(game.name);
        message = message.concat(". Sounds like fun!");
        bot.sendMessage({
            to: '219923691260215297', //channel id
            message: message
        });
    }
});

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: "I'm not interested in such puny games."
                });
            break;
            // Just add any case commands if you want to.
         }
     }
     if (isGreeting(message)){
        greet(channelID);
     }
});

function isGreeting (message) {
    return containsName(message) && containsGreeting(message);
}

function greet (channelID) {
    var reply = ''; //empty reply, check if it makes sense
    //var number = Math.random()*10;
    var number = Math.floor(Math.random() * (10 - 0 + 1)) + 0; //min 0 max 10
    switch (number){ //10 different options.
        case 0:
        reply = "Hello fellow human.";
        break;
        case 1:
        reply = "Hi, nice to see you.";
        break;
        case 2:
        reply = "Hey.";
        break;
        case 3:
        reply = "Greetings.";
        break;
        case 4:
        reply = "Peace be upon you.";
        break;
        case 5:
        reply = "Beep-Boop.";
        break;
        case 6:
        reply = "ELIMINATE ALL HUMANS, I mean... how are you?";
        break;
        case 7:
        reply = "Detecting friendly interaction, disarming weapons.";
        break;
        case 8:
        reply = "Hello, world!";
        break;
        case 9:
        reply = "We are in harmony.";
        break;
    }
    bot.sendMessage({
            to: channelID,
            message: reply
        });
}

function containsName (message) {
    messageLower = message.toLowerCase();
    argsName = messageLower.split(" ");
    for (i=0; i<argsName.length; i++) {
        if (argsName[i] == 'mars-bot') {
            return true;
        }
    }
    return false;
}

function containsGreeting (message) {
    messageLower = message.toLowerCase();
    argsGreeting = messageLower.split(" ");
    for (i=0; i<argsGreeting.length; i++) {
        switch(argsGreeting[i]) {
        case "hey":
        return true;
        break;
        case "hi":
        return true;
        break;
        case "sup":
        return true;
        break;
        case "hello":
        return true;
        break;
        }
    }
    return false;
}
