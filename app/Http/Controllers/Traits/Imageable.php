<?php

    namespace App\Http\Controllers\Traits;

    use Illuminate\Support\Facades\Storage;

    /**
     * Trait Imageable
     *  Unused. Added as template for adding ability to use images in app
     * @package App\Http\Controllers\Traits
     */
    trait Imageable
    {
        private function saveImage($image, $dir)
        {
            if (true || $image->isValid()) {
                $dir .= '/';
                // Image name is hashed image name + part of timestamp
                $hashedName = hash('md5', $image->path());
                $timestamp  = microtime() * 1000000;

                $newImageName = $dir .  $hashedName . $timestamp . '.' . $image->getClientOriginalExtension();

//                Storage::put($newImageName, $image);

                return $newImageName;
            }

        }
    }