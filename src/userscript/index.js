import './meta.js?userscript-metadata';
import { PageObserver } from './pageObserver';
import { WK_PAGE } from './pagestatus';
import { ReviewPage }from './review/reviewpage'
// Loads styles
GM_addStyle(`#wkhwa-container-div {
    position: relative;
    top: -32px;
    display: flex;
    align-items: center;
    justify-content: center;
}`)
let default_settings = {
    showOutline: true,
    showCharacter: true,
    width: 200,
    height: 200,
    padding: 20,
    strokeAnimationSpeed: 1,
    strokeHighlightSpeed: 2,
    strokeFadeDuration: 400,
    delayBetweenStrokes: 1000,
    delayBetweenLoops: 2000,
    strokeColor: "#555555",
    highlightColor: "#8899FF",
    outlineColor: "#FFFFFF",
    drawingColor: "#333333",
    drawingWidth: 20,
    showHintAfterMisses: 3,
    quizStartStrokeNum: 0,
    highlightOnComplete: false,
    quiz: true,
    animate: false,
    loop_animation: false
}

let config = {
    script_id: "wkhwa",
    title: "Hanzi writer addition",

    content: {
        hanzi_writer: {
            type: "group",
            label: "Options:",
            content: {
                showOutline: {type:'checkbox',label:'showOutline',default:default_settings.showOutline},
                showCharacter: {type:'colorbox',label:'showCharacter',default:default_settings.showCharacter},
                width: {type: "number", label: "width", default:default_settings.width},
                height: {type: "number", label: "height", default:default_settings.height},
                padding: {type: "number", label: "padding", default:default_settings.padding},
                strokeAnimationSpeed: {type: "number", label: "strokeAnimationSpeed", default:default_settings.strokeAnimationSpeed},
                strokeHighlightSpeed: {type: "number", label: "strokeHighlightSpeed", default:default_settings.strokeHighlightSpeed},
                strokeFadeDuration: {type: "number", label: "strokeFadeDuration", default:default_settings.strokeFadeDuration},
                delayBetweenStrokes: {type: "number", label: "delayBetweenStrokes", default:default_settings.delayBetweenStrokes},
                delayBetweenLoops: {type: "number", label: "delayBetweenLoops", default:default_settings.delayBetweenLoops},
                StrokeColor: {type:'color',label:'strokeColor',default:'#555555'},
                highlightColor: {type:'color',label:'highlightColor',default:'#8899FF'},
                outlineColor: {type:'color',label:'outlineColor',default:'#FFFFFF'},
                drawingColor: {type:'color',label:'drawingColor',default:'#333333'},
                drawingWidth: {type: "number", label: "drawingWidth", default:default_settings.drawingWidth},
                showHintAfterMisses: {type: "number", label: "showHintAfterMisses", default:default_settings.showHintAfterMisses},
                quizStartStrokeNum: {type: "number", label: "quizStartStrokeNum", default:default_settings.quizStartStrokeNum},
                highlightOnComplete:  {type:'checkbox',label:'highlightOnComplete',default:default_settings.highlightOnComplete},
                quiz: {type:'checkbox',label:'quiz',default:default_settings.quiz},
                animate:  {type:'checkbox',label:'animate',default:default_settings.animate},
                loop_animation:  {type:'checkbox',label:'loopAnimation',default:default_settings.loop_animation},
            }
            
        }
    }
};
wkof.include('Menu, Settings');
wkof.ready('Menu, Settings').then(main);
function main() {
    wkof.Settings.load('wkhwa', default_settings)
    wkof.Menu.insert_script_link({name:'wkhwa', submenu:'wkhwa', title:'Hanzi writer settings', on_click:(new wkof.Settings(config)).open});
    let review_page = new ReviewPage()
    let page_observer = new PageObserver(WK_PAGE.REVIEW, review_page.onReviewPage.bind(review_page), review_page.offReviewPage.bind(review_page))
}
