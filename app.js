const inquirer = require('inquirer');
const fs = require('fs');

const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: "What is your name? (Required)",
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your name!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your GitHub Username (Required)',
      validate: githubInput => {
        if (githubInput) {
          return true;
        } else {
          console.log('Please enter your github name!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'about',
      message: 'Provide some information about yourself:'
    }
  ]);
};

const promptProject = portfolioData => {
  console.log(`
  ==================
  Add a New Project
  ==================
  `);

  // if there is no 'projects' array property, create one
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }

  return inquirer.prompt([
    {
    type: 'input',
    name: 'name',
    message: 'What is the name of your project? (Required)',
    validate: projNameInput => {
      if (projNameInput) {
        return true;
      } else {
        console.log("Please enter a name for the project!");
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'description',
    message: 'Please provide a project description. (Required)',
    validate: projDescInput => {
      if (projDescInput) {
        return true;
      } else {
        console.log("Please enter a description for the project!");
        return false;
      }
    }
  },
  {
    type: 'checkbox',
    name: 'languages',
    message: 'What did you build this project with? (Check all that apply)',
    choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
  },
  {
    type: 'input',
    name: 'link',
    message: 'What is the GitHub link for your project? (Required)',
    validate: projGithubInput => {
      if (projGithubInput) {
        return true;
      } else {
        console.log("Please enter the GitHub link for the project!");
        return false;
      }
    }
  },
  {
    type: 'confirm',
    name: 'feature',
    message: 'Would you like to feature this project?',
    default: false
  },
  {
    type: 'confirm',
    name: 'confirmAddProject',
    message: 'Would you like to enter another project?',
    default: false
  }
  ])
  .then(projectData => {
    portfolioData.projects.push(projectData);
    if (projectData.confirmAddProject) {
      return promptProject(portfolioData);
    } else {
      return portfolioData;
    }
  });
};

promptUser()
  .then(promptProject)
  .then(portfolioData => {
    console.log(portfolioData);
  });

// const generatePage = require('./src/page-template');

// const pageHTML = generatePage(name, github);


// fs.writeFile('index.html', pageHTML, err => {
//   if (err) throw err;

//   console.log("Portfolio complete! Check out index.html to see the output!")
// });

