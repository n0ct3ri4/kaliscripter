const fs = require("fs");
const app = require("express")();
require("colors");

module.exports = {
  info(msg) {
    console.log(`[${"INFO".green}] ${msg}`);
  },

  warn(msg) {
    console.log(`[${"WARN".yellow}] ${msg}`);
  },

  error(msg) {
    console.log(`[${"ERROR".red}] ${msg}`);
  },

  label(label, msg) {
    console.log(`[${label.grey}] ${msg}`);
  },

  mkdir(path) {
    try {
      fs.mkdirSync(path, {
        recursive: true,
      });
    } catch (err) {
      this.error("FileSystem Error : Cannot create your folder(s).");
    } finally {
      this.info("Successfully created your folder(s).");
    }
  },

  rmdir(path) {
    try {
      fs.rm(path, {
        recursive: true,
      });
    } catch (err) {
      this.error("FileSystem Error : Cannot create your folder(s).");
    } finally {
      this.info("Successfully deleted your folder.");
    }
  },

  write(path, data) {
    try {
      fs.writeFileSync(path, data, { encoding: "utf-8" });
    } catch (err) {
      this.error("FileSystem Error : Cannot create your file.");
    } finally {
      this.info("Successfully created your file.");
    }
  },

  unlink(path) {
    try {
      fs.unlinkSync(path);
    } catch (err) {
      this.error("FileSystem Error : Cannot unlink your file.");
    } finally {
      this.info("Successfully unlinked your file.");
    }
  },

  www(port, hostname, path, htmlFile) {
    app.get(path, (req, res) => {
      if (req) {
        if (fs.existsSync(htmlFile)) {
          res.writeHead(404, { "Content-Type": "text/html" });
          res.end("This file doesn't exists.", () => {
            this.info(
              `Ending point > ${req.socket.remoteAddress.magenta}:${
                req.socket.remotePort.toString().magenta
              }`
            );
          });
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.write(fs.readFileSync(htmlFile, "utf-8"));
          res.end("This file doesn't exists.", () => {
            this.info(
              `Ending point > ${req.socket.remoteAddress.magenta}:${
                req.socket.remotePort.toString().magenta
              }`
            );
          });
        }
      }
    });

    app.listen(port, hostname, () => {
      this.warn("Webserver started.");
    });
  },
  Core: class Core {
    getInfos() {
      var version = "1.0.0";
      var author = "Kazzookay";
      var apis = ["Native-Binary-Packages", "Kali-001", "CSIHE-Native"];

      console.log(`Core Version : ${version}`);
      console.log(`KS Author    : ${author}`);
      console.log(`Default APIS : ${apis.join(", ")}`);
    }

    // This feature is in-dev.
  },
};
