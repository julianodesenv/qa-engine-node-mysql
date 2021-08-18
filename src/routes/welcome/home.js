const User = require('./../../models/index').User;

module.exports = async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        if (user && user.first_access) {
            return res.render('welcome/index', { user: req.user });
        }

        return res.redirect('/');

    } catch (err) {
        console.log('ERROR', err);
    }
}