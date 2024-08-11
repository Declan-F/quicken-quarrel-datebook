import "@violentmonkey/types"
const WK_PAGE = Object.freeze({
  REVIEW: Symbol("review_page"),
  LESSON: Symbol("lesson_page"),
  DASHBOARD: Symbol("dashboard_page"),
  OTHER: Symbol("other_page")
})

class PageStatus {
  constructor(previousStatus) {
    this.page = whichPage(unsafeWindow.location.href);
    this.switched = previousStatus.page !== this.page
  }
  whichPage = function (url) {
    switch (url) {
      case "https://www.wanikani.com/":
        return WK_PAGE.DASHBOARD
      case "https://www.wanikani.com/subjects/review":
        return WK_PAGE.REVIEW
      default:
        return WK_PAGE.OTHER
    }
  }
}




