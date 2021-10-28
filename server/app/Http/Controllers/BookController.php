<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    /**
     * Create a book.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \App\Book
     */
    public function create(Request $request)
    {
        return Book::create($request->all());
    }

    /**
     * Delete the specified book.
     *
     * @param  \App\Book  $book
     * @return void
     * @throws \Exception
     */
    public function delete(Book $book)
    {
        $book->delete();
    }  
    
    /**
     * Get all books.
     *
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function getAll()
    {
        return Book::all();
    }

    /**
     * Update the specified book.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Book  $book
     * @return \App\Book
     */
    public function update(Request $request, Book $book)
    {
        $book->fill($request->all())->save();

        return $book;
    }
}
