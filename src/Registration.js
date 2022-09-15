import { Axios } from 'axios'
import React from 'react'

function Registration(){

    const [regFields,setRegFields] = React.useState(
        {
            firstName : "",
            lastName : "",
            emailID:"",
            userID : "",
            password:""
        }
    )
    const [output,setOutput]=React.useState("")

    function handleFirstName(event){
        setRegFields({
            ...regFields,
            firstName : event.target.value
        })
    }

    function handleLastName(event){
        setRegFields({
            ...regFields,
            lastName : event.target.value
        })
    }

    function handleEmailID(event){
        setRegFields({
            ...regFields,
            emailID : event.target.value
        })
    }

    function handleUserID(event){
        setRegFields({
            ...regFields,
            userID : event.target.value
        })
    }

    function handlePassword(event){
        setRegFields({
            ...regFields,
            password : event.target.value
        })
    }

    function handleRegister(){
        if(regFields.firstName!="" && regFields.lastName!="" && regFields.emailID!="" && regFields.userID!="" && regFields.password!=""){

            const bodyValue={
                "firstName": regFields.firstName,
                "lastName": regFields.lastName,
                "email": regFields.emailID,
                "user_id":regFields.userID,
                "password":regFields.password
            }
            Axios({
                method: "POST",
                url : 'http://localhost:3001/fordb',
                headers :{
                    "Content-Type":"application/json"
                },
                data:{
                  body: bodyValue
                }
              }
              ).then((res) => {setOutput(JSON.stringify(res.data))})
              .catch((err) => setOutput(err));

              console.log("output->",output)
        }
        else{
            alert("Enter all the fields!")
        }
    }

    return(
        <div>
            <h1>
                Register Here!
            </h1>
            <div>
                <input onChange={handleFirstName} type="text" id="first" name="firstName" value={regFields.firstName}/>
                <label htmlFor="first">intelligenceType</label><br />

                <input onChange={handleLastName} type="text" id="last" name="lastName" value={regFields.lastName}/>
                <label htmlFor="last">limit</label><br />

                <input onChange={handleEmailID} type="email" id="email" name="emailID" value={regFields.emailID}/>
                <label htmlFor="email">responseFields</label><br />

                <input onChange={handleUserID} type="number" id="user" name="userID" value={regFields.userID}/>
                <label htmlFor="user">start</label><br />

                <input onChange={handlePassword} type="password" id="pass" name="password" value={regFields.password}/>
                <label htmlFor="pass">start</label><br />

                <button onClick={handleRegister}>Register</button>
            </div>

        </div>
    )
}

export default Registration