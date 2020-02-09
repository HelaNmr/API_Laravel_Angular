<?php

namespace App\Models;

use App\User;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    protected $hidden = ['created_at', 'updated_at'];
    protected $visible = ['id', 'category', 'subject', 'content'];
    protected $fillable = ['category', 'subject', 'content', 'id', 'user_id', 'created_at', 'updated_at'];

    public function replies()
    {
        return $this->hasMany(Reply::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
