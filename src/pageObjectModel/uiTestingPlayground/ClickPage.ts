import {BasePage} from "../BasePage";
import {Browser} from "../../util/Browser";

export class ClickPage extends BasePage {
    constructor(browser: Browser) {
        super(browser);
    }

    url = "http://uitestingplayground.com/click";
    private notClickedButton = () => this.browser.findElement('.btn.btn-primary');
    private clickedButton = () => this.browser.findElement('.btn.btn-success');

    public async clickOnNotClickedButton() {
        await this.browser.clickElement(this.notClickedButton());
    }

    public async isClickedButtonPresent() {
        return await this.clickedButton().isDisplayed();
    }
}