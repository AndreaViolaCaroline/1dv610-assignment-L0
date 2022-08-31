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

    h3 {
      letter-spacing: 1.5px;
      font-weight: 150;
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

    #bucketlist-msg {
      margin-top: 50px;
      color: #8E4585;
      font-size: 1.7em;
      letter-spacing: 1.5px;
      font-weight: 150;
    }

    #greeting-msg {
      font-size: 1.2em;
      white-space: pre-line;
    }

    .hidden {
      display: none;
    }

  </style>
  
  <div id="container">
    <h2 id="header">Greetings!</h2>
    <h3>Build your bucketlist</h3>
    <input id="input-name" type="text" />
    <button type="submit" id="submit-btn">Submit name</button>
    <p id="bucketlist-msg"></p>
    <p id="greeting-msg"></p>
    <button type="submit" id="clear-btn">Clear</button>
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
     * The clear button.
     */
    clearBtn

    /**
     * The users name.
     */
    userName

    /**
     * The bucketlist item.
     */
    bucketListItem

    /**
     * The greeting message area.
     */
    greetingMsg

    /**
     * The timer.
     */
    nameTimeOut

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
      this.bucketListMsg = this.shadowRoot.querySelector('#bucketlist-msg')
      this.clearBtn = this.shadowRoot.querySelector('#clear-btn')

      this.submitBtn.addEventListener('click', () => {
        this.fetchBucketListItem()
      })

      this.clearBtn.addEventListener('click', () => {
        clearTimeout(this.nameTimeOut)
        this.clearAll()
      })
    }

    /**
     * Runs when element is inserted in DOM.
     */
    connectedCallback () {
      this.clearBtn.classList.add('hidden')
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
        this.clearBtn.classList.remove('hidden')
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
      this.bucketListMsg.textContent = this.bucketListItem
      this.greetingMsg.textContent = '\r\nJust do it! So long '
      for (let i = 0; i < name.length; i++) {
        this.nameTimeOut = setTimeout(() => {
          this.greetingMsg.textContent += name.charAt(i)
        }, 800 * i)
      }
    }

    /**
     * Clears all information.
     */
    clearAll () {
      this.inputField.value = ''
      this.bucketListMsg.textContent = ''
      this.greetingMsg.textContent = ''
      this.clearBtn.classList.add('hidden')
    }
  }
)
