<?php

namespace Database\Seeders;

use App\Models\Report;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class ReportSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        for($i = 1; $i <= 20; $i++){
            $report = new Report();

            $report->title = $faker->sentence;
            $report->description = $faker->text(700);
            $report->reported_date = $faker->date($format = 'Y-m-d', $max = 'now');
            $report->user_id = $faker->numberBetween(1,20);
            $report->location_id = $faker->numberBetween(1,20);
            $report->issue_type = $faker->numberBetween(1,20);
            // $report->image_id = $faker->numberBetween(1,20);
            $report->votes = $faker->randomNumber;
            $report->save();
        }
    }
}
