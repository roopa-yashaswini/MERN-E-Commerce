import React from 'react'
// import useWindowSize from './useWindowSize';
import Confetti from 'react-confetti'


const ConfettiComp = () => {
    // const { width, height } = useWindowSize()
    return (
        <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
        />
    )
}

export default ConfettiComp;