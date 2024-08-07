import { shuffle } from 'fast-shuffle'

const sounds = shuffle([
  {
    path: '/audios/Apito.wav',
    answer: 'Apito',
  },
  {
    path: '/audios/Flauta.wav',
    answer: 'Flauta',
  },
  {
    path: '/audios/Sino.wav',
    answer: 'Sino',
  },
])

export { sounds }
