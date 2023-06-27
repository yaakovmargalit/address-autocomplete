// הוסף קוד זה לדף המכירה שלך

// קבועה לקובץ JSON שמכיל את רשימת הערים מ-API
const citiesEndpoint = 'https://data.gov.il/api/3/action/datastore_search?resource_id=5c78e9fa-c2e2-4771-93ff-7f400a12f7ba&limit=7&q=';
const streetsEndpoint = 'https://data.gov.il/api/3/action/datastore_search?resource_id=9ad3862c-8391-4b2f-84a4-2d4c68625f4b&limit=15&q=';
const cityField = document.getElementById('billing_city');
const streetField = document.getElementById('billing_address_1');
let timer;
let cityId=''
cityField.addEventListener('input', handleCityChange)
streetField.addEventListener('input', handleStreetChange)

const cityList = document.createElement('div');
const streetList = document.createElement('div');
function handleCityChange() {
    if (document.activeElement === cityField) {
        clearTimeout(timer); // מבטל תזמון קודם (אם קיים)
        timer = setTimeout(function () {
            // פעולות שתרצה לבצע לאחר סיום ההקלדה
            if (cityField.value) {
                getCitiesFromAPI()
            } else {
                cityList.remove()
            }
        }, 250);
    }
}
function handleStreetChange() {
    if (document.activeElement === streetField) {
        clearTimeout(timer); // מבטל תזמון קודם (אם קיים)
        timer = setTimeout(function () {
            // פעולות שתרצה לבצע לאחר סיום ההקלדה
            if (streetField.value) {
                getStreetsFromAPI()
            } else {
                streetList.remove()
            }
        }, 250);
    }
}

// פונקציה לקבלת רשימת הערים מ-API
function getCitiesFromAPI() {
    fetch(citiesEndpoint + cityField.value)
        .then(response => response.json())
        .then(data => {
            const listElement = data.result.records.length ? `
      
      <ul>
      ${data.result.records.map(city => {
                city['שם_ישוב'] = city['שם_ישוב'].replace("\'", "´");
                return `<li onclick="setCity('${city['שם_ישוב']}','${city['סמל_ישוב']}')">${city['שם_ישוב']}</li>`
            }).join("")}
      </ul>
      `: null
            cityField.addEventListener('change', handleCityChange);

            // יצירת אפשרויות הערים בתוך השדה המקורי
            cityList.classList.add('il-city-list')
            cityList.innerHTML = listElement
            cityField.insertAdjacentElement("afterend", cityList);
        })
        .catch(error => {
            console.error('Error fetching cities:', error);
        });
}
function getStreetsFromAPI() {
    fetch(streetsEndpoint + streetField.value+' '+cityId)
        .then(response => response.json())
        .then(data => {
            const listElement = data.result.records.length ? `
      
      <ul>
      ${data.result.records.map(street => {
                street['שם_רחוב'] = street['שם_רחוב'].replace("\'", "´");
                return `<li onclick="setStreet('${street['שם_רחוב']}')">${street['שם_רחוב']}</li>`
            }).join("")}
      </ul>
      `: null
            streetList.classList.add('il-street-list')
            streetList.innerHTML = listElement
            streetField.insertAdjacentElement("afterend", streetList);
        })
        .catch(error => {
            console.error('Error fetching cities:', error);
        });
}

function setCity(city,id) {
    console.log(city);
    cityField.value = city
    cityId = id
    cityList.remove()
}
function setStreet(street) {
    streetField.value = street
    streetList.remove()
}

