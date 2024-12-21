import React, { useEffect, useState } from "react";
import './Game.css'
import Gem from "../../components/Gem/Gem";

enum Direction {
    TOP = 'top',
    BOTTOM = 'bottom',
    LEFT = 'left',
    RIGHT = 'right'
}

const Game = () => {

    const [field, setField] = useState<any>([])
    const [empty, setEmpty] = useState(-1)

    useEffect(
        () => {
            initField()
        },
        []
    )

    useEffect(
        () => {
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

        const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

        for(let i = 0; i < 16; i++){
            const index = Math.floor(Math.random() * arr.length)
            // const item = arr.splice(index, 1) // item[0]
            const [item] = arr.splice(index, 1) // const = item[0]

            if(item){
                field.push(<div><Gem num={item}/></div>)
            }
            else {
                field.push(<div></div>)
                empty = i
            }
        }

        setField(field)
        setEmpty(empty)
    }

    const step = (direction: Direction) => {
        const newField = [...field] // []
        let newEmpty = empty // -1

        console.log(newField, newEmpty, direction)

        switch(direction){
            case Direction.TOP: 
                break
            case Direction.BOTTOM: 
                const el1 = newField[newEmpty - 4]
                const el2 = newField[newEmpty]
                const temp = {...el1}
                newField[newEmpty - 4] = {...newField[newEmpty]}
                newField[newEmpty] = {...temp}
                newEmpty = newEmpty - 4 // newEmpty -= 4
                break
            case Direction.LEFT:
                break 
            case Direction.RIGHT: 
                break
        }
        setField(newField)
        setEmpty(newEmpty)
    }

    const handleOnKeyUp = (event: KeyboardEvent) => {
        switch(event.code){
            case "ArrowDown":
            case "KeyS": 
                step(Direction.BOTTOM)
                break
        }
    }

    return (
        <main>
            <section>
                {field}
            </section>
        </main>
    )
}

export default Game