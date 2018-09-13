$(function () {
    const apiURL = "http://localhost:50956/api/";

    ajaxGetAllBooks();

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
            ajaxAddNewBook(newBook);
        }

    });

    function ajaxGetAllBooks() {
        $.ajax({
            url: apiURL + "books/"
        }).done(function (resp) {
            functionRenderAllBooks(resp);
        }).fail(function (err) {

        })
    };

    function ajaxAddNewBook(newBook) {
        $.ajax({
            url: apiURL + "books",
            type: "POST",
            dataType: "json",
            data: newBook
        }).done(function () {
            ajaxGetAllBooks();
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
});
