let kanji_json = JSON.parse(GM_getResourceText("kanjiJSON"))
class ReviewPage {
    kanji_elem = null;
    kanji = null;
    writer = null;
    container_div = null;
    /**
     * Called whenever the kanji has switched. It creates the hanzi writer instance
     */
    drawHanziWriter() {
        if (!this.writer) {
            let character_header = document.querySelector(".quiz .character-header")
            this.container_div = document.createElement("div")
            this.container_div.id = "wkhwa-container-div"
            this.writer = HanziWriter.create(this.container_div, this.kanji, {
                showOutline: wkof.settings.wkhwa.showOutline,
                showCharacter: wkof.settings.wkhwa.showCharacter,
                width: wkof.settings.wkhwa.width,
                height: wkof.settings.wkhwa.height,
                padding: wkof.settings.wkhwa.padding,
                strokeAnimationSpeed: wkof.settings.wkhwa.strokeAnimationSpeed,
                strokeHighlightSpeed: wkof.settings.wkhwa.strokeHighlightSpeed,
                strokeFadeDuration: wkof.settings.wkhwa.strokeFadeDuration,
                delayBetweenStrokes: wkof.settings.wkhwa.delayBetweenStrokes,
                delayBetweenLoops: wkof.settings.wkhwa.delayBetweenLoops,
                strokeColor: wkof.settings.wkhwa.strokeColor,
                highlightColor: wkof.settings.wkhwa.highlightColor,
                outlineColor: wkof.settings.wkhwa.outlineColor,
                drawingColor: wkof.settings.wkhwa.drawingColor,
                drawingWidth: wkof.settings.wkhwa.drawingWidth,
                showHintAfterMisses: wkof.settings.wkhwa.showHintAfterMisses,
                quizStartStrokeNum: wkof.settings.wkhwa.quizStartStrokeNum,
                highlightOnComplete: wkof.settings.wkhwa.highlightOnComplete,
                charDataLoader: (char, on_load) => {
                    on_load(kanji_json[char])
                }
            })
            character_header.append(this.container_div)
        } else {
            this.writer.setCharacter(this.kanji)
        }
        if (wkof.settings.wkhwa.quiz) {
            this.writer.quiz()
        } else if (wkof.settings.wkhwa.animate) {
            if (wkof.settings.wkhwa.loop_animation) {
                this.writer.loopCharacterAnimation()
            } else {
                this.writer.animateCharacter();
            }
        }
    }
    onReviewPage() {
        this.observer = new MutationObserver(() => {
            if (this.refreshKanjiState()) {
                this.drawHanziWriter()
            }
        })
        this.kanji_elem = document.querySelector(".quiz .character-header .character-header__characters")
        if (this.refreshKanjiState()) {
            this.drawHanziWriter()
        }  
        this.observer.observe(this.kanji_elem, {
          childList: true,
          subtree: true,
        })
    }
    showHanziWriter() {
        this.kanji_elem.hidden = true
        if (this.container_div) {
            this.container_div.hidden = false
        }
    }
    hideHanziWriter() {
        this.kanji_elem.hidden = false
        if (this.container_div) {
            this.container_div.hidden = true
        }
    }
    /**
     * Returns true if the kanji shown has switched. Returns false otherwise
     * This function also manages hiding and showing kanji 
     * in the event that the characters shown are either a radical or vocabulary
     */
    refreshKanjiState() {
        // CHANGEME shouldn't this return an enum and have the logic outside this function?
        if (document.querySelector(".quiz-input__question-category").innerText.toLowerCase() === "kanji" && kanji_json[this.kanji_elem.innerText]) {
            if (this.kanji_elem.innerText !== this.kanji) {
                // We have switched to a new kanji, mayhap away from vocabulary, so we need to set these to be shown
                this.kanji = this.kanji_elem.innerText
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
        this.container_div = null
        if (this.observer) {
            this.observer.disconnect()
        }
    }
}
export { ReviewPage }