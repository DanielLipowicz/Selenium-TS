import {baseSetup, BaseBrowser} from "../../util/BaseBrowser";
// @ts-ignore
import {LandingPage} from '../../pom/uiTestingPlayground/LandingPage';
import {ClickPage} from "../../pom/uiTestingPlayground/ClickPage";

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
        let landingPage: LandingPage = new LandingPage(await browser);
        await landingPage.navigate();
        await landingPage.clickOnEventBasedClickSubpage();
        await landingPage.browser.waitForPageLoaded();
        expect(await landingPage.isUrlValid()).toBeFalsy();
    });
    it("Transition between two pages should works smoothly", async ()=>{
        let landingPage:LandingPage = new LandingPage(await browser);
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
