const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema({
    tic_tac_toe: [
        {
            wins: Number,
            losses: Number
        }
    ],
});

const Stats = mongoose.model('Stats', statsSchema);

module.exports = Stats;
