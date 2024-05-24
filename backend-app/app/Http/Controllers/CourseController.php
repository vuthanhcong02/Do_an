<?php

namespace App\Http\Controllers;

use App\Services\CourseService;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    protected $courseService;

    public function __construct(CourseService $courseService)
    {
        $this->courseService = $courseService;
    }


    //
    public function getAll()
    {

        $courses = $this->courseService->getAll();
        if (!$courses) {
            return $this->customResponse(false, 'Course not updated', 404);
        }

        return $this->customResponse(true, $courses, 200);
    }



    public function createCourse(Request $request)
    {
        $data = $request->all();
        $course = $this->courseService->create($data);
        if (!$course) {
            return $this->customResponse(false, 'Course not created', 404);
        }

        return $this->customResponse(true, $course, 201);
    }

    public function show($id)
    {
        $course = $this->courseService->find($id);
        if (!$course) {
            return $this->customResponse(false, 'Course not found', 404);
        }
        return $this->customResponse(true, $course, 200);
    }

    public function update(Request $request, $id)
    {
        $data = $request->all();
        $course = $this->courseService->update($data, $id);
        if (!$course) {
            return $this->customResponse(false, 'Course not updated', 404);
        }
        return $this->customResponse(true, $course, 200);
    }


    public function destroy($id)
    {
        $course = $this->courseService->delete($id);
        if (!$course) {
            return $this->customResponse(false, 'Course not deleted', 404);
        }
        return $this->customResponse(true, $course, 200);
    }

    public function getCourseOrderById()
    {
        $courses = $this->courseService->getCourseOrderById();
        if (!$courses) {
            return $this->customResponse(false, 'Course not found', 404);
        }
        return $this->customResponse(200,  true, $courses);
    }
}
