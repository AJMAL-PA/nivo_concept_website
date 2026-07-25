const mongoose = require('mongoose');

const GalleryItemSchema = new mongoose.Schema({
  title: { type: String, default: '' },
  img: { type: String, required: true },
  category: { type: String, required: true }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Map _id to id for frontend compatibility
GalleryItemSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

module.exports = mongoose.model('GalleryItem', GalleryItemSchema);
