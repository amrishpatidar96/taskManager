import React,{Component} from 'react';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import classes from './TaskDetails.module.css';
import {connect } from 'react-redux';
import Table from '../UI/Table/Table';

import * as actions from '../../store/actions/task';



class TaskDetails extends Component{

    state ={
        taskDetails:{
            startTime: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'start Time'
                },
                value: '',
                validation: {
                    required: true,
                    minLength:5,
                    maxLength:5
                },
                valid:false,
                touched: false
                
            },
            endTime: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'End Time'
                },
                value: '',
                validation: {
                    required: true,
                    minLength:5,
                    maxLength:5
                },
                valid:false,
                touched: false
                
            },
            selectProject: {
                elementType: 'select',
                elementConfig: {  
                   options:[]
                },
                value:''
            },
            TaskName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Task Name'
                },
                value: '',
                validation: {
                    required: true,
                    minLength:5,
                    maxLength:20
                },
                valid:false,
                touched: false
                
            },
            TaskDescription: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Task Description',
                    rows:'5',
                    cols:'10',
                },
                value: '',
                validation: {
                    required: true,
                    minLength:5,
                    maxLength:30
                },
                valid:false,
                touched: false,
                
                
            }
        },
        isFormValid:false,

    }

    checkValidity = (value,rules)=> {
        let isValid = false;

        if(!rules) {
            return false ;
        }
        if(rules.required )
        {
            isValid = value.trim() !== '' ;
        }

        if(rules.maxLength)
        {
            isValid = value.length <= rules.maxLength && isValid;
        }

        if(rules.minLength)
        {
            isValid = value.length >= rules.minLength && isValid;
        }

        
        return isValid ? true:false;
    }

    inputChangeHandler = (event,inputIdentifier)=>{

        const updatedTaskDetails = {
            ...this.state.taskDetails
        };//shallow copy

        const updatedTaskElement = {
            ...updatedTaskDetails[inputIdentifier]
        } //deep copy

        updatedTaskElement.value = event.target.value;
        
        console.log(event.target.value);
        updatedTaskElement.valid = this.checkValidity(updatedTaskElement.value,updatedTaskElement.validation);
            
        updatedTaskElement.touched = true;

        updatedTaskDetails[inputIdentifier] = updatedTaskElement;
        let isFormValid = true;
        for(let inputIdentifier in updatedTaskDetails)
        {
            if(inputIdentifier !== 'selectProject')
            {
                isFormValid = isFormValid && updatedTaskDetails[inputIdentifier].valid;
            }
        }

        this.setState({
            taskDetails: updatedTaskDetails,
            isFormValid: isFormValid
        })
    }

    submitTaskHandler=(event)=>{
        event.preventDefault();

        let task  = {};
        let copyTaskDetails = JSON.parse(JSON.stringify(this.state.taskDetails));
    
    
        Object.keys(this.state.taskDetails).forEach(key=>{
           task[key] = this.state.taskDetails[key].value;
           copyTaskDetails[key].value = ''
         });
 

        this.props.onTaskAdded(task);
        
        this.setState(()=>{
            return{
                taskDetails:copyTaskDetails,
                isFormValid:false
            }
        })
        
    }

    render(){

        const formElementArray = [];
        for(let key in this.state.taskDetails) {
            if(key==='selectProject')
            {   
                let option = Object.keys(this.props.projects).map(project=>{
                    return {
                        value:project,
                        displayValue:project.charAt(0).toUpperCase()+project.slice(1)
                    }
                });


                formElementArray.push({
                    id:key,
                    config: {
                        ...this.state.taskDetails[key],
                        elementConfig:{
                            options:option
                        },
                        
                    }
                  });
            }
            else
            {
                formElementArray.push({
                    id:key,
                    config: this.state.taskDetails[key]
                });
            }
          
        }
        console.log(formElementArray);
        let form = (<form  onSubmit={this.submitTaskHandler}>

            <div className={classes.FormWithoutSubmitButton}>
                {formElementArray.map(formElement =>(
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid = {!formElement.config.valid}
                        changed={(event) =>{this.inputChangeHandler(event,formElement.id)}}
                        hasValidation = {formElement.config.validation}
                        touched = {formElement.config.touched}
                        />
                ))}
            </div>

            <Button btnType="Success" disabled={!this.state.isFormValid}>ADD</Button>
        </form>);

        let table ;
        
        let projectName = this.props.projects[this.state.taskDetails['selectProject'].value]  ;
        let taskDetails = ['startTime','endTime','selectProject','TaskName','TaskDescription'];
        if( projectName)
        {
          table =   <Table 
        rows={projectName} 
        cols={taskDetails}
        headings={taskDetails}

        />
        }
        else
            table = <p>no records </p>
       
        return(
            <div>
                {form}
                {table}
            </div>
        );
    }

}
const mapStateToProps = (state)=>{
    return{
        projects:state.projects
    }
}

const mapDispatchToProps =(dispatch)=>{
    return{
        onTaskAdded:(task)=> dispatch(actions.addTask(task))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(TaskDetails);