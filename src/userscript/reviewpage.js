import { hanziWriterSettings } from "./settings"

class ReviewPage {
    kanji = null;
    writer = null;
    containerdiv = null;
    /**
     * Called whenever the kanji has switched. It creates the hanzi writer instance
     */
    onKanji() {
        let characterheader = document.querySelector(".quiz .character-header")
        if (!this.writer) {
            this.containerdiv = document.createElement("div")
            containerdiv.id = "wkhwa-container-div"
            this.writer = HanziWriter.create(containerdiv, character.innerText, {
                width: 200,
                height: 200,
                showCharacter: false,
                showHintAfterMisses: 3,
                padding: 5,
                strokeColor: hanziWriterSettings.strokeColor,
                drawingColor: hanziWriterSettings.drawingColor,
                charDataLoader: (char, onLoad) => {
                    onLoad(kanjiJSON[char])
                }
            })
            characterheader.append(characterheader)
            if (hanziWriterSettings.quiz) {
                writer.quiz()
            }
        }
    }
    onReviewPage() {
        this.observer = new MutationObserver(() => {
            if (this.hasKanjiSwitched()) {
                this.onKanji()
            }
        })
        const charactercontent = document.querySelector(".quiz .character-header .character-header__content")    
        observer.observe(charactercontent, {
          childList: true,
          subtree: true,
        })
    }
    /**
     * Returns true if the kanji shown has switched. Returns false otherwise
     */
    hasKanjiSwitched() {
        let potentialNewKanji = document.querySelector(".quiz .character-header .character-header__characters")
        if (document.querySelector(".quiz-input__question-category").innerText.toLowerCase() === "kanji") {
            if (potentialNewKanji !== this.kanji) {
                potentialNewKanji.hidden = true
                this.kanji = potentialNewKanji
                if (this.containerdiv) {
                    this.containerdiv.hidden = false
                }
                return true
            }
        } else {
            potentialNewKanji.hidden = false
            if (this.containerdiv) {
                this.containerdiv.hidden = false
            }
            return false
        }
    }
    /**
     * Cleans up various objects if we switch away from them.
     */
    offReviewPage() {
        this.kanji = null
        this.writer = null
        this.containerdiv = null
    }
}
export { ReviewPage }