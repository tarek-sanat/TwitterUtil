import { useEffect, useState } from "react"
import './download.css'

// Get the different video sizes available
function getSizes(menu){
    let url = menu['url']
    let size = url.substring(url.lastIndexOf('/pu/vid/')+8)
    var finalSize= size.substr(0, size.indexOf('/')); 
    return [finalSize, url]
}



function Download({menu}){
    //Keep state of download buttons
    var [download1, setDownload1] = useState(0)
    var [download2, setDownload2] = useState(0)
    var [download3, setDownload3] = useState(0)
    
    useEffect(()=>{
        async function setMenu(){
            //Set dimensions of each video and their links
            var men = await menu
            for(let i = 0; i < men['data'].length; i++){
                if(i === 0) setDownload1(getSizes(men['data'][i]))
                if(i === 1) setDownload2(getSizes(men['data'][i]))
                if(i === 2) setDownload3(getSizes(men['data'][i]))
            }
            
        }
        setMenu()
    }, [menu])

    return(
       
        <div className="buttons">
             <h4>Choose the size to download, right click the video and save it!</h4>
            {download1 !== 0 ? <a className="button a" href={download1[1]} download target="_blank" rel="noreferrer">{download1[0]}</a>: ''}
            {download2 !== 0 ? <a className="button a" href={download2[1]} download target="_blank" rel="noreferrer">{download2[0]}</a>: ''}
            {download3 !== 0 ? <a className="button a" href={download3[1]} download target="_blank" rel="noreferrer">{download3[0]}</a>: ''}
        </div>
    )
}

export default Download;