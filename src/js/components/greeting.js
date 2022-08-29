/**
 * The greeting web component module
 *
 */

const template = document.createElement('template')
template.innerHTML = `
  <style>
    #container {
      width: 100%;
      height: 100%;
      text-align: center;
    }

    #header {
      color: #8E4585;
      font-size: 2em;
    }

    #input-name {
      font-size: 1.5em;
    }

    #submit-btn {
      font-size: 1.5em;
      background-color: #8E4585;
      color: white;
      border: none;
      border-radius: 5px;
      padding: 3px; 
    }

    #submit-btn:hover {
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      cursor: pointer;
    }

  </style>
  
  <div id="container">
    <h2 id="header">Greetings</h2>
    <input id="input-name" type="text" />
    <button type="submit" id="submit-btn">Submit name</button>
  </div>
`

customElements.define('greeting-user',
/**
 * Represents the greeting element.
 */
  class extends HTMLElement {
    /**
     * The input field.
     */
    inputField

    /**
     * the submit button.
     */
    submitBtn

    /**
     * Creates an instance of the current type.
     *
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element and
      // append the template to the shadow root.
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      // Get necessary elements in shadowroot.
      this.inputField = this.shadowRoot.querySelector('#input-name')
      this.submitBtn = this.shadowRoot.querySelector('#submit-btn')

      this.submitBtn.addEventListener('click', () => {
        this.getName()
      })
    }

    /**
     * Get the inserted name.
     */
    getName () {
      console.log(this.inputField.value)
    }
  }
)
