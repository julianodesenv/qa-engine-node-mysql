const User = require('../../models/index').User;

module.exports = async (req, res) => {

    try {
        const { name, age } = req.body;
        const obj = { name, age, first_access: false, avatar: `https://avatars.dicebear.com/api/male/${req.user.username}.svg` };
        const user = await User.update(obj, { where: { id: req.user.id } });
        return res.redirect(`/t/${req.user.username}`);
    } catch (err) {
        console.log('ERROR:', err);
    }

}