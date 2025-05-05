// Fetch data from the NYC Water Consumption API
async function fetchData() {
    try {
        const response = await fetch('https://data.cityofnewyork.us/resource/ia2d-e54m.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

// Data Processing
function processData(data) {
    const yearlyData = data.reduce((acc, item) => {
        const year = parseInt(item.year);
        if (year >= 2000) {
            const waterValue = parseFloat(item.nyc_consumption_million_gallons_per_day) || 0;
            const populationValue = parseInt(item.new_york_city_population.replace(/,/g, '')) || 0;
            
            if (!acc[year]) {
                acc[year] = {
                    water: waterValue,
                    population: populationValue
                };
            } else {
                acc[year].water = Math.max(acc[year].water, waterValue);
                acc[year].population = Math.max(acc[year].population, populationValue);
            }
        }
        return acc;
    }, {});

    const sortedYears = Object.keys(yearlyData).sort();
    return {
        labels: sortedYears,
        waterValues: sortedYears.map(year => yearlyData[year].water),
        populationValues: sortedYears.map(year => yearlyData[year].population)
    };
}

// Bar Chart
function createBarChart(data) {
    const ctx = document.getElementById('barChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'NYC Water Consumption (Million Gallons per Day)',
                data: data.waterValues,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'NYC Yearly Water Consumption (2000 onwards)'
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Year'
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Million Gallons per Day'
                    }
                }
            }
        }
    });
}

// Line Chart
function createLineChart(data) {
    const ctx = document.getElementById('lineChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'NYC Population',
                data: data.populationValues,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.1,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'NYC Population Growth (2000 onwards)'
                },
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            const population = parseInt(context.raw);
                            return `Population: ${population.toLocaleString()} people`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Year'
                    }
                },
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Population'
                    },
                    ticks: {
                        callback: function(value) {
                            return (value / 1000000).toFixed(1) + 'M';
                        }
                    }
                }
            }
        }
    });
}

async function initVisualization() {
    const rawData = await fetchData();
    const processedData = processData(rawData);
    createBarChart(processedData);
    createLineChart(processedData);
}

window.addEventListener('load', initVisualization); 