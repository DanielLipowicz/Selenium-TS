import {BaseBrowser} from "../../util/BaseBrowser";
import {By} from "selenium-webdriver";
import {BasePage} from "../BasePage";

export class ClassAttribute extends BasePage{
    constructor (browser:BaseBrowser){
        super(browser);
    }
    url = "http://uitestingplayground.com/classattr";
    private headerElement:By = By.css("div.container h3");
    private buttons:By = By.css("button.btn"); //case when three buttons has the same selector

    public async clickGreenButton(){
        await this.browser.clickFromElements(this.buttons,0);
    }
    public async clickOnYellowButton(){
        await this.browser.clickFromElements(this.buttons,2);
    }
}