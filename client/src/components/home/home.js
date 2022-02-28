import React, { useState } from 'react'
import axios from 'axios'
import "./home.css" 
import { returnID } from './homeHelper'
import Download from "../download/download"
import SongInfo from '../songInfo/songinfo'
function Menu() {
    //Keep track of different states
    var [down, setDownload] = useState(null)
    var [search, setSearch] = useState('')
    var [showCurrent, setCurrent] = useState('nothing')
    var [err, setErr] = useState('')
    var [songInfo, setSongInfo] = useState(0)

    //Make call to find song, If found display it else display error
    var findSong = async () => {
        if(search !== '' ){
            //Get the video from twitter
            let videos = await download('song')
            //If video from twitter found
            if(videos !== 'notFound'){
                //get video URL
                let videoURL = videos['data'][0]['url']
                //API call to find song name
                let songName = await axios.get("http://localhost:9000/getSong", {params: {url: videoURL}})
                //If song not found
                if(songName['data']['result'] === null || songName['data'] === ''){
                    // set Error message
                    setCurrent('URLError')
                    setErr('Unfortunately, the song in the video was not found, Try a different Video!')
                    setSongInfo('')
                } else{
                    // Song found, get its information and youtube link
                    var arr = [songName['data'][0], songName['data'][1], songName['data'][2], songName['data'][3], songName['data'][4]]
                    //Set song info
                    setSongInfo(arr)
                    setCurrent('Song')
                    setErr('')
                }
            } else{
                // video not found set err msg
                setCurrent('URLError')
                setErr('Unfortunately, the song in the video was not found, Try a different Video!')
            }
        }
    }

    // function to download video from twitter
    var download = async (type) =>{
        setCurrent('')
        if(search !== ''){
            // make call to backend
            let response = await axios.get("http://18.119.1.10:9000/getSong/twitter", {params:{id: returnID(search)}})
            // if tweet found
            if(response['data'] !== 'error tweet not found'){
                // if we want to download the video
                if(type === 'down'){
                    //set Parameters to download
                    setCurrent('Download')
                    setErr('')
                } 
                //if we just need the information of the video for finsing song
                return response;
            } else{
                setCurrent('URLError')
                setErr('URL Error, Did not find twitter video. Make sure the URL is correct')
                return 'notFound'
            }
        }
    }
    return(
        <div className='menu'>
            
            <div className='main'>
                <h1 className='textMargin'>Twitter Video Utility Website</h1>
                <h3 className='textMargin'>Paste the URL of a Twitter video!</h3>
                <h3 className='textMargin'>You can download any video or you can find the song playing in the video! </h3>
            </div>            
            <div className="bar">
                <input className="searchbar" type="text" title="Search" placeholder='Entrer Twitter URL' onChange={(e) => {setSearch(e.target.value)}}/>
            </div>
            
            <div className="buttons">
                <button className="button" onClick = {() => {setDownload(download('down'))}}>Download</button>
                <button className="button" onClick = {() => {findSong('song')}}>Find Song</button>
            </div>

            {showCurrent === 'Download' ? <Download menu={down}></Download> : ''}
            {showCurrent === 'URLError' ? <h4>{err}</h4> : ''}
            {showCurrent === 'Song' ? <SongInfo info={songInfo}></SongInfo> : ''}
        </div>
    )
}

export default Menu;