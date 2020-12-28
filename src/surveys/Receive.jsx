import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function Receive({ match }) {
    const { path } = match;
    //const { hash } = match.params;
    const [payload, setPayload] = useState(JSON.parse(atob(match.params.hash.replace(/%2F/g, '/'))))
    const [timer, setTimer] = useState(payload.closingParams.timer);
    const [done, setDone] = useState(0);
    const foo = useRef();
 
    useEffect(() => {
        console.log('***Receive use effect***')
        function tick() {
            setTimer(prevTimer => prevTimer - 1)
        }
        foo.current = setInterval(() => tick(), 1000)

        return function cleanup() {
            console.log("clean up")
        };
    }, []);

    useEffect(() => {
        if (timer  === 0) {
          clearInterval(foo.current);
          setDone(1);
          postData(payload)
        }
      }, [timer])

    const postData = (data) => {
        console.log(data)         
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
            Status:{timer}

            
        </div>
    );
}

export { Receive };