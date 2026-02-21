const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, lowercase: true },
    description: { type: String, default: '' },
    image: { type: String, default: '' },
}, { timestamps: true });

// ------------------------------
// Pre-save hook to generate slug
// ------------------------------
categorySchema.pre('save', function () {
    if (this.isModified('name')) {
        this.slug = this.name.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    }
});

// Pre-validate hook to ensure slug exists
categorySchema.pre('validate', function () {
    if (!this.slug && this.name) {
        this.slug = this.name.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    }
});

// ------------------------------
// Serverless-safe export
// ------------------------------
module.exports = mongoose.models.Category || mongoose.model('Category', categorySchema);