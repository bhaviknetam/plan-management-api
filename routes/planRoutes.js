const express = require('express');
const router = express.Router();
const Plan = require('../models/Plan');

// Create a new plan
router.post('/', async (req, res) => {
    try {
        const plan = new Plan(req.body);
        await plan.save();
        res.status(201).json(plan);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all plans
router.get('/', async (req, res) => {
    try {
        const { category, duration, minPrice, maxPrice, sortBy } = req.query;
        let query = {};

        // Apply filters
        if (category) query.category = category;
        if (duration) query.duration = duration;
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        // Build sort object
        let sort = {};
        if (sortBy) {
            const [field, order] = sortBy.split(':');
            sort[field] = order === 'desc' ? -1 : 1;
        }

        const plans = await Plan.find(query).sort(sort);
        res.json(plans);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a specific plan
router.get('/:id', async (req, res) => {
    try {
        const plan = await Plan.findById(req.params.id);
        if (!plan) return res.status(404).json({ message: 'Plan not found' });
        res.json(plan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a plan
router.put('/:id', async (req, res) => {
    try {
        const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!plan) return res.status(404).json({ message: 'Plan not found' });
        res.json(plan);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a plan
router.delete('/:id', async (req, res) => {
    try {
        const plan = await Plan.findByIdAndDelete(req.params.id);
        if (!plan) return res.status(404).json({ message: 'Plan not found' });
        res.json({ message: 'Plan deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;