<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAccountsTable extends Migration
{
    public function up()
    {
        Schema::create('accounts', function (Blueprint $table) {
            $table->id('acc_id');
            $table->string('acc_name');
            $table->string('acc_type');
            $table->decimal('acc_balance', 10, 2);
            $table->timestamp('acc_created_at')->nullable();
            
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('usu_id')->on('users')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('accounts');
    }

    
}
