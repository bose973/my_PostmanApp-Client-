import React from 'react'
import '../css_styles/style.css'
import GetResponse from './GetResponse'
import GreenArrow from '../images/greenArrow.png'
import Axios from 'axios'



// const portVal ="3001"

function MakeRequest(){



  const validator= "http://localhost:3001/"

  // const [useIT,setUseIT] = React.useState(false)
  // const [target1,setTarget1] =React.useState("")
  const [url,setUrl] = React.useState("")
  const [data, setData] = React.useState()
  const [route,setRoute] = React.useState("")
  const [typeReq,setTypeReq] = React.useState(
    {
      selectValue : "GET",
      setIt : false
    }
  )
  const [bodyM , setBodyM] = React.useState(
    {
      text : "",
      present :false
    }
  )
  const [buttonMark,setButtonMark] = React.useState(false)

  //for the input Jfields
  const [fields,setFields]=React.useState(
    {
        filter:"",
        format:"json",
        intelligent:"",
        limit:0,
        resp:"",
        start:0,
        buttonMark:false,
        total:"",
        present:false
    })

  const [downloadMe,setDownloadMe]=React.useState(false)

  const ref = React.useRef()

  const bodyRef=React.useRef()
  const fieldRef=React.useRef()

  const handleChange = event =>{
      const value =event.target.value
      setUrl(event.target.value)
  }

  const handleSelect = event =>{
    setTypeReq({
      selectValue : event.target.value,
      setIt : false
    })
  }

  function handleBody(event){
    setBodyM({
      text : event.target.value,
      present:false
    }
    )
    setDownloadMe(false)
  }

  //functions to handle the input J fields
  function handleFieldButton(){
    const value1=buttonMark
    if(value1){
      bodyRef.current.click()
    }
    const value =fields.buttonMark
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
      setDownloadMe(false)
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
              start : event.target.value
          }
      }      
      )
  }

  function handleBodyButton(){
    const value1=fields.buttonMark
    if(value1){
      fieldRef.current.click()
    }
    const value= buttonMark
    setButtonMark(!value)
  

  }

  const HandleSend=()=>{
    
    const urlAction = url
    setRoute(urlAction)
    setTypeReq({
      ...typeReq,
      setIt : true
    })
    if(buttonMark){
      setBodyM({
        ...bodyM,
        present:true
      })
      setDownloadMe(true)
    }
    else{
      setBodyM({
        ...bodyM,
        present:false
      })
    }

    if(fields.buttonMark){
      setFields(prevState=>{
        return{
          ...prevState,
          present:true
        }
      })
      setDownloadMe(true)
    }
    else{
      setFields(prevState=>{
        return{
          ...prevState,
          present:false

        }
      })
    }
    console.log(typeReq.setIt)
  }

  
  

  //to make the API call , set the data to be show on UI and call setTime to work as Background scheduler
  function callFetch(){
    // console.log(typeReq.selectValue,typeReq.setIt,route)
    if(route!=="" && typeReq.setIt === true){
      // console.log(route , bodyM)
      if(typeReq.selectValue=="POST" || typeReq.selectValue=="PUT")
      {

        let checker=false
        let toServer=""
        if(bodyM.present){
          checker=true
          toServer=bodyM.text
        }

        if(fields.present){
          checker=true
          const totalBody=`{"filterCriteria": ${fields.filter},"format":"${fields.format}","intelligenceType":"${fields.intelligent}","limit":${fields.limit},"responseField":${fields.resp},"start":${fields.start}}`
          console.log(totalBody)
          // const totalBody=fields.filter+" "+fields.format+" "+fields.intelligent+" "+fields.limit+" "+fields.resp+" "+fields.start
          toServer=totalBody
        }

        // console.log("checker->",checker," ","toServer ->",toServer)
        if(checker)
        {
          let passParams=""
          let toDownload=false
          try{
            passParams = JSON.parse(toServer)
            toDownload=true
          }
          catch(err){
            passParams = "Enter a valid JSON"
            toDownload=false
          }

          Axios({
            method: typeReq.selectValue,
            url : route,
            headers :{
              'Access-Control-Allow-Origin': '*', 
              "Content-Type":"application/json",
              "requesterId":"abrasion_medicare"
            },
            data:{
              body: passParams
            }
          }
          ).then((res) => {setData(JSON.stringify(res.data))})
          .catch((err) => setData("Error 404 : Data Not Found!"));

          if(toDownload){
            let downloadType=""
            if(toServer.search("json") == -1){
              downloadType="csv"
            }
            else{
              downloadType="json"
            }
            
            if(downloadMe){
              Axios({method : typeReq.selectValue,url:route,
                headers :{
                  'Access-Control-Allow-Origin': '*', 
                  "Content-Type":"application/json",
                  "requesterId":"abrasion_medicare"
                },
                data:{
                  body: passParams
                } ,
                responseType: 'blob'
              }).then((response) => {

                const href = URL.createObjectURL(response.data);

                // create "a" HTLM element with href to file & click
                const link = document.createElement('a');
                link.href = href;
                link.setAttribute('download', `data.${downloadType}`); //or any other extension
                document.body.appendChild(link);
                link.click();

                // clean up "a" element & remove ObjectURL
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
              })
            }
          }


            // .catch((err) => setData("Error 404 : Data Not Found!"));
          // fetch(route,{method : typeReq.selectValue , headers : { "Content-type": "application/json" , "requesterid":"abrasion_medicare"} , body : JSON.stringify({"hi" : bodyM.text}) })
          //   .then((res) => {return res.json()})
          //   .then((serverM) => setData(JSON.stringify(serverM)))
          //   .catch((err) => setData("Error 404 : Data Not Found!"));

          // fetch(route,{method : typeReq.selectValue , headers : { "Content-type": "application/json" , "requesterid":"abrasion_medicare" } , body :  JSON.stringify(bodyM.text)})
          //   .then((response) => {response.blob().then(blob => {
          //     let urlm = window.URL.createObjectURL(blob);
          //     let a = document.createElement('a');
          //     a.href = urlm;
          //     a.download = 'data.txt';
          //     a.click()})})
          //   .catch((err) => setData("Error 404 : Data Not Found!"));
        }
      }
      else if(typeReq.selectValue=="GET" || typeReq.selectValue=="DELETE")
      {

        Axios({
          method: typeReq.selectValue,
          url : route,
          headers :{
            "Content-Type":"application/json"
          }
        }
        ).then((res) => { setData(JSON.stringify(res.data))})
        .catch((err) => setData("Error 404 : Data Not Found!"));

        // Axios({method : typeReq.selectValue,url:route })
        //   .then((response) => {response.data.blob().then(blob => {
        //     let urlm = window.URL.createObjectURL(blob);
        //     let a = document.createElement('a');
        //     a.href = urlm;
        //     a.download = 'data.txt';
        //     a.click()})})
          // .catch((err) => setData("Error 404 : Data Not Found!"));

        // fetch(route,{method : typeReq.selectValue })
          // .then((res) => {return res.json()})
          // .then((serverM) => setData(JSON.stringify(serverM)))
          // .catch((err) => setData("Error 404 : Data Not Found!"));

        fetch(route,{method : typeReq.selectValue })
          .then((response) => {response.blob().then(blob => {
            let urlm = window.URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.href = urlm;
            a.download = 'data.txt';
            a.click()})})
          .catch((err) => setData("Error 404 : Data Not Found!"));
          
        

      }
      // setTimeout(() => {
      //   ref.current.click();
      // }, 5000);
    }
    else(
      console.log("route not entered")
    )
  }
  
  React.useEffect(() => {
    callFetch()
  }, [route,typeReq.selectValue,typeReq.setIt,bodyM.present,fields.present,downloadMe]);


  return (
      <div>
      <div className ="request">
          <h3>Request</h3>
          
          <div className ="headings">
              <table>
                <tbody>
                <tr id = "head">
                    <th id ="thone">Method</th>
                    <th id="thsecond">URL</th>
                    <th id="ththird"> Action</th>
                </tr>
                <tr>
                    <td id="tdone">
                    <select name="type" id="requests" value={typeReq.selectValue} onChange ={handleSelect}>
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                    </select>
                    </td>
                    <td id="tdtwo"><input id="url" type="text" name="url" onChange={handleChange} value={url}/></td>
                    <td id="tdthird"><button ref={ref} id="send" onClick={HandleSend}>Send</button></td>
                </tr>
                </tbody>
              </table>
              
              
          </div>
          <hr />

          <div className="radioButton">
            <div>
              <input onClick={handleBodyButton} type="checkbox" id="radio1" name="fav_language" value="html" ref={bodyRef}/>
              <label htmlFor="html">Body</label><br />
            </div>
          
            <div id="radio2">
              <input onClick={handleFieldButton} type="checkbox" id="field" name="field_values" value="field" ref={fieldRef}/>
              <label htmlFor="field">Fields</label><br />
            </div>
          
          </div>

          { buttonMark && <div className="bodyField">
                {/* <h3>Body</h3> */}
                <textarea placeholder="Send data to server" onChange={handleBody} value={bodyM.text}></textarea>
                {/* <input type="text" name="body" value ={bodyM.text} onChange={handleBody} placeholder="POST and PUT request only" /> */}
          </div>}

          <div className="inputJfields">
            {/* <div className="radioButton2">
            <input onClick={handleFieldButton} type="checkbox" id="field" name="field_values" value="field" ref={fieldRef}/>
            <label htmlFor="field">Fields</label><br />
            </div> */}

            { fields.buttonMark && <div className="inputFields">
                  
            <input onChange={handleFilter} type="text" id="criteria" name="filterCriteria" value={fields.filter}/>
            <label htmlFor="filter">filterCriteria</label><br />

            <select name="datatype" id="respType" value={fields.format} onChange ={handleFormat}>
                    <option value="json">json</option>
                    <option value="csv">csv</option>
            </select>
            <label id="top" htmlFor="respType">format</label><br /><br/>
            {/* <input onChange={handleFormat} type="text" id="format" name="formatType" value={fields.format}/>
            <label htmlFor="format">format</label><br /> */}

            <input onChange={handleIntelligence} type="text" id="intelligence" name="intelligenceType" value={fields.intelligent}/>
            <label htmlFor="intelligent">intelligenceType</label><br />

            <input onChange={handleLimit} type="number" id="limit" name="limit" value={fields.limit}/>
            <label htmlFor="limit">limit</label><br />

            <input onChange={handleResp} type="text" id="response" name="responseFields" value={fields.resp}/>
            <label htmlFor="resp">responseFields</label><br />

            <input onChange={handleStart} type="number" id="start" name="start_values" value={fields.start}/>
            <label htmlFor="start">start</label><br />


            </div>}
        </div>
          
    </div>
    <GetResponse show={data}/>
    </div>
  )
}

export default MakeRequest

// export default {url}

// , body: JSON.stringify({msg : bodyM})}


