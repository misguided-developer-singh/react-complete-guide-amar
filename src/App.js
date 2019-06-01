import React, { Component } from 'react';
import './App.css';
import Person  from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { id: 'asdf1', name: 'Amar', age: 28 },
      { id: 'asdf2', name: 'Manu', age: 29 },
      { id: 'asdf3', name: 'Stephanie', age: 26 },
    ],
    showPersons: false,
  }

  deletePersonHandler = (personIndex) => {
    const persons = this.state.persons.slice();
    persons.splice(personIndex, 1);
    this.setState({ persons: persons})
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  }

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(person => person.id === id);
    // console.log(personIndex);
    const person = Object.assign({}, this.state.persons[personIndex]);
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState({ persons: persons })

    // this.setState({
    //   persons: [   
    //     { name: 'Amar', age: 28 },
    //     { name: event.target.value, age: 29 },
    //     { name: 'Stephanie', age: 26 },
    //   ],
    // });
  }

  switchNameHandler = (newName) => {
    // console.log('was clicked!');
    // DON'T DO THIS: this.state.persons[0].name = "Amarjit";

    this.setState({
      persons: [   
        { name: newName, age: 28 },
        { name: 'Manu', age: 29 },
        { name: 'Stephanie', age: 27 },
      ]
    });
  }


   render() {
     const style = {
      backgroundColor: 'green',
      color: 'white',
      border: '1px solid blue',
      font: 'inherit',
      padding: '8px',
      cursor: 'pointer'
     };

     let persons = null;

     if (this.state.showPersons) {
        persons = (
          <div>
            {
                this.state.persons.map((person, index) => {
                  return <Person name={person.name} age={person.age} 
                                 click={() => this.deletePersonHandler(index)}
                                 changed={(event) => this.nameChangeHandler(event, person.id)}
                                 key={person.id}
                                 />
              })
            }

            {/* <Person name={this.state.persons[0].name} age={this.state.persons[0].age} />
            <Person name={this.state.persons[1].name} 
                    age={this.state.persons[1].age}
                    click={this.switchNameHandler.bind(this, 'Amar!')}
                    changed={this.nameChangeHandler}>My Hobbies: Racing </Person>
            <Person name={this.state.persons[2].name} age={this.state.persons[2].age} /> */}
        </div> 
        );

        style.backgroundColor = 'red';
     }

    //  let classes = ['red', 'bold'].join(' '); // "red bold"
    //  console.log(classes);

    const classes = [];
    if (this.state.persons.length <= 2) {
      classes.push('red'); // classes = ['red']
    }
    if (this.state.persons.length <= 1) {
      classes.push('bold'); // classes = ['red', 'bold']
    }


    return (
          <div className="App">
            <h1>Hi, I'm a React App</h1>
            <p className={classes.join(' ')}>This is really working!</p>
            <button 
                  style={style}
                  onClick={this.togglePersonsHandler}>Toggle Persons</button>
            {/* <button 
                  style={style}
                  onClick={ () => this.switchNameHandler('Amarjit!!') }>Switch Name</button> */}
            {persons}
          </div>
    );
   }
}

export default App;
// export default Radium(App);  // Higher Order Function
