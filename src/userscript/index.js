import './meta.js?userscript-metadata';
import { PageObserver } from "./pageObserver"
import { ReviewPage } from "./review/reviewpage"
import { WK_PAGE } from "./pagestatus"
import { DashboardPage } from "./dashboard/dashboardpage"
// Loads local stylesheet
GM_addStyle(GM_getResourceText("styleCSS"))

let reviewpage = new ReviewPage()
let dashboardpage = new DashboardPage()
let reviewobserver = new PageObserver(WK_PAGE.REVIEW, reviewpage.onReviewPage.bind(reviewpage), reviewpage.offReviewPage.bind(reviewpage))
let dashboardobserver = new PageObserver(WK_PAGE.DASHBOARD, dashboardpage.onDashboard.bind(dashboardpage), dashboardpage.offDashboard.bind(dashboardpage))