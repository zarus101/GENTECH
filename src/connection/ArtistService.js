import { myAxios } from "./Helper"

//deleting tyhe user
export const deleteArtistById=(artistID, token)=>{
    return myAxios.delete(`/deleteArtist/${artistID}` ,{
        headers: {
        "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
    })
}


//getting all the artists
export const getAllArtists=()=>{
  return myAxios.get('/getAllArtist').then(response=>{return response.data})
}