
require('dotenv').config()

const mongoose = require('mongoose')
mongoose.connect(process.env.DB, {useNewUrlParser: true});

var Schema = mongoose.Schema;

var contactSchema = new Schema({
    id: {type: String, required: true},
    createdBy: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    dataLable: {type: Array},

});

var Contact = mongoose.model('Contacts', contactSchema);

module.exports = function () {

    this.newContact = (req, done) => {

        var contact = req
        var createContact = new Contact(contact)

        createContact.save((err, data) => {
            if (err) {
                console.log(err)
                done(err.name)
            } else {

                done("Created");
            }
        })
    }

    this.getAllContacts = (done) => {
        Contact.find({} , (err, docs) => {
            done(docs)
        })
    }

    this.getMyContacts = (req , done) => {
        Contact.find({createdBy : req } , (err, docs) => {
            done(docs)
        })
    }

    this.updateContact = (req , done) => {

        console.log(req.person.id)
        let updateContactId = req.person.id
        Contact.findOne({id: updateContactId} , (err, doc) => {
            if(err) console.log(err)
            let update = req.person;
            doc.firstName = update.firstName
            doc.lastName = update.lastName
            doc.dataLable = update.dataLable
            doc.save(function (err) {
                if (err) {
                    console.log(err);
                    done('success')
                } 
                
            })
        })
        done
    }
}