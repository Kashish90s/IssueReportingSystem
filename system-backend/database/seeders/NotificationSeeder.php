<?php

namespace Database\Seeders;

use App\Models\Notification;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class NotificationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        for($i = 1; $i <= 20; $i++){
            $notification = new Notification();

            $notification->title = $faker->sentence;
            $notification->description = $faker->text(500);
            $notification->notification_date = $faker->date($format = 'Y-m-d', $max = 'now');
            $notification->user_id = $faker->numberBetween(1,20);
            $notification->report_id = $faker->numberBetween(1,20);
            $notification->image_id = $faker->numberBetween(1,20);
            $notification->save();
        }
    }
}
