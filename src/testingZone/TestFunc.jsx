import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { TagInput } from 'reactjs-tag-input'
import ReactTagInput from "@pathofdev/react-tag-input";


//import "@pathofdev/react-tag-input/build/index.css";

import * as Yup from 'yup';

import { userService, alertService } from '@/_services';
import { TestQuestion } from './TestQuestion';

function TestFunc({ history, match }) {
    

    const [questionCount, setQuestionCount] = useState(0);
    const [user, setUser] = useState({});

    const [showPassword, setShowPassword] = useState(false);

    
    useEffect(() => {
        //
        console.log('use effect TestFunc')
        console.log(questionCount)
    }, [questionCount]);


    return (
        <div>
                <li>Step 1: create a lambda dataset and anthorize appId 'X' to access it</li>
                <li>Step 2: please input the lambda dataset</li>
                <li>Step 3 checking the lambda dataset is accessible, if so, gray out and add a first question</li>
                
                    
                    
                     <TestQuestion match={match}/>
                    
    
            <p>
                The question array has {questionCount} elements !
            </p>
        </div>
    );
}

export { TestFunc };