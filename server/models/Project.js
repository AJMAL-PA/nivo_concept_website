const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  img: { type: String, default: '' },
  tags: { type: [String], default: [] },
  description: { type: String, default: '' },
  client: { type: String, default: '' },
  location: { type: String, default: '' },
  area: { type: String, default: '' },
  style: { type: String, default: '' },
  duration: { type: String, default: '' },
  year: { type: String, default: '' },
  images: { type: [String], default: [] }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Map _id to id for frontend compatibility
ProjectSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

module.exports = mongoose.model('Project', ProjectSchema);
