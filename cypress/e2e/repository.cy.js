const urls = require('../fixtures/students.json');
const begin_html = require('../fixtures/begin.json');
const end_html = require('../fixtures/end.json');
let base_url = '';
let current_url = '';
let lesson = '';

describe(`Week ${lesson}`, () => { 
    after(() => {
        let student_string = '';
        urls.forEach(url => {
            base_url = `https://github.com/${url}/wdd230`;
            current_url = `${base_url}`;
            student_string += `students.push({name:'${url}',link:'${current_url}'});`;
        })
        cy.writeFile("repository.html", begin_html + student_string + end_html);
    })
    urls.forEach(url => {
    //Cypress.env('urls').forEach(url => {
        describe(`Current student: ${url}`, () => {
            beforeEach(() => {
                base_url = `https://github.com/${url}/wdd230`;
                current_url = `${base_url}`;
                cy.visit(current_url) ;
            })

            it('Contains header Element', () => {
                cy.get('header');
            })
        })
    })
})