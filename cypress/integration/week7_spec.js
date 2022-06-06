const urls = require('../fixtures/students.json');
const begin_html = require('../fixtures/begin.json');
const end_html = require('../fixtures/end.json');
let base_url = '';
let current_url = '';
let lesson = '7';
let student_string = '';
const sizes = [
    ['base', 'iphone-6'],
    ['medium', 'ipad-2'],
    ['large', [1440, 900]]
];
let files = ["index", "discover"]

describe(`Week ${lesson}`, () => {
    urls.forEach(url => {
        describe(`Current student: ${url}`, () => {
            files.forEach(file => {
                describe(`Current file: ${file}.html`, () => {
                    before(() => {
                        base_url = `https://${url}.github.io/wdd230/chamber/`;
                        current_url = `${base_url}${file}.html`;
                        cy.visit(current_url);
                    })

                    it('Contains header Element', () => {
                        cy.get('header');
                    })

                    it('Contains nav element in header Element', () => {
                        cy.get('header nav');
                    })

                    it('Header nav contains 4 local links', () => {
                        let link_count = 0;
                        cy.get('header nav a')
                            .each(($match) => {
                                cy.wrap($match)
                                    .invoke('attr', 'href')
                                    .then((href) => {
                                        if (!href.match(/https/)) {
                                            link_count++;
                                        }
                                    })
                            })
                            .then(() => {
                                expect(link_count).to.gte(4);
                            })
                    })

                    it('Header nav contains 2 external links', () => {
                        let link_count = 0;
                        cy.get('header nav a')
                            .each(($match) => {
                                cy.wrap($match)
                                    .invoke('attr', 'href')
                                    .then((href) => {
                                        if (href.match(/https/)) {
                                            link_count++;
                                        }
                                    })
                            })
                            .then(() => {
                                expect(link_count).to.gte(2);
                            })
                    })

                    it('Contains main Element', () => {
                        cy.get('main');
                    })

                    it('Contains footer Element', () => {
                        cy.get('footer');
                    })

                    it('Contains h1 Element', () => {
                        cy.get('h1');
                    })

                    it('Contains at most 1 h1 Element', () => {
                        let h1_count = 0;
                        cy.get('h1')
                            .each(($match) => {
                                h1_count++;
                            })
                            .then(() => {
                                expect(h1_count).to.lte(1);
                            })
                    })

                    it('ID only used once', () => {
                        let duplicate_array = [];
                        cy.get('[id]')
                            .each(($match) => {
                                cy.wrap($match)
                                    .invoke('attr', 'id')
                                    .then((id) => {
                                        duplicate_array.push(id);
                                        const unique = new Set(duplicate_array);
                                        expect(duplicate_array.length).to.eq(unique.size);
                                    })
                            });
                    })

                    it('Contains Correct Doctype', () => {
                        cy.document()
                            .then(doc => {
                                expect(doc.doctype !== undefined).to.eq(true)
                                expect(doc.doctype.name).to.eq('html')
                            });
                    })

                    it('Contains Correct Charset', () => {
                        cy.request(current_url)
                            .its('body') // NB the response body, not the body of your page
                            .then(content => {
                                expect(content.toLowerCase()).to.match(/meta[\s]+charset[\s]*=[\s]*"[\s]*utf-8[\s]*"/)
                            });
                    })

                    it('Contains Correct Viewport', () => {
                        cy.document()
                            .get('head meta[name=viewport]')
                            .invoke('attr', 'content')
                            .should('include', 'width=device-width, initial-scale=1');
                    })

                    it('Contains Correct Language', () => {
                        cy.document()
                            .get('html')
                            .invoke('attr', 'lang')
                            .should('contain', 'en');
                    })

                    it('Contains Title', () => {
                        cy.title()
                            .then((title) => {
                                expect(title).to.have.length.of.at.least(3)
                            });
                    })

                    it('Contains Correct Description', () => {
                        cy.document()
                            .get('head meta[name=description]')
                            .invoke('attr', 'content')
                            .then((content) => {
                                expect(content).to.have.length.of.at.least(3)
                                expect(content).to.have.length.of.at.most(150)
                            });
                    })

                    it('Contains Copyright Symbol', () => {
                        cy.contains('©');
                    })

                    it('Contains date in format day of week, day month year', () => {
                        const now = new Date();
                        const fulldateUK = new Intl.DateTimeFormat("en-UK", {
                            dateStyle: "full"
                        }).format(now);
                        cy.contains(fulldateUK);
                    })

                    it('Img have alt', () => {
                        cy.get('img')
                            .each(($match) => {
                                cy.wrap($match)
                                    .invoke('attr', 'alt')
                                    .then((alt) => {
                                        expect(alt).to.have.length.of.at.least(3)
                                    })
                            });
                    })

                    it('Img in images folder', () => {
                        cy.get('img')
                            .each(($match) => {
                                cy.wrap($match)
                                    .invoke('attr', 'src')
                                    .then((src) => {
                                        expect(src).to.match(/images\//)
                                    })
                            });
                    })

                    it('Img src is without spaces', () => {
                        cy.get('img')
                            .each(($match) => {
                                cy.wrap($match)
                                    .invoke('attr', 'src')
                                    .then((src) => {
                                        expect(src.split(" ").join("")).to.eq(src);
                                    })
                            });
                    })

                    it('Img src is lowercase', () => {
                        cy.get('img')
                            .each(($match) => {
                                cy.wrap($match)
                                    .invoke('attr', 'src')
                                    .then((src) => {
                                        expect(src.toLowerCase()).to.eq(src);
                                    })
                            });
                    })

                    it('Image wdd230-org.jpg is found', () => {
                        let file_found = 0;
                        cy.get('img')
                            .each(($match) => {
                                cy.wrap($match)
                                    .invoke('attr', 'src')
                                    .then((src) => {
                                        if (src.match(/images\/wdd230-org\.jpg/)) {
                                            file_found = 1;
                                        }
                                    })
                            })
                            .then(() => {
                                expect(file_found).to.eq(1);
                            });
                    })

                    it('Contains picture Element', () => {
                        cy.get('picture');
                    })

                    it('picture source has srcset', () => {
                        cy.get('picture source')
                            .each(($match) => {
                                cy.wrap($match)
                                    .invoke('attr', 'srcset')
                                    .then((srcset) => {
                                        expect(srcset).to.have.length.of.at.least(3)
                                    })
                            });
                    })

                    it('logo uses webp format', () => {
                        let file_found = 0;
                        cy.get('img')
                            .each(($match) => {
                                cy.wrap($match)
                                    .invoke('attr', 'src')
                                    .then((src) => {
                                        if (src.match(/.webp/)) {
                                            file_found = 1;
                                        }
                                    })
                            })
                            .then(() => {
                                expect(file_found).to.eq(1);
                            });
                    })

                    it('CSS in css folder', () => {
                        cy.get('link')
                            .each(($match) => {
                                cy.wrap($match)
                                    .invoke('attr', 'href')
                                    .then((href) => {
                                        if (!href.includes("../") &&
                                            !href.includes("googleapis") &&
                                            !href.includes("gstatic") &&
                                            !href.includes("http")) {
                                            expect(href).to.match(/css\//)
                                        }
                                    })
                            });
                    })

                    it('CSS normalize is first css file', () => {
                        cy.get('link').first()
                            .each(($match) => {
                                cy.wrap($match)
                                    .invoke('attr', 'href')
                                    .then((href) => {
                                        expect(href).to.match(/normalize.*\.css/);
                                    })
                            });
                    })

                    it('CSS includes base.css file', () => {
                        let file_found = 0;
                        cy.get('link')
                            .each(($match) => {
                                cy.wrap($match)
                                    .invoke('attr', 'href')
                                    .then((href) => {
                                        if (href.match(/base\.css/)) {
                                            file_found = 1;
                                        }
                                    })
                            })
                            .then(() => {
                                expect(file_found).to.eq(1);
                            });
                    })

                    it('CSS includes medium.css file', () => {
                        let file_found = 0;
                        cy.get('link')
                            .each(($match) => {
                                cy.wrap($match)
                                    .invoke('attr', 'href')
                                    .then((href) => {
                                        if (href.match(/medium\.css/)) {
                                            file_found = 1;
                                        }
                                    })
                            })
                            .then(() => {
                                expect(file_found).to.eq(1);
                            });
                    })

                    it('CSS includes large.css file', () => {
                        let file_found = 0;
                        cy.get('link')
                            .each(($match) => {
                                cy.wrap($match)
                                    .invoke('attr', 'href')
                                    .then((href) => {
                                        if (href.match(/large\.css/)) {
                                            file_found = 1;
                                        }
                                    })
                            })
                            .then(() => {
                                expect(file_found).to.eq(1);
                            });
                    })

                    it('CSS href is without spaces', () => {
                        cy.get('link')
                            .each(($match) => {
                                cy.wrap($match)
                                    .invoke('attr', 'href')
                                    .then((href) => {
                                        if (!href.includes("../") &&
                                            !href.includes("googleapis") &&
                                            !href.includes("gstatic") &&
                                            !href.includes("http")) {
                                            expect(href.split(" ").join("")).to.eq(href);
                                        }

                                    })
                            });
                    })

                    it('CSS href is lowercase', () => {
                        cy.get('link')
                            .each(($match) => {
                                cy.wrap($match)
                                    .invoke('attr', 'href')
                                    .then((href) => {
                                        if (!href.includes("../") &&
                                            !href.includes("googleapis") &&
                                            !href.includes("gstatic") &&
                                            !href.includes("http")) {
                                            expect(href.toLowerCase()).to.eq(href);
                                        }

                                    })
                            });
                    })

                    it('CSS file is not 404', () => {
                        cy.get('link')
                            .each(($match) => {
                                cy.wrap($match)
                                    .invoke('attr', 'href')
                                    .then((href) => {
                                        if (!href.includes("../") &&
                                            !href.includes("googleapis") &&
                                            !href.includes("gstatic") &&
                                            !href.includes("http")) {
                                            cy.request({
                                                url: base_url + href,
                                                followRedirect: false,
                                                failOnStatusCode: false,
                                            }).then((resp) => {
                                                expect(resp.status).to.eq(200)
                                                //expect(resp.redirectedToUrl).to.eq(undefined)
                                            })
                                            //cy.visit(base_url + href, { failOnStatusCode: false })
                                            //cy.get(".error-code").should("contain", "200")
                                            //cy.get(".error-text").should("contain", "Page not found")
                                        }
                                    })
                            });
                    })

                    it('Uses a font from googleapi', () => {
                        cy.get('link')
                            .each(($match) => {
                                cy.wrap($match)
                                    .invoke('attr', 'href')
                                    .then((href) => {
                                        if (!href.includes("../") &&
                                            !href.includes("css/") &&
                                            !href.includes("gstatic")) {
                                            expect(href).to.match(/googleapis/);
                                        }

                                    })
                            });
                    })

                    it('CSS is not inline', () => {
                        let style_count = 0;
                        cy.get('body')
                            .then($body => {
                                if ($body.find('[style]').length) {
                                    style_count = 1;
                                }
                            })
                            .then(() => {
                                expect(style_count).to.eq(0);
                            });
                    })

                    it('CSS is not embedded', () => {
                        let style_count = 0;
                        cy.get('head')
                            .then($head => {
                                if ($head.find('style').length) {
                                    style_count = 1;
                                }
                            })
                            .then(() => {
                                expect(style_count).to.eq(0);
                            });
                    })

                    it('JavaScript in js folder', () => {
                        cy.request(current_url)
                            .its('body') // NB the response body, not the body of your page
                            .then(content => {
                                const parser = new DOMParser();
                                const doc = parser.parseFromString(content, 'text/html')

                                const scripts = doc.querySelectorAll('script') // native query
                                const srcs = [...scripts].map(script => script.getAttribute('src'))
                                //expect(srcs.every(src => src.startsWith('js/'))).to.eq(true)
                                srcs.forEach(src => {
                                    expect(src).to.match(/^js\//)
                                })
                            });
                    })

                    it('JavaScript is in external files', () => {
                        cy.request(current_url)
                            .its('body') // NB the response body, not the body of your page
                            .then(content => {
                                const parser = new DOMParser();
                                const doc = parser.parseFromString(content, 'text/html')

                                const scripts = doc.querySelectorAll('script') // native query
                                const srcs = [...scripts].map(script => script.getAttribute('src'))
                                srcs.forEach(src => {
                                    expect(src).to.not.be.null
                                })
                            });
                    })

                    it('JavaScript is not in a <link>', () => {
                        cy.get('link')
                            .each(($match) => {
                                cy.wrap($match)
                                    .invoke('attr', 'href')
                                    .then((href) => {
                                        expect(href).to.not.match(/^js\//)
                                    })
                            });
                    })

                    it('JavaScript file is found', () => {
                        cy.request(current_url)
                            .its('body') // NB the response body, not the body of your page
                            .then(content => {
                                const parser = new DOMParser();
                                const doc = parser.parseFromString(content, 'text/html')

                                const scripts = doc.querySelectorAll('script') // native query
                                const srcs = [...scripts].map(script => script.getAttribute('src'))
                                srcs.forEach(src => {
                                    cy.request({
                                        url: base_url + src,
                                        followRedirect: false,
                                        failOnStatusCode: false,
                                    }).then((resp) => {
                                        expect(resp.status).to.eq(200)
                                        //expect(resp.redirectedToUrl).to.eq(undefined)
                                    })
                                })
                            });
                    })

                    it('JavaScript src is without spaces', () => {
                        cy.request(current_url)
                            .its('body') // NB the response body, not the body of your page
                            .then(content => {
                                const parser = new DOMParser();
                                const doc = parser.parseFromString(content, 'text/html')

                                const scripts = doc.querySelectorAll('script') // native query
                                const srcs = [...scripts].map(script => script.getAttribute('src'))
                                srcs.forEach(src => expect(src.split(" ").join("")).to.eq(src))
                            });
                    })

                    it('JavaScript src is lowercase', () => {
                        cy.request(current_url)
                            .its('body') // NB the response body, not the body of your page
                            .then(content => {
                                const parser = new DOMParser();
                                const doc = parser.parseFromString(content, 'text/html')

                                const scripts = doc.querySelectorAll('script') // native query
                                const srcs = [...scripts].map(script => script.getAttribute('src'))
                                srcs.forEach(src => expect(src.toLowerCase()).to.eq(src))
                            });
                    })

                    it('JS includes windchill.js file', () => {
                        let file_found = 0;
                        cy.request(current_url)
                            .its('body') // NB the response body, not the body of your page
                            .then(content => {
                                const parser = new DOMParser();
                                const doc = parser.parseFromString(content, 'text/html')

                                const scripts = doc.querySelectorAll('script') // native query
                                const srcs = [...scripts].map(script => script.getAttribute('src'))
                                srcs.forEach(src => {
                                    if (src.match(/js\/windchill.js/)) {
                                        file_found = 1;
                                    }
                                })
                            })
                            .then(() => {
                                expect(file_found).to.eq(1);
                            });
                    })

                    it('Does not use document.write', () => {
                        cy.request(current_url)
                            .its('body') // NB the response body, not the body of your page
                            .then(content => {
                                const parser = new DOMParser();
                                const doc = parser.parseFromString(content, 'text/html')

                                const scripts = doc.querySelectorAll('script') // native query
                                const srcs = [...scripts].map(script => script.getAttribute('src'))
                                srcs.forEach(src =>
                                    cy.request({
                                        url: base_url + src,
                                        failOnStatusCode: false
                                    })
                                    .its('body') // NB the response body, not the body of your page
                                    .then(content => {
                                        expect(content.toLowerCase()).to.not.match(/document.write/);
                                    })
                                )
                            });
                    })

                    it('No 3rd party code, such as jquery, bootstrap, etc. are allowed', () => {
                        cy.request(current_url)
                            .its('body') // NB the response body, not the body of your page
                            .then(content => {
                                expect(content.toLowerCase()).to.not.match(/jquery|bootstrap|w3.css/);
                            });
                    })
                })
            })
        })
    })
})

describe(`make screenshots`, () => {
    function createScreenshot(size, url, file, current_url) {
        let curr_name = size[0];
        let curr_size = size[1];

        if (Cypress._.isArray(curr_size)) {
            cy.viewport(curr_size[0], curr_size[1]);
        } else {
            cy.viewport(curr_size);
        }

        cy.visit(current_url);
        cy.screenshot(`${url}_${file}_${curr_name}`, {
            overwrite: true
        });
    }

    urls.forEach(url => {
        it(`${url} screenshots`, () => {
            files.forEach(file => {
                base_url = `https://${url}.github.io/wdd230/chamber/`;
                current_url = `${base_url}${file}.html`;

                for (let i = 0; i < sizes.length; i++) {
                    createScreenshot(sizes[i], url, file, current_url);
                }
            })
        })
    })
})


describe(`make html file`, () => {
    let screenshot_url, curr_name;
    urls.forEach(url => {
        files.forEach(file => {
            base_url = `https://${url}.github.io/wdd230/chamber/`;
            current_url = `${base_url}${file}.html`;
            student_string += `students.push({name:'${url}',link:'${current_url}'});`;

            for (let i = 0; i < sizes.length; i++) {
                curr_name = sizes[i][0];

                screenshot_url = `cypress/screenshots/week${lesson}_spec.js/${url}_${file}_${curr_name}.png`

                student_string += `students.push({name:'${url}_${file}_${curr_name}',link:'${screenshot_url}'});`;
            }
        })
    })

    it(`write html file`, () => {
        cy.writeFile("week" + lesson + ".html", begin_html + student_string + end_html);
    })
})