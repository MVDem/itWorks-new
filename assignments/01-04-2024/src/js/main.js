import { contacts } from '../data/contacts.js';

//onsole.log(contacts);

const searchInputEl = document.querySelector('#search-input');
const mainContainerEl = document.querySelector('.main-container');

searchInputEl.addEventListener('input', (event) => {
  event.preventDefault();
  const searchParam = validateParam(event.target.value);
  const searchResult = getContactByName(contacts.results, searchParam);
  renderResult(searchResult);
});

const validateParam = (text) => {
  if (!isNaN(getPhoneNumber(text)) && getPhoneNumber(text).length) {
    return { param: 'phone', value: text };
  }
  return { param: 'name', value: text };
};

const getContactByName = (arrayContacts, params) => {
  switch (params.param) {
    case 'name':
      if (!params.value.length) return null;
      return arrayContacts.filter(
        (contact) =>
          contact.name.first
            .toLowerCase()
            .includes(params.value.toLowerCase()) ||
          contact.name.last.toLowerCase().includes(params.value.toLowerCase())
      );
    case 'phone':
      if (!params.value.length) return null;
      return arrayContacts.filter((contact) =>
        getPhoneNumber(contact.phone).includes(getPhoneNumber(params.value))
      );
  }
};

const getPhoneNumber = (phoneStr) => {
  const result = phoneStr.replaceAll(/\D/g, '');
  return result;
};

const renderResult = (resultArr) => {
  const resultContainerEl = document.querySelector('#result-container');
  if (resultContainerEl) mainContainerEl.removeChild(resultContainerEl);
  if (resultArr?.length > 0) {
    const resultEl = document.createElement('div');
    resultEl.classList.add('result-container');
    resultEl.setAttribute('id', 'result-container');
    let htmlStr = '<ul>';
    for (let i = 0; i < resultArr?.length; i++) {
      htmlStr += `
        <li>
            <p>${resultArr[i].name.first} ${resultArr[i].name.last} - ${resultArr[i].phone}</p>
        </li>`;
    }
    htmlStr += '</ul>';
    resultEl.innerHTML = htmlStr;
    mainContainerEl.appendChild(resultEl);
  }
};
