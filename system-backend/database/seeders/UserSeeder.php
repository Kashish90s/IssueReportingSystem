<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();
        $user = new User();


            $user->name = "Admin";
            $user->email = "admin@gmail.com";
            $user->password = "admin936471852";
            $user->type = 1;
            $user->save();

        for($i = 1; $i <= 50; $i++){
            $user = new User();


            $user->name = $faker->name;
            $user->email = $faker->email;
            $user->code = $faker->unique()->bothify('??##???###');
            $user->password = $faker->password;
            $user->dob = $faker->date($format = 'Y-m-d', $max = 'now');
            $user->google_id = $faker->bothify('??##???###');
            $user->save();
        }
    }
}
