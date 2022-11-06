let myLibrary = [];
var currentBookIndex = 0;

var bookList = document.getElementById('bookList');


let book1 = new Book(
    'JK Rowling',
    'Lord of the Rings',
    '259',
    false
)

function Book(author, title, pages, read) {
    // the constructor...
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}
// Book.prototype.displayBook = function () {
//     console.log(this.author, this.title, this.pages, this.read)
// }

function displayBook() {
    // console.log('add book')
    let lastBookIndex = myLibrary.length - 1;
    let { author, title, pages, read } = myLibrary[lastBookIndex];
    let newBookList = document.createElement('tr');
    newBookList.innerHTML = `
            <td>${author}</td>
            <td>${title}</td>
            <td>${pages}</td>
            <td>${read}</td>
            <td>
                <button type="button" style='font-size: large;' class="uil uil-trash" id="removeBook"></button>
            </td>
            <td>
                <label class="switch">
                    <input type="checkbox" id="switchToggle" data-switch='${currentBookIndex}' value="${read ? true : false}">
                    <span class="slider"></span>
                </label>
            </td>
            `
    //     <div class="switchWrapper">
    //     <input class="switch" id="switch" type="checkbox" data-switch='${currentBookIndex}' />
    //     <label for="switch">Toggle</label>
    // </div>
    newBookList.setAttribute('data-index', currentBookIndex)
    bookList.appendChild(newBookList);
    // console.log(myLibrary[lastBookIndex])

}

function addBookToLibrary(newBook) {
    myLibrary.push(newBook);
    // console.log(myLibrary)
    displayBook();
    currentBookIndex++;
    removeBook();
    toggleRead();
    console.log('called after add book')
}

let author = 'ryan';
let title = 'js';
let pages = '100';
let read = true;
const newBook = new Book(author, title, pages, read);
addBookToLibrary(newBook);

function toggleModal() {
    const bodyClassList = document.body.classList;
    if (bodyClassList.contains("open")) {
        bodyClassList.remove("open");
        bodyClassList.add("closed");
    } else {
        bodyClassList.remove("closed");
        bodyClassList.add("open");
    }
}

//! not using this method because we need to reset form values
function submitForm(e) {
    e.preventDefault();
    let err = false;
    // 1. Check if input elements are empty
    let empty = false;
    // let input = e.target.form;
    let input = e.target;
    console.log(e)
    Object.values(input).forEach((item) => {
        // console.log(item.value);
        if (item.value === '' || item.value === undefined) {
            empty = true;
            err = true;
        }
    })
    if (empty) displayFormError('empty');
    // 2. Value of author should not have any number
    if (containsNumbers(input[0].value)) {
        displayFormError('author');
        err = true;
    }
    // 3. Length of title should not exceed 100 characters
    if (input[1].value.length > 100) {
        displayFormError('title');
        err = true;
    }
    // 4. Length of pages should not exceed 10000
    var numPages = parseInt(input[2].value.length);
    if (numPages > 10000) {
        displayFormError('pages');
        err = true;
    }
    // if no error then add book to library
    if (!err) {
        let [author, title, pages, read] = input;
        // console.log(author.value)
        const newBook = new Book(author.value, title.value, pages.value, read.checked);
        addBookToLibrary(newBook);
    }
    // after adding book, display it
    // displayBook();

    // clear input fields
    // length - 2 is to exclude the second last and last input field which are the checkbox and submit btn. If we clear the value, then there will be bug for checkbox and the text 'submit' on the submit btn will be gone as well
    // instead of using forEach we have to resort to for loop
    e.reset(); //! -> error
    // for (let i = 0; i < input.length - 2; i++) {
    //     input[i].value = '';
    // }
    // input[3].checked = false;
}

