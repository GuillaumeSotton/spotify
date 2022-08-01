//Nextjs
import { useEffect, useState } from 'react'

//Custom hooks
import useSpotify from '../hooks/useSpotify'

//Recoil
import { useRecoilState } from 'recoil'
import { currentTrackIdState } from '../atoms/songAtom'

function useSongInfo() {
  //Recoil
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState)

  //Use spotify
  const spotifyApi = useSpotify()

  //Use state
  const [songInfo, setSongInfo] = useState(null)

  useEffect(() => {
    const fetchSongInfo = async () => {
      if (currentTrackId) {
        const trackInfo = await fetch(
          `https://api.spotify.com/v1/tracks/${currentTrackId}`,
          {
            headers: {
              Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
            },
          }
        ).then((response) => response.json())

        setSongInfo(trackInfo)
      }
    }

    fetchSongInfo()
  }, [currentTrackId, spotifyApi])

  return songInfo
}

export default useSongInfo
