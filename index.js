const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const pageTemplate = require('./src/page-template');

const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

const managerQuestions = [
  {
    type: 'input',
    name: 'managerName',
    message: "What is the team manager's name?",
    validate: (answer) => { // wait why not validate() {}??
      if (answer !== '') {
        return true;
      }
      return 'Please enter at least one character.';
    }
  },
  {
    type: 'input',
    name: 'managerId',
    message: "What is the manager's ID number?",
    validate: (answer) => {
      if (!/[0-9]/.test(answer)) {
        return 'Please enter numbers only.'
      } else if (answer < 0) {
        return 'Please enter positive integers only.'
      } else {
        return true;
      }
    }
  },
  {
    type: 'input',
    name: 'managerEmail',
    message: "What is the manager's email?",
    validate: (answer) => {
      let regEx = /\S+@\S+\.\S+/;
      if (regEx.test(answer)) {
        return true;
      }
      return 'Please enter a valid email address.';
    }
  },
  {
    type: 'input',
    name: 'managerOfficeNumber',
    message: "What is the manager's office number?",
    validate: (answer) => {
      if (!/[0-9]/.test(answer)) {
        return 'Please enter numbers only.'
      } else if (answer < 0) {
        return 'Please enter positive integers only.'
      } else {
        return true;
      }
    }
  },
];

function writeToFile(fileName, data) {
  return fs.writeFile(path.join(__dirname, 'dist', fileName), data, (error) =>
   error ? console.error(error) : console.log('Successfully written to file!'));
}

function initializeApp() {
  console.log("Welcome! Are you ready to make your team?");
  console.log("Let's begin with the team manager.");
  inquirer.prompt(managerQuestions)
  .then((userInput) => {
    console.log(userInput);
    // Constructing new Manager object:
    const manager = new Manager(
      userInput.managerName, userInput.managerId, 
      userInput.managerEmail, userInput.managerOfficeNumber
    );
    console.log(manager.managerName);
    // would it still work if move writetofile to the very end?
    writeToFile('team.html', `<h1>Manager</h1>
    <p>Name: ${manager.name}</p>
    <p>ID: ${manager.id}</p>
    <p>Email: ${manager.email}</p>
    <p>Office Number: ${manager.officeNumber}</p>
    `);
  });
  
  inquirer.prompt([
    {
      type: 'list',
      name: ''
    }
  ])
}

initializeApp();