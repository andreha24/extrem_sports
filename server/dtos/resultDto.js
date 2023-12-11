module.exports = class ResultDto {
  constructor(result) {
    this.id = result.id;
    this.result = result.result;
    this.dateOfTrain = result.dateOfTrain;
    this.userId = result.userId;
  }
}