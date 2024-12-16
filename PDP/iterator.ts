class Iterator<T> {
    hasNext(): boolean {
        throw new Error("Method 'hasNext' must be implemented");
    }

    next(): T {
        throw new Error("Method 'next' must be implemented");
    }
}

class Book {
    private title: string;
    private author: string;

    constructor(title: string, author: string) {
        this.title = title;
        this.author = author;
    }

    toString() {
        return `${this.title} by ${this.author}`;
    }
}

class BookCollection {
    private books: Book[] = [];

    constructor() {
        this.books = [];
    }

    getBooks(): Book[] {
        return this.books;
    }

    addBook(book: Book) {
        this.books.push(book);
    }

    createIterator() {
        return new BookIterator(this);
    }
}

class BookIterator extends Iterator<Book> {
    private bookCollection: BookCollection;
    private index: number;

    constructor(bookCollection: BookCollection) {
        super();
        this.bookCollection = bookCollection;
        this.index = 0;
    }

    hasNext(): boolean {
        return this.index < this.bookCollection.getBooks().length;
    }

    next(): Book {
        if (!this.hasNext()) {
            throw new Error("No more elements.");
        }
        return this.bookCollection.getBooks()[this.index++];
    }
}

const library = new BookCollection();
library.addBook(new Book("Book 1", "Author 1"));
library.addBook(new Book("Book 2", "Author 2"));
library.addBook(new Book("Book 3", "Author 3"));

const iterator = library.createIterator();
while (iterator.hasNext()) {
    console.log(iterator.next().toString());
}