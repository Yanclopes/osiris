<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration{
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id('usu_id');
            $table->string('usu_name');
            $table->string('usu_email')->unique();
            $table->string('usu_password');
            $table->timestamp('usu_created_at')->nullable();
        });
    }

    public function down()
    {
        Schema::dropIfExists('users');
    }


}
