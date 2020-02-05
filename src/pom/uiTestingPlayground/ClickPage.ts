import {BaseBrowser} from "../../util/BaseBrowser";
import {By} from "selenium-webdriver";
import {BasePage} from "../BasePage";

export class ClickPage extends BasePage {
    constructor(browser: BaseBrowser) {
        super(browser);
    }

    url = "http://uitestingplayground.com/click";
    private headerElement: By = By.xpath('//h3[contains(text(),"Click")]');
    private notClickedButton: By = By.css('.btn.btn-primary');
    private clickedButton: By = By.css('.btn.btn-success');

    public async clickOnNotClickedButton() {
        await this.browser.clickElement(this.notClickedButton);
        await this.browser.waitForPageLoaded();
    }

    public async isClickedButtonPresent() {
        return await this.browser.isElementDisplayed(this.clickedButton);
    }

    async waitForPageLoaded() {
        await this.browser.waitForElementsOnPage([this.headerElement]);
    }
}