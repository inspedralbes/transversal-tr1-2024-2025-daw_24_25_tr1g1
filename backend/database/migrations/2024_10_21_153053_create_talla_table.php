<?php
    use Illuminate\Database\Migrations\Migration;
    use Illuminate\Database\Schema\Blueprint;
    use Illuminate\Support\Facades\Schema;

    class CreateTallaTable extends Migration
    {
        public function up()
        {
            Schema::create('talla', function (Blueprint $table) {
                $table->id('id_talla');
                $table->string('nombre', 50);
                $table->timestamps();
            });
        }

        public function down()
        {
            Schema::dropIfExists('talla');
        }
    }