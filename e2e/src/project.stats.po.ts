import { element, by, browser } from "protractor";

export class ProjectStatsPage {

    public getAllCharts() {
        browser.sleep(1000);
        return element.all(by.className('chartjs-render-monitor'));
    }

    public statsButton() {
        return element(by.name("stats")).click()
    }
}