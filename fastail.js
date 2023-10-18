#!/usr/bin/env node
import { exec } from 'child_process';
import fs from 'fs';


function fastail() {

    function loadingAnimation() {
      let i = 0;
      const animationFrames = ['|', '/', '-', '\\'];
      return setInterval(() => {
        process.stdout.write(`\rInstalling... ${animationFrames[i % 4]}`);
        i++;
      }, 250);
    }

    console.log('Initializing your project...');
  // Step 1: Run the commands to initialize Tailwind CSS
  const command1 = 'npm init -y';
  exec(command1, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error running command1: ${error}`);
      return;
    }

    console.log('Project initialized.');
    const loadingInterval = loadingAnimation();

    // Step 2: Install Tailwind CSS and related packages
    const command2 = "npm install -D tailwindcss postcss autoprefixer";
    exec(command2, (error, stdout, stderr) => {
      clearInterval(loadingInterval);
      if (error) {
        console.error(`Error running command2: ${error}`);
        return;
      }
      console.log('\nTailwind CSS and related packages installed.');


      // Step 3: Initialize Tailwind CSS configuration 
      const command3 = "npx tailwindcss init -p";
      exec(command3, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error running command3: ${error}`);
          return;
        }
        console.log('tailwind.config.js has been created.');


        // Step 4: Check if tailwind.config.js exists
        fs.access('tailwind.config.js', fs.constants.F_OK, (err) => {
          if (err) {
            console.log('tailwind.config.js not found.');
          } else {
            console.log('tailwind.config.js found.');

            // Step 5: Read and edit tailwind.config.js
            fs.readFile('tailwind.config.js', 'utf8', (err, data) => {
              if (err) {
                console.error(`Error reading tailwind.config.js: ${err}`);
              } else {
                const updatedContent = `/** @type {import('tailwindcss').Config} */
  export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }`;

                fs.writeFile('tailwind.config.js', updatedContent, (err) => {
                  if (err) {
                    console.error(`Error writing to tailwind.config.js: ${err}`);
                  } else {
                    console.log('tailwind.config.js has been updated.');
                  }
                });

                // Step 6: Check if index.css exists
                  fs.access('index.css', fs.constants.F_OK, (indexCssErr) => {
                      if (indexCssErr) {
                      // Create index.css if it doesn't exist
                      const initialIndexCssContent = `@tailwind base;\n@tailwind components;\n@tailwind utilities;`;
                      fs.writeFile('index.css', initialIndexCssContent, (createErr) => {
                          if (createErr) {
                          console.error(`Error creating index.css: ${createErr}`);
                          } else {
                          console.log('index.css created.');
                          }
                      });
                      } else {
                      // Update the content of index.css
                      const updatedIndexCssContent = `@tailwind base;\n@tailwind components;\n@tailwind utilities;`;
                      fs.writeFile('index.css', updatedIndexCssContent, (updateErr) => {
                          if (updateErr) {
                          console.error(`Error updating index.css: ${updateErr}`);
                          } else {
                          console.log('index.css updated.');
                          }
                      });
                      }
                  });
                  
              }
            });
          }
        });
      });
    });
  });


}

fastail();
