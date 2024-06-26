const asyncHandler = require("express-async-handler")
const Contact = require("../Models/contactModel")


// @desc get all contacts
//@route get api/contacts
// @acces private

const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({user_id : req.user.id})
    res.status(200).json(contacts)
});


// @desc create new contacts
//@route post api/contacts
// @acces private

const createContact = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fileds Are Mandetary")
    }

    const contact = await Contact.create({
        name, email, phone,
        user_id : req.user.id
    });
    res.status(201).json(contact)
})



// @desc  display  contact
//@route post api/contacts:id
// @acces private

const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found")
    }
    res.status(200).json(contact);
})

// @desc update contacts
//@route post api/contacts:id
// @acces private

const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found")
    }


    if(contact.user_id.toString()!== req.user.id){
        res.status(403)
        throw new Error("User permission Ont Grant")
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id, req.body, { new: true }
    )
    res.status(200).json(updatedContact);
})


// @desc delete contacts
//@route post api/contacts:id
// @acces private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found")
    }

    
    if(contact.user_id.toString()!== req.user.id){
        res.status(403)
        throw new Error("User permission Ont Grant")
    }


    const deletedContact = await Contact.findByIdAndDelete(req.params.id)
    res.status(200).json(deletedContact);
})


module.exports = { getContact, getContacts, updateContact, deleteContact, createContact };