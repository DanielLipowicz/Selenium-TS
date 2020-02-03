import {Builder, By, Capabilities, ThenableWebDriver, until, WebElement, WebElementPromise} from 'selenium-webdriver';

export async function baseSetup() {
    const browser = await new BaseBrowser();
    jest.setTimeout(200000);
    return browser;
}

export class BaseBrowser {
    public driver: ThenableWebDriver;

    public constructor() {
        const capabilities = Capabilities.chrome();
        this.driver = new Builder()
            .usingServer('http://localhost:4444/wd/hub')
            .withCapabilities(capabilities)
            .build();
    }

    public async navigate(url: string): Promise<void> {
        await this.driver.navigate().to(url);
    }

    public async waitForPageLoaded() {
        let driver = this.driver;

        async function isJsCompleted(): Promise<boolean> {
            let readyStateIsComplete = false;
            let jQueryActiveComplete = false;
            while (!readyStateIsComplete) {
                let scriptResult = await driver.executeScript("return document.readyState");
                let jQueryActive = await driver.executeScript("return jQuery.active");
                readyStateIsComplete = scriptResult === "complete";
                jQueryActiveComplete = jQueryActive === 0 ;
                console.log(`ready state: ${readyStateIsComplete} \nscriptResult: ${scriptResult}`);
                console.log(`jQuery state: ${jQueryActiveComplete} \nscriptResult: ${jQueryActive}`);
                !readyStateIsComplete && !jQueryActiveComplete ? await driver.sleep(100) : {}
            }
            return readyStateIsComplete;
        }

        console.log(await isJsCompleted());
    }

    public findElement(selector: string): WebElementPromise {
        return this.driver.findElement(By.css(selector));
    }
    public async isElementDisplayed(selector: By): Promise<boolean> {
        await this.waitForElementsLocated([selector]);
        return await this.driver.findElement(selector).isDisplayed();
    }

    public async clickElement(selector: By) {
        await this.waitForElementsLocated([selector]);
        await this.driver.findElement(selector).click();
        console.log(`element was clicked ${selector}`);
    }
    /**
     * method enforce browser to wait for all required elements
     * @param selectors precise which elements are required on page
     * @param timeout allow to set individual timeout for all elements
     */
    public async waitForElementsLocated(selectors:By[], timeout:number=5000){
        for (const selector of selectors) {
            await this.driver.wait(until.elementLocated(selector), timeout, `Required element is not present on page ${selectors}`);
        }
    }

    public async clearCookies(url?: string): Promise<void> {
        if (url) {
            const currentUrl = await this.driver.getCurrentUrl();
            await this.navigate(url);
            await this.driver.manage().deleteAllCookies();
            await this.navigate(currentUrl);
        } else {
            await this.driver.manage().deleteAllCookies();
        }
    }

    public async close(): Promise<void> {
        await this.driver.quit();
    }
}