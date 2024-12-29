const Form = require('../models/UserForm');

exports.createForm = async (req, res) => {
  try {
    const { title, fields } = req.body;

    const form = new Form({
      title,
      fields,
      createdBy: req.user.id,
    });

    await form.save();
    res.status(201).json({ message: 'Form created successfully!', form });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFormsByUserId = async (req, res) => {
  try {
    const forms = await Form.find({ createdBy: req.params.userId });
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFormById = async (req, res) => {
    try {
      const { formId } = req.params; 
  

      const form = await Form.findById(formId);
  
      if (!form) {
        return res.status(404).json({ error: 'Form not found' });
      }
  
      res.status(200).json(form);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
