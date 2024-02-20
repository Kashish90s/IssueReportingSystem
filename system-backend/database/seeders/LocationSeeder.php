<?php

namespace Database\Seeders;

use App\Models\Location;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        for($i = 1; $i <= 20; $i++){

            $location = new Location();
            $location->street_name = $faker->streetName;
            $location->ward = $faker->numberBetween(1,20);
            $location->zip_code = $faker->postcode;
            $location->save();
        }
    }
}
