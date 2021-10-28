<?php

use App\Http\Controllers\AuthorController;
use App\Http\Controllers\BookController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::delete('authors/{author}', [AuthorController::class, 'delete']);
Route::get('authors', [AuthorController::class, 'getAll']);
Route::patch('authors/{author}', [AuthorController::class, 'update']);
Route::post('authors', [AuthorController::class, 'create']);

Route::delete('books/{book}', [BookController::class, 'delete']);
Route::get('books', [BookController::class, 'getAll']);
Route::patch('books/{book}', [BookController::class, 'update']);
Route::post('books', [BookController::class, 'create']);