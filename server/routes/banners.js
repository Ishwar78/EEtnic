import express from 'express';
import Banner from '../models/Banner.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get all banners (public)
router.get('/', async (req, res) => {
  try {
    const banners = await Banner.find({ isActive: true }).sort({ order: 1 });
    res.json({ success: true, banners });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get banners by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const banners = await Banner.find({ category, isActive: true }).sort({ order: 1 });
    res.json({ success: true, banners });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all banners (admin)
router.get('/admin/all', auth, async (req, res) => {
  try {
    const banners = await Banner.find().sort({ category: 1, order: 1 });
    res.json({ success: true, banners });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create banner (admin)
router.post('/', auth, async (req, res) => {
  try {
    const { title, subtitle, description, imageUrl, ctaText, ctaLink, category, isActive, order } = req.body;

    if (!title || !subtitle || !imageUrl || !category || !ctaLink) {
      return res.status(400).json({ success: false, error: 'Required fields missing' });
    }

    const banner = new Banner({
      title,
      subtitle,
      description,
      imageUrl,
      ctaText,
      ctaLink,
      category,
      isActive,
      order,
    });

    await banner.save();
    res.status(201).json({ success: true, banner });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update banner (admin)
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle, description, imageUrl, ctaText, ctaLink, category, isActive, order } = req.body;

    const banner = await Banner.findByIdAndUpdate(
      id,
      {
        title,
        subtitle,
        description,
        imageUrl,
        ctaText,
        ctaLink,
        category,
        isActive,
        order,
      },
      { new: true }
    );

    if (!banner) {
      return res.status(404).json({ success: false, error: 'Banner not found' });
    }

    res.json({ success: true, banner });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete banner (admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const banner = await Banner.findByIdAndDelete(id);

    if (!banner) {
      return res.status(404).json({ success: false, error: 'Banner not found' });
    }

    res.json({ success: true, message: 'Banner deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
