import React from 'react'



class LearnClassComp extends React.Component{

    constructor(props){
        super(props)
        this.state={
            field:"",
            filter:"",
            format:"",
            intelligent:"",
            limit:"",
            resp:"",
            start:"",
            buttonMark:false,
            total:""
        }
    }

    handleFieldButton=()=>{
        value=!this.state.buttonMark 
        this.state.buttonMark = value
    }

    handleFilter=(event)=>{
        this.state.filter= event.target.value
        
    }

    handleFormat=(event)=>{
        this.state.format= event.target.value
    }

    handleIntelligence=(event)=>{
        this.state.intelligent= event.target.value
    }

    handleLimit=(event)=>{
        this.state.limit= event.target.value
    }

    handleResp=(event)=>{
        this.state.resp= event.target.value
    }

    handleStart=(event)=>{
        this.state.start= event.target.value
    }


    render(){
        <div>
            <div className="radioButton2">
            <input onClick={this.handleFieldButton} type="checkbox" id="field" name="field_values" value="field"/>
            <label for="field">Fields</label><br />
            </div>

            { this.state.buttonMark && <div className="inputFields">
                  
            <input onChange={this.handleFilter} type="text" id="criteria" name="filterCriteria" value={this.state.filter}/>
            <label for="filter">filterCriteria</label><br />

            <input onChange={this.handleFormat} type="text" id="format" name="formatType" value={this.state.format}/>
            <label for="format">format</label><br />

            <input onChange={this.handleIntelligence} type="text" id="intelligence" name="intelligenceType" value={this.state.intelligent}/>
            <label for="intelligent">intelligenceType</label><br />

            <input onChange={this.handleLimit} type="text" id="limit" name="limit" value={this.state.limit}/>
            <label for="limit">limit</label><br />

            <input onChange={this.handleResp} type="text" id="response" name="responseFields" value={this.state.resp}/>
            <label for="resp">responseFields</label><br />

            <input onChange={this.handleStart} type="text" id="start" name="start_values" value={this.state.start}/>
            <label for="start">start</label><br />


            </div>}
        </div>
    }
}