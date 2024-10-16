const appointmentModel = require("../models/appointmentModel");
const contactModel = require("../models/contactModel");

// get contact info
const getcontactInfoController = async (req, res) => {
  try {
    const contact = await contactModel.find({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "contact data fetch success",
      data: contact,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in fetching contact details",
    });
  }
};

const createContactController = async (req, res) => {
  try {
    const { firstName, lastName, email, phone,message } = req.body;

    //
    const newContact = new contactModel({
      firstName, lastName, email, phone,message,userId:req.body.userId?req.body.userId:""
    });
    await newContact.save();

    res.status(201).json({
      success: true,
      newContact,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};


module.exports = {
  getcontactInfoController,
  createContactController
};
