const Answer = require('./../../models/index').Answers;

module.exports = async (req, res) => {
    try {
        const answer = await Answer.create(req.body);
        if (!answer) {
            return res.redirect('/404');
        }

        return res.redirect('/');

    } catch (err) {
        console.log('ERROR:', err);
    }
}