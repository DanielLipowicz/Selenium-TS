# TypeScript and Selenium demo project
## Requirements
- Node and npm
- Selenium grid server or local instance of webdriver manager

## How to run test
- install all dependencies `npm install`
- precise selenium grid or webdriver-manager server inside `WEBDRIVER_SERVER` you can use default one using `webdriver-manager start`
- execute example test suit contained in `./src/test` catalog

### webdriver-manager on localhost
Webdriver manager served on localhost require browser valid with webdriver driver i.e. If manager expect chrome in version 80, then you have to install it on your local machine. Otherwise your test will throw error.

## Best practices
- Use Page Object Pattern for all test scripts
- Inside scenario script include only actions and assertions
- All interactions with web page should be performed via PageObject (Single Responsibility principle)

# Repository structure
- src - contain all source code
    - pom - is dedicated for Page Object Model
    - test - contains all test (framework test included)
        - framework implementation describe features provided in this repo
    - util - provide 'core' functionality of this repo - selenium webdriver configuration 
        - BaseBrowser - it's main class - provide browser functionaries
        - browserUtil - extend browser functionality and make browser class more readable

#Link references
- [webdriver-manager](https://www.npmjs.com/package/webdriver-manager)
- [selenium-webdriver documentation](https://selenium.dev/documentation/en/)
