
## seting up react app
1. - install node js
2. - $ npx create-react-app APP_NAME
3. npm start // start development server


## Install pacages and settings
$ npm install react-router-dom@6

    import {
        BrowserRouter as Router,
        Switch,
        Route,
        Link
        } from "react-router-dom";

        import './App.css';
        import Header from './components/Header'
        import Notes from './pages/Notes'
        import Note from './pages/Note'
    // import your route components too



    // In App.js
    function App() {


        return (
            <Router>
            <div className="container">
                <div className="app">
                <Header />
                <Route path="/" exact component={Notes} />
                <Route path="/note/:id" component={Note} />
                </div>
            </div>
            </Router>
        );
        }

        export default App;


// In .idex.js

        import React from 'react';
        import ReactDOM from 'react-dom';
        import App from './App';

        ReactDOM.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
        document.getElementById('root')
        );

        //TESTING CONTINUOUS DEPLPOYMENT ON NETLIFY



// In .pages/Notes.js

        import React, { useState, useEffect } from 'react'
        //import notes from '../assets/data'
        import ListItem from '../components/ListItem'
        import AddButton from '../components/AddButton'




        const Notes = () => {

            let [notes, setNotes] = useState([])

            useEffect(() => {
                getNotes()

            }, [])


            let getNotes = async () => {
                let response = await fetch('http://127.0.0.1:5000/notes/')
                let data = await response.json()
                setNotes(data)
            }

            return (
                <div className="notes">
                    <div className="notes-header">
                        <h2 className="notes-title">&#9782; Notes</h2>
                        <p className="notes-count">{notes.length}</p>
                    </div>

                    <div className="notes-list">
                        {notes.map((note, index) => (
                            <ListItem key={index} note={note} />
                        ))}
                    </div>

                    <AddButton />
                </div >
            )
        }

        export default Notes

// In .pages/Note.js

        import React, { useEffect, useState } from 'react'
        //import notes from '../assets/data'
        import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
        import { Link } from 'react-router-dom'


        const Note = ({ match, history }) => {
            let noteId = match.params.id

            let [note, setNote] = useState(null)

            //let note = notes.find(note => note.id == noteId)

            useEffect(() => {

                getNote()
            }, [noteId])

            let getNote = async () => {
                if (noteId == 'new') return
                let response = await fetch(`http://127.0.0.1:5000/notes/${noteId}`)
                let data = await response.json()
                setNote(data)
            }

            const createNote = async () => {


                await fetch(`http://127.0.0.1:5000/notes/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ ...note, 'updated': new Date() })
                })
            }


            const updateNote = async () => {
                await fetch(`http://127.0.0.1:5000/notes/${noteId}/`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ ...note, 'updated': new Date() })
                })
            }

            const deleteNote = async () => {
                await fetch(`http://127.0.0.1:5000/notes/${noteId}/`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(note)
                })
                history.push('/')
            }

            let handleSubmit = () => {
                if (noteId != "new" && !note.body) {
                    deleteNote()
                } else if (noteId != "new") {
                    updateNote()
                } else if (noteId === 'new' && note !== null) {
                    createNote()
                }

                history.push('/')
            }


            return (
                <div className="note">
                    <div className="note-header">
                        <h3>
                            <Link to={'/'}>
                                <ArrowLeft onClick={handleSubmit} />
                            </Link>
                        </h3>
                        {noteId != 'new' ? (
                            <button onClick={deleteNote}>Delete</button>
                        ) : (
                            <button onClick={handleSubmit}>Done</button>
                        )}

                    </div>
                    <textarea onChange={(e) => { setNote({ ...note, 'body': e.target.value }) }} placeholder="Edit note" value={note?.body}></textarea>
                </div >
            )
        }

        export default Note


//In .component/AddButtom.js

        import React from 'react'
        import { Link } from 'react-router-dom'
        import { ReactComponent as AddIcon } from '../assets/add.svg'

        const AddButton = () => {
            return (
                <Link to="/note/new/" className="floating-button">
                    <AddIcon />
                </Link>
            )
        }

        export default AddButton



//In .component/Header.js

        const Header = () => {
            return (
                <div className="app-header">
                    <h1>React Note App</h1>
                </div>
            )
        }

        export default Header;


    


//In .component/Footer.js
        import React from 'react'

        const Footer = () => {
            return (
                <div className="app-footer">
                    <h1>React App project By Sadat Nagyira</h1>
                </div>
            )
        }

        export default Footer


//In .component/ListItem.js

        import React from 'react'
        import { Link } from 'react-router-dom'


        let getTime = (note) => {
            return new Date(note.updated).toLocaleDateString()
        }


        let getTitle = (note) => {
            //spit by new lines and just get the first line
            //split will make a list of each line and will only pull on the first line by index zero
            const title = note.body.split('\n')[0]
            if (title.length > 45) {
                return title.slice(0, 45)
            }
            return title
        }


        let getContent = (note) => {
            //Get content after title
            let title = getTitle(note)
            let content = note.body.replaceAll('\n', '')
            content = content.replaceAll(title, '')

            //Slice content and add three dots in over 45 characters to show there is more
            if (content.length > 45) {
                return content.slice(0, 45) + '...'
            } else {
                return content
            }

        }


        const ListItem = ({ note }) => {
            return (
                <Link to={`/note/${note.id}`}>
                    <div className="notes-list-item">
                        <h3>{getTitle(note)}</h3>
                        <p><span>{getTime(note)}</span>{getContent(note)}</p>
                    </div>
                </Link>
            )
        }

        export default ListItem
//In .assets/
        add.svg
        arrow-lesft.svg
        data.js
        db.json

//In package.json
    in sripts{
        "server": "json-server --watch db.json --port 5000" //add this to start db.json server at port 5000
    }




$ npm install -g json-server npm install 
    Start JSON Server
        $ json-server --watch db.json


        Routes

            Based on the previous db.json file, here are all the default routes. You can also add other routes using --routes.
            Plural routes

            GET    /posts
            GET    /posts/1
            POST   /posts
            PUT    /posts/1
            PATCH  /posts/1
            DELETE /posts/1



## starting application

1. - cd notes-app
2. - npm install
3. - npm run server //STARTS JSON SERVER ON PORT 5000
4. - npm start  //STARTS REACT SERVER


# Notes List
<img src="./Notes.PNG">  

