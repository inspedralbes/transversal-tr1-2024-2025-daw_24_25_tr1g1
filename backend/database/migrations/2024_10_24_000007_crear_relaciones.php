<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CrearRelaciones extends Migration
{
    public function up()
    {
        // Relación con "prenda" y "categoria"
        Schema::table('prenda', function (Blueprint $table) {
            $table->foreign('categoria_id')->references('id_categoria')->on('categoria')->onDelete('cascade');
        });

        // Relación con "talla" y "prenda"
        Schema::table('talla', function (Blueprint $table) {
            $table->foreign('prenda_id')->references('id_prenda')->on('prenda')->onDelete('cascade');
        });

        // Relación con "imagenes" y "prenda"
        Schema::table('imagenes', function (Blueprint $table) {
            $table->foreign('prenda_id')->references('id_prenda')->on('prenda')->onDelete('cascade');
        });
    }

    public function down()
    {
        // Eliminar relaciones de "prenda"
        Schema::table('prenda', function (Blueprint $table) {
            $table->dropForeign(['categoria_id']);
        });

        // Eliminar relaciones de "talla"
        Schema::table('talla', function (Blueprint $table) {
            $table->dropForeign(['prenda_id']);
        });

        // Eliminar relaciones de "imagenes"
        Schema::table('imagenes', function (Blueprint $table) {
            $table->dropForeign(['prenda_id']);
        });
    }
}