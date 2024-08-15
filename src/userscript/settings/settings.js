import { INPUT_TYPES, SettingsElement } from "./settingsElement"

let hanzi_writer_settings = {
    drawing_color: new SettingsElement('Drawing color', GM_getValue('drawing_color', '#000000'), INPUT_TYPES.COLOR),
    drawing_width: new SettingsElement('Drawing width', GM_getValue('drawing_width', 20), INPUT_TYPES.NUMBER),
    stroke_color: new SettingsElement('Drawing color', GM_getValue('stroke_color', '#aa00bb'), INPUT_TYPES.COLOR),
    quiz: new SettingsElement('Activate quiz mode', GM_getValue('quiz', 20), INPUT_TYPES.CHECKBOX)
}
export { hanzi_writer_settings }