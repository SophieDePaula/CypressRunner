CypressRunner

1) Clone the project.
2) Step into the CypressRunner directory in the terminal
3) Run: npx cypress open 
(to run the test with logs run this instead: APPLITOOLS_SHOW_LOGS=true npx cypress open >file.log)
4) A cypress window application should open
5) click on sample_spec.js to run the application.


Setting configurations:
1) Navigate to CypressRunner/cypress/fixtures/ 
2) Each line represent a key (name) and a value (Value), since this is a csv file the key and the value is seperated by a comma and each configuration is set in a different line.

	Available Configurations:
	- app name - this is the baseline app name
	- test name - this is the baseline test name
	- batch name - this is the test batch name

Setting the URLs the test will run on:
1) Navigate to CypressRunner/cypress/fixtures/ 
2) Open the urls.csv files
3) Under the title url add your desired urls, each url in a seperete line.

Setting the environments the test will run on:
1) Navigate to CypressRunner/cypress/fixtures/
2) Each line represents an environment, an environment can either have a browser and viewport size or deviceName and screenOrientation.
since this is a csv file the each property is seperated with by comma and each configuration is set in a different line, even if a value is empty, for example:

	Browser,Viewport,deviceName,screenOrientation
	chrome,800-600
	,,iPhone X,portrait

the second environnet starts with two comma since the browser and the viewport size are empty, in the first environment eventhough the 3rd and the 4th values are empty, there is no need for extra commas.

** make sure your applitools API key is set to the APPLITOOLS_API_KEY environment variable.
