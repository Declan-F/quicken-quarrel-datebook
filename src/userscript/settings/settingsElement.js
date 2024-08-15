const INPUT_TYPES = Object.freeze({
    COLOR: Symbol("color_input"),
    NUMBER: Symbol("number_input"),
    CHECKBOX: Symbol("checkbox_input")
})

class SettingsElement {
    /**
     * 
     * @param {string} human_readable_name 
     * @param {string} default_value 
     * @param {Symbol} input_type One of the values stored in INPUT_TYPES
     */
    constructor(human_readable_name, default_value, input_type) {
        this.input_type = input_type
        this.name = human_readable_name
        this.value = default_value
    }

    getInputElement() {
        let input_element = document.createElement("input")
        input_element.value = this.value
        switch (this.input_type) {
            case INPUT_TYPES.COLOR:
                input_element.type = "color"
                return input_element
            case INPUT_TYPES.NUMBER:
                input_element = "number"
                return input_element
            case INPUT_TYPES.CHECKBOX:
                input_element = "checkbox"
                return input_element
            default:
                console.warn("Invalid input type for setting was set.")
                return input_element
        }
    }


    /**
     * 
     * @param {Element} settings_group 
     */
    display(settings_group) {
        this.parent_element = document.createElement("div")
        this.parent_element.classList.add("wkhwa-settings-box")
        this.element = document.createElement("label")
        this.element.classList.add("wkhwa-settings-label")
        this.parent_element.appendChild(this.element)
        this.parent_element.appendChild(this.getInputElement())
        settings_group.appendChild(this.parent_element)
    }
}

export { SettingsElement, INPUT_TYPES }