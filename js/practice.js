const loadPhone = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url)
    const data = await res.json()
    displayPhones(data.data, dataLimit)

};
const displayPhones = (phones, dataLimit) => {
    const phoneContainer = document.getElementById('phones-container');
    phoneContainer.textContent = '';
    // display phone only 10
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none')

    }
    else {
        showAll.classList.add('d-none')
    }

    // display no phone found
    const noPhones = document.getElementById('no-found-message');
    if (phones.length === 0) {
        noPhones.classList.remove('d-none')
    }
    else {
        noPhones.classList.add('d-none')
    }

    phones.forEach(phone => {
        const phoneDiv = document.createElement('div')
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML = `
        <div class="card p-4">
                        <img src="${phone.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${phone.phone_name}</h5>
                            
                            <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                                to additional content. This content is a little bit longer.</p>
                                <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
                                
                        </div>
                    </div>
        `;
        phoneContainer.appendChild(phoneDiv);
    })
    // stop spinner loading 
    toggoleSpinner(false);
};

const processSearch = (dataLimit) => {
    // start spinner loading 
    toggoleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, dataLimit);
};

document.getElementById('search-btn').addEventListener('click', function () {
    processSearch(10);
});
const toggoleSpinner = (isLoading) => {
    const loaderSpinner = document.getElementById('loader');
    if (isLoading) {
        loaderSpinner.classList.remove('d-none')
    }
    else {
        loaderSpinner.classList.add('d-none')
    }
};

// not best way to load show all 
document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch();
});
const loadPhoneDetails = async id => {
    const url = `  https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url)
    const data = await res.json()
    displayPhoneDetails(data.data)
};
const displayPhoneDetails = (phone) => {
    console.log(phone)
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerHTML = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
    <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'no release Date found'}</p>
    <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage
            : 'no storage information'}</p>
    <p>Others: ${phone.others ? phone.others.Bluetooth
            : 'no bluetooth information'}</p>
    `;
}
// javascript input field event hadler
document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processSearch(10);
        // code for enter
    }
});
loadPhone('apple');