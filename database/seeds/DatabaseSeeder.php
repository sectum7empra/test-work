<?php

use Illuminate\Database\Seeder;

use Database\Seeds\VoyagerDatabaseSeeder;
use Database\Seeds\VoyagerDummyDatabaseSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(VoyagerDatabaseSeeder::class);
        $this->call(VoyagerDummyDatabaseSeeder::class);
    }
}
