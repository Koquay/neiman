const productService = require('./product.service');

exports.getProducts = (req, res) => {
    console.log('productController.req.query', req.query)
    productService.getProducts(req, res);
}

// exports.searchProducts = (req, res) => {
//     productService.searchProducts(req, res);
// }