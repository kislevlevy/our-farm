// Helper functions:
export default function (template, product) {
  return template
    .replace(/{%PRODUCT_NAME%}/g, product.productName)
    .replace(/{%PRODUCT_IMAGE%}/g, product.image)
    .replace(/{%PRODUCT_PRICE%}/g, product.price * 4)
    .replace(/{%PRODUCT_ORIGIN%}/g, product.from)
    .replace(/{%PRODUCT_NUTRIENTS%}/g, product.nutrients)
    .replace(/{%PRODUCT_QUANTITY%}/g, product.quantity)
    .replace(/{%PRODUCT_DESCRIPTION%}/g, product.description)
    .replace(/{%PRODUCT_ID%}/g, product.id)
    .replace(/{%IS_ORGANIC%}/g, product.organic ? "" : "not-organic");
}
