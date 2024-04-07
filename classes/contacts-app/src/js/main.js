let globalPageNum = 1;
let globalLimit = 10;
const backBtn = document.querySelector('[data-prev]');
const nextBtn = document.querySelector('[data-next]');
const pageCountEl = document.querySelector('#page-count');
const pageLimitEl = document.querySelector('#page-limit');

function init(pageNum) {
  toggleButtons(pageNum);
  pageCountEl.textContent = pageNum;
  getContacts(pageNum)
    .then((contacts) => {
      renderContacts(contacts);
    })
    .catch((error) => {
      console.error(error);
    });
}

async function getContacts(pageNum, limit = globalLimit) {
  const response = await fetch(
    `https://randomuser.me/api/?page=${pageNum}&results=${limit}&seed=abc`
  );
  const {
    results: contacts,
    info: { page },
  } = await response.json();
  globalPageNum = page;
  return contacts;
}

function renderContacts(contacts) {
  //console.log('🚀 ~ renderContacts ~ contacts:', contacts);
  const tbody = document.querySelector('#table-body');
  let htmlStr = '';
  contacts.forEach((contact) => {
    const name = Object.values(contact.name).join(' ');
    htmlStr += `<tr>
                    <td><img src='${contact.picture.thumbnail}' alt='${name}'/></td>
                    <td>${name}</td>
                    <td>${contact.email}</td>
                    <td>${contact.phone}</td>
                </tr>`;
  });
  tbody.innerHTML = htmlStr;
}

function toggleButtons(pageNum) {
  pageNum <= 1
    ? backBtn.setAttribute('disabled', true)
    : backBtn.removeAttribute('disabled');
  pageNum >= 100
    ? nextBtn.setAttribute('disabled', true)
    : nextBtn.removeAttribute('disabled');
}

backBtn.addEventListener('click', () => {
  //console.log('🚀 ~ globalPageNum:', globalPageNum);
  init(globalPageNum - 1);
});

nextBtn.addEventListener('click', () => {
  //console.log('🚀 ~ globalPageNum:', globalPageNum);
  init(globalPageNum + 1);
});

pageLimitEl.addEventListener('change', (event) => {
  globalLimit = Number(event.target.value);
  init(globalPageNum);
});

init(globalPageNum);
