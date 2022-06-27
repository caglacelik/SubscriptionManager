import apple from './resimler/apple.png'
import appletv from './resimler/appletv.png'
import disney from './resimler/disney.png'
import hbo from './resimler/hbo.png'
import netflix from './resimler/netflix.jpg'
import nintendo from './resimler/nintendo.png'
import prime from './resimler/Prime_0.png'
import psn from './resimler/psn.jpg'
import spotify from './resimler/spotify.jpg'
import youtube from './resimler/youtube.jpg'
import xbox from './resimler/xbox.png'
import chegg from './resimler/chegg.png'
import twitch from './resimler/twitch.png'
import amazon from './resimler/amazon.jpg'

export const categoryOptions = [
  {
      label: "Entertainment",
      value: "Entertainment",
  },
  {
      label: "Music",
      value: "Music",
  },
  {
      label: "Education",
      value: "Education",
  },
  {
      label: "Game",
      value: "Game",
  },
  {
      label: "All",
      value: "All",
  },
]
export const languageOptions = [
  {
      label: "English",
      value: "English",
      code: "en",
  },
  {
      label: "Turkish",
      value: "Turkish",
      code: "tr",
  },
]
export const sliderItems = [
    {
      id: 1,
      img: spotify,
      name: "Spotify",
      bg: "white"
    },
    {
      id: 2,
      img: twitch,
      name: "Twitch",
      bg: "white",
    },
    {
      id: 3,
      img: youtube,
      name: "Youtube",
      bg: "white",
    },
    {
      id: 4,
      img: xbox,
      name: "Xbox Game Pass",
      bg: "white",
    },
    {
      id: 5,
      img: netflix,
      name: "Netflix",
      bg: "white",
    },
    {
      id: 6,
      img: hbo,
      name: "HBO",
      bg: "white",
    },
    {
      id: 7,
      img: amazon,
      name: "Amazon",
      bg: "white",
    },
    {
      id: 8,
      img: psn,
      name: "Psn Plus",
      bg: "white",
    },
    {
      id: 9,
      img: nintendo,
      name: "Nintendo Online",
      bg: "white",
    },
    {
      id: 10,
      img: chegg,
      name: "Chegg",
      bg: "white",
    }
]
export const categoryCurrency = [
  {
      label: "€",
      value: "€",
      price: 1/18,
  },
  {
      label: "$",
      value: "$",
      price: 1/16,
  },
  {
      label: "TL",
      value: "TL",
      price: 1,
  },
]
