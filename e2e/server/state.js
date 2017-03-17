let currentUser = null;

function getCurrentUser() {
    return currentUser;
}

function setCurrentUser(value) {
    currentUser = value;
}

function hasCurrentUser() {
    return currentUser !== null;
}

module.exports = {
    getCurrentUser,
    setCurrentUser,
    hasCurrentUser
}