import React, {useEffect} from 'react';
import styles from './Cockpit.module.css';

const cockpit = (props) => {

    // useEffect(() => {
    //     console.log('[Cockpit.js] useEffect');
    //     // http request...
    //     setTimeout(() => {
    //         alert('Saved data to cloud!');
    //     }, 1000);
    // }, []);

    useEffect(() => {
        console.log('[Cockpit.js] useEffect');
        // http request...
        setTimeout(() => {
            alert('Saved data to cloud!');
        }, 1000);
    }, [props.persons]);
   
    // Dynamically change class name
    let classes = [];
    let btnClass = '';

    if(props.showPersons) {
        // Change to the nested class name after click
        btnClass = styles.Red;
    }

    if (props.persons.length <= 2) {
        classes.push(styles.red); // classes = ['red']
    }
    if (props.persons.length <= 1) {
        classes.push(styles.bold); // classes = ['red', 'bold']
    }

    return(
        <div className={styles.Cockpit}>
          <p className={classes.join(' ')}>Hi, I'm a REACT APP</p>
          <button 
            className={btnClass}
            onClick={props.clicked}>Toggle</button>
      </div>
  );
};

export default cockpit;