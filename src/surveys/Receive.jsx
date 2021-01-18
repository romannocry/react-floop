import React, { useState, useEffect, useRef } from 'react';
import SweetAlert from 'sweetalert2-react';
import { alertService } from '@/_services';

import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';

function Receive({ match }) {
    const { path } = match;

    const [urlParam, setUrlParam] = useState(match.params.hash.replace(/%2F/g, '/'))
    const [payload, setPayload] = useState()
    const [done, setDone] = useState(false);
    const foo = useRef();

    useEffect(() => {
        console.log("use effect Receive")
        console.log('URL Param: '+urlParam)
        try {
            let data = JSON.parse(atob(urlParam))
            setPayload(data)
            postData(data)
        } catch (e) {
            console.log(e)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Link not recognized!',
                footer: 'This is not a correct link 🥺'//e
              })
        }
        
        

        /*if (typeof payload != 'undefined') {
            postData(payload)
        } else {
            console.log('payload not recognized')
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Payload not recognized!',
                //footer: '<a href>Why do I have this issue?</a>'
              })
        }*/
    }, []);



    const postData = (payload) => {
        console.log("posting data")
        console.log(payload)

        var promise1 = new Promise(function(resolve, reject) {
            payload.data.map((data,index) => {
                console.log("posting data entry "+index)
                let answerJson = {
                    'Date':new Date(),
                    'Survey': payload.survey,
                    'Question':data.question,
                    'Answer':data.answer,
                    'User_email':'roman.medioni@gmail.com',
                    'PC':'TEAM A'
                }
                let answerCSV = Object.values(answerJson)
                console.log(answerCSV.join(","))
                console.log(JSON.stringify(answerJson))
            })
            console.log(payload.closingParams.timer)
            payload.closingParams.timer > 0 ? resolve() : window.close()//: reject()
        });

        promise1.then((value) => {
            console.log("timer found, waiting")
            let timerInterval
            Swal.fire({
            title: payload.survey,
            html: 'I will close in <b></b> milliseconds.',
            timer: payload.closingParams.timer*1000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                timerInterval = setInterval(() => {
                const content = Swal.getContent()
                if (content) {
                    const b = content.querySelector('b')
                    if (b) {
                    b.textContent = Swal.getTimerLeft()
                    }
                }
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
            }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log('window closed by the timer')
                //close window
            } else {
                console.log("no timer, closing after post")
            }
            })
        });

        // POST request using fetch inside useEffect React hook
        /*const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'React Hooks POST Request Example' })
        };
        fetch('https://jsonplaceholder.typicode.com/posts', requestOptions)
            .then(response => response.json())
            .then(data => setPostId(data.id));
            */



    }
/*
            {payload.map((payloadElement, index) => (
                <div key={index}>
                <h2>Payload element {index}</h2>
                <h2>Survey: {payloadElement.survey}</h2>
                <h2>Storage: {payloadElement.storage}</h2>
                <h2>Question: {payloadElement.question}</h2>
                <h2>answer: {payloadElement.answer}</h2>
                </div>
            ))}
            */
    return (
        <div>
            <h1>Receive Zone</h1>
           heck
        </div>
    );
}

export { Receive };