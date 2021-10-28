<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'surname'
    ];

    /**
     * Get books belonging to the author.
     */
    public function books()
    {
        return $this->hasMany(Book::class);
    }
}
