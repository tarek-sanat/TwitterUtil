
function getVideo(tweet){
    let videos = tweet['extended_entities']['media'][0]['video_info']['variants']
      let remove;
      videos.forEach(video => {
        if(video['content_type'] ==='application/x-mpegURL'){
          
          remove = videos.indexOf(video)
        }
      })
      videos.splice(remove, 1)
      return videos;
}

module.exports = getVideo;