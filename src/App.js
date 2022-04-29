import { useState, useEffect } from 'react'
import { FormControl, Input } from '@mui/material'
import firebase from 'firebase/compat/app'
import './App.css'
import Message from './Message'
import db from './firebase'
import FlipMove from 'react-flip-move'
import SendIcon from '@mui/icons-material/Send'
import IconButton from '@mui/material/IconButton'

function App() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [userName, setUserName] = useState('')

  useEffect(() => {
    db.collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() })),
        )
      })
  }, [])

  useEffect(() => {
    setUserName(prompt('Please enter your name'))
  }, [])

  const sendMessage = (event) => {
    // all the logic to send the message goes here
    event.preventDefault()

    db.collection('messages').add({
      message: input,
      userName: userName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })

    setInput('')
  }
  return (
    <div className="App">
      <img
        src="https://scontent.fdiy1-1.fna.fbcdn.net/v/t1.6435-9/121144316_4235843479868633_1561909311908486242_n.png?_nc_cat=1&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=KOGIDttcI7kAX-4xyeT&_nc_oc=AQmTF8HmNsLElWGn3V4GTDzQGpS1UtEfb1mniCenuxBFdsbW7UVLUuq2MCi9eZYDnYY&_nc_ht=scontent.fdiy1-1.fna&oh=00_AT9-fq6r4GNWLxsATqKa5VcXDmkT_96iicrUayqRGIR6Ng&oe=62923D42"
        style={{ height: '6.5rem' }}
        alt="logo"
      />
      <h1>Hello World!</h1>
      <h2>Welcome {userName}</h2>

      <form className="app__form">
        <FormControl className="app__formControl">
          <Input
            className="app__input"
            placeholder="Enter a message..."
            value={input}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage(e)}
            onChange={(event) => setInput(event.target.value)}
          />
          <IconButton
            className="app__iconButton"
            disabled={!input}
            variant="contained"
            color="primary"
            onClick={sendMessage}
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
      <FlipMove>
        {messages.map(({ id, message }) => (
          <Message key={id} userName={userName} message={message} />
        ))}
      </FlipMove>
    </div>
  )
}

export default App
