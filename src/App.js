import React, { Component } from 'react';
import styles from './App.module.css';
import Person from './Person/Person';
import ValidationComponent from './ValidationComponent/ValidationComponent';
import CharComponent from './CharComponent/CharComponent';

class App extends Component {
  state = {
    persons: [
      { id: 'x1', name: 'Max', age: 28},
      { id: 'f3', name: 'Manu', age: 21},
      { id: 'd2', name: 'Steph', age: 25}
    ],
    showPersons: false,
    len: 0,
    lenAlert: 'empty',
    components: []
  }

  // switchNameHandler = (newName) => {
  //   //console.log('Was clicked!');
  //   this.setState({
  //     persons: [
  //       { name: 'newName', age: 18},
  //       { name: 'Manuhahaha', age: 19},
  //       { name: 'Stephhhhh', age: 10}
  //     ]
  //   })
  // }

  deletePersonHandler = (personIdx) => {
    // Should update state in immutable fashion, 
    // not changing the original data

    // Method1: Make a copy of the original person array
    // const persons = this.state.persons.slice();
    
    // Method2: Use ES6 feature: ... spread operator
    const persons = [...this.state.persons];
    persons.splice(personIdx, 1);
    this.setState({persons: persons});
  }

  deleteComponentHandler = (componentIdx) => {
    const components = [...this.state.components];
    components.splice(componentIdx, 1);
    this.setState({components: components});
  } 

  nameChangedHandler = (event, id) => {
    // Return the index of the person which matches the input id 
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    // Make a copy of the original person 
    const person = {
      ...this.state.persons[personIndex]
    };
    // Alternatively, const person = Obeject.assign({}, this.state.persons[personIndex]);

    // Update the name from the user input
    person.name = event.target.value;

    // Make a copy of the original person array 
    const persons = [...this.state.persons];

    // Replace the old person with the new person 
    persons[personIndex] = person;

    // Update persons array 
    this.setState({persons: persons});
  }

  toggleHandler = () => {
    this.setState({showPersons: !this.state.showPersons})
  }

  // showCursorHandler = (e) => {
  //   this.setState({cursorX: e.screenX, cursorY: e.screenY,
  //                  pageX: e.pageX, pageY: e.pageY,
  //                  clientX: e.clientX, clientY: e.pageY
  //   });
  // }

  countLenHandler = (event) => {
    
    this.setState({components: event.target.value.split('')});

    const len = event.target.value.length;

    if (len < 5) this.setState({lenAlert: "TooShort!"});
    else if (len > 10) this.setState({lenAlert: "TooLong!"});
  }

  render() {
    // Define the css class name for the toggle button 
    let btnClass = '';

    // Dynamically change class name
    let classes = [];
    if (this.state.persons.length <= 2) {
      classes.push(styles.red); // classes = ['red']
    }
    if (this.state.persons.length <= 1) {
      classes.push(styles.bold); // classes = ['red', 'bold']
    }

    let persons = null;
    if (this.state.showPersons) {
      persons = (
        <div> 
          {this.state.persons.map((person, index) => {
            return <Person 
                    click = {this.deletePersonHandler.bind(this, index)}
                    name = {person.name} 
                    age = {person.age}
                    key = {person.id}
                    changed = {(event) => this.nameChangedHandler(event, person.id)} />
          })}
        </div>
      );
      
      // Change the class name after click
      btnClass = styles.Red;
    }

    let components = null;
    components = (
      <div>
        {this.state.components.map((component, index) => {
          return <CharComponent
                  char = {component}
                  click = {this.deleteComponentHandler.bind(this, index)}
                  
          />
        })}
      </div>
    )

    return (
      <div className={styles.App} >
        <p className={classes.join(' ')}>Hi, I'm a REACT APP</p>
        <input type="text" onChange={(event) => this.countLenHandler(event)} 
               value={this.state.components.join('')}>
        </input>
        <ValidationComponent len = {this.state.lenAlert}/>
        <button 
          className={btnClass}
          onClick={this.toggleHandler}>Toggle</button>
        {persons}
        {components}
      </div>
    );
  }
}

export default App;

