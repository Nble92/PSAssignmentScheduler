PSAssignmentScheduler Documentation
Overview
The PSAssignmentScheduler is a PowerShell script designed to automate the retrieval and scheduling of assignments and announcements from the Canvas LMS. This tool simplifies the process of staying updated with course materials by automatically fetching new announcements and assignments.

Features
Automated Fetching: Retrieves announcements and assignments using the Canvas API.
Environment Variable Configuration: Secures sensitive information like API tokens and URLs through environment variables.
Customizable Scheduling: Can be set to run on a schedule to keep your assignment data up to date.
Requirements
PowerShell 5.1 or later
An active Canvas LMS account
API Access to Canvas with an API token
Installation
Clone the Repository

bash
Copy code
git clone https://github.com/Nble92/PSAssignmentScheduler.git
Install Dependencies
Ensure you have the necessary dependencies installed. For example, you might need to install modules using PowerShell:

powershell
Copy code
Install-Module -Name <ModuleName> -Force
Set Up Environment Variables
Create a .env file in the root directory of the project with the following content:

plaintext
Copy code
CANVAS_ANNOUNCE_URL=https://canvas.instructure.com/api/v1/announcements?context_codes[]=course_126190000000002159
CANVAS_ASSIGNMENT_URL=https://canvas.instructure.com/api/v1/courses/126190000000002159/assignments?per_page=200
CANVAS_TOKEN=token you get from registering with the api
Run the Script
You can execute the script directly in PowerShell:

powershell
Copy code
.\PSAssignmentScheduler.ps1
Configuration
Scheduling: To schedule the script, use Windows Task Scheduler or any other task automation tool that supports PowerShell scripts. Configure it to run at your desired interval.

Customizing API Endpoints: If you need to fetch data from different courses or announcements, update the URLs in your .env file accordingly.

Troubleshooting
Missing Environment Variables: Ensure all required environment variables are set correctly. The script will not run without these.
Permission Issues: If you encounter permission issues when running the script, try running PowerShell as an administrator.
Contributing
Contributions are welcome! Please open issues or submit pull requests to help improve this tool.

License
This project is licensed under the MIT License. See the LICENSE file for more details.

Contact
For any questions or feedback, please contact the repository owner at GitHub Issues.
