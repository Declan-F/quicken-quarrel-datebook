const WK_PAGE = Object.freeze({
  REVIEW: Symbol("review_page"),
  LESSON: Symbol("lesson_page"),
  DASHBOARD: Symbol("dashboard_page"),
  LOADING: Symbol("other_page") // Or a page we haven't implemented behavior for yet
})

class PageStatus {
  constructor(previousStatus) {
    this.page = this.whichPage(unsafeWindow.location.href);
    this.switched = previousStatus ? previousStatus.page !== this.page : true
  }
  whichPage(url) {
    switch (url) {
      case "https://www.wanikani.com/":
        return WK_PAGE.DASHBOARD
      case "https://www.wanikani.com/subjects/review":
        return WK_PAGE.REVIEW
      default:
        return WK_PAGE.LOADING
    }
  }
}


export { PageStatus, WK_PAGE }

