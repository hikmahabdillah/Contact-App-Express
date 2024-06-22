// MANAGE CONTACTS
//  file system
const fs = require("fs");
const validator = require("validator");

// mkdir
const dirpath = "./data";
if (!fs.existsSync(dirpath)) {
  fs.mkdir(dirpath, { recursive: true }, (err) => {
    if (err) throw err;
  });
}

// mkdatapath
const datapath = "./data/contacts.json";
if (!fs.existsSync(datapath)) {
  fs.writeFileSync(datapath, "[]", "utf-8");
}

const loadContact = () => {
  const file = fs.readFileSync("./data/contacts.json", "utf-8"); // read file as string before convert to json
  const contacts = JSON.parse(file); // convert file(type string) to json
  return contacts;
};

const detailContact = (name) => {
  const contacts = loadContact();
  const found = contacts.find((contact) => contact.name === name);
  if (found) {
    console.log(`Path Img : ${found.img}`);
    console.log(`Name : ${found.name}`);
    console.log(`Email : ${found.email}`);
  } else {
    console.log("Data not found!");
  }
  return found;
};

const saveContact = (contacts) => {
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
};

const addContact = (contact) => {
  const contacts = loadContact();
  contacts.push(contact);
  saveContact(contacts)
};

module.exports = {
  loadContact,
  detailContact,
  addContact,
};
