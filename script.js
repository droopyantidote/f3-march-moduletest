// Function to fetch data from API using .then
function fetchDataWithThen() {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
        .then(response => response.json())
        .then(data => renderTable(data))
        .catch(error => console.error('Error fetching data:', error));
}

// Function to fetch data from API using async/await
async function fetchDataWithAsyncAwait() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
        const data = await response.json();
        renderTable(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to render data in table
function renderTable(data) {
    const tableBody = document.getElementById('cryptoTableBody');
    tableBody.innerHTML = ''; // Clear previous data

    data.forEach(coin => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${coin.image}" alt="${coin.name}" style="width: 30px; height: 30px;"> ${coin.name}</td>
            <td>${coin.symbol}</td>
            <td>${coin.current_price}</td>
            <td>${coin.total_volume}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to filter data based on search input
function filterData() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const rows = document.querySelectorAll('#cryptoTableBody tr');

    rows.forEach(row => {
        const name = row.getElementsByTagName('td')[0].innerText.toLowerCase();
        if (name.includes(searchInput)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Function to sort data based on market cap or percentage change
function sortData(property) {
    const rows = Array.from(document.querySelectorAll('#cryptoTableBody tr'));
    const sortedRows = rows.sort((a, b) => {
        const valueA = parseFloat(a.getElementsByTagName('td')[property === 'marketCap' ? 3 : 4].innerText.replace('$', '').replace(/,/g, ''));
        const valueB = parseFloat(b.getElementsByTagName('td')[property === 'marketCap' ? 3 : 4].innerText.replace('$', '').replace(/,/g, ''));
        return valueB - valueA;
    });

    const tableBody = document.getElementById('cryptoTableBody');
    sortedRows.forEach(row => tableBody.appendChild(row));
}

// Fetch data initially
fetchDataWithThen(); // Or fetchDataWithAsyncAwait();
