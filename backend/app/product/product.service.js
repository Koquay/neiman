require("./product.model");
const Product = require("mongoose").model("Product");

exports.getProducts = async (req, res) => {
  console.log("ProductsService.getProducts");

  const sidebarDataFiltersStr = req.query.sidebarDataFilters;

  let sidebarDataFilters;

  const productCountPipeline = [];

  if (sidebarDataFiltersStr) {
    sidebarDataFilters = JSON.parse(req.query.sidebarDataFilters);
  } else {
    sidebarDataFilters = [];
  }
  
  console.log("sidebarDataFilters", sidebarDataFilters);

  const aggregatePipeline = buildAggregatePipeline(
    sidebarDataFilters,
    productCountPipeline
  );
  console.log("aggregatePipeline", aggregatePipeline);

  console.log("aggregatePipeline", JSON.stringify(aggregatePipeline));

  try {
    const products = await Product.aggregate(aggregatePipeline);
    console.log("products", products);
    const productCount = await getProductCount(productCountPipeline);
    console.log("productCount", productCount);
    res.status(200).json({ products, productCount });
  } catch (error) {
    console.error(error);
    res.status(500).send("Problem getting products.");
  }
};

const buildAggregatePipeline = (filters, productCountPipeline) => {
  let { category, priceRanges, ratings, pageNo, pageSize, sortFilter } =
    filters;

  console.log("category", category);

  let aggregatePipeline = [];

  let categoriesMatch = buildCategoriesMatch(category);
  if (categoriesMatch) {
    aggregatePipeline.push(categoriesMatch);
    productCountPipeline.push(categoriesMatch);
  }

  let priceMatch = buildPriceRangeMatch(priceRanges);
  if (priceMatch) {
    aggregatePipeline.push(priceMatch);
    productCountPipeline.push(priceMatch);
  }

  let ratingMatch = buildRatingMatch(ratings);
  if (ratingMatch) {
    aggregatePipeline.push(ratingMatch);
    productCountPipeline.push(ratingMatch);
  }

  // aggregatePipeline.push(buildSortMatch(sortFilter));
  checkForEmptyAggregate(aggregatePipeline);
  checkForEmptyAggregate(productCountPipeline);
  aggregatePipeline.push(buildPageNumberFilter(pageNo, pageSize));
  aggregatePipeline.push(buildPageSizeFilter(pageSize));

  return aggregatePipeline;
};

const buildCategoriesMatch = (category) => {
  if (category === 'All Men') {
    return { $match: { category: { $ne: null } } };
  }
  return { $match: { category: { $eq: category } } };
};

const buildRatingMatch = (ratings) => {
  if (ratings?.length) {
    return { $match: { rating: { $in: ratings } } };
  }
  return null;
};

const buildPriceRangeMatch = (priceRanges) => {
  if (priceRanges?.length) {
    let priceMatches = [];

    for (let priceRange of priceRanges) {
      priceMatches.push({
        $and: [
          { $gte: ["$price", +priceRange.low] },
          { $lte: ["$price", +priceRange.high] },
        ],
      });
    }

    return { $match: { $expr: { $or: priceMatches } } };
  }
};

const buildSortMatch = (sortFilter) => {
  let filter;
  if (sortFilter?.field == "price") {
    filter = { $sort: { price: sortFilter?.logection } };
  } else if (sortFilter?.field == "rating") {
    filter = { $sort: { rating: sortFilter?.logection } };
  }

  return filter;
};

const buildPageNumberFilter = (pageNo, pageSize) => {
  let skip = (pageNo - 1) * pageSize;

  return { $skip: skip };
};

const buildPageSizeFilter = (pageSize) => {
  return { $limit: pageSize };
};

const getProductCount = async (productCountPipeline) => {
  let productCount;
  productCountPipeline.push({ $count: "productCount" });

  productCount = await Product.aggregate(productCountPipeline);

  if (productCount.length) {
    return productCount[0].productCount;
  }

  return 0;
};

const checkForEmptyAggregate = (aggregatePipeline) => {
  if (aggregatePipeline.length === 0) {
    aggregatePipeline.push({ $match: { category: { $ne: null } } });
  }
};
