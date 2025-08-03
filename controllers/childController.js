const Child = require('../models/childModel');

// Create child with image support
exports.createChild = async (req, res) => {
  try {
    console.log(req.body)
    const {
      name, age, gender, dateOfBirth, dateOfAdmission,
      vaccinations, allergies
    } = req.body;

    const image = req.file ? `/uploads/${req.file.filename}` : '';

    const child = await Child.create({
      name,
      age,
      gender,
      dateOfBirth,
      dateOfAdmission,
      health: {
        vaccinations,
        allergies
      },
      image
    });

    res.status(201).json({ message: 'Child created successfully.', child });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all children
exports.getChildren = async (req, res) => {
  try {
    const children = await Child.find().sort({ createdAt: -1 });
    res.status(200).json(children);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get child by ID
exports.getChildById = async (req, res) => {
  try {
    const child = await Child.findById(req.params.id);
    if (!child) return res.status(404).json({ message: 'Child not found' });
    res.status(200).json(child);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update child
exports.updateChild = async (req, res) => {
  try {
    // First, find existing child
    const child = await Child.findById(req.params.id);
    if (!child) return res.status(404).json({ message: 'Child not found' });

    // Extract updated fields from body
    const {
      name, age, gender, dateOfBirth, dateOfAdmission,
      vaccinations, allergies
    } = req.body;
    console.log(req.body)

    // Handle image update (optional)
    let updatedImage = child.image; // keep old image by default
    if (req.file) {
      updatedImage = `/uploads/${req.file.filename}`;
    }

    // Update child
    child.name = name;
    child.age = age;
    child.gender = gender;
    child.dateOfBirth = dateOfBirth;
    child.dateOfAdmission = dateOfAdmission;
    child.health.vaccinations = vaccinations;
    child.health.allergies = allergies;
    child.image = updatedImage;

    await child.save();

    res.status(200).json({ message: 'Child updated successfully.', child });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Delete child
exports.deleteChild = async (req, res) => {
  try {
    const child = await Child.findByIdAndDelete(req.params.id);
    if (!child) return res.status(404).json({ message: 'Child not found' });
    res.status(200).json({ message: 'Child deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
