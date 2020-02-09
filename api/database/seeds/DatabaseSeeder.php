<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Models\Ticket::class, 5)->create()->each(function ($ticket) {
            $i = rand(1, 5);
            while (--$i) {
                $ticket->replies()->save(factory(App\Models\Reply::class)->make());
            }
        });
    }
}
