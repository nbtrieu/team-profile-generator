const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
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

const internQuestions = [
  {
    type: 'input',
    name: 'internName',
    message: "What is the intern's name?",
    validate: (answer) => {
      if (answer !== '') {
        return true;
      }
      return 'Please enter at least one character.';
    }
  },
  {
    type: 'input',
    name: 'internId',
    message: "What is the intern's ID number?",
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
    name: 'internEmail',
    message: "What is the intern's email?",
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
    name: 'internSchool',
    message: "Which school does the intern go to?",
    validate: (answer) => {
      if (answer !== '' && answer.length >1) {
        return true;
      }
      return 'Please enter a valid school name.';
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

function createManager() {
  inquirer.prompt(managerQuestions)
  .then((userInput) => {
    // console.log(userInput);
    // Constructing new Manager object:
    const manager = new Manager(
      userInput.managerName, userInput.managerId, 
      userInput.managerEmail, userInput.managerOfficeNumber
    );

    writeToFile('team.html', `
    <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Team Profile Generator</title>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="./style.css" />
  </head>

  <body>
    <nav class="navbar navbar-dark bg-primary">
      <div class="container-fluid justify-content-center my-3">
        <h1 class="navbar-brand mb-0">✨ My Team Profile ✨</h1>
      </div>
    </nav>
    <div class="row px-3 body justify-content-center">
      <div class="col-sm-4 mt-3">
        <div class="card">
          <div class="card-header">
            <h4>${manager.name}</h4>
            <h5>☕️ Manager</h5>
          </div>
          <div class="card-body">
            <p class="card-text">
              <ul class="list-group">
                <li class="list-group-item">ID: ${manager.id}</li>
                <li class="list-group-item">Email: <a href="mailto:${manager.email}">${manager.email}</a></li>
                <li class="list-group-item">Office Number: ${manager.officeNumber}</li>
              </ul>
            </p>
          </div>
        </div>
      </div>
    `);

    showMenu();
  });
};

function showMenu() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'options',
      message: 'Which team member would you like to add?',
      choices: ['Engineer', 'Intern', "None; I'm done building my team."],
    }
  ])
  .then((userInput) => {
    // console.log('user input: ', userInput);
    createOthers(userInput);
  })
}

function createOthers(userInput) {
  if (userInput.options === 'Engineer') {
    inquirer.prompt(engineerQuestions)
    .then((userInput) => {
      // console.log(userInput);
      // Constructing new Engineer object:
      const engineer = new Engineer(
        userInput.engineerName, userInput.engineerId, 
        userInput.engineerEmail, userInput.engineerGithub
      );
      
      appendToFile('team.html', `
      <div class="col-sm-4 mt-3">
      <div class="card">
        <div class="card-header">
          <h4>${engineer.name}</h4>
          <h5>👓 Engineer</h5>
        </div>
        <div class="card-body">
          <p class="card-text">
            <ul class="list-group">
              <li class="list-group-item">ID: ${engineer.id}</li>
              <li class="list-group-item">Email: <a href="mailto:${engineer.email}">${engineer.email}</a></li>
              <li class="list-group-item">GitHub: <a href="https://github.com/${engineer.github}" target="_blank">${engineer.github}</a></li>
            </ul>
          </p>
        </div>
      </div>
    </div>
      `);
      showMenu();
    });
  } else if (userInput.options === 'Intern') {
    inquirer.prompt(internQuestions)
    .then((userInput) => {
      // console.log(userInput);
      // Constructing new Intern object:
      const intern = new Intern(
        userInput.internName, userInput.internId, 
        userInput.internEmail, userInput.internSchool
      );
      
      appendToFile('team.html', `
      <div class="col-sm-4 mt-3">
      <div class="card">
        <div class="card-header">
          <h4>${intern.name}</h4>
          <h5>👓 Intern</h5>
        </div>
        <div class="card-body">
          <p class="card-text">
            <ul class="list-group">
              <li class="list-group-item">ID: ${intern.id}</li>
              <li class="list-group-item">Email: <a href="mailto:${intern.email}">${intern.email}</a></li>
              <li class="list-group-item">School: ${intern.school}</li>
            </ul>
          </p>
        </div>
      </div>
    </div>
      `);
      showMenu();
    });
  } else if (userInput.options === "None; I'm done building my team.") {
    console.log('Team profile generated in team.html inside the dist folder.');
    return;
  }
};

function initializeApp() {
  console.log("Welcome! Are you ready to make your team?");
  console.log("Let's begin with the team manager.");

  createManager();
}

initializeApp();