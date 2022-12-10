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

const engineerQuestions = [
  {
    type: 'input',
    name: 'engineerName',
    message: "What is the engineer's name?",
    validate: (answer) => {
      if (answer !== '') {
        return true;
      }
      return 'Please enter at least one character.';
    }
  },
  {
    type: 'input',
    name: 'engineerId',
    message: "What is the engineer's ID number?",
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
    name: 'engineerEmail',
    message: "What is the engineer's email?",
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
    name: 'engineerGithub',
    message: "What is the engineer's GitHub username?",
    validate: (answer) => {
      if (answer !== '' && answer.length >1) {
        return true;
      }
      return 'Please enter a valid username.';
    }
  },
];

function writeToFile(fileName, data) {
  return fs.writeFile(path.join(__dirname, 'dist', fileName), data, (error) =>
   error ? console.error(error) : console.log('Successfully written to file!'));
}

function appendToFile(fileName, data) {
  return fs.appendFile(path.join(__dirname, 'dist', fileName), data, (error) =>
   error ? console.error(error) : console.log('Successfully appended to file!'));
}

function initializeApp() {
  console.log("Welcome! Are you ready to make your team?");
  console.log("Let's begin with the team manager.");

  function createManager() {
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

    createOthers();
  });
  }

  function createOthers() {
    inquirer.prompt([
    {
      type: 'list',
      name: 'options',
      message: 'Which team member would you like to add?',
      choices: ['Engineer', 'Intern', "None; I'm done building my team."],
    }
  ])
  .then((userInput) => {
    // console.log(userInput);
    // console.log(typeof(userInput));
    if (userInput.options === 'Engineer') {
      inquirer.prompt(engineerQuestions)
      .then((userInput) => {
        console.log(userInput);
        // Constructing new Engineer object:
        const engineer = new Engineer(
          userInput.engineerName, userInput.engineerId, 
          userInput.engineerEmail, userInput.engineerGithub
        );
        console.log(engineer.engineerName);
        appendToFile('team.html', `
          <h1>Engineer</h1>
          <p>Name: ${engineer.name}</p>
          <p>ID: ${engineer.id}</p>
          <p>Email: ${engineer.email}</p>
          <p>Office Number: ${engineer.officeNumber}</p>
        `);
      });
    }
  })
  };

  createManager();
}

initializeApp();