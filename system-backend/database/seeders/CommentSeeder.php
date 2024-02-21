<?php

namespace Database\Seeders;

use App\Models\Comment;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        for($i = 1; $i <= 20; $i++){
            $comment = new Comment();

            $comment->description = $faker->text(1000);
            $comment->commented_date = $faker->date($format = 'Y-m-d', $max = 'now');
            $comment->user_id = $faker->numberBetween(1,20);
            $comment->report_id = $faker->numberBetween(1,20);
            $comment->save();
        }
    }
}
