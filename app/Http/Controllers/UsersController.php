<?php

    namespace App\Http\Controllers;

    use Faker\Provider\Image;
    use GuzzleHttp\Psr7\Response;
    use Illuminate\Http\JsonResponse;
    use Illuminate\Http\Request;
    use App\User;
    use Illuminate\Support\Facades\DB;
    use App\Http\Controllers\Traits\Imageable;
    use App\Http\Controllers\Traits\Apiable;
    use Tymon\JWTAuth\JWTAuth;

    class UsersController extends Controller
    {
        use Imageable, Apiable;
        protected $filter_fields = [
            'name',
            'id',
            'role_id',
        ];

        const SEARCHABLE_FIELD = 'email';
        const IMAGES_DIR = 'users/';

        protected $sortInQuery = array(
            'name',
            'id'
        );

        /**
         * Display list of users.
         *
         * @param Request $request
         *
         * @return JsonResponse
         */
        public function index(Request $request)
        {
            $user = auth()->user();

            if($user->role_id > 2){
                abort(403);
            }
            $this->defineBrowseRequestVars($request);

            $whereFilters = $this->setupFilters($request);

            $users = new User();

            $users = $users
                       ->orderBy($this->sortField ? $this->sortField : 'name', $this->sortOrder ? $this->sortOrder : 'ASC');
                       
           $users = $users->where(
                'users.' . $this::SEARCHABLE_FIELD,
                'like',
                "%{$request->get('q')}%"
            );

           $users = $users->where($whereFilters, 'users.');
           $users = $users->where('status', '=', 1);

           $users = $users->get();

            $response = $this->apiPaginate($users);

            return $this->apiBrowseResponse($response,$users->count());
        }


        /**
         * Store a newly created user.
         *
         * @param  \Illuminate\Http\Request $request
         *
         * @return \Illuminate\Http\Response
         */
        public function store(Request $request)
        {
            $user = auth()->user();

            if($user->role_id > 1){
                abort(403);
            }

            $userRequest = $request->toArray();
            $exists = User::where('email', $userRequest['email'])->count();
            if($exists) {
                abort(409, 'User email exists');
            }
            $photoUrl = 'users/default.png';
            $user =new User();
            $props = [];

            $user->name = $userRequest['name'];

            $user->role_id = $userRequest['role_id'];
            $user->email = $userRequest['email'];
            $user->phone = array_key_exists('phone',$userRequest) ? $userRequest['phone'] : null;
            if(array_key_exists('password', $userRequest)) {

                $user->password = bcrypt($userRequest['password']);
            }
            $user->photo =  $photoUrl;
            $user->save();
            return response()->json($user);
        }

        /**
         * Display the information about user.
         *
         * @param  int $id
         *
         * @return \Illuminate\Http\Response
         */
        public function show($id)
        {
            $user = auth()->user();

            if($user->role_id > 2){
                abort(403);
            }
            $user = DB::table('users')
            ->join('roles', 'roles.id', '=', 'users.role_id')
                ->where('users.id', '=',$id)
                ->select([
                    'users.*',
                    'roles.display_name as role',
                ])
            ->first();
            return response()->json($user);
        }

        /**
         * Show the form for editing the user.
         *
         * @param  int $id
         *
         * @return \Illuminate\Http\Response
         */
        public function edit($id)
        {
            $user = auth()->user();

            if($user->role_id > 2){
                abort(403);
            }

            $needed = User::find($id);


            return response()->json($needed);
        }

        /**
         * Update the user.
         *
         * @param  \Illuminate\Http\Request $request
         * @param  int $id
         *
         * @return \Illuminate\Http\Response
         */
        public function update(Request $request, $id)
        {
            $user = auth()->user();

            if($user->role_id > 2){
                abort(403);
            }
            $photo = $request->allFiles();
            $userRequest = $request->toArray();

            $photoUrl = 'users/default.png';
            $user = User::findOrFail($id);
            $props = [];

            $exists = User::where('email', $userRequest['email'])->get();
            if($userRequest['email'] && $exists->count() && $exists->first()->id != $id) {
                abort(409, 'User email exists');
            }
            $user->name = $userRequest['name'];
            $user->role_id = $userRequest['role_id'];
            $user->email = $userRequest['email'];
            $user->phone =  array_key_exists('phone',$userRequest) ? $userRequest['phone'] : '';

            if(array_key_exists('new_password', $userRequest)) {
                $user->password = bcrypt($userRequest['new_password']);
            }
            $user->photo =  $photoUrl;
            if(array_key_exists('status', $userRequest)) {
                $user->status = $userRequest['status'];
            }
            $user->save();
            return response()->json(['message'=>'true', 'data' => $photo]);
        }

        /**
         * Remove the user.
         *
         * @param  int $id
         *
         * @return \Illuminate\Http\Response
         */
        public function destroy($id)
        {
            $authUser = auth()->user();
            if($authUser->id == $id) {
                return response()->json(['data' => $authUser]);
            }
            if($authUser->role_id > 1){
                abort(403);
            }
            $user = User::find($id);
            $user->status = 0;
            $user->save();
            return response()->json(['data' => $user]);
        }
    }
