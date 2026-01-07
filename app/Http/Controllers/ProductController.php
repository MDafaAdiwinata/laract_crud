<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        return Inertia::render('Products/Index', []);
    }

    public function create() {
        return Inertia::render('Products/Create', []);
    }

    public function store(Request $request) {
        $request->validate([
            'name' => 'required|string|max:100',
            'price' => 'required|numeric|min:0',
            'description' => 'nullable|string',
        ]);

        // Insert data setelah di validasi
        Product::create($request->all());

        return redirect()->route('products.index')->with('message', 'Product created successfully.');
    }
}
