<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCategoriesTable extends Migration
{
    public function up()
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id('cat_id');
            $table->string('cat_name');
            $table->string('cat_type');
            $table->timestamp('cat_created_at')->nullable();
        });
    }

    public function down()
    {
        Schema::dropIfExists('categories');
    }

    
}
