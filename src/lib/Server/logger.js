export class Logger {
  constructor() {
    this.fileName = "";
  }

  log(message) {
    // const fileName = __filename.slice(__dirname.length + 1);
    const currentTime = new Date().toLocaleTimeString("pl-PL", {
      hour12: false,
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });

    console.log(`${currentTime} | ${this.fileName} - ${message}`);
  }
}
