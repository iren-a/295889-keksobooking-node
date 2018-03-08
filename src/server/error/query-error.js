module.exports = class QueryError extends Error {
  constructor() {
    super();
    this.name = `QueryError`;
    this.message = `Incorrect query`;
  }
};