function displayFormError(err) {
    let bookForm = document.getElementById('bookForm');
    // we are using object literal, an alternative to using if else or switch case statements
    var printErr = {
        'empty': () => {
            let errMsg1 = 'One or more input fields are empty!';
            configureErrMsg(errMsg1);
        },
        'author': () => {
            let errMsg2 = 'Numbers are not allowed on Author\'s name!';
            configureErrMsg(errMsg2);
        },
        'title': () => {
            let errMsg3 = 'Titles should not exceed 100 characters';
            configureErrMsg(errMsg3);
        },
        'pages': () => {
            let errMsg4 = 'Pages should not exceed 10000';
            configureErrMsg(errMsg4);
        }
    }
    // call the Object literal’s function
    printErr[err]();

    function configureErrMsg(msg) {
        let bookForm = document.getElementById('bookForm');
        let errMsg = document.createElement('div');
        errMsg.innerHTML = msg;
        errMsg.classList.add('error');
        bookForm.insertBefore(errMsg, bookForm.children[4]);
    }
}

function containsNumbers(str) {
    return /\d/.test(str);
}

//! not using this method because we need to reset form values
// let submit = document.getElementById('submitBtn');
// submit.addEventListener('click', submitForm);

var form = document.getElementById('bookForm');
form.addEventListener('submit', function handleSubmit(event) {
    event.preventDefault();
    let err = false;
    // 1. Check if input elements are empty
    let empty = false;
    let input = event.target;
    // console.log(event)
    Object.values(input).forEach((item) => {
        // console.log(item.value);
        if (item.value === '' || item.value === undefined) {
            empty = true;
            err = true;
        }
    })
    if (empty) displayFormError('empty');
    // 2. Value of author should not have any number
    if (containsNumbers(input[0].value)) {
        displayFormError('author');
        err = true;
    }
    // 3. Length of title should not exceed 100 characters
    if (input[1].value.length > 100) {
        displayFormError('title');
        err = true;
    }
    // 4. Length of pages should not exceed 10000
    var numPages = parseInt(input[2].value);
    if (numPages > 10000) {
        displayFormError('pages');
        err = true;
    }
    // if no error then add book to library
    if (!err) {
        // remove any exisiting error messages
        let err = document.querySelectorAll('.error');
        Object.values(err).forEach((el) => {
            el.remove();
        })
        let [author, title, pages, read] = input;
        const newBook = new Book(author.value, title.value, pages.value, read.checked);
        addBookToLibrary(newBook);
    }

    // reset form
    form.reset();
});

function removeBook() {
    const deleteBook = document.querySelectorAll('#removeBook');
    deleteBook.forEach((element) => {
        element.addEventListener('click', (e) => {
            // get book record data index 
            let bookIndex = element.parentElement.parentElement.getAttribute('data-index');
            // delete item from myLibrary
            if (bookIndex > -1) {
                // only splice array when item is found
                // 2nd parameter means remove one item only
                myLibrary.splice(bookIndex, 1);
            }
            // remove element from table
            element.parentElement.parentElement.remove();
            // console.log(myLibrary)
            // reset value of currentBookIndex
            currentBookIndex = 0;
        })
    })


}
// removeBook();

function toggleRead() {
    const toggleSwitch = document.querySelectorAll('#switchToggle');
    // console.log(toggleSwitch[1])
    toggleSwitch.forEach((el) => {
        console.log(el.getAttribute('value'))
        console.log(el.value)

        // var readStatus = el.parentElement.parentElement.parentElement.children[3].innerText;
        var readStatus = el.value;
        if (readStatus === 'true') {
            console.log('read status is true')
            // add class / rule
            el.classList.add('toggle');
            el.checked = true;
        } else {
            // remove class / rule
            el.classList.remove('toggle');
            el.checked = false;
        }
        el.addEventListener('click', (e) => {
            let isRead = e.target.checked;
            console.log(isRead)
            if (isRead) {
                // add class / rule
                el.classList.add('toggle');
                // change read status to true
                el.setAttribute('value', true);
                el.checked = true;
                // change read status on mylibrary
                el.parentElement.parentElement.parentElement.children[3].innerText = true;
            } else {
                // remove class / rule
                el.classList.remove('toggle');
                // change read status to false
                el.setAttribute('value', false);
                el.checked = false;
                // change read status on mylibrary
                el.parentElement.parentElement.parentElement.children[3].innerText = false;
            }
        })
    })
}

// window.onclick = (e) => {
//     console.log(e)
// }