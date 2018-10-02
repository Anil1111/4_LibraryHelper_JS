$(function () {
    const apiURL = "http://localhost:50956/api/";

    //////////////////// BOOK

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
            RenderAllBooks(books);
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

    function RenderAllBooks(books) {
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

    function ResetBookInputs() {

        var bookTitle = $("#form-title");
        var bookAuthor = $("#form-author");

        bookTitle.val(" ");
        bookAuthor.val(" ");
    };


    /////////////////////////////////// READERS

    GetAllReaders();

    var addReaderButton = $("#reader-form-add-button");

    addReaderButton.on("click", function (event) {
        event.preventDefault();

        var readerName = $("#reader-form-name").val();
        var readerAge = $("#reader-form-age").val();

        var newReader = {
            Name: readerName,
            Age: readerAge
        }

        if ($(this).text() == "Dodaj") {
            AddNewReader(newReader);
        }

    });

    function GetAllReaders() {
        $.ajax({
            url: apiURL + "readers"
        }).done(function (readers) {
            RenderAllReaders(readers);
        }).fail(function (err) {
        })
    };

    function AddNewReader(newReader) {
        $.ajax({
            url: apiURL + "readers",
            type: "POST",
            data: newReader
        }).done(function () {
            GetAllReaders();
        }).fail(function (err) {
        })
    };

    function RenderAllReaders(readers) {

        var readersTable = $("#readersTable").find("tbody");

        readersTable.html("");

        for (var i = 0; i < readers.length; i++) {

            var newRow = $("<tr data-reader-id=" + readers[i].ID + "></tr>");
            var nameCol = $("<td>").text(readers[i].Name);

            nameCol.appendTo(newRow);

            var ageCol = $("<td>").text(readers[i].Age);

            ageCol.appendTo(newRow);

            var buttons = $(`        
                <td>
                    <div class="button-group">
                        <button class="btn btn-primary btn-sm editReader">Edytuj</button>
                        <button class="btn btn-danger btn-sm deleteReader">Usuń</button>
                        <button class="btn btn-info btn-sm lendReader">Wypożycz</button>
                    </div>
                </td>)`);

            newRow.append(buttons);
            readersTable.append(newRow);
        }
    }


    $('#readersTable').on("click", "button.deleteReader", function () {
        event.preventDefault();
        var readerID = $(this).closest("tr[data-reader-id]").attr("data-reader-id");
        RemoveReader(readerID);
    });

    function RemoveReader(readerID) {
        $.ajax({
            url: apiURL + "readers/" + readerID,
            type: "DELETE",
        }).done(function () {
            GetAllReaders();
        }).fail(function (err) {
        });
    };

    $('#readersTable').on("click", "button.editReader", function () {

        var readerID = $(this).closest("tr[data-reader-id]").attr("data-reader-id");
        var GlobalReaderID = $("#reader-you-will-never-find-me");
        GlobalReaderID.val(readerID);
        console.log("kliknieto edit czytelnika o id " + readerID);
        event.preventDefault();

        addReaderButton.html('<i class="fa fa-plus mr-2"></i>Edytuj');

        GetReader(readerID);

    });

    function GetReader(readerID) {
        $.ajax({
            url: apiURL + "readers/" + readerID
        }).done(function (reader) {
            ShowReader(reader);
        }).fail(function (err) {
        });
    }

    function ShowReader(reader) {

        var readerName = $("#reader-form-name");
        var readerAge = $("#reader-form-age");

        readerName.val(reader.Name);
        readerAge.val(reader.Age);
    }

    function EditReader(readerID, currentReader) {
        $.ajax({
            url: apiURL + "readers/" + readerID,
            type: "PUT",
            data: currentReader
        }).done(function () {
            GetAllReaders();
            ResetReaderInputs();
        }).fail(function (err) {
        });
    }

    var editReaderButton = $("#reader-form-add-button");

    editReaderButton.on("click", function (event) {
        event.preventDefault();

        var readerName = $("#reader-form-name");
        var readerAge = $("#reader-form-age");

        readerName.val();
        readerAge.val();

        var currentReader = {
            Name: readerName.val(),
            Age: readerAge.val()
        }


        if ($(this).text() == "Edytuj") {

            var readerID = $("#reader-you-will-never-find-me").eq(0).val();

            EditReader(readerID, currentReader);

            editReaderButton.html('<i class="fa fa-plus mr-2"></i>Dodaj');
        }
    });

    function ResetReaderInputs() {

        var readerName = $("#reader-form-name");
        var readerAge = $("#reader-form-age");

        readerName.val(" ");
        readerAge.val(" ");
    };


    ///////////////////////////////// LENDS

    GetAllLends();

    $('#booksTable').on("click", "button.lendBook", function () {

        var bookID = $(this).closest("tr[data-book-id]").attr("data-book-id");

        $('#readersTable > tbody > tr > td > div > button.btn.btn-info.btn-sm.lendReader').removeClass('btn-info');
        $('#readersTable > tbody > tr > td > div > button.btn.btn-sm.lendReader').addClass("btn-success");

        $('#readersTable').on("click", "button.lendReader", function () {

            var readerID = $(this).closest("tr[data-reader-id]").attr("data-reader-id");
            var lendDate = getDate();

            console.log("kliknieto button wypozycz uzytkownika o id " + readerID);
            console.log("kliknieto button wypozycz ksiazki o id " + bookID);
            console.log("Data " + lendDate);

            $('#readersTable > tbody > tr > td > div > button.btn.btn-info.btn-sm.lendReader').removeClass('btn-success');
            $('#readersTable > tbody > tr > td > div > button.btn.btn-sm.lendReader').addClass('btn-info');

            var newLend = {
                BookID: bookID,
                ReaderID: readerID,
                LendDate: lendDate
            }

            console.log(newLend);

            AddNewLend(newLend);

            event.preventDefault();
        });
    });

    function getDate() {

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        today = dd + '/' + mm + '/' + yyyy;

        return today;
    }

    function AddNewLend(newLend) {
        $.ajax({
            url: apiURL + "lend/",
            type: "POST",
            data: newLend
        }).done(function () {
            GetAllLends();
        }).fail(function (err) {
        })
    };

    function GetAllLends() {
        $.ajax({
            url: apiURL + "lend/"
        }).done(function (lends) {
            RenderAllLends(lends);
        }).fail(function (err) {
        })
    };

    function RenderAllLends(lends){

        var lendsTable = $("#lendTable").find("tbody");

        lendsTable.html("");

        for (var i = 0; i < lends.length; i++) {
            var newRow = $("<tr data-lend-id=" + lends[i].ID + "></tr>");
            var titleCol = $("<td>").text(lends[i].Title);
            titleCol.appendTo(newRow);
            var nameCol = $("<td>").text(lends[i].Name);
            nameCol.appendTo(newRow);

            var dateString = lends[i].LendDate

            var dateCol = $("<td>").text(dateString);
            dateCol.appendTo(newRow);

            var buttons = $(`        
                    <td>
                        <div class="button-group">
                            <button class="btn btn-info btn-sm returnBook">Zwróć</button>
                        </div>
                    </td>)`);

            newRow.append(buttons);
            lendsTable.append(newRow);
        }
    }

    $('#lendTable').on("click", "button.returnBook", function () {
        event.preventDefault();
        var lendID = $(this).closest("tr[data-lend-id]").attr("data-lend-id");
        RemoveLend(lendID);
    });

    function RemoveLend(lendID) {
        $.ajax({
            url: apiURL + "lend/" + lendID,
            type: "DELETE",
        }).done(function () {
            GetAllLends();
        }).fail(function (err) {
        });
    };
















});
