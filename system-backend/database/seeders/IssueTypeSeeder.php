<?php

namespace Database\Seeders;

use App\Models\IssueType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class IssueTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        for($i = 1; $i <= 20; $i++){
            $issueType = new IssueType();

            $issueType->title = $faker->sentence;
            $issueType->description = $faker->text(700);
            $issueType->save();
        }
    }
}
