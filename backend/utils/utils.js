export function checkEnvVariable(variableName){
  // Checks if the environment variable is defined
    if (!process.env[variableName]) {
        console.error(`${variableName} is not defined in the .env file`);
        process.exit(1); // If the variable is not defined, exit the process with status code 1 to indicate error
      }
}