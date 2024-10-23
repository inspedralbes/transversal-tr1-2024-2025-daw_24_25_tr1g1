<?php
    namespace App\Models;

    use Illuminate\Database\Eloquent\Model;
    use Illuminate\Database\Eloquent\Factories\HasFactory;

    class Prenda extends Model
    {
        use HasFactory;

        protected $table = 'prenda';
        protected $primaryKey = 'id_prenda';

        protected $fillable = [
            'nombre', 'precio', 'descripcion', 'descuento', 
            'categoria_id', 'talla_id', 'sexo'
        ];

        public function categoria() {
            return $this->belongsTo(Categoria::class, 'categoria_id', 'id_categoria');
        }

        public function talla() {
            return $this->belongsTo(Talla::class, 'talla_id', 'id_talla');
        }

        public function imagenes() {
            return $this->hasMany(Imagenes::class, 'prenda_id', 'id_prenda');
        }
    }