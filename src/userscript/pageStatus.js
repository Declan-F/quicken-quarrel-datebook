const WK_PAGE = Object.freeze({
  REVIEW: Symbol("review_page"),
  LESSON: Symbol("lesson_page"),
  DASHBOARD: Symbol("dashboard_page"),
  LOADING: Symbol("other_page") // Or a page we haven't implemented behavior for yet
})

class PageStatus {
  constructor(previousStatus) {
    this.page = whichPage(unsafeWindow.location.href);
    this.switched = previousStatus.page !== this.page
  }
  whichPage(url) {
    switch (url) {
      case "https://www.wanikani.com/":
        return WK_PAGE.DASHBOARD
      case "https://www.wanikani.com/subjects/review":
        if (document.querySelector(".quiz .character-header .character-header__content")) {
          return WK_PAGE.REVIEW
        }
      default:
        return WK_PAGE.LOADING
    }
  }
}


export { PageStatus, WK_PAGE }

