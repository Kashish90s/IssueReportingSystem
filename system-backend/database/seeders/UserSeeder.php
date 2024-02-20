<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        for($i = 1; $i <= 20; $i++){
            $user = new User();


            $user->name = $faker->name;
            $user->email = $faker->email;
            $user->code = $faker->unique()->bothify('??##???###');
            $user->password = $faker->password;
            $user->dob = $faker->date($format = 'Y-m-d', $max = 'now');
            //     $user->type = $faker->numberBetween(0, 2);
            //     $user->status = $faker->numberBetween(0, 2);
            $user->google_id = $faker->bothify('??##???###');
            $user->save();
        }
    }
}
