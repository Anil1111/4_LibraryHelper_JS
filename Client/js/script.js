$(function () {
    const apiURL = "http://localhost:50956/api/";

    GetAllBooks();

    var addButton = $("#form-add-button");

    addButton.on("click", function (event) {
        event.preventDefault();

        var bookTitle = $("#form-title").val();
        var bookAuthor = $("#form-author").val();

        var newBook = {
            Title: bookTitle,
            Author: bookAuthor
        }

        if ($(this).text() == "Dodaj") {
            AddNewBook(newBook);
        }

    });

    function GetAllBooks() {
        $.ajax({
            url: apiURL + "books/"
        }).done(function (books) {
            functionRenderAllBooks(books);
        }).fail(function (err) {
        })
    };

    function AddNewBook(newBook) {
        $.ajax({
            url: apiURL + "books",
            type: "POST",
            dataType: "json",
            data: newBook
        }).done(function () {
            GetAllBooks();
        }).fail(function (err) {
        })
    };

    function functionRenderAllBooks(books) {
        var booksTable = $("#booksTable").find("tbody");

        booksTable.html("");

        for (var i = 0; i < books.length; i++) {
            var newRow = $("<tr data-book-id=" + books[i].ID + "></tr>");
            var titleCol = $("<td>").text(books[i].Title);
            titleCol.appendTo(newRow);
            var authorCol = $("<td>").text(books[i].Author);
            authorCol.appendTo(newRow);

            var buttons = $(`        
                    <td>
                        <div class="button-group">
                            <button class="btn btn-primary btn-sm editBook">Edytuj</button>
                            <button class="btn btn-danger btn-sm deleteBook">Usuń</button>
                            <button class="btn btn-info btn-sm lendBook">Wypożycz</button>
                        </div>
                    </td>)`);

            newRow.append(buttons);
            booksTable.append(newRow);
        }
    }


    $('#booksTable').on("click", "button.deleteBook", function () {
        event.preventDefault();
        var bookID = $(this).closest("tr[data-book-id]").attr("data-book-id");
        RemoveBook(bookID);
    });

    function RemoveBook(bookID) {
        $.ajax({
            url: apiURL + "books/" + bookID,
            type: "DELETE",
        }).done(function () {
            GetAllBooks();
        }).fail(function (err) {
        });
    };

    $('#booksTable').on("click", "button.editBook", function () {

        var bookID = $(this).closest("tr[data-book-id]").attr("data-book-id");
        var GlobalbookID = $("#you-will-never-find-me");
        GlobalbookID.val(bookID);
        console.log("kliknieto edit ksiazki o id " + bookID);
        event.preventDefault();

        addButton.html('<i class="fa fa-plus mr-2"></i>Edytuj');

        GetBook(bookID);

    });

    function GetBook(bookID) {
        $.ajax({
            url: apiURL + "books/" + bookID
        }).done(function (book) {
            ShowBook(book);
        }).fail(function (err) {
        });
    }

    function ShowBook(book) {

        var bookTitle = $("#form-title");
        var bookAuthor = $("#form-author");

        bookTitle.val(book.Title);
        bookAuthor.val(book.Author);
    }

    function EditBook(bookID, currentBook) {
        $.ajax({
            url: apiURL + "books/" + bookID,
            type: "PUT",
            data: currentBook
        }).done(function () {
            GetAllBooks();
            ResetBookInputs();
        }).fail(function (err) {
        });
    }

    var editButton = $("#form-add-button");

    editButton.on("click", function (event) {
        event.preventDefault();

        var bookTitle = $("#form-title");
        var bookAuthor = $("#form-author");

        bookTitle.val();
        bookAuthor.val();

        var currentBook = {
            Title: bookTitle.val(),
            Author: bookAuthor.val()
        }


        if ($(this).text() == "Edytuj") {

            var bookID = $("#you-will-never-find-me").eq(0).val();

            EditBook(bookID, currentBook);

            addButton.html('<i class="fa fa-plus mr-2"></i>Dodaj');
        }
    });

    function ResetBookInputs(){

        var bookTitle = $("#form-title");
        var bookAuthor = $("#form-author");

        bookTitle.val(" ");
        bookAuthor.val(" ");
    };


});
