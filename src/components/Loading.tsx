import React, { Component } from 'react'
import { CgSpinner } from 'react-icons/cg'

type Props = {}

type State = {}

export default class Loading extends Component<Props, State> {
  state = {}

  render() {
    return (
        <div className="w-full py-3 flex justify-center items-center">
            <CgSpinner className="text-6xl animate-spin transition-all ease-in-out text-primary"/>
        </div>
    )
  }
}