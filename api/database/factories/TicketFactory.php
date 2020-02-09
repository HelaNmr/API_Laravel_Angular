<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Models\Ticket;
use Faker\Generator as Faker;

$factory->define(Ticket::class, function (Faker $faker) {
    return [
        'category' => $faker->sentence(1, true),
        'subject' => $faker->sentence(3, true),
        'content' => $faker->paragraph(),
        'user_id' => 2
    ];
});
