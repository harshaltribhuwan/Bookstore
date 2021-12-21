const Books = require("./../models/books");
const Categories = require("./../models/categories");

module.exports = function (router) {
    router.get("/", (req, res) => {
        const cart = req.session.cart;
        const displayCart = { items: [], total: 0 };
        let total = 0;
        for (let item in cart) {
            displayCart.items.push(cart[item]);
            total += cart[item].qty * cart[item].price;
        }
        displayCart.total = total;
        res.render("cart/index", { cart: displayCart });
    });

    router.post("/:id", (req, res) => {
        req.session.cart = req.session.cart || {};
        const cart = req.session.cart;
        Books.findOne({ _id: req.params.id }, function (err, book) {
            if (err) {
                console.log(err);
            }
            if (cart[req.params.id]) {
                cart[req.params.id].qty++;
            } else {
                cart[req.params.id] = {
                    item: book._id,
                    title: book.title,
                    price: book.price,
                    qty: 1,
                };
            }
            res.redirect("/cart");
        });
    });
};
