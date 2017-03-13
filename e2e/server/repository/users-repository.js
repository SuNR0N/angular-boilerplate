const Logger = require('../utils/utils').Logger;

const mockedData = [
    {
        username: 'john.doe',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe'
    }
];
let users = [];

function reset () {
    Logger.info('Resetting users...');
    users.length = 0;
    mockedData.forEach((item) => {
        let clonedUser = JSON.parse(JSON.stringify(item));
        users.push(clonedUser);
    });
}

function findOne (key) {
    let user = users.find((user) => {
        return user.username === key;
    });

    if (!user) {
        Logger.error(`No user exists with username '${key}'`);
    }

    return user;
}

function authenticate (credential) {
    let user = findOne(credential.username);

    if (user) {
        if (user.password === credential.password) {
            user = Object.assign({}, user);
            delete user.password;
        } else {
            Logger.error(`Wrong password provided for user with username '${user.username}'`);
            user = null;
        }
    }

    return user;
}

reset();

module.exports = {
    authenticate
};