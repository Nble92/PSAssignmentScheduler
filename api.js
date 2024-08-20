require('dotenv').config

const announceURL = process.env.CANVAS_ANNOUNCE_URL;
const assignmentURL = process.env.CANVAS_ASSIGNMENT_URL;
const token = process.env.CANVAS_TOKEN;

let uniqueMatches = new Set();

async function getData(url) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

(async function() {
    const data = await getData(announceURL);

    if (data) {
        const phrase = "GLAB";
        const dataString = JSON.stringify(data);
        const found = dataString.includes(phrase);
        
        if (found) {
            console.log(`Phrase "${phrase}" found in the data.`);
            let regex = /(?:GLAB|RA|PBQ)\s\d{3}\.\w+.*?(?=<br>|<\/p>)/gs;

            let matches = dataString.match(regex);
            if (matches) {
                matches = [...new Set(matches)].sort(); // Get unique and sort
                matches.forEach(match => uniqueMatches.add(match)); // Add sorted matches to the Set
                console.log([...uniqueMatches]); // Convert Set to Array for logging
            }

        } else {
            console.log(`Phrase "${phrase}" not found in the data.`);
        }
    } else {
        console.log('No data retrieved.');
    }

    // Call grabAsses after uniqueMatches is populated
    grabAsses();
})();

async function grabAsses() {
    console.log("Grabbing Asses");
    try {
    const assignments = await getData(assignmentURL);

    if (!assignments || assignments.length === 0) {
        console.log('No assignments retrieved.');
        return;
    }

    let matchArr = Array.from(uniqueMatches);
    // console.log(assignments[0].name.trim());  // Log the first assignment's name for debugging

    // Filter the assignments to only include the specific name
    const filteredAssignments = assignments
        // .filter(assignment => assignment.name.trim() === 'GLAB 184.L12: 12A - APPLIED LAB: Performing Web Vulnerability Scanning')
        .map(assignment => ({
            // name: assignment.name,
            // html_url: assignment.html_url
            assignment_group_id: assignment.assignment_group_id.toString().trim()
        }));
     const uniqueAssesGids = new Set(filteredAssignments);    
    // Print or use the filtered assignments
            console.log(uniqueAssesGids);


        // // Print or use the filtered assignments
        // filteredAssignments.forEach(assignment => {
        //     console.log(`Name: ${assignment.name}, URL: ${assignment.html_url}`);
        // });
                
        // Return the filtered assignments
        return filteredAssignments;
        
    } catch (error) {
        console.error('Error:', error);
    }
}
