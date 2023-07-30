export {}

declare global {
    interface Array<T> {
        dedupe(): Array<T>
    }
}

Array.prototype.dedupe = function () {
    const strings = this.filter((e: any) => typeof e != "undefined")
        .map((e: any) => JSON.stringify(e))
    return [...new Set(strings)].map((e: any) => JSON.parse(e))
}
