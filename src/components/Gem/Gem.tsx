import React from "react";
import './Gem.css'

type Props = {
    num: number
}

const Gem = (props: Props) => {

    return (
        <div className="gem">{props.num}</div>
    )
}

export default Gem