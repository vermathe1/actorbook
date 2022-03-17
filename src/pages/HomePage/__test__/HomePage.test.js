import React from 'react'
import 'babel-polyfill'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, queryByAttribute } from '@testing-library/react'
import { HomePage } from '../index'
import 'regenerator-runtime/runtime'

describe('Agreement Form tests', () => {
  let component
  beforeAll(() => {})

  beforeEach(() => {
    component = render(<HomePage />)
  })

  it('it should render the App', () => {})
})
