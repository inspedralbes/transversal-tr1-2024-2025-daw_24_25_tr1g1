<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CrearRelaciones extends Migration
{
    public function up()
    {
        // Relaciones de "prenda"
        Schema::table('prenda', function (Blueprint $table) {
            $table->foreign('talla_id')->references('id_talla')->on('talla')->onDelete('cascade');
            $table->foreign('categoria_id')->references('id_categoria')->on('categoria')->onDelete('cascade');
        });

        // Relaciones de "imagenes"
        Schema::table('imagenes', function (Blueprint $table) {
            $table->foreign('prenda_id')->references('id_prenda')->on('prenda')->onDelete('cascade');
        });
    }

    public function down()
    {
        // Eliminar relaciones de "prenda"
        Schema::table('prenda', function (Blueprint $table) {
            $table->dropForeign(['talla_id']);
            $table->dropForeign(['categoria_id']);
        });

        // Eliminar relaciones de "imagenes"
        Schema::table('imagenes', function (Blueprint $table) {
            $table->dropForeign(['prenda_id']);
        });
    }
}
