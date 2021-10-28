<?php

namespace App\Http\Controllers;

use App\Models\Author;
use Illuminate\Http\Request;

class AuthorController extends Controller
{
    /**
     * Create an author.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \App\Author
     */
    public function create(Request $request)
    {
        return Author::create($request->all());
    }

    /**
     * Delete the specified author.
     *
     * @param  \App\Author  $author
     * @return void
     * @throws \Exception
     */
    public function delete(Author $author)
    {
        $author->delete();
    }

    /**
     * Get all authors.
     *
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function getAll()
    {
        $authors = Author::all();

        $authors->loadCount('books');

        return $authors;
    }

    /**
     * Update the specified author.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Author  $book
     * @return \App\Author
     */
    public function update(Request $request, Author $author)
    {
        $author->fill($request->all())->save();

        return $author;
    }
}
