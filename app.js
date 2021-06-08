const inquirer = require('inquirer');
// const fs = require('fs')
// const generatePage = require('./src/page-template.js');

// const pageHTML = generatePage(name, github);

// fs.writeFile('index.html', pageHTML, err => {
//     if (err) throw err;

//     console.log('Portfolio complete! Check out index.html to see the output!');
// });

const prompyUser = () => {
    return inquirer.prompt([
        {
        type: 'input',
        name: 'name',
        message: 'What is your name?',
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
        message: 'Enter your GitHub Username',
        validate: githubInput => {
            if (githubInput) {
                return true;
            } else {
                console.log('Please enter your GitHub username!');
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
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    };
    console.log(
        `
        =================
        Add a New Project
        =================
        `
    );
    return inquirer.prompt([
        {
        type: 'input',
        name: 'name',
        message: 'What is the name if your project?',
        validate: projectName => {
            if (projectName) {
                return true;
            } else {
                console.log('Please enter the name of your project!');
                return false;
            }
        }
        },
        {
        type: 'input',
        name: 'description',
        message: 'Provide a description of your project (Required)',
        validate: projectDesc => {
            if (projectDesc) {
                return true;
            } else {
                console.log('Please enter a description for your project!');
                return false;
            }
        }
        },
        {
        type: 'checkbox',
        name: 'languages',
        message: 'What did you build this project with? (Check all the apply)',
        choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
        type: 'input',
        name: 'link',
        message: 'Enter the GitHub link to your project (Required)',
        validate: githubLink => {
            if (githubLink) {
                return true;
            } else {
                console.log('Please enter the GitHub link for your project!');
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
        }
        else {
            return portfolioData;
        }
    })
};

prompyUser()
    .then(promptProject)
    
    //.then(projectAnswers => console.log(projectAnswers))
    
    .then(portfolioData => console.log(portfolioData));
