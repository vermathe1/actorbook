import React, { useState, useEffect, useRef } from 'react'
import { useClickOutside } from 'react-click-outside-hook'
import { useDebounce } from '../../utils'
import { filterbyCategory } from '../../utils/index'

export const useSearchbar = () => {
  const [isExpanded, setExpanded] = useState(false)
  const [ref, isclickedOutfContainer] = useClickOutside()
  const inputRef = useRef()
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [characters, setCharacters] = useState([])
  const [noActorsFound, setnoActorsFound] = useState(false)
  const expandContainer = () => {
    setExpanded(true)
  }
  const changeHandler = (e) => {
    e.preventDefault()
    setSearchQuery(e.target.value)
    if (!e.target.value.length) setnoActorsFound(false)
  }

  const collapseContainer = () => {
    setExpanded(false)
    if (inputRef.current) inputRef.current.value = ''
    setSearchQuery('')
    setLoading(false)
    setCharacters([])
    setnoActorsFound(false)
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

  const showAutoCompleteResult = () => {
    const data = JSON.parse(window.localStorage.getItem('autosearch'))
    Promise.all(
      data.map((actorinfo) => filterbyCategory(actorinfo, 'name', searchQuery))
    )
      .then((res) => {
        setLoading(false)
        let SearchResponse = res.reduce((acc, data) => {
          acc = acc.concat(data)
          return acc
        }, [])
        if (!SearchResponse.length) {
          setnoActorsFound(true)
        } else {
          setCharacters(SearchResponse)
          setnoActorsFound(false)
        }
      })
      .catch((err) => {
        setLoading(false)
        console.log('error while filtering in autosearch', err)
      })
  }

  const searchCharacters = async () => {
    if (!searchQuery || searchQuery.trim() === '') return
    setLoading(true)
    showAutoCompleteResult()
  }
  useDebounce(searchQuery, 500, searchCharacters)
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
    noActorsFound,
  }
}
