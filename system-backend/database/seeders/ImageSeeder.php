<?php

namespace Database\Seeders;

use App\Models\Image;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class ImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        for($i = 1; $i <= 20; $i++){
            $image = new Image();

            $image->image_holder = $faker->word . '.jpg';
            $image->user_id = $faker->numberBetween(1,20);
            $image->save();
        }
    }
}
