# PlaywrightTest
Playwright UI &amp; API automation

# Design pattern: POM
# Easy Maintenance: 
  In web automation, everything depends on the DOM tree and selectors. The page object model makes maintenance easier even if there is a change in the DOM tree and selectors we don’t have to modify everywhere. 
# Increased Reusability: 
  Using POM, we can reuse the code which is written for another test. Also, we can create custom helper methods to achieve this. Code Reusability reduces the code, thus saving time and effort.
# Readability: 
  As the tests are independent, it increases the readability

# Folder structure:
|/pageobjects/
|/pageobjects/HomePage/
|/pageobjects/ExploreCar/
|/tests/
|/tests/api/
|/tests/api/ApiNetworkTest.spec/
|/tests/ui/
|/tests/ui/PolestarTest.spec/
|/utils/
|/utils/ApiGorest.spec/
|/utils/ApiReqres.spec/

# Execution
To execute the api test: npm run apitest
To execute the ui test: npm run webtest

# Reports:
index.html report is created in playwright-report folder of the project

# Traces:
Traces will be created under test-results folder of the porject

# api test cases 
baseURI: 
	https://reqres.in/ 
		1. getCall
		2. putCall
		3. deleteCall
		4. postCall
		5. invalidApiCall
	https://gorest.co.in/
		1. getCall
		2. putCall
		3. postCall
		4. deleteCall
		5. invalidApiCall

# ui test cases
https://www.polestar.com/global/developer/get-started/
	1. navigate to Polestar2
	2. navigate to Polestar3
  
