<?php
    use Illuminate\Database\Migrations\Migration;
    use Illuminate\Database\Schema\Blueprint;
    use Illuminate\Support\Facades\Schema;

    class CreatePrendaTable extends Migration
    {
        public function up()
        {
            Schema::create('prenda', function (Blueprint $table) {
                $table->id('id_prenda');
                $table->string('sexo', 100);
                $table->string('nombre', 255);
                $table->decimal('precio', 10, 2);
                $table->unsignedBigInteger('talla_id');
                $table->unsignedBigInteger('color_id');
                $table->text('descripcion')->nullable();
                $table->unsignedBigInteger('categoria_id');
                $table->decimal('descuento', 5, 2)->nullable();
                $table->timestamps();
            });
        }

        public function down()
        {
            Schema::dropIfExists('prenda');
        }
    }