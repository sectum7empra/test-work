<?php
namespace App\Http\Controllers\Traits;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

/**
 * Trait Apiable
 *
 * Here are the common methods of controllers used to handle requests through REST-api
 * @package App\Http\Controllers\Traits
 */
trait Apiable {

    protected $startPaginate = 0;
    protected $endPaginate = 10;
    protected $sortField = 'id';
    protected $sortOrder = 'ASC';

    /**
     *  REST-client may send sorting and paginating parameters, we need to use those parameters or define defaults
     *  Method write request parameters as controllers parameters
     *
     * @param Request $request
     */
    private function defineBrowseRequestVars(Request $request) {
        $this->sortField          = $request->input('_sort') ? $request->input('_sort') : null;
        $this->sortOrder         = $request->input('_order') ? $request->input('_order') : null;
        $this->startPaginate = $request->input('_start') ? (int) $request->input('_start') : 0;
        $this->endPaginate   = $request->input('_end') ? (int) $request->input('_end') : 50000;
    }
    /**
     * Filtering elements to return via response according to pagination parameters
     *
     * @param Collection $collection selected from database elements
     *
     * @return array elements what appropriate pagination parameters
     */
    private function apiPaginate(Collection $collection) {
        $array = $collection->toArray();

        $response = [];
        if ($this->endPaginate > $collection->count()) {
            $this->endPaginate = $collection->count();
        }

        // selecting elements to pagination response
        for ($i = $this->startPaginate; $i < $this->endPaginate; $i++) {
            $response[] = $array[$i];
        }
        return $response;
    }

    /**
     * Prepares response to send to frontend adding header for displaying at browse(List) view
     *
     * @param $response
     * @param $count
     *
     * @return JsonResponse
     */
    public function apiBrowseResponse($response, $count) {
        return response()->json($response)->header('X-Total-Count', $count);
    }

    /**
     * Filtering query to database accordingly to request parameters that filter_fields(controller parameter) includes
     *
     * @param Request $request
     * @param $prefix string
     * @return array filters for where request
     */
    private function setupFilters(Request $request, $prefix = '') {
        $filter_fields = $this->filter_fields;
        $filters =[];
        foreach ($filter_fields as $field) {
            $getParam = $request->input($field);

            $nameField= str_replace('DOT', '.', $field);
            if($getParam) {
                $filters[$prefix . $nameField] = $request->input($field);
            }
            unset($getParam);

        }
        return $filters;
    }
}