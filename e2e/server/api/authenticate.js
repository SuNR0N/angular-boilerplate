const usersRepository = require('../repository/users-repository');
const HttpStatus = require('../utils/utils').HttpStatus;

function authenticate (req, res) {
    let credential = req.body;
    let user = usersRepository.authenticate(credential);

    if (user) {
        res.status(HttpStatus.OK).json(user);
    } else {
        res.status(HttpStatus.UNAUTHORIZED).end();
    }
}

module.exports = {
    authenticate
};