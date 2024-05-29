const Product=require("../models/Products")

const addProduct =async (req,res) =>{

    console.log("The request body is: ", req.body);
    const {name, description, category, price,isFeatured} = req.body;
    
    const product = await Product.create({
        description,
        name,
        category,
        price,
        isFeatured,
    });

    res.status(201).json(product);
}


const getProducts = async (req, res) => {
    const products = await Product.find({ isFeatured: true }).limit(5).exec();
    res.render('../views/products.ejs', { products })
}

const getSingleProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send('Story not found');
        }
        if (!req.session.visitedProducts) {
            req.session.visitedProducts = [];
        }
        if (!req.session.visitedProducts.includes(req.params.id)) {
            req.session.visitedProducts.push(req.params.id);
        }

        res.render('productDetail', { product });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).send('Internal Server Error');
    }
};

const vistedProduct=async (req, res) => {
    try {
        if (!req.session.visitedProducts || req.session.visitedProducts.length === 0) {
            return res.render('visited-products', { products: [], user: req.user });
        }

        const visitedProducts = await Product.find({ _id: { $in: req.session.visitedProducts } });
        // res.render('visited-products', { products: visitedProducts, user: req.user });
        res.send(visitedProducts)
    } catch (error) {
        res.status(500).send('Error fetching visited products');
    }
}


module.exports={addProduct,getSingleProduct,getProducts,vistedProduct}