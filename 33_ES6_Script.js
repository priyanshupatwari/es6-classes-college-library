console.log('This is ES6 version of Project 2');
class Book {
    constructor(name, author, type) { //pass arguments when instantiating object
        this.name = name;
        this.author = author;
        this.type = type;
    }
}

class Display {
    add(book) { //Add the input data to TABLE
        console.log("Adding to UI");
        let tableBody = document.getElementById('tableBody');
        let uiString = `<tr>
                            <td>${book.name}</td>
                            <td>${book.author}</td>
                            <td>${book.type}</td>
                        </tr>`;
        tableBody.innerHTML += uiString;
    }

    clear() { //clears the form input field to blank
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }

    validate(book) { //Validate right lenght of input strings
        if (book.name.length < 2 || book.author.length < 2) {
            return false
        }
        else {
            return true;
        }
    }

    show(type, displayMessage) { //Show Success OR Error Msg
        let message = document.getElementById('message');
        let boldText = "";
        let bgColor = "";
        let symbol = "";
        if (type === 'success') {
            boldText = 'Success';
            bgColor = 'primary';
            symbol = '#check-circle-fill';
        }
        else {
            boldText = 'Error!';
            bgColor = 'danger';
            symbol = '#exclamation-triangle-fill';
        }
        message.innerHTML = `<div class="sticky alert bg-${bgColor} bg-gradient p-3 mb-2 text-white shadow d-flex align-items-center" role="alert">
                                <svg class="bi flex-shrink-0 me-2" width="24" height="24">
                                    <use xlink:href="${symbol}" />
                                </svg>
                                <div>
                                <strong>${boldText}:</strong> ${displayMessage}
                                </div>
                           </div>`;


        setTimeout(function () { //Erase msg; `callBack-Async-function` after 5 sec 
            message.innerHTML = ''
        }, 5000);

    }
}

// ADD SUBMIT EVENT LISTENER TO LIBRARY-FORM
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    console.log('You have submitted library form');
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    //For Radio option button************-----******--------*******
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');
    let type;
    if (fiction.checked) { //Assign to `type` the checked value
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (cooking.checked) {
        type = cooking.value;
    }
    //***********************************-----******--------*******
    let book = new Book(name, author, type); //Instantiate object
    // console.log(book);
    let display = new Display(); //Instantiate object

    if (display.validate(book)) { //Validate right lenght of input strings

        display.add(book); //Add the input data to TABLE
        display.clear(); //clears the form input field to blank
        display.show('success', 'Your book has been successfully added') //Show Success Msg
    }
    else {
        // Show error to the user
        display.show('danger', 'Sorry please add a valid book'); //Show Error Msg
    }

    e.preventDefault(); //prevents default behaviour like autoReload
}