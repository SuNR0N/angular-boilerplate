const express = require('express');
const helpers = require('../../config/helpers');

module.exports = (PORT) => {
    if (!PORT) {
        throw new Error('PORT must be defined');
    }

    const app = express();

    app.use('/', express.static(helpers.pathFromRoot('dist')));

    app.use('/api/test', (req, res) => {
        res.status(200).json({
            hello: 'world'
        });
    });

    app.listen(PORT, 'localhost', () => {
        console.log(`Backend server is running at http://localhost:${PORT}`);
    });
};