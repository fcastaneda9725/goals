function parseGoal(description) {
    const pattern = /I want to (.+) (every \d+ \w+)/i;
    const match = description.match(pattern);
  
    if (match) {
      const [, action, frequency] = match;
      return { title: action, frequency };
    }
  
    return null;  // Return null or throw an error if the pattern does not match
  }

  module.exports = { parseGoal };