const { Command } = require('commander');
const { listContacts, getContactById, removeContact, addContact, updateContact } = require('./contacts');

const program = new Command();
program
.option("-a, --action <type>", "choose action")
.option("-i, --id <type>", "user id")
.option("-n, --name <type>", "user name")
.option("-e, --email <type>", "user email")
.option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction ({ action, id, name, email, phone }) {
   switch(action) {

    case "list":
        const list = await listContacts();
        console.table(list);
        break;

    case "get":
        const contact = await getContactById(id);
        console.log(contact);
        break;

    case "remove":
        const deletedContact = await removeContact(id);
        console.log(deletedContact);
        break;
    
    case "add":
        const newContact = await addContact(name, email, phone);
        console.log(newContact);
        break;
        
    case "update":
        const newData = await updateContact(id, name, email, phone);
        console.log(newData);
        break;

    default:
        console.warn('\x1B[31m Unknow action type!');
    };
};

invokeAction(argv);