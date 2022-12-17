
module.exports = logout = (req, res) => {
    res.clearCookie('jwtoken');
    res.status(200).json({ message: `${req.rootUser.name} successfully logout ...` });
}