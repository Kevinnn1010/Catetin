<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

Route::get('dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Halaman Finance Dashboard
Route::get('finance_dashboard', function () {
    return Inertia::render('Finance');
})->middleware(['auth', 'verified'])->name('finance_dashboard');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
