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