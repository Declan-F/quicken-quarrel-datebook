import { hanzi_writer_settings } from "../settings/settings"

class DashboardPage {
    constructor() {
        
    }
    onDashboard() {
        let drawer = document.querySelector("sitemap__pages")
        this.display_button = document.createElement("button")
        this.display_button.classList.add("sitemap__section sitemap__section--subsection")
        this.display_button.onclick = this.displaySettingsMenu 
        drawer.appendChild(this.display_button)
    }

    displaySettingsMenu() {
        this.settings_menu = document.createElement("div")
        this.back_button = document.createElement("button")
        this.save_button = document.createElement("button")
        this.button_header = document.createElement("div")
        
        this.settings_menu.id = "wkhwa-settings-menu"
        this.button_header.classList.add("wkhwa-settings-box")
        
        this.back_button.onclick = this.cleanupSettingsMenu
        this.save_button.onclick = this.saveSettings

        this.save_button.innerText = "Save"
        this.back_button.innerText = "Back"
        
        this.button_header.appendChild(this.save_button)
        this.button_header.appendChild(this.revert_button)
        this.settings_menu.appendChild(this.button_header)
        
        Object.values(hanzi_writer_settings).forEach((settings_element) => {
            settings_element.display(this.settings_menu)
        })
    }

    saveSettings() {
        Object.entries(hanzi_writer_settings).forEach((settings_element) => {
            settings_element[1].save()
            GM_setValue(key[0], settings_element[1].value)
        })
        this.cleanupSettingsMenu()
    }
    
    cleanupSettingsMenu() {
        this.settings_menu.remove()
    }

    offDashboard() {
        this.display_button = null
    }
    

}
export { DashboardPage }