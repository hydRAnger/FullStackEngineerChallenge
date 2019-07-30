// TO REVIEWER: The configurations should be extracted from repo use tools like node-config(https://github.com/lorenwest/node-config).
// It will be more sucure and give a consistent configuration interface.
// But for time limit and easy for easy to run it on your machine, I hardcoded it here temporarily.
module.exports = {
  mongoURI: 'mongodb+srv://hydra:hydra1986@cluster0-85ghb.mongodb.net/test?retryWrites=true&w=majority',
  secretOrKey: 'hydraSecretOrKey'
};