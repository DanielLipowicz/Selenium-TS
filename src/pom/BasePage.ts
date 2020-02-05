import {BaseBrowser} from "../util/BaseBrowser";
import {logger} from "../util/logger";


export abstract class BasePage {
    public browser: BaseBrowser;
    protected url: string | undefined;
    protected logger = logger;
    protected constructor(browser: BaseBrowser) {
        this.browser = browser;
    };

    public async isUrlValid(): Promise<boolean> {
        const currentUrl = await this.browser.driver.getCurrentUrl();
        this.logger.info(`current url: ${currentUrl}`);
        return currentUrl === this.url
    };

    public async navigate() {
        if (this.url) {
            await this.browser.navigate(this.url);
            await this.browser.waitForPageLoaded();
        } else {
            throw new Error("Page url is not set! You can't navigate to undefined page. Set page URL in page object.");
        }
    }
}