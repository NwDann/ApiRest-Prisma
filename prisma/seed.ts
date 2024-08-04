
import { db } from "../src/utils/db.server";

type Author = {
    firstName: string;
    lastName: string;
}

type Book = {
    title: string;
    isFiction: boolean;
    datePublished: Date;
}


async function seed() {
    await Promise.all(
        getAuthors().map((author) => {
            return db.author.create({
                data: {
                    firstName: author.firstName,
                    lastName: author.lastName
                }
            });
        })
    );

    let authorId: number;
    const authorPromise = await db.author.findFirst({
        where: {
            firstName: "Donut"
        }
    });

    if (!authorPromise) {
        console.error("Author not found");
        // Handle the case where the author is not found, e.g., exit the function or skip further processing
        return;
    }

    await Promise.all(
        getBooks().map((book) => {
            const { title, isFiction, datePublished } = book;
            return db.book.create({
                data: {
                    title,
                    isFiction,
                    datePublished,
                    authorId: authorPromise.id
                    
                }
            })
        })
    )
}

seed();

function getAuthors(): Array<Author> {
    return [
        {
            firstName: "John",
            lastName: "Doe"
        },
        {
            firstName: "Will",
            lastName: "Oxis"
        },
        {
            firstName: "Donut",
            lastName: "Leak"
        }
    ];
}

function getBooks(): Array<Book> {
    return [
        {
            title: "Sapiens",
            isFiction: false,
            datePublished: new Date()
        },
        {
            title: "Homo Deus",
            isFiction: false,
            datePublished: new Date()
        },
        {
            title: "The ugly duckling",
            isFiction: true,
            datePublished: new Date()
        }
    ]
}
