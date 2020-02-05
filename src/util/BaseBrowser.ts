import {Builder, By, Capabilities, ThenableWebDriver, WebElementPromise} from 'selenium-webdriver';
import {waitForElementsLocated, waitForPageLoaded as waitForPage} from "./browserUtil/wait";
import {logger} from "./logger";

const log = logger;

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
            .usingServer(process.env.WEBDRIVER_SERVER||'http://localhost:4444/wd/hub')
            .withCapabilities(capabilities)
            .build();
    }

    public async navigate(url: string): Promise<void> {
        await this.driver.navigate().to(url);
    }

    public waitForPageLoaded = async () => await waitForPage(this.driver);
    public waitForElementsOnPage = async(elements:By[],timeout?:number) =>{
        await this.waitForPageLoaded();
        await waitForElementsLocated(this.driver,elements,timeout);
    };

    public findElement(selector: string): WebElementPromise {
        return this.driver.findElement(By.css(selector));
    }

    public async isElementDisplayed(selector: By): Promise<boolean> {
        await waitForElementsLocated(this.driver, [selector]);
        return await this.driver.findElement(selector).isDisplayed();
    }

    public async clickElement(selector: By) {
        await waitForElementsLocated(this.driver, [selector]);
        await this.driver.findElement(selector).click();
        log.info(`element was clicked ${selector}`);
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