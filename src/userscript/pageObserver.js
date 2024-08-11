class pageObserver {
    constructor(wk_page, onPage, offPage) {
        this.status = new PageStatus()
        this.observer = new MutationObserver(() => {
            if (new PageStatus(this.status)) {
                this.status = new PageStatus()
                onPage()
            } else {
                offPage()
            }
        })
    }
}