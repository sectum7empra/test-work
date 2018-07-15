<?php

    use Illuminate\Database\Seeder;
    use TCG\Voyager\Models\Role;
    use TCG\Voyager\Models\User;
    use App\Models\Lan;
    use App\Models\Town;
    use App\User as RegularUser;

    class UsersTableSeeder extends Seeder
    {
        /**
         * Auto generated seed file.
         *
         * @return void
         */
        public function run()
        {
            $townID   = rand(1, 195);

            if (User::count() == 0) {
                $role = Role::where('id', 1)->firstOrFail();
                User::create([
                    'name'           => 'Administrator',
                    'photo'          => 'default.jpg',
                    'email'          => 'admin@admin.com',
                    'phone'          => '+380675367872',
                    'password'       => bcrypt('password'),
                    'remember_token' => str_random(60),
                    'role_id'        => $role->id,
                ]);
                User::create([
                    'name'     => 'Yurii Danylets',
                    'photo'    => 'default.jpg',
                    'email'    => 'sectum7empra@gmail.com',
                    'phone'    => '+38097777777',
                    'password' => bcrypt('password'),
                    'role_id'  => $role->id,
                ]);
            }

            factory(RegularUser::class)->times(20)->create();
        }
    }
