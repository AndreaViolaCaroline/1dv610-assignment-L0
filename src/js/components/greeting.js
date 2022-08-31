import axios from 'axios'

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

    button {
      font-size: 1.5em;
      background-color: #8E4585;
      color: white;
      border: none;
      border-radius: 5px;
      padding: 3px; 
    }

    button:hover {
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      cursor: pointer;
    }

    #greeting-msg {
      font-size: 1.2em;
      white-space: pre-line;
    }

  </style>
  
  <div id="container">
    <h2 id="header">Greetings!</h2>
    <input id="input-name" type="text" />
    <button type="submit" id="submit-btn">Submit name</button>
    <p id="greeting-msg"></p>
    <button type="submit" id="Go Again">Clear</button>
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
     * The submit button.
     */
    submitBtn

    /**
     * The users name.
     */
    userName

    /**
     * The fun fact.
     */
    bucketListItem

    /**
     * The greeting message area.
     */
    greetingMsg

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
      this.greetingMsg = this.shadowRoot.querySelector('#greeting-msg')

      this.submitBtn.addEventListener('click', () => {
        this.fetchBucketListItem()
      })
    }

    /**
     * Get the inserted name.
     *
     * @returns {string} - The user's name.
     */
    getName () {
      this.userName = this.inputField.value
      return this.userName
    }

    /**
     * Fetch bucketlist item.
     */
    async fetchBucketListItem () {
      try {
        const response = await axios.get('https://api.api-ninjas.com/v1/bucketlist', {
          headers: { 'X-Api-Key': 'k7KvF8ev+bvMTGkUwch4Ng==WqpGjfAGOyE4k2sb' },
          contentType: 'application/json'
        })

        this.bucketListItem = response.data.item

        this.printGreeting(this.getName())
      } catch (error) {
        console.error(error)
        this.greetingMsg.textContent = 'Ooops something went wrong, try again!'
      }
    }

    /**
     * Print out letters in name one by one.
     *
     * @param {string} name - The name inserted.
     */
    printGreeting (name) {
      this.greetingMsg.textContent = 'Hi there!\r\n'
      this.greetingMsg.textContent += '\r\nAdd this to your bucket list! \r\n\r\n' + this.bucketListItem + '. \r\n\r\nJust do it! So long '
      for (let i = 0; i < name.length; i++) {
        setTimeout(() => {
          this.greetingMsg.textContent += name.charAt(i)
        }, 800 * i)
      }
    }
  }
)
