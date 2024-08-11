import "./pageStatus"
import "./pageObserver"
let kanjiJSON = JSON.parse(GM_getResourceText("kanjiJSON"))
function onReviewPage() {
  const characterheader = document.querySelector(".quiz .character-header")
  const charactercontent = document.querySelector(".quiz .character-header .character-header__content")
  const onReviews = () => {
      // Annoyingly, this div seems to delete anything placed inside of it. So, we have to get around it with styling and by adding to ancestor.
      let character = document.querySelector(".quiz .character-header .character-header__characters")
      const catagory = document.querySelector(".quiz-input__question-category").innerText.toLowerCase()
      if (!containerdiv && catagory === "kanji") {
          containerdiv = document.createElement("div")
          containerdiv.id = "wkhwa-container-div"
          characterheader.append(containerdiv)
          character.hidden = true
          writer = HanziWriter.create(containerdiv, character.innerText, {
            width: 200,
            height: 200,
            showCharacter: false,
            showHintAfterMisses: 3,
            padding: 5,
            strokeColor: '#ff9900',
            drawingColor: '#000000',
            charDataLoader: (char, onLoad) => {
              onLoad(kanjiJSON[char])
            }
          })
          writer.quiz()
        unsafeWindow.writer = writer
      } else if (catagory === "kanji") {
        writer.setCharacter(character.innerText)
        writer.quiz()
        containerdiv.hidden = false
      } else {
        writer.hideCharacter()
        containerdiv.hidden = true
        character.hidden = false
      }
  };
  let observer = new MutationObserver(onReviews)
  observer.observe(charactercontent, {
    childList: true,
    subtree: true,
  })
  onReviews()
  return observer
}