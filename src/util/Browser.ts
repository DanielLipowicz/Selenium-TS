import {
    Builder,
    ThenableWebDriver,
    By,
    WebElementPromise,
    Capabilities,
    Condition, WebDriver, until, WebElement
} from 'selenium-webdriver';
import {Command} from "selenium-webdriver/lib/command";

export async function baseSetup() {
    const baseBrowser = await new Browser();
    jest.setTimeout(20000);
    return baseBrowser;
}

export class Browser {
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
            while (!readyStateIsComplete) {
                let scriptResult = await driver.executeScript("return document.readyState");
                readyStateIsComplete = scriptResult === "complete";
                console.log(`ready state: ${readyStateIsComplete} \nscriptResult: ${scriptResult}`);
                !readyStateIsComplete ? await driver.sleep(100) : {}
            }
            return readyStateIsComplete;
        }

        console.log(await isJsCompleted());
    }

    public findElement(selector: string): WebElementPromise {
        return this.driver.findElement(By.css(selector));
    }

    public async clickElement(selector: By) {
        await this.driver.wait(until.elementLocated(selector));
        const element:WebElement =await this.driver.findElement(selector);
        await element.click();
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