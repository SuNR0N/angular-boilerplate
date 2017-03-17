const usersRepository = require('../repository/users-repository');
const HttpStatus = require('../utils/utils').HttpStatus;
const JWT = require('../utils/utils').JWT;
const state = require('../state');

function authenticate (req, res) {
    let credential = req.body;
    let user = usersRepository.authenticate(credential);

    if (user) {
        state.setCurrentUser(user);
        JWT.addToken({ response: res, subject: user.username });
        res.status(HttpStatus.OK).json(user);
    } else {
        res.status(HttpStatus.UNAUTHORIZED).end();
    }
}

module.exports = {
    authenticate
};