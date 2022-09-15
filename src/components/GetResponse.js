import React from 'react'
import '../css_styles/style.css'
import GreenArrow from '../images/greenArrow.png'

export default function GetResponse(props){

    
    return(
        <div className ="response">
            <h3>Response</h3>
            <div>
                <hr />
                <div className ="output">
                    <textarea value={props.show}></textarea>
                </div>
                
            </div>
        </div>
    )
}