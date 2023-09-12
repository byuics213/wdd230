const urls = require('../fixtures/students.json');
const begin_html = require('../fixtures/begin.json');
const end_html = require('../fixtures/end.json');
let base_url = '';
let current_url = '';
let lesson = '8';
let student_string = '';
const sizes = [
    ['base', 'iphone-6'],
    ['medium', 'ipad-2'],
    ['large', [1440, 900]]
];

describe(`Week ${lesson} Table Build`, () => {
    urls.forEach(url => {
        describe(`Current student: ${url}`, () => {
            beforeEach(() => {
                base_url = `https://${url}.github.io/wdd230/lesson08/`;
                current_url = `${base_url}tablebuild.html`;
                cy.visit(current_url);
            })

            it('Contains table Element', () => {
                cy.get('table');
            })

            it('Contains thead Element', () => {
                cy.get('thead');
            })

            it('Contains tbody Element', () => {
                cy.get('tbody');
            })
        })
    })
})

describe(`make screenshots`, () => {
    function createScreenshot(size, url, current_url) {
        let curr_name = size[0];
        let curr_size = size[1];

        if (Cypress._.isArray(curr_size)) {
            cy.viewport(curr_size[0], curr_size[1]);
        } else {
            cy.viewport(curr_size);
        }

        cy.visit(current_url);
        cy.screenshot(`${url}_${curr_name}`, {
            overwrite: true
        });
    }

    urls.forEach(url => {
        it(`${url} screenshots`, () => {
            base_url = `https://${url}.github.io/wdd230/lesson08/`;
            current_url = `${base_url}tablebuild.html`;

            for (let i = 0; i < sizes.length; i++) {
                createScreenshot(sizes[i], url, current_url);
            }
        })
    })
})


describe(`make html file`, () => {
    let screenshot_url, curr_name;
    urls.forEach(url => {
        base_url = `https://${url}.github.io/wdd230/lesson08/`;
        current_url = `${base_url}tablebuild.html`;
        student_string += `students.push({name:'${url}',link:'${current_url}'});`;

        for (let i = 0; i < sizes.length; i++) {
            curr_name = sizes[i][0];

            screenshot_url = `cypress/screenshots/week${lesson}_tablebuild_spec.js/${url}_${curr_name}.png`

            student_string += `students.push({name:'${url}_${curr_name}',link:'${screenshot_url}'});`;
        }
    })

    it(`write html file`, () => {
        cy.writeFile("week" + lesson + "_tablebuild.html", begin_html + student_string + end_html);
    })
})