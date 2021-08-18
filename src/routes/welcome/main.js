module.exports = (req, res) => {
    console.log('USER', req.user);
    return res.render('welcome/index', { user: req.user });
}