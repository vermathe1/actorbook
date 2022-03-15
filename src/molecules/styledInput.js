import React from 'react'
import { InputType } from '../atoms/inputType'
import { SearchInputContainer } from '../styles'
import { SearchIconComponent } from '../atoms/searchicon'
import { CloseIconComponent } from '../atoms/closeicon'
export const StyledInput = React.forwardRef(
  (
    { placeholder, id, onFocus, onCrossIconClick, isExpanded, onChange, value },
    ref
  ) => {
    return (
      <SearchInputContainer>
        <SearchIconComponent />
        <InputType
          placeholder={placeholder}
          id={id}
          onFocus={onFocus}
          ref={ref}
          onChange={onChange}
          value={value}
        />
        {isExpanded && <CloseIconComponent onClick={onCrossIconClick} />}
      </SearchInputContainer>
    )
  }
)
