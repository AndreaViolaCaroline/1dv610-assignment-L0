/**
 * The main script file of the application.
 *
 * @author Andrea Viola Caroline Åkesson <ca223pw@student.lnu.se>
 * @version 1.1.0
 */
import './components/greeting.js'

const container = document.querySelector('#container')
const greeting = document.createElement('greeting-user')

container.appendChild(greeting)
