module.exports = class EventDto {
  constructor(event) {
    this.id = event.id;
    this.name = event.name;
    this.description = event.description;
    this.continent = event.continent;
  }
}