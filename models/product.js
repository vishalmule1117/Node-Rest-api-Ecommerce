//! Created Product Schema

const mongoose = require("mongoose");
    const reviewSchema = new mongoose.Schema({
        rating: {
          type: Number,
          required: true,
          min: 0,
          max: 5
        },
        comment: {
          type: String,
          trim: true
        },
        date: {
          type: Date,
          default: Date.now
        },
        reviewerName: {
          type: String,
          trim: true
        },
        reviewerEmail: {
          type: String,
          trim: true,
          lowercase: true
        }
      }, { _id: false });
    const dimensionSchema = new mongoose.Schema({
      width: Number,
      height: Number,
      depth: Number
    }, { _id: false });
    
    const metaSchema = new mongoose.Schema({
      createdAt: Date,
      updatedAt: Date,
      barcode: String,
      qrCode: String
    }, { _id: false });
    
    const productSchema = new mongoose.Schema({
      featured: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        required: [true, "Product title is required"],
        trim: true
      },
      description: {
        type: String,
        trim: true
      },
      category: {
        type: String,
        required: true,
        trim: true
      },
      beauty: {
        type: String,
        required: true,
        trim: true
      },
      price: {
        type: Number,
        required: true,
        min: 0
      },
      discountPercentage: {
        type: Number,
        min: 0,
        max: 100
      },
      rating: {
        type: Number,
        min: 0,
        max: 5
      },
      stock: {
        type: Number,
        default: 0
      },
      tags: [String],
      brand: {
        type: String,
        trim: true
      },
      sku: {
        type: String,
        trim: true
      },
      weight: Number,
      dimensions: dimensionSchema,
      warrantyInformation: String,
      shippingInformation: String,
      availabilityStatus: {
        type: String,
        enum: ["In Stock", "Out of Stock", "Preorder"],
        default: "In Stock"
      },
      reviews: [reviewSchema],
      returnPolicy: String,
      minimumOrderQuantity: {
        type: Number,
        default: 1
      },
      meta: metaSchema,
      images: [String],
      thumbnail: String
    }, 
    { timestamps: true });

module.exports = mongoose.model("Product", productSchema);