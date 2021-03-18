/**
 * Release Easter-Egg : KaliScripter v1.1.1
 */

const fs = require("fs");
const app = require("express")();
require("colors");

module.exports = {
  /**
   * @param {string} msg [INFO] This is an info.
   */
  info(msg) {
    console.log(`[${"INFO".green}] ${msg}`);
  },

  /**
   * @param {string} msg [WARN] This is a warning.
   */
  warn(msg) {
    console.log(`[${"WARN".yellow}] ${msg}`);
  },

  /**
   * @param {string} msg [ERROR] This is an error.
   */
  error(msg) {
    console.log(`[${"ERROR".red}] ${msg}`);
  },

  /**
   * @param {string} label [{label}] This is an example.
   * @param {string} msg [EXEMPLE] {msg}.
   */
  label(label, msg) {
    console.log(`[${label.grey}] ${msg}`);
  },

  /**
   * @param {string} path FS-Like Path
   */
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

  /**
   * @param {string} path FS-Like Path
   */
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

  /**
   * @param {string} path FS-Like Path.
   * @param {string} data Raw data, plain-text.
   */
  write(path, data) {
    try {
      fs.writeFileSync(path, data, { encoding: "utf-8" });
    } catch (err) {
      this.error("FileSystem Error : Cannot create your file.");
    } finally {
      this.info("Successfully created your file.");
    }
  },

  /**
   * @param {string} path FS-Like Path.
   */
  unlink(path) {
    try {
      fs.unlinkSync(path);
    } catch (err) {
      this.error("FileSystem Error : Cannot unlink your file.");
    } finally {
      this.info("Successfully unlinked your file.");
    }
  },

  /**
   * @param {number} port Default (if null) is 80.
   * @param {string} hostname Default (if null) is 0.0.0.0 ("all granted" state).
   * @param {string} path Client request URL.
   * @param {string} htmlFile Specific HTML file to send.
   */
  www(port, hostname, path, htmlFile) {
    app.get(path, (req, res) => {
      if (req) {
        if (!fs.existsSync(htmlFile)) {
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

    app.listen(port || 80, hostname || "0.0.0.0", () => {
      this.warn("Webserver started.");
    });
  },

  /**
   * @class KaliScripter Core.
   * @description This class will be used for advanced features.
   * @version 0.0.1_a
   */

  Core: class Core {
    getInfos() {
      var version = "0.0.1_a";
      var author = "Kazzookay";
      var apis = ["Native-Binary-Packages", "Kali-001", "CSIHE-Native"];

      console.log(`Core Version : ${version}`);
      console.log(`KS Author    : ${author}`);
      console.log(`Default APIS : ${apis.join(", ")}`);
    }

    // This feature is in-dev.
  },
};
