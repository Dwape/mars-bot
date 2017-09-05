/**
 * Created by Dwape on 9/1/17.
 */

var fs = require('fs');

module.exports = new FileWriter();

//module.exports = [logUser];

function FileWriter(){
    this.logUser = logUser;
}

function logUser(user, userID){
    fs.writeFile("./users/" + user, user, function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
}

