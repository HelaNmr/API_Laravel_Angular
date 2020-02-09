<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reply extends Model
{
    protected $hidden =['created_at', 'updated_at'];
    protected $fillable= ['id','content','ticket_id'];

    public function Ticket()
    {
        return $this->belongsTo(Ticket::class);
    }
}
