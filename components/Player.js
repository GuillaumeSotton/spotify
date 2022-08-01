//React librairies
import { useCallback, useEffect, useState } from 'react'

//Nextjs
import { useSession } from 'next-auth/react'

//Icons
import { SwitchHorizontalIcon, VolumeUpIcon as VolumeDownIcon } from '@heroicons/react/outline'
import {
  RewindIcon,
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  VolumeUpIcon,
} from '@heroicons/react/solid'

//Custom hooks
import useSpotify from '../hooks/useSpotify'
import useSongInfo from '../hooks/useSongInfo'

//Recoil
import { useRecoilState } from 'recoil'
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom'
import { debounce } from 'lodash'

const Player = () => {
  //Recoil
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)

  //Use session
  const { data: session } = useSession()

  //Use spotify
  const spotifyApi = useSpotify()

  //Use state
  const [volume, setVolume] = useState(50)

  //Song info
  const songInfo = useSongInfo()

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        setCurrentTrackId(data.body?.item?.id)

        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing)
        })
      })
    }
  }

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong()
      setVolume(50)
    }
  })

  useEffect(() => {
    if(volume > 0 && volume < 100){
        debouncedAdujstVolume(volume);
    }
  }, [volume]);

  const debouncedAdujstVolume = useCallback(
      debounce((volume) => {
          spotifyApi.setVolume(volume).catch(err => {})
      }, 500),
      []
  );

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body.is_playing) {
        spotifyApi.pause()
        setIsPlaying(false)
      } else {
        spotifyApi.play()
        setIsPlaying(true)
      }
    })
  }

  return (
    <div className="grid h-24 grid-cols-3 bg-gradient-to-b from-black to-gray-900 px-2 text-xs text-white md:px-8 md:text-base">
      <div className="flex items-center space-x-4">
        <img
          className="hidden h-10 w-10 md:inline"
          src={songInfo?.album.images?.[0]?.url}
          alt=""
        />
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>

      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon className="button" />
        <RewindIcon className="button" />

        {isPlaying ? (
          <PauseIcon onClick={handlePlayPause} className="button h-10 w-10" />
        ) : (
          <PlayIcon onClick={handlePlayPause} className="button h-10 w-10" />
        )}

        <FastForwardIcon className="button" />
        <ReplyIcon className="button" />
      </div>

      <div className="flex items-center justify-end space-x-3 pr-5 md:space-x-4">
        <VolumeDownIcon className="button" onClick={() => volume > 0 && setVolume(volume - 10)} />
        <input className='w-14 md:w-28' type="range" onChange={e => setVolume(Number(e.target.value))} value={volume} min={0} max={100} />
        <VolumeUpIcon className="button" onClick={() => volume < 100 && setVolume(volume + 10)}/>
      </div>
    </div>
  )
}

export default Player
