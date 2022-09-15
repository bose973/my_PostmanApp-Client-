import React from 'react'



function Fields(){

    const [fields,setFields]=React.useState(
        {
            field:"",
            filter:"",
            format:"",
            intelligent:"",
            limit:"",
            resp:"",
            start:"",
            buttonMark:false,
            total:""
        })
    
    function handleFieldButton(){
        value=fields.buttonMark
        setFields(prevState=>{
            return {
                ...prevState,
                buttonMark : !value
            }
        })
    }

    const handleFilter=(event)=>{
        setFields((prevState)=>{
            return {
                ...prevState,
                filter : event.target.value
            }
        }
            
        )
        
    }

    const handleFormat=(event)=>{
        setFields((prevState)=>{
            return {
                ...prevState,
                format : event.target.value
            }
        }      
        )
    }

    const handleIntelligence=(event)=>{
        setFields((prevState)=>{
            return {
                ...prevState,
                intelligent : event.target.value
            }
        }      
        )
    }

    const handleLimit=(event)=>{
        setFields((prevState)=>{
            return {
                ...prevState,
                limit : event.target.value
            }
        }      
        )
    }

    const handleResp=(event)=>{
        setFields((prevState)=>{
            return {
                ...prevState,
                resp : event.target.value
            }
        }      
        )
    }

    const handleStart=(event)=>{
        setFields((prevState)=>{
            return {
                ...prevState,
                event : event.target.value
            }
        }      
        )
    }


    return(
        <div className="inputJfields">
            <div className="radioButton2">
            <input onClick={handleFieldButton} type="checkbox" id="field" name="field_values" value="field"/>
            <label for="field">Fields</label><br />
            </div>

            { fields.buttonMark && <div className="inputFields">
                  
            <input onChange={handleFilter} type="text" id="criteria" name="filterCriteria" value={fields.filter}/>
            <label for="filter">filterCriteria</label><br />

            <input onChange={handleFormat} type="text" id="format" name="formatType" value={fields.format}/>
            <label for="format">format</label><br />

            <input onChange={handleIntelligence} type="text" id="intelligence" name="intelligenceType" value={fields.intelligent}/>
            <label for="intelligent">intelligenceType</label><br />

            <input onChange={handleLimit} type="text" id="limit" name="limit" value={fields.limit}/>
            <label for="limit">limit</label><br />

            <input onChange={handleResp} type="text" id="response" name="responseFields" value={fields.resp}/>
            <label for="resp">responseFields</label><br />

            <input onChange={handleStart} type="text" id="start" name="start_values" value={fields.start}/>
            <label for="start">start</label><br />


            </div>}
        </div>
    )
}


