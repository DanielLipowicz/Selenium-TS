import {By, ThenableWebDriver, until} from "selenium-webdriver";
import {logger} from "../logger";
const log = logger;

/**
 * method enforce browser to wait for all required elements
 * @param driver instance
 * @param selectors precise which elements are required on page
 * @param timeout allow to set individual timeout for all elements
 */
export async function waitForElementsLocated(driver: ThenableWebDriver, selectors: By[], timeout: number = 5000) {
    for (const selector of selectors) {
        await driver.wait(until.elementLocated(selector), timeout, `Required element is not present on page ${selectors}`);
    }
}


export async function waitForPageLoaded(driver: ThenableWebDriver) {
    let readyStateIsComplete = false;
    let jQueryActiveComplete = false;
    while (!readyStateIsComplete) {
        let scriptResult = await driver.executeScript("return document.readyState");
        let jQueryActive = await driver.executeScript("return jQuery.active");
        readyStateIsComplete = scriptResult === "complete";
        jQueryActiveComplete = jQueryActive === 0;
        log.info(`\nready state: ${readyStateIsComplete} \nscriptResult: ${scriptResult}`);
        log.info(`\njQuery state: ${jQueryActiveComplete} \nscriptResult: ${jQueryActive}`);
        !readyStateIsComplete && !jQueryActiveComplete ? await driver.sleep(100) : {}
    }
    log.info(`Wait for page loaded is finished with status: ${readyStateIsComplete}`);
}