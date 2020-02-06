import {baseSetup, BaseBrowser} from "../../util/BaseBrowser";
import {LandingPage} from '../../pom/uiTestingPlayground/LandingPage';
import {ClickPage} from "../../pom/uiTestingPlayground/ClickPage";
import {ClassAttribute} from "../../pom/uiTestingPlayground/ClassAttribute"
import {By} from "selenium-webdriver";
import {logger} from "../../util/logger";
import Mock = jest.Mock;

let browser: BaseBrowser;
beforeAll(async () => {
    browser = await baseSetup();
});
afterAll(async () => {
    await browser.close()
});
describe("Page object model should be used directly in test", () => {
    it("Empty page should not crash wait function", async () => {
        expect(await browser).toBeDefined();
        await browser.waitForPageLoaded();
    });
    it("User should be able to navigate to landing page", async () => {
        expect(await browser).toBeDefined();
        let landingPage: LandingPage = new LandingPage(browser);
        await landingPage.navigate();
        await landingPage.clickOnEventBasedClickSubpage();
        await landingPage.browser.waitForPageLoaded();
        expect(await landingPage.isUrlValid()).toBeFalsy();
    });
    it("Transition between two pages should works smoothly", async ()=>{
        let landingPage:LandingPage = new LandingPage(browser);
        await landingPage.navigate();
        await landingPage.waitForPageLoaded();
        await landingPage.clickOnEventBasedClickSubpage();
        let clickPage:ClickPage = new ClickPage(landingPage.browser);
        await clickPage.waitForPageLoaded();
        expect(clickPage.isUrlValid()).toBeTruthy();
        await clickPage.clickOnNotClickedButton();
        expect(clickPage.isClickedButtonPresent()).toBeTruthy();
        await browser.driver.sleep(3000);
    })
});
describe("Interaction with BaseBrowserMethods",()=>{
    let classAttributePage:ClassAttribute;
    beforeAll(async()=>{
        classAttributePage = new ClassAttribute(browser);
        await classAttributePage.navigate();
    });
   it("User should be able to click element even if selector fit to many elements",async ()=>{
       await classAttributePage.clickGreenButton();
       await classAttributePage.clickOnYellowButton();
   });
   it("If user use wrong method for clicking element then error should be present in console",async()=> {
       const log = logger;
       log.error = jest.fn(()=>logger.warn("Mocked logger from pomUsage.test.ts was called"));
       await classAttributePage.browser.clickElement(By.css("button.btn"));
        expect((<Mock>log.error).mock.calls.length).toBe(1);
   });
});
