<?php

use App\Http\Controllers\LinkController;
use App\Http\Controllers\RedirectController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/',[LinkController::class,'index'])->name('links.index');
Route::post('/',[LinkController::class,'store'])->name('links.store');
Route::delete('/links/{link}',[LinkController::class ,'destroy'])->name('links.destroy');

Route::get('/r/{code}',[RedirectController::class ,'__invoke'])->name('redirect');
