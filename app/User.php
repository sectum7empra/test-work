<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use TCG\Voyager\Models\Role;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends \TCG\Voyager\Models\User implements JWTSubject
{
    use Notifiable;

    protected $casts = [
        'name' => 'string',
    ];
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function town() {
        return $this->belongsTo(Town::class, 'town_id', 'id');
    }
    public function projects() {
        return $this->belongsToMany(Gravestone::class, 'project_user');
    }

    public function role()
    {
        return $this->belongsTo(Role::class, 'role_id', 'id');
    }

    /**
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();  // Eloquent model method
    }

    /**
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [
            'user' => [
                'id' => $this->id,
                'email' => $this->email,
                'name' => $this->name,
                'token' => $this->token,
                'role' => $this->role->name,
             ]
        ];
    }

}
