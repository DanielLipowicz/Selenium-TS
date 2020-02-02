import {baseSetup, Browser} from "../util/Browser";
// @ts-ignore
import {LandingPage} from '../pageObjectModel/uiTestingPlayground/LandingPage';
import {ClickPage} from "../pageObjectModel/uiTestingPlayground/ClickPage";

let browser: Browser;
beforeAll(async () => {
    browser = await baseSetup();
});
afterAll(async () => {
    await browser.close()
});
describe("Page object model should be used directly in test", () => {
    it("User should be able to navigate to landing page", async (done) => {
        expect(await browser).toBeDefined();
        let landingPage: LandingPage = new LandingPage(await browser);
        await landingPage.navigate();
        await landingPage.clickOnEventBasedClickSubpage();
        await landingPage.browser.waitForPageLoaded();
        expect(await landingPage.isUrlValid()).toBeFalsy();
        done();
    });
    it("Transition between two pages should works smoothly", async (done)=>{
        let landingPage:LandingPage = new LandingPage(await browser);
        await landingPage.navigate();
        await landingPage.clickOnEventBasedClickSubpage();
        let clickPage:ClickPage = new ClickPage(landingPage.browser);
        expect(clickPage.isUrlValid()).toBeTruthy();
        await clickPage.clickOnNotClickedButton();
        expect(clickPage.isClickedButtonPresent()).toBeTruthy();
        await browser.driver.sleep(3000);
        done();
    })
});
