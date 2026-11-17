
async function searchCountry() {

    const countryName = document
        .getElementById("countryInput")
        .value.trim();

    const result = document.getElementById("result");

    if (countryName === "") {
        result.innerHTML =
            '<p class="error">Please enter a country name!</p>';
        return;
    }

    result.innerHTML = "<p>Loading country information...</p>";

    try {

        // New country API
        const response = await fetch(
            `https://countries.dev/name/${encodeURIComponent(countryName)}`
        );

        if (!response.ok) {
            throw new Error("Country not found!");
        }

        const countries = await response.json();

        if (!Array.isArray(countries) || countries.length === 0) {
            throw new Error("Country not found!");
        }

        // Find exact country match
        const country = countries.find(c =>
            c.name.toLowerCase() === countryName.toLowerCase()
        ) || countries[0];

        // Extract country information
        const name = country.name;
        const flag = country.flags?.svg || country.flags?.png;
        const capital = country.capital || "Not Available";

        const population = country.population != null
            ? country.population.toLocaleString("en-IN")
            : "Not Available";

        const region = country.region || "Not Available";

        let currency = "Not Available";

        if (country.currencies?.length) {
            currency = country.currencies.map(item =>
                `${item.name} (${item.symbol || item.code})`
            ).join(", ");
        }

        // Display information
        result.innerHTML = `
            <div class="country-result">

                <img src="${flag}" alt="Flag of ${name}">

                <h2>${name}</h2>

                <div class="country-details">

                    <p>
                        <strong>Capital:</strong> ${capital}
                    </p>

                    <p>
                        <strong>Population:</strong> ${population}
                    </p>

                    <p>
                        <strong>Region:</strong> ${region}
                    </p>

                    <p>
                        <strong>Currency:</strong> ${currency}
                    </p>

                </div>
            </div>
        `;

    } catch (error) {

        console.error(error);

        result.innerHTML = `
            <p class="error">
                Unable to load country information.
                Please check your internet connection.
            </p>
        `;
    }
}

// Search using Enter key
document.getElementById("countryInput")
    .addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            searchCountry();
        }
    });
