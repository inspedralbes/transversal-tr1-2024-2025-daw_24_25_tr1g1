<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateComprasTable extends Migration {
    public function up() {
        Schema::create('compras', function (Blueprint $table) {
            $table->id('id_compra');
            $table->string('email');
            $table->decimal('precio_total', 10, 2);
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('compras');
    }
}
