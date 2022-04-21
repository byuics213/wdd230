const urls = require('../fixtures/students.json');
const begin_html = require('../fixtures/begin.json');
const end_html = require('../fixtures/end.json');
let base_url = '';
let current_url = '';

describe(`Week 1`, () => { 
    after(() => {
        let student_string = '';
        urls.forEach(url => {
            base_url = `https://${url}.github.io/wdd230/lesson2/`;
            current_url = `${base_url}design-principles.html`;
            student_string += `students.push({name:'${url}',link:'${current_url}'});`;
        })
        cy.writeFile("week1.html", begin_html + student_string + end_html);
    })
    urls.forEach(url => {
    //Cypress.env('urls').forEach(url => {
        describe(`Current student: ${url}`, () => {
            before(() => {
                base_url = `https://${url}.github.io/wdd230/lesson2/`;
                current_url = `${base_url}design-principles.html`;
                cy.visit(current_url) ;
            })

            it('Contains header Element', () => {
                cy.get('header');
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
        
            it('Header Element uses Flex or Grid', () => {
                cy.get('header')
                .invoke('css', 'display')
                .then((display) => {
                    expect(display).to.be.oneOf(['flex','grid'])
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
                //this doesn't work. It always says the charset is utf-8, no matter what I set it to
                //cy.document().its('charset').should('eq', 'UTF-8');

                cy.request(current_url)
                .its('body')          // NB the response body, not the body of your page
                .then(content => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(content, 'text/html');
        
                    const meta = doc.querySelectorAll('meta[charset=utf-8]');
                    expect(meta.length).to.eq(1);
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

            it('CSS in css folder', () => {
                cy.get('link')
                .each(($match) => {
                    cy.wrap($match)
                    .invoke('attr', 'href')
                    .then((href) => {
                        if(!href.includes("../") 
                        && !href.includes("googleapis")
                        && !href.includes("gstatic")){
                            expect(href).to.match(/css\//)
                        }
                    })
                });
            })

            it('CSS href is without spaces', () => {
                cy.get('link')
                .each(($match) => {
                    cy.wrap($match)
                    .invoke('attr', 'href')
                    .then((href) => {
                        if(!href.includes("../") 
                        && !href.includes("googleapis")
                        && !href.includes("gstatic")){
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
                        if(!href.includes("../") 
                        && !href.includes("googleapis")
                        && !href.includes("gstatic")){
                            expect(href.toLowerCase()).to.eq(href);
                        }
                        
                    })
                });
            })
        
            it('JavaScript in js folder', () => {
                cy.request(current_url)
                .its('body')          // NB the response body, not the body of your page
                .then(content => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(content, 'text/html')
        
                    const scripts = doc.querySelectorAll('head script')    // native query
                    const srcs = [...scripts].map(script => script.getAttribute('src'))
                    //expect(srcs.every(src => src.startsWith('js/'))).to.eq(true)
                    srcs.forEach(src => expect(src).to.match(/^js\//))
                });
            })

            it('JavaScript src is without spaces', () => {
                cy.request(current_url)
                .its('body')          // NB the response body, not the body of your page
                .then(content => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(content, 'text/html')
        
                    const scripts = doc.querySelectorAll('head script')    // native query
                    const srcs = [...scripts].map(script => script.getAttribute('src'))
                    srcs.forEach(src => expect(src.split(" ").join("")).to.eq(src))
                });
            })

            it('JavaScript src is lowercase', () => {
                cy.request(current_url)
                .its('body')          // NB the response body, not the body of your page
                .then(content => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(content, 'text/html')
        
                    const scripts = doc.querySelectorAll('head script')    // native query
                    const srcs = [...scripts].map(script => script.getAttribute('src'))
                    srcs.forEach(src => expect(src.toLowerCase()).to.eq(src))
                });
            })

            it("HTML validation", () => {
                cy.request({
                    url: `https://validator.nu/?doc=${current_url}&out=json`
                }).then((resp) => {
                    cy.log(resp.body.messages);
                    expect(resp.body.messages.length).equals(0);
                })
            })

            it("CSS validation", () => {
                cy.request({
                  url: `http://jigsaw.w3.org/css-validator/validator?medium=screen&output=text&uri=${encodeURIComponent(current_url)}`
                }).then((resp) => {
                    expect(resp.body).contains('No Error Found')
                })
            })

            it('CSS external check', () => {
                cy.get('link')
                .each(($match) => {
                    cy.wrap($match)
                    .invoke('attr', 'href')
                    .then((href) => {
                        if(!href.includes("../") 
                        && !href.includes("googleapis")
                        && !href.includes("gstatic")){
                            let css_url = `${base_url}${href}`;
                            cy.request({
                                url: `http://jigsaw.w3.org/css-validator/validator?medium=screen&output=text&uri=${encodeURIComponent(css_url)}`
                            }).then((resp) => {
                                expect(resp.body).contains('No Error Found')
                            })
                        }
                    })
                });
            })

        })
    })
})