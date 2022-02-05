
import './songinfo.css'

function SongInfo({info}){
    return(
        <div className='top'>
            <a href={"https://www.youtube.com/watch?v=" + info[3]} target="_blank" rel="noreferrer">
                <img className='image' src={info[4]} alt="Logo" />
            </a>
            
            <h4>Artist: {info[0]}</h4> 
            <h4>Song: {info[1]}</h4> 
            <h4>Album: {info[2]}</h4> 
        </div>
    )
}

export default SongInfo;