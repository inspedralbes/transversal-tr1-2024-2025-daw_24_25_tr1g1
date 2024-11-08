<?php
    namespace App\Models;

    use Illuminate\Database\Eloquent\Model;
    use Illuminate\Database\Eloquent\Factories\HasFactory;

    class Prenda extends Model {
        use HasFactory;

        protected $table = 'prenda';
        protected $primaryKey = 'id_prenda';

        protected $fillable = [
            'nombre', 'precio', 'descripcion', 'descuento', 
            'categoria_id', 'sexo', 'imagen_url'
        ];

        // boot = eliminar relaciones
        protected static function boot() {
            parent::boot();

            static::deleting(function ($prenda) {
                $prenda->tallas()->delete(); 
                $prenda->imagenes()->delete(); 
            });
        }

        // una prenda pertenece a una categoría
        public function categoria() {
            return $this->belongsTo(Categoria::class, 'categoria_id', 'id_categoria');
        }

        // una prenda puede tener muchas tallas
        public function tallas() {
            return $this->hasMany(Talla::class, 'prenda_id', 'id_prenda');
        }

        // una prenda puede tener muchas imágenes
        public function imagenes() {
            return $this->hasMany(Imagenes::class, 'prenda_id', 'id_prenda');
        }
    }
