const urls = require("../fixtures/students.json");
const begin_html = require("../fixtures/begin.json");
const end_html = require("../fixtures/end.json");
let base_url = "";
let current_url = "";
let lesson = "1";

describe(`Week ${lesson}`, () => {
  after(() => {
    let student_string = "";
    urls.forEach((url) => {
      base_url = `https://${url}.github.io/wdd230/`;
      current_url = `${base_url}/lesson02/design-principles.html`;
      student_string += `students.push({name:'${url}',link:'${current_url}'});`;
    });
    cy.writeFile(
      "week" + lesson + "_design.html",
      begin_html + student_string + end_html
    );
  });
  urls.forEach((url) => {
    //Cypress.env('urls').forEach(url => {
    describe(`Current student: ${url}`, () => {
      beforeEach(() => {
        base_url = `https://${url}.github.io/wdd230/`;
        current_url = `${base_url}/lesson02/design-principles.html`;
        cy.visit(current_url);
      });

      it("Naming Conventions - The images folder must be named images", () => {
        cy.get("img").each(($match) => {
          cy.wrap($match)
            .invoke("attr", "src")
            .then((src) => {
              if (!src.includes("http") && src.length > 0) {
                expect(src).to.match(/images\//);
              }
            });
        });
      });

      it("Naming Conventions - The CSS folder must be named styles", () => {
        cy.get("link").each(($match) => {
          cy.wrap($match)
            .invoke("attr", "href")
            .then((href) => {
              if (
                !href.includes("../") &&
                !href.includes("googleapis") &&
                !href.includes("gstatic") &&
                !href.includes("http") &&
                !href.includes("favicon")
              ) {
                expect(href).to.match(/styles\//);
              }
            });
        });
      });

      it("Naming Conventions - Img src is without spaces", () => {
        cy.get("img").each(($match) => {
          cy.wrap($match)
            .invoke("attr", "src")
            .then((src) => {
              if (!src.includes("http") && src.length > 0) {
                expect(src.split(" ").join("")).to.eq(src);
              }
            });
        });
      });

      it("Naming Conventions - Img src is lowercase", () => {
        cy.get("img").each(($match) => {
          cy.wrap($match)
            .invoke("attr", "src")
            .then((src) => {
              if (!src.includes("http") && src.length > 0) {
                expect(src.toLowerCase()).to.eq(src);
              }
            });
        });
      });

      it("Naming Conventions - CSS href is without spaces", () => {
        cy.get("link").each(($match) => {
          cy.wrap($match)
            .invoke("attr", "href")
            .then((href) => {
              if (
                !href.includes("../") &&
                !href.includes("googleapis") &&
                !href.includes("gstatic") &&
                !href.includes("http")
              ) {
                expect(href.split(" ").join("")).to.eq(href);
              }
            });
        });
      });

      it("Naming Conventions - CSS href is lowercase", () => {
        cy.get("link").each(($match) => {
          cy.wrap($match)
            .invoke("attr", "href")
            .then((href) => {
              if (
                !href.includes("../") &&
                !href.includes("googleapis") &&
                !href.includes("gstatic") &&
                !href.includes("http")
              ) {
                expect(href.toLowerCase()).to.eq(href);
              }
            });
        });
      });

      it("Naming Conventions - Your main CSS file must be styles/base.css", () => {
        let file_found = 0;
        cy.get("link")
          .each(($match) => {
            cy.wrap($match)
              .invoke("attr", "href")
              .then((href) => {
                if (href.match(/base\.css/)) {
                  file_found = 1;
                }
              });
          })
          .then(() => {
            expect(file_found).to.eq(1);
          });
      });

      it("Home Page Enhancement - The first css file must be a normalize file", () => {
        let file_found = 0;
        cy.get("link")
          .each(($match) => {
            cy.wrap($match)
              .invoke("attr", "href")
              .then((href) => {
                if (href.match(/normalize/)) {
                  file_found = 1;
                }
              });
          })
          .then(() => {
            expect(file_found).to.eq(1);
          });
      });

      it("Home Page Enhancement - There must be a favicon file", () => {
        let file_found = 0;
        cy.get("link")
          .each(($match) => {
            cy.wrap($match)
              .invoke("attr", "href")
              .then((href) => {
                if (href.match(/favicon\.ico/)) {
                  file_found = 1;
                }
              });
          })
          .then(() => {
            expect(file_found).to.eq(1);
          });
      });

      it("Development Standards - Must include the required document type definition", () => {
        cy.document().then((doc) => {
          expect(doc.doctype !== undefined).to.eq(true);
          expect(doc.doctype.name).to.eq("html");
        });
      });

      it("Development Standards - Must include html tag with language attribute", () => {
        cy.document()
          .get("html")
          .invoke("attr", "lang")
          .then((lang) => {
            expect(lang).to.have.length.of.at.least(2);
          });
      });

      it("Development Standards - Must include the head tag", () => {
        cy.get("head");
      });

      it("Development Standards - Must include the body tag", () => {
        cy.get("body");
      });

      it("Development Standards - The <head> must include the meta charset attribute", () => {
        cy.request(current_url)
          .its("body") // NB the response body, not the body of your page
          .then((content) => {
            expect(content.toLowerCase()).to.match(
              /meta[\s]+charset[\s]*=[\s]*"[\s]*utf-8[\s]*"/
            );
          });
      });

      it("Development Standards - The <head> must include the meta viewport element", () => {
        cy.document()
          .get("head meta[name=viewport]")
          .invoke("attr", "content")
          .should("include", "width=device-width, initial-scale=1");
      });

      it("Development Standards - Must include the title tag", () => {
        cy.get("title");
      });

      it("Social Media Meta Tags - The <head> must include the Open graph Title meta tag", () => {
        cy.document()
          .get("head meta[property=og:title]")
          .invoke("attr", "content")
          .then((content) => {
            expect(content).to.have.length.of.at.least(3);
          });
      });

      it("Social Media Meta Tags - The <head> must include the Open graph Type meta tag", () => {
        cy.document()
          .get("head meta[property=og:type]")
          .invoke("attr", "content")
          .then((content) => {
            expect(content.toLowerCase()).to.match(
              /website/
            );
          });
      });

      it("Social Media Meta Tags - The <head> must include the Open graph Url meta tag", () => {
        cy.document()
          .get("head meta[property=og:url]")
          .invoke("attr", "content")
          .then((content) => {
            expect(content.toLowerCase()).to.match(
              /https/
            );
          });
      });

      it("Social Media Meta Tags - The <head> must include the Open graph Image meta tag", () => {
        cy.document()
          .get("head meta[property=og:image]")
          .invoke("attr", "content")
          .then((content) => {
            expect(content.toLowerCase()).to.match(
              /https/
            );
          });
      });

      it("Development Standards - The <head> must include the meta description element", () => {
        cy.document()
          .get("head meta[name=description]")
          .invoke("attr", "content")
          .then((content) => {
            expect(content).to.have.length.of.at.least(3);
                      });
      });

      it("Development Standards - The <head> must include the meta author element", () => {
        cy.document()
          .get("head meta[name=author]")
          .invoke("attr", "content")
          .then((content) => {
            expect(content).to.have.length.of.at.least(3);
          });
      });

      it("Development Standards - The <body> must have a layout using main element", () => {
        cy.get("main");
      });

      it("Development Standards - The Google Fonts API must be used to select one or two fonts to use on the page", () => {
        cy.get("link").each(($match) => {
          cy.wrap($match)
            .invoke("attr", "href")
            .then((href) => {
              if (!href.includes("../") 
              && !href.includes("styles/")
              && !href.includes("favicon")) {
                expect(href).to.match(/fonts.googleapis|fonts.gstatic/);
              }
            });
        });
      });

      it("Main Content - The <main> column cards must be layed out using CSS Grid.", () => {
        cy.get("main").should("have.css", "display", "grid");
      });

      it("An ID may only be used once", () => {
        let duplicate_array = [];
        cy.get("[id]").each(($match) => {
          cy.wrap($match)
            .invoke("attr", "id")
            .then((id) => {
              duplicate_array.push(id);
              const unique = new Set(duplicate_array);
              expect(duplicate_array.length).to.eq(unique.size);
            });
        });
      });

      it("Img have alt", () => {
        cy.get("img").each(($match) => {
          cy.wrap($match)
            .invoke("attr", "alt")
            .then((alt) => {
              expect(alt).to.have.length.of.at.least(3);
            });
        });
      });

      it("CSS file is not 404", () => {
        cy.get("link").each(($match) => {
          cy.wrap($match)
            .invoke("attr", "href")
            .then((href) => {
              if (
                !href.includes("../") &&
                !href.includes("googleapis") &&
                !href.includes("gstatic") &&
                !href.includes("http")
              ) {
                cy.request({
                  url: base_url + href,
                  followRedirect: false,
                  failOnStatusCode: false,
                }).then((resp) => {
                  expect(resp.status).to.eq(200);
                  //expect(resp.redirectedToUrl).to.eq(undefined)
                });
                //cy.visit(base_url + href, { failOnStatusCode: false })
                //cy.get(".error-code").should("contain", "200")
                //cy.get(".error-text").should("contain", "Page not found")
              }
            });
        });
      });

      it("CSS is not inline", () => {
        let style_count = 0;
        cy.get("body")
          .then(($body) => {
            if ($body.find("[style]").length) {
              style_count = 1;
            }
          })
          .then(() => {
            expect(style_count).to.eq(0);
          });
      });

      it("CSS is not embedded", () => {
        let style_count = 0;
        cy.get("head")
          .then(($head) => {
            if ($head.find("style").length) {
              style_count = 1;
            }
          })
          .then(() => {
            expect(style_count).to.eq(0);
          });
      });

      it("JavaScript is not in a <link>", () => {
        cy.get("link").each(($match) => {
          cy.wrap($match)
            .invoke("attr", "href")
            .then((href) => {
              expect(href).to.not.match(/^js\//);
            });
        });
      });

      it("Naming Conventions - The JS folder must be named scripts", () => {
        cy.request(current_url)
          .its("body") // NB the response body, not the body of your page
          .then((content) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(content, "text/html");

            const scripts = doc.querySelectorAll("script"); // native query
            const srcs = [...scripts].map((script) =>
              script.getAttribute("src")
            );

            let srcsLen = srcs.length;
            if (srcsLen === 0) {
              srcsLen = -1;
            }
            let foundLen = 0;

            srcs.forEach((src) => {
              const regex = /^scripts\//;
              const found = src.match(regex);
              if (found) {
                foundLen++;
              }
            });
            expect(srcsLen).to.eq(foundLen);
          });
      });

      it("Naming Conventions - JavaScript src is without spaces", () => {
        cy.request(current_url)
          .its("body") // NB the response body, not the body of your page
          .then((content) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(content, "text/html");

            const scripts = doc.querySelectorAll("script"); // native query
            const srcs = [...scripts].map((script) =>
              script.getAttribute("src")
            );

            let srcsLen = srcs.length;
            if (srcsLen === 0) {
              srcsLen = -1;
            }
            let foundLen = 0;

            srcs.forEach((src) => {
              if (src.split(" ").join("") === src) {
                foundLen++;
              }
            });
            expect(srcsLen).to.eq(foundLen);
          });
      });

      it("Naming Conventions - JavaScript src is lowercase", () => {
        cy.request(current_url)
          .its("body") // NB the response body, not the body of your page
          .then((content) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(content, "text/html");

            const scripts = doc.querySelectorAll("script"); // native query
            const srcs = [...scripts].map((script) =>
              script.getAttribute("src")
            );

            let srcsLen = srcs.length;
            if (srcsLen === 0) {
              srcsLen = -1;
            }
            let foundLen = 0;

            srcs.forEach((src) => {
              if (src.toLowerCase() === src) {
                foundLen++;
              }
            });
            expect(srcsLen).to.eq(foundLen);
          });
      });

      it("JavaScript is in external files", () => {
        cy.request(current_url)
          .its("body") // NB the response body, not the body of your page
          .then((content) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(content, "text/html");

            const scripts = doc.querySelectorAll("script"); // native query

            const srcs = [...scripts].map((script) =>
              script.getAttribute("src")
            );

            let srcsLen = srcs.length;
            if (srcsLen === 0) {
              srcsLen = -1;
            }

            expect(srcsLen).to.eq(scripts.length);
          });
      });

      it("JavaScript file is found", () => {
        cy.request(current_url)
          .its("body") // NB the response body, not the body of your page
          .then((content) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(content, "text/html");

            const scripts = doc.querySelectorAll("script"); // native query
            const srcs = [...scripts].map((script) =>
              script.getAttribute("src")
            );

            if (srcs.length === 0) {
              expect(srcs.length).to.gte(1);
            }

            srcs.forEach((src) => {
              cy.request({
                url: base_url + src,
                followRedirect: false,
                failOnStatusCode: false,
              }).then((resp) => {
                expect(resp.status).to.eq(200);
              });
            });
          });
      });

      it("The JS should not contain document.write", () => {
        cy.request(current_url)
          .its("body") // NB the response body, not the body of your page
          .then((content) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(content, "text/html");

            const scripts = doc.querySelectorAll("script"); // native query
            const srcs = [...scripts].map((script) =>
              script.getAttribute("src")
            );
            srcs.forEach((src) =>
              cy
                .request({
                  url: base_url + src,
                  failOnStatusCode: false,
                })
                .its("body") // NB the response body, not the body of your page
                .then((content) => {
                  expect(content.toLowerCase()).to.not.match(/document.write/);
                })
            );
          });
      });

      it("There must not be any 3rd party code, such as jquery, bootstrap, etc.", () => {
        cy.request(current_url)
          .its("body") // NB the response body, not the body of your page
          .then((content) => {
            expect(content.toLowerCase()).to.not.match(
              /jquery|select2|bootstrap|w3.css|elfsight|moment/
            );
          });
      });
    });
  });
});
