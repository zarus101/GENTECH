import { myAxios } from "./Helper"

 //getting all the song
 export const getAllMusic=()=>{
    return myAxios.get('/songs').then(response=>{return response.data})
 }

 export const getMusicByArtistId=(artistID)=>{
    return myAxios.get(`/songs/${artistID}`).then(response=>{return response.data})
 }
 
//deleting tyhe song 
export const deleteSongById=(songID, token)=>{
    return myAxios.delete(`/deleteSong/${songID}` ,{
        headers: {
        "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
    })
}


export const deleteAllSongs=(token)=>{
    return myAxios.delete(`/deleteAllSong` ,{
        headers: {
        "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
    })
}

