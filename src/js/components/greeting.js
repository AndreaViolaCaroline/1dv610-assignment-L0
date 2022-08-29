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
      color: #6b8e23;
      font-size: 2em;
    }

  </style>
  
  <div id="container">
    <h2 id="header">Greetings</h2>
    <input id="input-name" type="text" />
    <button type="submit" id="submit-name">Submit name</button>
  </div>
`

customElements.define('greeting-user',
/**
 * Represents the greeting element.
 */
  class extends HTMLElement {
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
    }
  }
)
