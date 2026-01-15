<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::lazy();
        return Inertia::render('Products/Index', compact('products'));
    }

    public function create() {
        return Inertia::render('Products/Create', []);
    }

    public function store(Request $request) {
        $request->validate([
            'name' => 'required|string|max:100',
            'price' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);
        
        // Image Logic Upload
        $imagePath = null;
        if ( $request->hasFile('image') ) {
            $imagePath = $request->file('image')->store('products', 'public');
        }

        // Insert data setelah di validasi
        Product::create([
            'name' => $request->name,
            'price' => $request->price,
            'description' => $request->description,
            'image' => $imagePath,
        ]);

        return redirect()->route('products.index')->with('message', 'Product created successfully.');
    }

    // Form Edit Data
    public function edit(Product $product) {
        return Inertia::render('Products/Edit', compact('product'));
    }

    // Update Data
    public function update(Request $request, Product $product) {
        $request->validate([
            'name' => 'required|string|max:100',
            'price' => 'required|numeric|min:0',
            'description' => 'nullable|string',
        ]);

        // Update to Database
        $product->update([
            'name' => $request->input('name'),
            'price' => $request->input('price'),
            'description' => $request->input('description'),
        ]);

        return redirect()->route('products.index')->with('message', 'Product updated Successfully');
    }

    // Delete data
    public function destroy(Product $product) {
        $product->delete();
        return redirect()->route('products.index')->with('message', 'Product deleted successfully.');
    }
}
