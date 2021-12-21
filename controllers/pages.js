module.exports = function (router) {
    router.get("/about", (req, res) => {
        res.render("pages/about");
    });
};
