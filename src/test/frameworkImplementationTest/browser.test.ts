import {BaseBrowser, baseSetup} from "../../util/BaseBrowser";
import {By, Capabilities} from "selenium-webdriver";

/**
 * this file precise how to use browser class.
 *
 * It include example configuration for browser for all tests
 */

let browser: BaseBrowser;
beforeAll(async () => {
    browser = await baseSetup();
});
afterAll(async () => {
    await browser.close()
});
describe("browser should be initiated - how to initialised webdriver using this framework", () => {
    let browser: BaseBrowser;
    it('Browser object should be initialised with success when "webdriver manager" is started on system in the background - that required pre-configuration on operation system', () => {
        browser = new BaseBrowser();
        expect(browser.driver).toBeDefined();
    });
    it("Browser should be set up (from previous test) and able to connect with some URL", async () => {
        try {
            await browser.driver.get('http://www.google.com');
        } finally {
            await browser.driver.quit();
        }
    });
    it("Initiated browser should have access to driver", async () => {
        browser = new BaseBrowser();
        const driverCapabilities: Capabilities = await browser.driver.getCapabilities();
        console.log(driverCapabilities);
        expect(driverCapabilities).toBeDefined();
        await browser.close();
    });
});
describe("Previous describe in body override browser variable. In consequence we have to create other scope to test 'setup' method",()=>{
    it("Base browser should give access to browser created before test, and jest property should be overwrote", async () => {
        await browser.driver.get("http://www.neurosys.com");
        console.log(await browser.driver.findElement(By.css("#banner-home-page div h1")).getText());
    });
});