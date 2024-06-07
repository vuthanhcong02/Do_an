<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::group(['prefix' => '/banners'], function () {
    Route::get('/', [\App\Http\Controllers\BannerController::class, 'getAll']);
    Route::get('/order-by-position', [\App\Http\Controllers\BannerController::class, 'getBannersOrderByPosition']);
    Route::get('/{id}', [\App\Http\Controllers\BannerController::class, 'show']);
    Route::post('/', [\App\Http\Controllers\BannerController::class, 'store']);
    Route::put('/{id}', [\App\Http\Controllers\BannerController::class, 'updateBanner']);
    Route::delete('/{id}', [\App\Http\Controllers\BannerController::class, 'destroy']);
});

Route::group(['prefix' => '/teachers'], function () {
    Route::get('/', [\App\Http\Controllers\TeacherController::class, 'getAll']);
    Route::post('/', [\App\Http\Controllers\TeacherController::class, 'createTeacher']);
    Route::get('/{id}', [\App\Http\Controllers\TeacherController::class, 'showTeacher']);
    Route::put('/{id}', [\App\Http\Controllers\TeacherController::class, 'updateTeacher']);
    Route::delete('/{id}', [\App\Http\Controllers\TeacherController::class, 'deleteTeacher']);
});

Route::group(['prefix' => '/categories'], function () {
    Route::get('/', [\App\Http\Controllers\CategoryController::class, 'index']);
    Route::get('/{id}', [\App\Http\Controllers\CategoryController::class, 'show']);
    Route::post('/', [\App\Http\Controllers\CategoryController::class, 'store']);
    Route::put('/{id}', [\App\Http\Controllers\CategoryController::class, 'updateCategory']);
    Route::delete('/{id}', [\App\Http\Controllers\CategoryController::class, 'destroy']);
});

Route::group(['prefix' => '/news'], function () {
    Route::get('/featured', [\App\Http\Controllers\NewsController::class, 'getNewsByFeatured']);
    Route::get('/order-by-id', [\App\Http\Controllers\NewsController::class, 'getNewsOrderById']);
    Route::get('/', [\App\Http\Controllers\NewsController::class, 'index']);
    Route::get('/{id}', [\App\Http\Controllers\NewsController::class, 'show']);

    Route::post('/', [\App\Http\Controllers\NewsController::class, 'create']);
    Route::put('/{id}', [\App\Http\Controllers\NewsController::class, 'update']);
    Route::delete('/{id}', [\App\Http\Controllers\NewsController::class, 'destroy']);
});

Route::group(['prefix' => '/events'], function () {
    Route::get('/featured', [\App\Http\Controllers\EventController::class, 'getEventsByFeatured']);
    Route::get('/', [\App\Http\Controllers\EventController::class, 'index']);
    Route::get('/{id}', [\App\Http\Controllers\EventController::class, 'show']);

    Route::post('/', [\App\Http\Controllers\EventController::class, 'store']);
    Route::put('/{id}', [\App\Http\Controllers\EventController::class, 'updateEvent']);
    Route::delete('/{id}', [\App\Http\Controllers\EventController::class, 'destroy']);
});

Route::group(['prefix' => '/courses'], function () {
    Route::get('/featured', [\App\Http\Controllers\CourseController::class, 'getCourseByFeatured']);
    Route::get('/get-course-by-english-category', [\App\Http\Controllers\CourseController::class, 'getCourseByEnglishCategory']);
    Route::get('/get-course-by-information-category', [\App\Http\Controllers\CourseController::class, 'getCourseByInformationCategory']);
    Route::get('/', [\App\Http\Controllers\CourseController::class, 'index']);
    Route::get('/order-by-id', [\App\Http\Controllers\CourseController::class, 'getCourseOrderById']);
    Route::get('/{id}', [\App\Http\Controllers\CourseController::class, 'show']);
    Route::post('/', [\App\Http\Controllers\CourseController::class, 'createCourse']);
    Route::put('/{id}', [\App\Http\Controllers\CourseController::class, 'update']);
    Route::delete('/{id}', [\App\Http\Controllers\CourseController::class, 'destroy']);
});

Route::group(['prefix' => '/classrooms'], function () {
    Route::get('/', [\App\Http\Controllers\ClassRoomController::class, 'getAll']);
    Route::get('/{id}', [\App\Http\Controllers\ClassRoomController::class, 'showClassRoom']);
    Route::post('/', [\App\Http\Controllers\ClassRoomController::class, 'createClassRoom']);
    Route::put('/{id}', [\App\Http\Controllers\ClassRoomController::class, 'updateClassRoom']);
    Route::delete('/{id}', [\App\Http\Controllers\ClassRoomController::class, 'deleteClassRoom']);
});

Route::group(['prefix' => '/classes'], function () {
    Route::get('/', [\App\Http\Controllers\ClassesController::class, 'getAll']);
    Route::get('/{id}', [\App\Http\Controllers\ClassesController::class, 'showClass']);
    Route::post('/', [\App\Http\Controllers\ClassesController::class, 'createClass']);
    Route::put('/{id}', [\App\Http\Controllers\ClassesController::class, 'updateClass']);
    Route::delete('/{id}', [\App\Http\Controllers\ClassesController::class, 'destroyClass']);
    Route::get('/course/{id}', [\App\Http\Controllers\ClassesController::class, 'getClassesByCourse']);
});

Route::group(['prefix' => '/schedules'], function () {
    Route::get('/course/{id}', [\App\Http\Controllers\ScheduleController::class, 'getScheduleByCourseId']);
    Route::get('/', [\App\Http\Controllers\ScheduleController::class, 'getAll']);
    Route::get('/{id}', [\App\Http\Controllers\ScheduleController::class, 'getScheduleById']);
    Route::post('/', [\App\Http\Controllers\ScheduleController::class, 'makeSchedule']);
    Route::put('/{id}', [\App\Http\Controllers\ScheduleController::class, 'updateSchedule']);
    Route::delete('/{id}', [\App\Http\Controllers\ScheduleController::class, 'deleteSchedule']);
});

Route::fallback(function () {
    return response()->json([
        'message' => 'Page Not Found. If error persists, contact info@website.com'
    ], 404);
});
