import { element, by } from "protractor";

export class ProjectSearchFilterPage {
    public writeInput(string) {
        var input = element(by.id(string));
        input.getText = string;
        return input;
    }
}