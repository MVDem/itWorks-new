import { contacts } from '../data/contacts.js';

//console.log(contacts);
/**Array Order Methods */

/**
 * Function that takes the array of contacts and returns a new array sorted by last name.
 * @param {array} arrayContacts array of contacts
 * @returns {array} array of contacts
 */
const getSortedByLast = (arrayContacts) => {
  const result = [...arrayContacts].sort((contact1, contact2) =>
    contact1.name.last > contact2.name.last ? 1 : -1
  );
  return result;
};

//console.log(getSortedByLast(contacts.results));

/**
 * Function to return the array of contacts in reverse order. Do not use the built-in reverse() method.
 * @param {array} arrayContacts array of contacts
 * @returns {array} array of contacts
 */
const getReversedContacts = (arrayContacts) => {
  const result = [];
  //arrayContacts.forEach((contact) => result.unshift(contact));
  for (let i = 0; i < arrayContacts.length; i++) {
    result.unshift(arrayContacts[i]);
  }
  return result;
};

//console.log(getReversedContacts(contacts.results));

/**
 * Function that returns the first 5 contacts from the list.
 * @param {array} arrayContacts array of contacts
 * @returns {array} first 5 contacts from the list
 */
const getFirstFive = (arrayContacts) => {
  return arrayContacts.slice(0, 5);
};

/**
 * Write a function that returns the first 5 contacts from the sorted list (by last name).
 * I used 2 functions
 */
//console.log(getFirstFive(getSortedByLast(contacts.results)));

/**
 * Function that returns an array of all unique first names. No duplicates should be present.
 * @param {array} arrayContacts array of contacts
 * @returns {array | undefined} all unique first names
 */
export const getUniqueFirstNames = (arrayContacts) => {
  const result = [];
  arrayContacts.forEach((contact) => {
    if (!result.includes(contact.name.first)) {
      result.push(contact.name.first);
    }
  });
  return result;
};

//console.log(getUniqueFirstNames(contacts.results));

/**
 * Function that concatenates the first and last name of each contact into a new array of full names.
 * @param {array} arrayContacts array of contacts
 * @returns {string[] | undefined} return full names
 */
export const getFullNames = (arrayContacts) => {
  const result = [];
  arrayContacts.forEach((contact) => {
    const fullName = `${contact.name.first} ${contact.name.last}`;
    if (!result.includes(fullName)) {
      result.push(fullName);
    }
  });
  return result;
};

//console.log(getFullNames(contacts.results));

/**Looping Through Arrays */

/**
 * Function that iterates through the array and logs each contact's email to the console.
 * @param {array} arrayContacts array of contacts
 * @returns {undefined} print to console each contact's email
 */
export const consoleEmails = (arrayContacts) => {
  arrayContacts.forEach((contact) => {
    console.log(contact.email);
  });
};

//consoleEmails(contacts.results);

/**
 * Function that takes an ID as a parameter and returns the contact with that ID.
 * @param {array} arrayContacts array of contacts
 * @param {string} idStr contact ID
 * @returns {object | string | undefined} return contact, or error string if id is not correct or undefined if contacts list doesn't have contact with that ID.
 */
export const getContactByUUID = (arrayContacts, idStr) => {
  if (typeof idStr !== 'string') return 'ID must be a string';
  const result = arrayContacts.find((contact) => contact.id.value === idStr);
  if (result) return result;
};

const uuid = '756.5484.2801.87';
//console.log(getContactByUUID(contacts.results, uuid));

/**
 * Function that counts how many contacts are from a specific country. The country should be a parameter of the function.
 * array.reduce()
 * @param {array} arrayContacts array of contacts
 * @param {string} countryStr specific country name
 * @returns {number | string | undefined} return count how many contacts are from a specific country, or error string if country name is not correct, or undefined if contacts list doesn't have contacts from a specific country
 */
const getCountContactsByCountry = (arrayContacts, countryStr) => {
  if (typeof countryStr !== 'string') return 'country name must be a string';
  return arrayContacts.reduce((acc, contact) => {
    if (contact.location.country === countryStr) {
      return acc + 1;
    }
    return acc;
  }, 0);
};

/**
 * Function that counts how many contacts are from a specific country. The country should be a parameter of the function.
 * array.filter()
 * @param {array} arrayContacts array of contacts
 * @param {string} countryStr specific country name
 * @returns {number | string | undefined} return count how many contacts are from a specific country, or error string if range is not correct, or undefined if contacts list doesn't have contacts from a specific country
 */
export const getCountContactsByCountry1 = (arrayContacts, countryStr) => {
  if (typeof countryStr !== 'string') return 'country name must be a string';
  return arrayContacts.filter(
    (contact) => contact.location.country === countryStr
  ).length;
};

//const countryStr = 'New Zealand';
//console.log(getCountContactsByCountry(contacts.results, countryStr));
//console.log(getCountContactsByCountry1(contacts.results, countryStr));

/**
 * Function that returns a new array of contacts that are within a given age range, e.g., 25 to 35 years old.
 * @param {array} arrayContacts  array of contacts
 * @param {number} fromNum  age from
 * @param {number} toNum  age to
 * @returns {array | string | undefined} return array of contacts, or error string if range is not correct, or undefined if contacts list doesn't have a coincidence
 */
export const getContactsByAgeRange = (arrayContacts, fromNum, toNum) => {
  if (typeof fromNum !== 'number' || typeof toNum !== 'number')
    return 'age range must be a numbers';
  return arrayContacts.filter(
    (contact) => contact.dob.age >= fromNum && contact.dob.age <= toNum
  );
};

//console.log(getContactsByAgeRange(contacts.results, 20, 25));
