import React from'react'
import '../css_styles/style.css'

export default function LeftPanel(){

    return(
        <div className="leftpanel">
            
            <div><a href="#APIs">APIs</a></div>
            <div><a href="#Env">Environment</a></div>
            <div><a href="#Server">Servers</a></div>
            <div><a href="#Monitor">Monitors</a></div>
            <div><a href="#History">History</a></div>
            <div className="line"></div>
        </div>
    )
}