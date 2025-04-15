class SeleniumError extends Error {
  constructor(message) {
    super(message);
    this.name = "Selenium Error";
  }
}

class EmailError extends Error {
  constructor(message) {
    super(message);
    this.name = "Email Error";
  }
}

export { SeleniumError, EmailError };
