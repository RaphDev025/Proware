const Image = require('../Models/ImageModel');

const createImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Image file is required' });
        }

        const image = await Image.create({
            data: req.file.buffer,
            contentType: req.file.mimetype,
        });

        res.status(200).json(image);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createImage };
