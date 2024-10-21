<?php
    use Illuminate\Database\Migrations\Migration;
    use Illuminate\Database\Schema\Blueprint;
    use Illuminate\Support\Facades\Schema;

    class CreateColorTable extends Migration
    {
        public function up()
        {
            Schema::create('color', function (Blueprint $table) {
                $table->id('id_color');
                $table->string('nombre', 50);
                $table->timestamps();
            });
        }

        public function down()
        {
            Schema::dropIfExists('color');
        }
    }