import {BaseBrowser} from "../../util/BaseBrowser";
import {By} from "selenium-webdriver";
import {BasePage} from "../BasePage";

export class LandingPage extends BasePage{
    constructor(browser: BaseBrowser) {
       super(browser);
    }

    url= "http://uitestingplayground.com/";
    private eventBasedClickSubpageElement:By = By.xpath("//h3/a[contains(text(),\"Click\")]");

    public async clickOnEventBasedClickSubpage() {
        await this.browser.clickElement(this.eventBasedClickSubpageElement);
    }

    async waitForPageLoaded() {
        await this.browser.waitForElementsLocated([this.eventBasedClickSubpageElement])
    }
}