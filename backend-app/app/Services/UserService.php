<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Models\User;

class UserService extends BaseService
{
    public function __construct(User $user)
    {
        parent::__construct($user);
    }
}