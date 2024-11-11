<?php
    use Illuminate\Database\Migrations\Migration;
    use Illuminate\Database\Schema\Blueprint;
    use Illuminate\Support\Facades\Schema;

    class CreateDetalleComprasTable extends Migration {
        public function up() {
            Schema::create('detalle_compras', function (Blueprint $table) {
                $table->id('id_detalle');
                $table->foreignId('id_compra')->constrained('compras')->onDelete('cascade');
                $table->integer('id_prenda'); 
                $table->string('talla', 10);
                $table->timestamps();
            });
        }

        public function down() {
            Schema::dropIfExists('detalle_compras');
        }
    }