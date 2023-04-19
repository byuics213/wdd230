const urls = require('../fixtures/students.json');
const begin_html = require('../fixtures/begin.json');
const end_html = require('../fixtures/end.json');
let base_url = '';
let current_url = '';
let lesson = '2';

describe(`Week ${lesson}`, () => { 
    after(() => {
        let student_string = '';
        urls.forEach(url => {
            base_url = `https://${url}.github.io/wdd230/lesson${lesson}/`;
            current_url = `${base_url}design-principles.html`;
            student_string += `students.push({name:'${url}',link:'${current_url}'});`;
        })
        cy.writeFile("week"+lesson+".html", begin_html + student_string + end_html);
    })
    urls.forEach(url => {
    //Cypress.env('urls').forEach(url => {
        describe(`Current student: ${url}`, () => {
            before(() => {
                base_url = `https://${url}.github.io/wdd230/lesson${lesson}/`;
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
                cy.request(current_url)
                .its('body')          // NB the response body, not the body of your page
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
                        && !href.includes("gstatic")
                        && !href.includes("http")){
                            expect(href).to.match(/styles\//)
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

            it('CSS href is without spaces', () => {
                cy.get('link')
                .each(($match) => {
                    cy.wrap($match)
                    .invoke('attr', 'href')
                    .then((href) => {
                        if(!href.includes("../") 
                        && !href.includes("googleapis")
                        && !href.includes("gstatic")
                        && !href.includes("http")){
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
                        && !href.includes("gstatic")
                        && !href.includes("http")){
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
                        if(!href.includes("../") 
                        && !href.includes("googleapis")
                        && !href.includes("gstatic")
                        && !href.includes("http")){
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
                        if(!href.includes("../") 
                        && !href.includes("css/")
                        && !href.includes("gstatic")){
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
                .its('body')          // NB the response body, not the body of your page
                .then(content => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(content, 'text/html')
        
                    const scripts = doc.querySelectorAll('script')    // native query
                    const srcs = [...scripts].map(script => script.getAttribute('src'))
                    //expect(srcs.every(src => src.startsWith('js/'))).to.eq(true)
                    srcs.forEach(src => {
                        expect(src).to.match(/^scripts\//)
                    })
                });
            })

            it('JavaScript is in external files', () => {
                cy.request(current_url)
                .its('body')          // NB the response body, not the body of your page
                .then(content => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(content, 'text/html')
        
                    const scripts = doc.querySelectorAll('script')    // native query
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
                .its('body')          // NB the response body, not the body of your page
                .then(content => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(content, 'text/html')
        
                    const scripts = doc.querySelectorAll('script')    // native query
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
                .its('body')          // NB the response body, not the body of your page
                .then(content => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(content, 'text/html')
        
                    const scripts = doc.querySelectorAll('script')    // native query
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
        
                    const scripts = doc.querySelectorAll('script')    // native query
                    const srcs = [...scripts].map(script => script.getAttribute('src'))
                    srcs.forEach(src => expect(src.toLowerCase()).to.eq(src))
                });
            })

            it('Contains document.write', () => {
                cy.request(current_url)
                .its('body')          // NB the response body, not the body of your page
                .then(content => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(content, 'text/html')
        
                    const scripts = doc.querySelectorAll('script')    // native query
                    const srcs = [...scripts].map(script => script.getAttribute('src'))
                    srcs.forEach(src => 
                        cy.request({
                            url: base_url + src
                            , failOnStatusCode: false})
                        .its('body')          // NB the response body, not the body of your page
                        .then(content => {
                            expect(content.toLowerCase()).to.not.match(/document.write/);
                        })
                    )
                });
            })

            it('No 3rd party code, such as jquery, bootstrap, etc. are allowed', () => {
                cy.request(current_url)
                .its('body')          // NB the response body, not the body of your page
                .then(content => {
                    expect(content.toLowerCase()).to.not.match(/jquery|select2|bootstrap|w3.css|elfsight|moment/);
                });
            })
        })
    })
})