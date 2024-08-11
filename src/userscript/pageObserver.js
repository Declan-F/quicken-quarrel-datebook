import { PageStatus } from './pagestatus'

class PageObserver {
    constructor(wk_page, onPage, offPage) {
        this.status = new PageStatus(null)
        this.observer = new MutationObserver(() => {
            if (this.status.switched && this.status.page === wk_page) {
                onPage()
            } else if (this.status.switched) {
                offPage()
            }
            this.status = new PageStatus(this.status)
        })
        this.observer.observe(document, {
            childList: true,
            subtree: true
        })
    }
}
export { PageObserver }