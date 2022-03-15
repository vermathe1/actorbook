import React, { useState, useEffect, useRef } from 'react'
import { useClickOutside } from 'react-click-outside-hook'
import { useDebounce } from '../../utils'

export const useSearchbar = () => {
  const [isExpanded, setExpanded] = useState(false)
  const [ref, isclickedOutfContainer] = useClickOutside()
  const inputRef = useRef()
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [characters, setCharacters] = useState([])
  const expandContainer = () => {
    setExpanded(true)
  }
  const changeHandler = (e) => {
    e.preventDefault()
    setSearchQuery(e.target.value)
  }

  const collapseContainer = () => {
    setExpanded(false)
    if (inputRef.current) inputRef.current.value = ''
    setSearchQuery('')
    setLoading(false)
    setCharacters([])
  }
  useEffect(() => {
    if (isclickedOutfContainer) {
      collapseContainer()
    }
  }, [isclickedOutfContainer])
  const inputvariants = {
    expanded: {
      height: '30em',
    },
    collapsed: {
      height: '3.8em',
    },
  }
  const containerTransition = { type: 'spring', damping: 22, stiffness: 150 }
  const searchEpisodes = () => {
    if (!searchQuery || searchQuery.trim() === '') return

    setLoading(true)
    const response = {
      data: [
        {
          id: 1,
          name: 'Rick Sanchez',
          status: 'Alive',
          species: 'Human',
          type: '',
          gender: 'Male',
          origin: {
            name: 'Earth (C-137)',
            url: 'https://rickandmortyapi.com/api/location/1',
          },
          image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
          episode: [
            'https://rickandmortyapi.com/api/episode/1',
            'https://rickandmortyapi.com/api/episode/2',
            'https://rickandmortyapi.com/api/episode/3',
          ],
        },
        {
          id: 2,
          name: 'Rick Sanchez',
          status: 'Alive',
          species: 'Human',
          type: '',
          gender: 'Male',
          origin: {
            name: 'Earth (C-137)',
            url: 'https://rickandmortyapi.com/api/location/1',
          },
          image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
          episode: [
            'https://rickandmortyapi.com/api/episode/1',
            'https://rickandmortyapi.com/api/episode/2',
            'https://rickandmortyapi.com/api/episode/3',
          ],
        },
        {
          id: 3,
          name: 'Rick Sanchez',
          status: 'Alive',
          species: 'Human',
          type: '',
          gender: 'Male',
          origin: {
            name: 'Earth (C-137)',
            url: 'https://rickandmortyapi.com/api/location/1',
          },
          image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
          episode: [
            'https://rickandmortyapi.com/api/episode/1',
            'https://rickandmortyapi.com/api/episode/2',
            'https://rickandmortyapi.com/api/episode/3',
          ],
        },
        {
          id: 4,
          name: 'Rick Sanchez',
          status: 'Alive',
          species: 'Human',
          type: '',
          gender: 'Male',
          origin: {
            name: 'Earth (C-137)',
            url: 'https://rickandmortyapi.com/api/location/1',
          },
          image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
          episode: [
            'https://rickandmortyapi.com/api/episode/1',
            'https://rickandmortyapi.com/api/episode/2',
            'https://rickandmortyapi.com/api/episode/3',
          ],
        },
        {
          id: 5,
          name: 'Rick Sanchez',
          status: 'Alive',
          species: 'Human',
          type: '',
          gender: 'Male',
          origin: {
            name: 'Earth (C-137)',
            url: 'https://rickandmortyapi.com/api/location/1',
          },
          image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
          episode: [
            'https://rickandmortyapi.com/api/episode/1',
            'https://rickandmortyapi.com/api/episode/2',
            'https://rickandmortyapi.com/api/episode/3',
          ],
        },
      ],
    }

    if (response) {
      console.log('Response: ', response.data)
      setCharacters(response.data)
    }

    setLoading(false)
  }
  useDebounce(searchQuery, 500, searchEpisodes)
  return {
    isExpanded,
    inputvariants,
    expandContainer,
    collapseContainer,
    ref,
    containerTransition,
    inputRef,
    changeHandler,
    searchQuery,
    loading,
    characters,
  }
}
