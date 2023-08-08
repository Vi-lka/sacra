"use client"

import React from 'react'
// import { animated, useSprings } from '@react-spring/web'

export default function CircleMenu() {

    // const cards = [
    //     "КрасноярскиЙ край",
    //     "Республика Хакасия",
    //     "Республика Тыва"
    // ]

    // function theta(i: number, count: number) {
    //     return 2 * Math.PI * (i / count)
    // }

    // let currentCard = 0

    // const to = (i: number) => ({
    //     x: Math.round(window.innerWidth > 1000 ? 
    //       window.innerWidth / 7 * (Math.sin(theta(i - currentCard , 8))) 
    //       : 
    //       window.innerWidth / 3 * (Math.sin(theta(i - currentCard , 8)))),
    
    //     y: Math.round(window.innerWidth > 1000 ? 
    //       window.innerWidth / 16 * (Math.cos(theta(i - currentCard , 8)))
    //       : 
    //       window.innerWidth / 6 * (Math.cos(theta(i - currentCard , 8)))),
    //     zIndex: i === currentCard ? 10 : 1,
    //     rot: 0,
    //     scale: i === currentCard ? 1 : 0.35,
    //     delay: i * 10,
    //   })
    //   const from = (_i: number) => ({ x: 0, y: -1000, zIndex: 1, scale: 1 })
    
    //   const [props, api] = useSprings(cards.length, i => ({
    //     ...to(i),
    //     from: from(i),
    // })) 

      // function calcutaleCurrentCard(current: number) {
      //   if (current < 0) {
      //     currentCard = cards.length - 1
      //   } else if (current > (cards.length - 1)) {
      //     currentCard = 0
      //   } else {
      //     currentCard = current
      //   }
      // }

      // function changeCard(i: number) {
      //   currentCard = i
      //   api.start(i => to(i))
      //   // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      //   slideToItem(i)
      // }

      // function nextCard(next: boolean) {
      //   if (next) {
      //     calcutaleCurrentCard(currentImg - 1)
      //     api.start(currentImg => to(currentImg))
      //     // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      //     slideToPrevItem()
      //   } else {
      //     calcutaleCurrentImg(currentImg + 1)
      //     api.start(currentImg => to(currentImg))
      //     slideToNextItem()
      //     state.currentModel = currentImg
      //   }
      // }
    

  return (
    <>
        <div className="circle w-full sm:h-[80vh] absolute lg:left-[-70%] sm:left-[-80%] sm:top-0 bottom-[-75vw]">
            <svg viewBox="0 0 140 140" preserveAspectRatio="xMaxYMin meet" className='w-full h-full'>
                <circle cx="50%" cy="50%" r="48%" stroke="white" strokeWidth="1" fillOpacity={0} />
            </svg>
        </div>

        <div className={'container-models'}>
          {/* {props.map(({ x, y, zIndex, scale }, i) => (
            <animated.div className='deck' key={i} style={{ x, y, zIndex, scale }} onClick={() => changeImg(i)}>
              {cards[i]}
            </animated.div>
          ))} */}
        </div>
    </>
  )
}
