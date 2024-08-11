import { PageStatus } from './pagestatus'

class PageObserver {
    constructor(wk_page, onPage, offPage) {
        this.status = new PageStatus(null)
        this.observer = new MutationObserver(() => {
            this.status = new PageStatus(this.status)
            if (this.status.switched && this.status.page === wk_page) {
                onPage()
            } else if (this.status.switched) {
                offPage()
            }
        })
    }
}
export { PageObserver }