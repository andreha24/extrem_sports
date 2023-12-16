module.exports = class ResultDto {
  constructor(result) {
    this.id = result.id;
    this.result = result.result;
    this.heartbeat = result.heartbeat;
    this.oxygen = result.oxygen;
    this.temperature = result.temperature;
    this.dateOfTrain = result.dateOfTrain;
    this.userId = result.userId;
  }
}