import './meta.js?userscript-metadata';
import { PageObserver } from "./pageObserver"
import { ReviewPage } from "./reviewpage"
import { WK_PAGE } from "./pagestatus"
let reviewpage = new ReviewPage()
new PageObserver(WK_PAGE.REVIEW, reviewpage.onReviewPage, reviewpage.offReviewPage)