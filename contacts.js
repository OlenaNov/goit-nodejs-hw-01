const { log } = require('console');
const fs = require('fs/promises');
const { nanoid } = require('nanoid');
const path = require('path');
require('colors');

const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts = async () => {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
};

const getContactById = async id => {
    const contactId = String(id);
    const contacts = await listContacts();
    const contact = contacts.find(item => item.id === contactId);
    return contact || null;
};

const removeContact = async id => {
    const contactId = String(id);
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === contactId);
    if(idx === -1) {
        return null;
    };
    const [removedContact] = contacts.splice(idx, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return removedContact;
};

const addContact = async (name, email, phone) => {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone
    };

    const uniquenessControl = () => contacts.some(item => item.name === newContact.name);
    if(!uniquenessControl) {
        return console.log(`Contact with the name ${newContact.name} is already in the list`.red);
    };

    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
};

const updateContact = async (id, name, email, phone) => {
    const contactId = String(id);
    const contacts = await listContacts();
    
    const newData = {
        id,
        name,
        email,
        phone
    };

    const idx = contacts.findIndex(item => item.id === contactId);
    if(idx === -1) {
        return null;
    };
    contacts[idx] = newData;
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[idx];
}

module.exports= {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact
};