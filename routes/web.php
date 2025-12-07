<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

Route::get('dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('finance_dashboard', function () {
    return Inertia::render('Finance');
})->middleware(['auth', 'verified'])->name('finance_dashboard');

Route::get('invoice', function () {
    return Inertia::render('Invoice');
})->middleware(['auth', 'verified'])->name('invoice');

Route::get('transaksi', function () {
    return Inertia::render('Transaksi');
})->middleware(['auth', 'verified'])->name('transaksi');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
