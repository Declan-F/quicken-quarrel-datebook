import './meta.js?userscript-metadata';
import { PageObserver } from "./pageObserver"
import { ReviewPage } from "./reviewpage"
import { WK_PAGE } from "./pagestatus"

let reviewpage = new ReviewPage()
let pageobserver = new PageObserver(WK_PAGE.REVIEW, reviewpage.onReviewPage.bind(reviewpage), reviewpage.offReviewPage.bind(reviewpage))