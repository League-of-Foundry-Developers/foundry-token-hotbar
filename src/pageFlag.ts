import { CONSTANTS } from "./constants";

export class PageFlag {
    public get(): number {
        let page = localStorage.getItem(`${CONSTANTS.moduleName}.activePage`);
        if (page) return +page;
        return 1;
    }

    public set(page: number) {
        return localStorage.setItem(`${CONSTANTS.moduleName}.activePage`, page + "");
    }
}