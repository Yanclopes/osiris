<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransactionsTable extends Migration
{
    public function up()
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id('tra_id');
            $table->string('tra_type');
            $table->decimal('tra_value', 10, 2);
            $table->string('tra_description');
            $table->timestamp('tra_created_at')->nullable();

            $table->unsignedBigInteger('account_id');
            $table->foreign('account_id')->references('acc_id')->on('accounts')->onDelete('cascade');

            $table->unsignedBigInteger('category_id');
            $table->foreign('category_id')->references('cat_id')->on('categories')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('transactions');
    }

    
}
