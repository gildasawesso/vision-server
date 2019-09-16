module.exports = {
  checkEnvironmentVariables(variables) {
    variables.forEach(variable => {
      if (!process.env[variable]) throw new Error(`Missing environment variable '${variable}'.`);
    });
  },
};
