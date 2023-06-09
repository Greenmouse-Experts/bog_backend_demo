/* eslint-disable radix */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const easyinvoice = require("easyinvoice");
const fs = require("fs");
const btoa = require("btoa");
const moment = require("moment");

const { invoice } = require("../helpers/invoice");
const Product = require("../models/Product");

exports.createInvoice = async (orderData, user) => {
  const { order_items, orderSlug, contact } = orderData;
  if (!order_items && order_items.length < 1) {
    return false;
  }
  console.log(orderData);

  const myProduct = order_items.map((items) => {
    console.log(items.product);
    return {
      description: items.product.name.substring(0, 27),
      quantity: items.quantity,
      price: parseInt(items.product.price),
      "tax-rate": items.taxrate || 0,
    };
  });

  let _subtotal = 0;
  const _products = orderData.order_items.map((orderItem) => {
    // const productDetails = await Product.findOne({where: {id: }})
    _subtotal += orderItem.product.price * orderItem.quantity;
    return {
      description: orderItem.product.name,
      quantity: orderItem.quantity,
      price: orderItem.product.price.toLocaleString(),
      row_total: (orderItem.product.price * orderItem.quantity).toLocaleString(),
    };
  });

  console.log(_products)

  const invoiceData = {
    logo:
      "https://res.cloudinary.com/yhomi1996/image/upload/v1665783638/bog_moijdl.png",
    document_title: "INVOICE",
    company_from: "Sample Street 123",
    zip_from: "1234 AB",
    city_from: "Lagos",
    country_from: "Nigeria",
    sender_custom_1: "",
    sender_custom_2: "",
    sender_custom_3: "",
    client: {
      address_to: orderData.contact.home_address,
      city_to: "",
      country_to: orderData.contact.country,
      client_custom_1: "",
      client_custom_2: "",
      client_custom_3: "",
    },
    ref: orderSlug,
    date_ordered: moment(new Date()).format("MMMM Do YYYY, h:mm:ss a"),
    delivery_address: orderData.contact.address,
    delivery_time: orderData.contact.delivery_time,
    products: _products,
    subtotal: _subtotal.toLocaleString(),
    delivery_fee: orderData.deliveryFee.toLocaleString(),
    total: (parseInt(_subtotal) + parseInt(orderData.deliveryFee)).toLocaleString(),
  };
  const preparedInvoiceTemplate = invoice(invoiceData);
  const data = {
    customize: {
      template: btoa(preparedInvoiceTemplate),
      // template: fs.readFileSync("./index.html", "base64"),
    },
    // information: {
    //   logo:
    //     "https://res.cloudinary.com/yhomi1996/image/upload/v1665783638/bog_moijdl.png",
    //   "document-title": "BOG LTD",
    //   "company-from": "Sample Street 123",
    //   "zip-from": "1234 AB",
    //   "city-from": "Lagos",
    //   "country-from": "Nigeria",
    //   "sender-custom-1": "",
    //   "sender-custom-2": "",
    //   "sender-custom-3": "",
    //   client: {
    //     address_to: "Sample Home Address",
    //     city_to: "Lagos",
    //     country_to: "Nigeria",
    //     client_custom_1: "",
    //     client_custom_2: "",
    //     client_custom_3: "",
    //   },
    //   ref: orderSlug,
    //   date_ordered: "",
    //   delivery_address: "",
    //   delivery_date: "",
    //   products: [
    //     {
    //       description: "10 trips of sand",
    //       quantity: 2,
    //       price: 4000,
    //       row_total: 4000 * 2,
    //     },
    //   ],
    //   subtotal: 8000,
    //   delivery_fee: 500,
    //   total: 8500,
    // },
  };
  // Create your invoice! Easy!
  const result = await easyinvoice.createInvoice(data);
  // The response will contain a base64 encoded PDF file
  // console.log('PDF base64 string: ', result.pdf);
  fs.writeFileSync(`uploads/${orderSlug}.pdf`, result.pdf, "base64");
  // easyinvoice.download('myInvoice.pdf', result.pdf);

  return true;
};
