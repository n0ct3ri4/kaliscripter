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
   * @param {fs.PathLike} path Folder Path.
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
   * @param {fs.PathLike} path Folder Path.
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
   * @param {fs.PathLike} path File Path.
   * @param {any} data Raw data, plain-text.
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
   * @param {fs.PathLike} path File Path.
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
   * @param {fs.PathLike} path File or Folder Path.
   */
  isExists(path) {
    if (fs.existsSync(path)) {
      return true;
    } else {
      return false;
    }
  },

  /**
   * @param {fs.PathLike} path File or Folder Path.
   * @param {fs.Mode} mode FS-Mode.
   * @param {(err: NodeJS.ErrnoException)} callback Callback Function.
   */
  chmod(path, mode, callback) {
    fs.chmod(path, mode, (err) => {
      callback(err);
    });
  },

  /**
   * @param {fs.PathLike} path Folder Path.
   * @param {fs.BufferEncodingOption} encoding Folder Encoding. Default is UTF-8.
   */
  readDir(path, encoding) {
    try {
      return fs.readdirSync(path, encoding || "utf-8");
    } catch (err) {
      this.error("Cannot read this directory.");
      throw err;
    }
  },

  /**
   * @param {fs.PathLike} path File Path.
   * @param {fs.BufferEncodingOption} encoding File Encoding. Default is UTF-8.
   */
  readFile(path, encoding) {
    try {
      return fs.readFileSync(path, encoding || "utf-8");
    } catch (err) {
      this.error("Cannot read this file.");
      throw err;
    }
  },

  /**
   * @class FileSystem Streamer
   * @param {ClassDecorator} Streamer
   */
  Streamer: class Streamer {
    /**
     * @param {fs.PathLike} path File Path.
     * @param {fs.BufferEncodingOption} encoding File Encoding. Default is UTF-8.
     */
    Read(path, encoding) {
      try {
        return fs.createReadStream(path, { encoding: encoding || "utf-8" });
      } catch (err) {
        this.error("Cannot Stream (Read-State) this file.");
        throw err;
      }
    }

    /**
     * @param {fs.PathLike} path File Path.
     * @param {fs.BufferEncodingOption} encoding File Encoding. Default is UTF-8.
     */
    Write(path, encoding) {
      try {
        return fs.createWriteStream(path, { encoding: encoding || "utf-8" });
      } catch (err) {
        this.error("Cannot Stream (Write-State) this file.");
        throw err;
      }
    }
  },

  www: {
    /**
     * @param {number} port Default (if null) is 80.
     * @param {string} hostname Default (if null) is 0.0.0.0 ("all granted" state).
     * @param {string} path Client request URL.
     * @param {string} htmlFile Specific HTML file to send.
     */
    listen(port, hostname) {
      app.listen(port || 80, hostname || "0.0.0.0", () => {
        this.warn("Webserver started.");
      });
    },

    /**
     *
     * @param {string} url URL Path. Example : "/" or "/robots.txt" or "/auth/login".
     * @param {fs.PathLike} filePath HTML File Path. Example : "`./src/index.html`" or "`${__dirname}/src/index.html`"
     */
    addPage(url, filePath) {
      app.get(url, (req, res) => {
        if (req) {
          if (fs.existsSync(filePath)) {
            res.setHeader("Content-Type", "text/html");
            res.send(fs.readFileSync(filePath, "utf-8"));
            res.status(200);
          } else {
            res.setHeader("Content-Type", "text/html");
            res.send("<i>Requested file doesn't exists.</i>");
            res.status(404);
          }
        } else {
          throw new Error("Unknown request.");
        }
      });
    },
  },

  /**
   * This feature is under developement. n0ct3ri4 isn't responsible of any issue that you can have.
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

    APIS = {
      NativeBinaryPackages: [
        {
          name: "native",
          value() {
            return console.log(
              new String(
                `"native" is a basic declaration, used to define a default in-app function.`
              )
            );
          },
        },
        {
          name: "__main__",
          value() {
            return console.log(
              new String(
                `"__main__" is a basic declaration, used to define your in-app main function.`
              )
            );
          },
        },
      ],
      Kali001() {
        return false;
      },
      CSIHENative() {
        return false;
      },
    };
  },
};
