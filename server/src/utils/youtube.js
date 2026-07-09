function isValidYoutubeUrl(url){
  try{
    if(!url) return false
    const u = new URL(url)
    if(u.hostname.includes('youtube.com') || u.hostname.includes('youtu.be')) return true
    return false
  }catch(e){return false}
}

function extractVideoId(url){
  try{
    const u = new URL(url)
    if(u.hostname.includes('youtu.be')) return u.pathname.slice(1)
    if(u.hostname.includes('youtube.com')) return u.searchParams.get('v')
    return null
  }catch(e){return null}
}

module.exports = { isValidYoutubeUrl, extractVideoId }
