import React from 'react'
import '../css_styles/style.css'
import GetResponse from './GetResponse'
import GreenArrow from '../images/greenArrow.png'
import Axios from 'axios'



// const portVal ="3001"

function MakeRequest3(){



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

  const [headers,setHeaders]=React.useState(
    {
    buttonMark:false,
    jFields : {
        "Content-Type":"application/json"
    }
    }
  )

  const [downloadMe,setDownloadMe]=React.useState(false)

  const [key,setKey]=React.useState("")
  const [value,setValue] =React.useState("")

  const ref = React.useRef()

  const bodyRef=React.useRef()
  const fieldRef=React.useRef()
  const headRef=React.useRef()

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

  let fluctuate=false

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
    const value2= headers.buttonMark

    if(value1){
      bodyRef.current.click()
    }
    else if(value2){
        headRef.current.click()
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
    const value2 = headers.buttonMark
    if(value1){
      fieldRef.current.click()
    }
    else if(value2){
        headRef.current.click()
    }
    const value= buttonMark
    setButtonMark(!value)
    

  }

  function handleHeaderButton(){
    const value1= fields.buttonMark
    const value2=buttonMark
    if(value1){
        fieldRef.current.click()
    }
    else if(value2){
        bodyRef.current.click()
    }
    const value= headers.buttonMark
    setHeaders(prevState =>{
        return{
            ...prevState,
            buttonMark:!value
        }
    })
  }

  function handleChangeKey(event){
    setKey(event.target.value)
    // document.getElementById("key1").value=event.target.value
    // console.log(document.getElementById("key1").value)
  }

  function handleChangeValue(event){
    setValue(event.target.value)
  }

  

  
// 'Access-Control-Allow-Origin': '*',
  //to make the API call , set the data to be show on UI and call setTime to work as Background scheduler
function callFetch(){
    // console.log(typeReq.selectValue,typeReq.setIt,route)
    
      // console.log(route , bodyM)
  let headerValue={
    'Access-Control-Allow-Origin': '*',
    "Content-type":"application/json"

  }
  headerValue[`${key}`] =`${value}`
  console.log(headerValue)
  console.log("bodyM.present ->",bodyM.present)

  let checker=false
  let toServer=""

  if(bodyM.present){
    console.log("making checker true")
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
      console.log("inside checker")
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

      console.log(passParams)

      Axios({
        method: "POST",
        url : 'http://localhost:3001/test',
        headers :headerValue,
        data:{
          body: passParams
        }
      }
      ).then((res) => {setData(JSON.stringify(res.data))})
      .catch((err) => setData(err));
      //   "Error 404 : Data Not Found!"
      if(toDownload){
        let downloadType=""
        if(toServer.search("json") == -1){
          downloadType="csv"
        }
        else{
          downloadType="json"
        }
      console.log("value of headers before->",Axios.headers)
      console.log("downloadMe->",downloadMe)
      if(downloadMe){
        Axios({method : "POST",url:'http://localhost:3001/test',
          headers:headerValue,
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


        
  }
      
      

       
      
      // setTimeout(() => {
      //   ref.current.click();
      // }, 5000);
}
  
//   React.useEffect(() => {
//     callFetch()
//   }, [bodyM.present,fields.present,downloadMe,fluctuate]);

const HandleSend=()=>{
    
  // const urlAction = url
  // setRoute(urlAction)

  console.log("buttonMark->",buttonMark)
  
  if(buttonMark){
    setBodyM(prevState=>{
      return{
      ...prevState,
      present:true
      }
    })
    setDownloadMe(true)
  }
  else{
    setBodyM(prevState=>{
      return{
      ...prevState,
      present:false
      }
    })
  }

  console.log("fields.buttonMark->",fields.buttonMark)
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
 callFetch()
}

  return (
      <div>
      <div className ="request">
          <h3>Hello!</h3>
          
          <hr />
          
          

          <div className="radioButton">
            <div id="radio0">
              <input onClick={handleHeaderButton} type="checkbox" id="headerfield" name="fav_language" value="html1" ref={headRef}/>
              <label htmlFor="html1">Headers</label><br />
            </div>
            <div id="radio1">
              <input onClick={handleBodyButton} type="checkbox" id="bodyfield" name="fav_language" value="html" ref={bodyRef}/>
              <label htmlFor="html">Body</label><br />
            </div>
          
            <div id="radio2">
              <input onClick={handleFieldButton} type="checkbox" id="field" name="field_values" value="field" ref={fieldRef}/>
              <label htmlFor="field">Fields</label><br />
            </div>
          
            <div className ="headings">
              <button ref={ref} id="send" onClick={HandleSend}>Send</button>
            </div>
          </div>

          <div className="allFields">
            { headers.buttonMark && <div className="headerField">
                
                    <table>
                        <tbody>
                            <tr>
                                <th id="headingKey">Key</th>
                                <th id="headingValue">Value</th>
                                
                            </tr>
                            <tr>
                                <td><input id="key1" placeholder='key' onChange={handleChangeKey} value={key}/></td>
                                <td><input id="value1" placeholder='value' onChange={handleChangeValue} value={value}/></td>
                            </tr>
                        </tbody>
                    </table>
                
                </div>}

            { buttonMark && <div className="bodyField">
                    
                    <textarea placeholder="Send data to server" onChange={handleBody} value={bodyM.text}></textarea>
                    
            </div>}

            <div className="inputJfields">
                

                { fields.buttonMark && <div className="inputFields">
                    
                <input onChange={handleFilter} type="text" id="criteria" name="filterCriteria" value={fields.filter}/>
                <label htmlFor="filter">filterCriteria</label><br />

                <select name="datatype" id="respType" value={fields.format} onChange ={handleFormat}>
                        <option value="json">json</option>
                        <option value="csv">csv</option>
                </select>
                <label id="top" htmlFor="respType">format</label><br /><br/>
                

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
          
    </div>
    <GetResponse show={data}/>
    </div>
  )
}

export default MakeRequest3

// export default {url}

// , body: JSON.stringify({msg : bodyM})}


