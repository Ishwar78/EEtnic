import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
    trim: true
  },
  customerImage: {
    type: String, // Base64 encoded image or image URL
    required: true
  },
  reviewText: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 5,
    min: 1,
    max: 5
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

export default Review;
