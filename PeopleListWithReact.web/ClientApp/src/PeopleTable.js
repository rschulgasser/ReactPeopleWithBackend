import React from 'react';
import { produce } from 'immer';
import axios from 'axios';
import PersonRow from './PersonRow';
import AddEditPerson from './AddEditPerson';

class PeopleTable extends React.Component {
    state = {
        people: [],
        person: {
            checked:'',
            firstName: '',
            lastName: '',
            age: '',
            id:''
           
            
        },
        isEditting: false
       
        }
        componentDidMount() {
            
        axios.get('/api/people/getall').then(res => {
           
            this.setState({ people: res.data });
        });
    }
   
    onAddClick = () => {
       
        const{person}=this.state;
        const {firstName, lastName, age, checked}=person;
       
        axios.post('/api/people/add', {firstName,lastName,age}).then(() => {
           
            axios.get('/api/people/getall').then(res => {
                this.setState({
                    people: res.data,
                    person: {
                        firstName: '',
                        lastName: '',
                        age: '',
                        checked: false
                    }
                  
                });
            });
        });
    }
    onDeleteClick = (p) =>
    {
        axios.post('/api/people/delete', p).then(() =>
        {
    
            this.getAll();
        });
    
        }
    onEditClick=(p)=> {
       
        
        const {firstName, lastName, age, id, checked}=p;
        this.setState({isEditting: true,
           person:{ firstName: firstName,
            lastName: lastName,
            age: age,
            id: id,
            checked: checked
           }
        });
          
           }
        
        onUpdateClick =()=>{

            const{person}=this.state;
            const {firstName, lastName, age, id, checked}=person
            axios.post('/api/people/edit', {firstName, lastName, age, id, checked}).then(() => {
            this.setState({isEditting: false});
            this.getAll();
                });
            
        }

        onCancelClick =()=>{
            this.setState({isEditting: false}); 
        }
       onTextChange = e => {
        const copy = { ...this.state.person };
        copy[e.target.name] = e.target.value;
        this.setState({ person: copy });
    }
    checkAll=()=>{
        const {people}=this.state;
       
        people.forEach(p=>p.checked=true);
        
        this.setState({ people: people });

        axios.post('/api/people/editall', people).then(() => {
            
            this.getAll();
            });

        console.log(this.state.people);
    }
   
    unCheckAll=()=>{
        const {people}=this.state;
        people.forEach(p=>p.checked=false);
    
        this.setState({ people: people });

        axios.post('/api/people/editall', people).then(() => {
            
            this.getAll();
                  
                
            });

    }
    onCheckClick=(p)=> {
      
        const {people}=this.state;
       
      const {checked}=p;
        p.checked = !checked;
        const {firstName, lastName, age, id}=p;
        
        console.log(p);
        axios.post('/api/people/edit', p).then(() => {
            
            this.getAll();
                });
                 
    }
    
    onDeleteAllClick = (p) =>
    { 
    const {people}=this.state;
        axios.post('/api/people/deleteAll',people).then(() =>
        {
    
            this.getAll();
    });
   
}
      
getAll() {
    axios.get('/api/people/getall').then(res => {
        this.setState({
            people: res.data,
            person: {
                firstName: '',
                lastName: '',
                age: ''

            }
          
        });
    });
}
  
    render() {
        const {person, people, isEditting} =this.state;
        const {firstName, lastName, age, checked}=person;
        return (
            <div className='container mt-5'> 
            
            <AddEditPerson
                firstName={firstName}
                lastName={lastName}
                age={age}
                onAddClick={this.onAddClick}
                onTextChange={this.onTextChange}
                onUpdateClick ={this.onUpdateClick}
                onCancelClick={this.onCancelClick}
                isEditting={isEditting}
                />


<table className='table table-hover table-striped table-bordered mt-3 container mt-5' >
            <thead>
                
                        <tr>
                            <td><button onClick={this.onDeleteAllClick} className="btn btn-danger btn-block">Delete All</button>
                            <button onClick={this.checkAll} className="btn btn-info btn-block">Check All</button>
                            <button onClick={this.unCheckAll}className="btn btn-info btn-block">Uncheck All</button></td>
                            <td>First Name</td>
                            <td>Last Name</td>
                            <td>Age</td>
                            <td>Edit/ Delete</td>
                        </tr>
                    </thead>
                    <tbody>
                    {people.map(p => <PersonRow 
                    person={p}
                    checked={p.checked}
                    onEditClick  ={()=>this.onEditClick(p)}
                    onDeleteClick  ={()=>this.onDeleteClick(p)}
                    onTextChange={this.check}
                    onCheckClick={()=>this.onCheckClick(p)}
                    key={p.id} 
                   
                    />)}
                
                    </tbody>
                </table> 

            </div>
           
        )
    }
}

export default PeopleTable;