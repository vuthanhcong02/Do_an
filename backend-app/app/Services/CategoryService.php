<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryService extends BaseService
{

    public function __construct(Category $category)
    {
        parent::__construct($category);
    }
}
