import React, { useEffect, useState } from "react";
import './Game.css'
import Gem from "../../components/Gem/Gem";
import Popup from "../../components/Popup/Popup";

enum Direction {
    TOP = 'top',
    BOTTOM = 'bottom',
    LEFT = 'left',
    RIGHT = 'right'
}

type Cell = {
    value: number
    index: number
    el: React.ReactNode
}

const Game = () => {

    const [field, setField] = useState<Cell[]>([])
    const [empty, setEmpty] = useState(-1)

    const [showPopup, setshowPopup] = useState(false)
    const [stepCount, setStepCount] = useState(0)

    useEffect(
        () => {
            initField()
        },
        []
    )

    useEffect(
        () => {

            if(field.length > 0 && checkIsWin()){
                setshowPopup(true)
            }

            document.body.addEventListener('keyup', handleOnKeyUp)

            return () => {
                document.body.removeEventListener('keyup', handleOnKeyUp)
            }
        },
        [field, empty]
    )

    useEffect(
        () => {
            console.log(field)
        },
        [field]
    )

    useEffect(
        () => {
            console.log(empty)
        },
        [empty]
    )

    const initField = () => {
        const field = []
        let empty = -1

        const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 13, 14, 11]

        for(let i = 0; i < 16; i++){
            // const index = Math.floor(Math.random() * arr.length)
            // const item = arr.splice(index, 1) // item[0]
            const [item] = arr.splice(0, 1) // const = item[0]

            if(item){
                field.push({
                    value: item,
                    index: i,
                    el: <div key={`el_${i}`}><Gem num={item}/></div>
                })
            }
            else {
                field.push({
                    value: -1,
                    index: i,
                    el: <div key={`el_${i}`}></div>
                })
                empty = i
            }
        }

        setField(field)
        setEmpty(empty)
    }

    const step = (direction: Direction) => {
        const newField = [...field] // []
        let newEmpty = empty // -1
        let isStep = false


        let temp
        switch(direction){
            case Direction.TOP: 
                if(newEmpty < 12){
                    temp = {...newField[newEmpty + 4]}
                    newField[newEmpty + 4] = {...newField[newEmpty]}
                    newField[newEmpty] = {...temp}
                    newEmpty += 4
                    isStep = true
                }
                break
            case Direction.BOTTOM: 
                if(newEmpty > 3){
                    const gemWithNumber = newField[newEmpty - 4]
                    const emptyCell = newField[newEmpty]
                    temp = {...gemWithNumber}
                    newField[newEmpty - 4] = {...newField[newEmpty]}
                    newField[newEmpty] = {...temp}
                    newEmpty = newEmpty - 4 // newEmpty -= 4
                    isStep = true
                }
                break
            case Direction.LEFT:
                if(newEmpty + 1 <= 15 && (newEmpty + 1) % 4 !== 0){
                    temp = {...newField[newEmpty + 1]}
                    newField[newEmpty + 1] = {...newField[newEmpty]}
                    newField[newEmpty] = {...temp}
                    newEmpty++
                    isStep = true
                }
                break 
            case Direction.RIGHT: 
                if(newEmpty - 1 >= 0 && (newEmpty - 1) % 4 !== 3){
                    temp = {...newField[newEmpty - 1]}
                    newField[newEmpty - 1] = {...newField[newEmpty]}
                    newField[newEmpty] = {...temp}
                    newEmpty--
                    isStep = true
                }
                break 
        }

        if(isStep){
            setField(newField)
            setEmpty(newEmpty)
            setStepCount(stepCount + 1)
        }

    }

    const handleOnKeyUp = (event: KeyboardEvent) => {
        switch(event.code){
            case "ArrowDown":
            case "KeyS": 
                step(Direction.BOTTOM)
                break
            case "ArrowUp":
            case "KeyW":
                step(Direction.TOP)
                break
            case "ArrowLeft":
            case "KeyA":
                step(Direction.LEFT)
                break
            case "ArrowRight":
            case "KeyD":
                step(Direction.RIGHT)
                break
        }
    }

    const checkIsWin = () => {
        let isWin = true

        for(let i = 0; isWin && i < 14; i++){
            const el1 = field[i]
            const el2 = field[i + 1]

            if(el1 && el2 && el1.value > el2.value){
                isWin = false
            }
        }

        return isWin
    }

    return (
        <main>
            <section>
                {field.map(item => item.el)}
            </section>

            <Popup isShow={showPopup}>
                <>
                    <h2>Вы победили</h2>
                    <div>
                        Вы победили за {stepCount} ходов
                    </div>
                </>
            </Popup>
        </main>
    )
}

export default Game