import React from "react";
import "./Popup.css"

type Props = {
    isShow: boolean
} & React.PropsWithChildren

const Popup = (props: Props) => {
    return (
        <div className={"background" + (props.isShow ? "" : " hide")}>
            <div className="popup">
                {props.children}
            </div>
        </div>
    )
}

export default Popup