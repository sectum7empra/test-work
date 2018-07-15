<?php
    namespace App\Http\Middleware;

    use Closure;
    use JWTAuth;
    use Exception;

    class AuthJWT
    {
        /**
         * Handle an incoming request.
         *
         * @param  \Illuminate\Http\Request  $request
         * @param  \Closure  $next
         * @return mixed
         */
        public function handle($request, Closure $next)
        {
            try {
//                $user = JWTAuth::toUser(str_ireplace('Bearer ', '', $request->header('authorization')));
                if(!auth()->user()->status) {
                    throw new \Tymon\JWTAuth\Exceptions\TokenInvalidException();
                }

            } catch (Exception $e) {
                if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException){
                    return response()->json(['error'=>'Token is Invalid'], 401);
                }else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException){
                    return response()->json(['error'=>'Token is Expired'], 401);
                }else{
                    return response()->json(['error'=>'Something is wrong'], 401);
                }
            }
            return $next($request);
        }
    }