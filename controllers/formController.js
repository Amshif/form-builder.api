const Form = require('../models/UserForm');
const FormSubmission = require("../models/FormSubmission");

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



exports.submitForm = async (req, res) => {
  try {
    const { formId } = req.params;
    const submittedData = req.body; 
    const userId = req.user.id;

    if (!formId || !submittedData) {
      return res.status(400).json({ error: "Form ID and data are required." });
    }

    const formSubmission = new FormSubmission({
      formId,
      userId,
      submittedData,
    });

    await formSubmission.save();

    res.status(201).json({
      message: "Form submitted successfully!",
      submission: formSubmission,
    });
  } catch (error) {
    console.error("Error submitting form:", error.message);
    res.status(500).json({ error: "An error occurred while submitting the form." });
  }
};

exports.getUserSubmissions = async (req, res) => {
  try {
    const userId = req.user.id; 

    
    const submissions = await FormSubmission.find({ userId }).populate("formId", "title");

    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
  
