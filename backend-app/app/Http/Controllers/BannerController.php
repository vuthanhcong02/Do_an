<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\BannerService;

class BannerController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    protected $bannerService;
    public function __construct(BannerService $bannerService)
    {
        $this->bannerService = $bannerService;
    }
    public function getAll()
    {
        //
        $banners = $this->bannerService->getAll();
        if (!$banners) {
            return $this->customResponse(404, false, null, 'Banner not found', null);
        }
        return $this->customResponse(200, true, $banners, null, null);
    }

    public function getBannersOrderByPosition()
    {
        $banners = $this->bannerService->getBannerOrderByPosition();
        if (!$banners) {
            return $this->customResponse(404, false, null, 'Banner not found', null);
        }

        return $this->customResponse(200, true, $banners, null, null);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //

        $data = $request->all();
        $banner = $this->bannerService->create($data);
        if (!$data) {
            return $this->customResponse(400, false, null, 'Banner not created', null);
        }

        return $this->customResponse(200, true, $data, null, null);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //\

        $banner = $this->bannerService->find($id);
        if (!$banner) {
            return $this->customResponse(404, false, null, 'Banner not found', null);
        }
        return $this->customResponse(200, true, $banner, null, null);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit()
    {
        //
        return view('Dashboard.banner.edit');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $data = $request->all();
        // dd($requestData);
        $banner = $this->bannerService->update($data, $id);

        // dd($banner);
        if (!$banner) {
            return $this->customResponse(404, false, null, 'Banner not found', null);
        }

        return $this->customResponse(200, true, $banner, null, null);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //

        $banner = $this->bannerService->delete($id);
        if (!$banner) {
            return $this->customResponse(404, false, null, 'Banner not found', null);
        }
        return $this->customResponse(200, true, $banner, null, null);
    }
}
