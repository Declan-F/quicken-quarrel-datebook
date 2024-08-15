import { hanziWriterSettings } from "./settings"
let kanjiJSON = JSON.parse(GM_getResourceText("kanjiJSON"))
class ReviewPage {
    kanjiElem = null;
    kanji = null;
    writer = null;
    containerdiv = null;
    /**
     * Called whenever the kanji has switched. It creates the hanzi writer instance
     */
    drawHanziWriter() {
        if (!this.writer) {
            let characterheader = document.querySelector(".quiz .character-header")
            this.containerdiv = document.createElement("div")
            this.containerdiv.id = "wkhwa-container-div"
            GM_addStyle(`#wkhwa-container-div {
                position: relative;
                top: -32px;
                display: flex;
                align-items: center;
                justify-content: center;
            }`)
            this.writer = HanziWriter.create(this.containerdiv, this.kanji, {
                width: 200,
                height: 200,
                showCharacter: false,
                showHintAfterMisses: 3,
                padding: 5,
                drawingWidth: hanziWriterSettings.drawingWidth,
                strokeColor: hanziWriterSettings.strokeColor,
                drawingColor: hanziWriterSettings.drawingColor,

                charDataLoader: (char, onLoad) => {
                    onLoad(kanjiJSON[char])
                }
            })
            characterheader.append(this.containerdiv)
            if (hanziWriterSettings.quiz) {
                this.writer.quiz()
            }
        } else {
            this.writer.setCharacter(this.kanji)
            if (hanziWriterSettings.quiz) {
                this.writer.quiz()
            }
        }
    }
    onReviewPage() {
        this.observer = new MutationObserver(() => {
            if (this.refreshKanjiState()) {
                this.drawHanziWriter()
            }
        })
        this.kanjiElem = document.querySelector(".quiz .character-header .character-header__characters")
        if (this.refreshKanjiState()) {
            this.drawHanziWriter()
        }  
        this.observer.observe(this.kanjiElem, {
          childList: true,
          subtree: true,
        })
    }
    showHanziWriter() {
        this.kanjiElem.hidden = true
        if (this.containerdiv) {
            this.containerdiv.hidden = false
        }
    }
    hideHanziWriter() {
        this.kanjiElem.hidden = false
        if (this.containerdiv) {
            this.containerdiv.hidden = true
        }
    }
    /**
     * Returns true if the kanji shown has switched. Returns false otherwise
     * This function also manages hiding and showing kanji 
     * in the event that the characters shown are either a radical or vocabulary
     */
    refreshKanjiState() {
        // CHANGEME shouldn't this return an enum and have the logic outside this function?
        if (document.querySelector(".quiz-input__question-category").innerText.toLowerCase() === "kanji") {
            if (this.kanjiElem.innerText !== this.kanji) {
                // We have switched to a new kanji, mayhap away from vocabulary, so we need to set these to be shown
                this.kanji = this.kanjiElem.innerText
                this.showHanziWriter()
                return true
            } else {
                return false
            }
        }
        // The character content has switched to vocabulary or a radical
        this.kanji = null;
        this.hideHanziWriter()
        return false
    }
    /**
     * Cleans up various objects if we switch away from them.
     */
    offReviewPage() {
        this.kanji = null
        this.writer = null
        this.containerdiv = null
        if (this.observer) {
            this.observer.disconnect()
        }
    }
}
export { ReviewPage }