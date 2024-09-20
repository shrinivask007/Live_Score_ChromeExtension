async function getMatchData() {
    try {
        const response = await fetch("https://api.cricapi.com/v1/currentMatches?apikey=3bb31faf-8e62-48d9-ade5-0c559b7014c5&offset=0");
        const data = await response.json();

        if (data.status !== "success") return;

        const matchList = data.data;

        if (!matchList || matchList.length === 0) return;

        const matchData = matchList.map(match => 
            `${match.name}, ${match.matchType}, ${match.status}`
        );

        // Display match data in the HTML
       
        const matchesElement = document.getElementById('matches');

        matchList.forEach(match => {
            const li = document.createElement('li');
            
            // Create separate elements for each match detail
            const matchName = document.createElement('div');
            matchName.textContent = match.name;
            matchName.classList.add('match-Name');

            const matchType = document.createElement('div');
            matchType.textContent = `Type: ${match.matchType}`;
            matchType.classList.add('match-type');

            const matchStatus = document.createElement('div');
            matchStatus.textContent = `Status: ${match.status}`;
            matchStatus.classList.add('match-status');

            // Append the details to the list item
            li.appendChild(matchName);
            li.appendChild(matchType);
            li.appendChild(matchStatus);

            // Append the list item to the unordered list
            matchesElement.appendChild(li);
        });
    } catch (error) {
        console.error("Error fetching match data:", error);
    }
}


getMatchData();
