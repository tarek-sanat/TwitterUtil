function returnID(url){
    const after = url.substring(url.indexOf('status/') + 7);
    if(after.charAt(after.length - 1) === '/'){
        after.slice(0,-1)
    }
    return after;
}

export {returnID}