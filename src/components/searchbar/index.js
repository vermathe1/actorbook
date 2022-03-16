import React from 'react'
import {
  SearchContainer,
  LineSeperator,
  SearchContentContainer,
} from '../../styles'
import { StyledInput } from '../../molecules/styledInput'
import { useSearchbar } from './useSearchbBar'
import { Loading } from '../../atoms/loading'
import { ShowCharacters } from '../../molecules/showCharacters'
import { Message } from '../../atoms/warningmessage'
import { AutoSearchContainer } from '../../styles'

export const SearchBar = ({ onClick }) => {
  const {
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
  } = useSearchbar()
  const isEmpty = !characters || characters.length === 0
  return (
    <AutoSearchContainer>
      <SearchContainer
        animate={isExpanded ? 'expanded' : 'collapsed'}
        variants={inputvariants}
        ref={ref}
        transition={containerTransition}
      >
        <StyledInput
          placeholder="Start typing..."
          onFocus={expandContainer}
          isExpanded={isExpanded}
          ref={inputRef}
          onCrossIconClick={collapseContainer}
          onChange={changeHandler}
          value={searchQuery}
        />
        {isExpanded && <LineSeperator />}
        <SearchContentContainer>
          {loading && <Loading loading={true} size={20} color="#000" />}
          {!loading && noActorsFound && <Message>No Actors found!</Message>}
          {!loading && isEmpty && !noActorsFound && (
            <Message>Start typing actors name...</Message>
          )}
          {!isEmpty && !loading && (
            <>
              {characters.map(({ name, species, image, id }) => (
                <ShowCharacters
                  key={id}
                  image={image}
                  name={name}
                  species={species}
                  onClick={onClick}
                  id={id}
                />
              ))}
            </>
          )}
        </SearchContentContainer>
      </SearchContainer>
    </AutoSearchContainer>
  )
}
