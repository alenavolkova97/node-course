const Product = require("../models/product");

// actions = controllers = middleware functions

exports.getProductsPage = (req, res, next) => {
  // Product.findAll()
  req.user.getProducts()
    .then((products) => {
      res.render("admin/products", { 
        prods: products,
        pageTitle: "Admin products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getAddProductPage = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add product", 
    path: "/admin/add-product",
    editing: false,
  })
};

exports.postAddProduct = (req, res, next) => {
  const {title, imageUrl, description, price} = req.body;

  req.user.createProduct({ // id will be auto assigned
    title: title,
    imageUrl: imageUrl,
    description: description,
    price: price,
  })
  .then((result) => {
    console.log("Product has been created!");
    res.redirect('/admin/products');
  }).catch((err) => console.log(err));

  // Product.create({ // id will be auto assigned
  //   title: title,
  //   imageUrl: imageUrl,
  //   description: description,
  //   price: price,
  //   // userId: req.user.id, // another way of adding userId
  // }).then((result) => {
  //   console.log("Product has been created!");
  //   res.redirect('/admin/products');
  // }).catch((err) => console.log(err)); // create => create el + save to database, build => just create 
};

exports.getEditProductPage = (req, res, next) => { // leave it as here we are sure that we will get only products for this user
  const { edit } = req.query;

  if (!edit) {
    return res.redirect("/");
  }

  const { productId } = req.params;

  // req.user.getProducts({ where : { id: productId } }).then((products) => {products[0]...});

  Product.findById(productId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }

      res.render("admin/edit-product", {
        editing: edit === "true",
        product,
        pageTitle: "Edit product", 
        path: null,
      });
    })
    .catch((err) => console.log(err))
};

exports.postEditProduct = (req, res, next) => { // leave it as here we are sure that we will get only products for this user
  const { productId, title, imageUrl, description, price } = req.body;

  Product.findById(productId)
    .then((product) => {
      product.title = title;
      product.imageUrl = imageUrl;
      product.description = description;
      product.price = price;
      
      return product.save();
      // product should be the same object
      // not to nest it then().catch((err) => console.log(err)); to current then we can add return and create another then
    })
    .then((saveResult) => {
      console.log("saveResult", saveResult);
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {  // leave it as here we are sure that we will get only products for this user
  const { productId } = req.body;

  Product.findById(productId)
    .then((product) => {
      return product.destroy();
    })
    .then((destroyResult) => {
      console.log(destroyResult);
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));

  // another way of doing the same
  // Product.destroy({where: { id: productId }});
};

