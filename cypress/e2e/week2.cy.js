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
      current_url = `${base_url}index.html`;
      student_string += `students.push({name:'${url}',link:'${current_url}'});`;
    });
    cy.writeFile(
      "week" + lesson + ".html",
      begin_html + student_string + end_html
    );
  });
  urls.forEach((url) => {
    //Cypress.env('urls').forEach(url => {
    describe(`Current student: ${url}`, () => {
      beforeEach(() => {
        base_url = `https://${url}.github.io/wdd230/`;
        current_url = `${base_url}index.html`;
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

      it("Home Page Enhancement - There must be a styles/larger.css file", () => {
        let file_found = 0;
        cy.get("link")
          .each(($match) => {
            cy.wrap($match)
              .invoke("attr", "href")
              .then((href) => {
                if (href.match(/larger\.css/)) {
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



      it("Development Standards - The <title> must include 'WDD 230 - Web Frontend Development'", () => {
        cy.title().then((title) => {
          expect(title.toLowerCase()).to.match(
            /wdd 230 - web frontend development/
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

      it("Development Standards - The meta description content must include 'WDD 230 - Web Frontend Development'", () => {
        cy.document()
          .get("head meta[name=description]")
          .invoke("attr", "content")
          .then((content) => {
            expect(content.toLowerCase()).to.match(
              /wdd 230 - web frontend development/
            );
          });
      });

      it("Development Standards - The meta description content must include 'course assignment portal'", () => {
        cy.document()
          .get("head meta[name=description]")
          .invoke("attr", "content")
          .then((content) => {
            expect(content.toLowerCase()).to.match(/course assignment portal/);
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

      it("Development Standards - The <body> must have a layout using header element", () => {
        cy.get("header");
      });

      it("Development Standards - The <body> must have a layout using nav element", () => {
        cy.get("nav");
      });

      it("Development Standards - The <body> must have a layout using main element", () => {
        cy.get("main");
      });

      it("Development Standards - The <body> must have a layout using footer element", () => {
        cy.get("footer");
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

      it("Header Content - The <header> element must contain your optimized profile image img", () => {
        cy.get("header img");
      });

      it("Header Content - The <header> element must contain your name in an h1 tag", () => {
        cy.get("header h1");
      });

      it("Header Content - An html document can contain at most 1 h1 Element", () => {
        let h1_count = 0;
        cy.get("h1")
          .each(($match) => {
            h1_count++;
          })
          .then(() => {
            expect(h1_count).to.lte(1);
          });
      });

      it("Main Navigation Layout - Five <a> links are found in the nav tag", () => {
        let link_count = 0;
        cy.get("nav a")
          .each(($match) => {
            link_count++;
          })
          .then(() => {
            expect(link_count).to.gte(5);
          });
      });

      it("Main Navigation Layout - Nav must have a link named Home with an href attribute of #", () => {
        cy.get("nav a").contains("Home").should("have.attr", "href", "#");
      });

      it("Main Navigation Layout - Nav must have a link named Site Plan with an href attribute of chamber/siteplan.html", () => {
        cy.get("nav a")
          .contains("Site Plan")
          .should("have.attr", "href", "chamber/siteplan.html");
      });

      it("Main Navigation Layout - Nav must have a link named Chamber with an href attribute of chamber/", () => {
        cy.get("nav a")
          .contains("Chamber")
          .should("have.attr", "href", "chamber/");
      });

      it("Main Navigation Layout - Nav must have a link named BYU-Idaho with an href attribute of BYU-Idaho's home page", () => {
        cy.get("nav a")
          .contains("BYU-Idaho")
          .should("have.attr", "href")
          .and("contain", "byui.edu");
      });

      it("Main Navigation Layout - BYU-Idaho link must open in a new tab", () => {
        cy.get("nav a")
          .contains("BYU-Idaho")
          .should("have.attr", "target", "_blank");
      });

      it("Main Navigation Layout - Nav must have a link named Scripture with an href attribute of https://www.churchofjesuschrist.org/study/scriptures", () => {
        cy.get("nav a")
          .contains("Scripture")
          .should("have.attr", "href")
          .and(
            "contain",
            "https://www.churchofjesuschrist.org/study/scriptures"
          );
      });

      it("Main Navigation Layout - Scripture link must open in a new tab", () => {
        cy.get("nav a")
          .contains("Scripture")
          .should("have.attr", "target", "_blank");
      });

      it("Home Page Enhancement - The navigation must be layed out using CSS Flex.", () => {
        cy.get("nav").should("have.css", "display", "flex");
      });

      it("Main H2 - The <main> element must contain a h2 tag with the words WDD 230: Web Frontend Development", () => {
        cy.get("main h2").contains("WDD 230: Web Frontend Development");
      });

      it("Main Content - The main section contains two sections with the class attribute named card", () => {
        let link_count = 0;
        cy.get("main section.card")
          .each(($match) => {
            link_count++;
          })
          .then(() => {
            expect(link_count).to.gte(2);
          });
      });

      it("Main Content - An h3 tag containing Learning Activities as text", () => {
        cy.get("main section.card h3").contains("Learning Activities");
      });

      it("Main Content - An ul with list items li and anchors a for learning activities", () => {
        cy.get("main section.card ul li a");
      });

      it("Main Content - An h3 tag containing Information as text", () => {
        cy.get("main section.card h3").contains("Information");
      });

      it("Main Content - The <main> column cards must be layed out using CSS Grid.", () => {
        cy.get("main").should("have.css", "display", "grid");
      });

      it("Footer Content - The <footer> must have two paragraphs", () => {
        let link_count = 0;
        cy.get("footer p")
          .each(($match) => {
            link_count++;
          })
          .then(() => {
            expect(link_count).to.gte(2);
          });
      });

      it("Footer Content - The first paragraph contains the copyright symbol", () => {
        cy.get("footer p").contains("©");
      });

      it("Footer Content - The second paragraph must have an id of lastModified", () => {
        cy.get("footer p#lastModified");
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

      it("Naming Conventions - You must have a JS file named scripts/getdates.js", () => {
        let file_found = 0;
        cy.request(current_url)
          .its("body") // NB the response body, not the body of your page
          .then((content) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(content, "text/html");

            const scripts = doc.querySelectorAll("script"); // native query
            const srcs = [...scripts].map((script) =>
              script.getAttribute("src")
            );
            srcs.forEach((src) => {
              if (src.match(/getdates\.js/)) {
                file_found = 1;
              }
            });
          })
          .then(() => {
            expect(file_found).to.eq(1);
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
