import React, { Component } from 'react'
const Musixmatch = require('musixmatch-node')
const mxm = new Musixmatch('54340e8a4266915b118c498fc98c1f6f')

let baseUrl = ''
if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://localhost:3003'
} else {
    baseUrl = 'heroku url here'
}


class AddSong extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            artist: '',
            playlists: []
        }
    }
    getPlaylist = async () => {
        const response = await fetch(baseUrl + "/notspotify")
        const parseData = await response.json()
        // console.log(parseData)
        this.setState({
            playlists: parseData,
            // currentUser: this.props.currentUser
        })
    }

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    componentDidMount() {
        this.getPlaylist()
    }

    getSongFromAPI = async (event) => {
        event.preventDefault()
            try {
                const lyrics = await mxm.getLyricsMatcher({
                    q_track: 'sick sick sick',
                    q_artist: 'queens of the stone age',
                })
                console.log(lyrics)
            } catch (err) {
                console.log(err)
            }
    }

    render() {
        console.log(this.state.playlists)
        console.log(this.props.currentUser)

        return (
            <form className="AddSong" onSubmit={(evt) => this.handleSubmit(evt)}>
                <h3>Add Song</h3>
                <label htmlFor="name">Name: </label>
                <input required="true" type="text" id="name" name="name" onChange={(evt) => this.handleChange(evt)} />
                <br></br>
                <label htmlFor="artist">Artist: </label>
                <input required="true" type="text" id="artist" name="artist" onChange={(evt) => this.handleChange(evt)} />
                <br></br>
                <label for="playlists">Choose Playlist: </label>
                <select name="playlist" id="playlists" >
                    {this.state.playlists.map(playlist => {
                        if (playlist.author === this.props.currentUser._id) {
                            return <option value={playlist.name}>{playlist.name}</option>
                        }

                    })}

                </select>
                <br></br>
                <button type="submit">Add Song</button>
            </form>
        )
    }
}

export default AddSong