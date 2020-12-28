import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Tab } from './Tab';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { TagInput } from 'reactjs-tag-input'
import ReactTagInput from "@pathofdev/react-tag-input";
import './Test.css'


import * as Yup from 'yup';

function TestQuestion({match}) {
    

    const [questionLabel, setQuestionLabel] = useState([{}]);
    const [questionAnswers, setQuestionAnswers] = useState(["example tag"]);
    const [survey, setSurvey] = useState({name:'Survey Name',datasourceUri:'lambdaUrl',surveyCreator:'',auth:false, closingParams:{timer:5,message:'Thank you for your feedback'},data:[{'question':'X?',answers:['X1','X2','X3','X4','X5'],links:['LX1','LX2','LX3','LX4','LX5'],urlParams:['PX1','PX2','PX3','PX4','PX5'],hashes:['HX1','HX2','HX3','HX4','HX5'],matrix:[]}]});
    const [surveyElement,setSurveyElement] =useState();
    
    const { control, register, handleSubmit, errors } = useForm();
    
    const onSubmit = data => console.log(data);

    console.log(match)
    const updateSurveyName = (e) => {
        let s = {...survey}
        s.name = e.target.value
        setSurvey(s)
        //needs to re-generate matrix
    };

    const updateQuestionLabel = (index, e) => {
        let s = {...survey}
        s.data[index].question = e.target.value
        s.data[index].urlParams = s.data[index].answers.map(answer => ('survey='+survey.name+'&storage='+survey.datasourceUri+'&question='+s.data[index].question+'&answer='+answer));
        s.data[index].hashes = s.data[index].answers.map(answer => btoa(JSON.stringify({"survey":s.name,"storage":s.datasourceUri,"surveyCreator":s.surveyCreator,"auth":s.auth, "closingParams":s.closingParams, "data":[{"question":s.data[index].question,"answer":answer}]})).replace('/', '%2F'));

        setSurvey(s)
        console.log("updateQuestionLabel update")
        console.log(s)
        //updateMyArray( arr => [...arr, `${arr.length}`]);
    };

    const updateAnswers = (index, answers) => {
        let s = {...survey}
        s.data[index].answers = answers
        s.data[index].urlParams = s.data[index].answers.map(answer => ('survey='+s.name+'&storage='+s.datasourceUri+'&question='+s.data[index].question+'&answer='+answer));
        s.data[index].hashes = s.data[index].answers.map(answer => btoa(JSON.stringify([{"survey":s.name,"storage":s.datasourceUri,"surveyCreator":s.surveyCreator,"auth":s.auth, "closingParams":s.closingParams, "data":[{"question":s.data[index].question,"answer":answer}]}])).replace('/', '%2F'));
        setSurvey(s)
        console.log("updateAnswers update")
        console.log(s)
        //updateMyArray( arr => [...arr, `${arr.length}`]);
    };

    const addQuestion = () => {
        let s = {...survey}
        let q = {'question':'Y?',answers:['Y1','Y2','Y3','Y4','Y5'],links:['LY1','LY2','LY3','LY4','LY5'],urlParams:['PY1','PY2','PY3','PY4','PY5'],hashes:['HY1','HY2','HY3','HY4','HY5'],matrix:[]}
        s.data.push(q)
        setSurvey(s)
    };

    const removeQuestion = (index) => {
        let s = {...survey}
        //delete s[index]
        s.data.splice(index,index)
        setSurvey(s)
    };

    useEffect(() => {
        console.log('use effect survey')
        console.log(survey)
    }, [survey]);

    //<textarea rows='8'  class="textarea is-primary" value={surveyElement.hashes.join("\n")} placeholder={surveyElement.hashes.join("\n")}></textarea>

    return (
        <div>
            <div className="field has-addons">
                
                <div className="control is-expanded">
                    <div className="control is-fullwidth">

                    <div className="control has-icons-left has-icons-right">
                    <input className="input is-success" type="text" defaultValue={survey.datasourceUri} placeholder={survey.datasourceUri}></input>
                    <span className="icon is-small is-left">
                    <i className="fal fa-lambda"></i>
                    </span>
                    <span className="icon is-small is-right">
                    <i className="fas fa-check"></i>
                    <i className="fas fa-cog fa-spin"></i>
                    <i className="fas fa-times"></i>
                    </span>
                </div>
                    </div>
                </div>
                <div className="control">
                    <button type="" className="button is-primary">Check</button>
                </div>
            </div>
            <div className="field has-addons">
                
                <div className="control is-expanded">
                    <div className="control is-fullwidth">

                    <div className="control has-icons-left">
                    <input className="input is-success" type="text" defaultValue="Survey Name" placeholder={survey.name} onChange={e => updateSurveyName(e)}></input>
                    <span className="icon is-small is-left">
                    <i className="fal fa-lambda"></i>
                    </span>
                </div>
                    </div>
                </div>
            </div>
                 
            <form onSubmit={handleSubmit(onSubmit)}>

            {survey.data.map((surveyElement, index) => (
                <>
                        <div className="field has-addons" key={index}>
                            <div className="control is-expanded">
                            <p className="control has-icons-left">
                                <input className="input" id={'q'+index} name={'q'+index}  defaultValue={surveyElement.question} ref={register({ required: true })} type="text"  placeholder="Question ?" onChange={e => updateQuestionLabel(index,e)}></input>
                                <span className="icon is-small is-left">
                                <i className="fas fa-question"></i>
                                </span>
                            </p>
                            <div className="control has-icons-left">
                                <span className="icon is-small is-left">
                                <i className="fa fa-list-ol"></i>
                                </span>
                                <Controller
                                    name={'reactTagInput'+index}
                                    control={control}
                                    defaultValue=""
                                    //rules={{ required: true }}
                                    render={props =>
                                    <ReactTagInput
                                        tags={surveyElement.answers} 
                                        onChange={(newTags) => updateAnswers(index,newTags)}
                                        //onChange={(answers) => updateAnswers(index,answers)}
                                    />
                                    }
                                />
                            </div>
                            </div> 
                            <div className="control">
                                <button className="button is-primary" onClick={() => addQuestion()}>
                                    <span className="icon">
                                    <i className="fas fa-plus"></i>
                                    </span>
                                    <span>Add</span>
                                </button>
                            </div>   
                            <div className="control">
                                <button className="button is-danger" onClick={() => removeQuestion(index)}>
                                    <span className="icon">
                                    <i className="fas fa-times"></i>
                                    </span>
                                    <span>Remove</span>
                                </button>
                            </div>
                        </div> 

                        <div className="box">
                        <h1 className="title">Links to copy/paste</h1>

                            <Tab key={'tab_'+index} surveyElement={surveyElement} survey={survey}/>

                        </div>
                  </>
                    
                ))}
                <div className="control">  
                    <button type="submit" disabled="" className="button is-primary">
                        Save!
                    </button>
                </div>
            <li>Step 4: Hashes are generated live - After submission, it copies the rules in a datatable in the datamart</li>
            <li>Step 5: Generate post calls for all possibilities to test that everything works</li>
            </form>
     
        </div>
    );
}

export { TestQuestion };