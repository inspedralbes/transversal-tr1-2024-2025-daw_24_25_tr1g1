<?php
    namespace App\Models;
    use Illuminate\Database\Eloquent\Model;

    class Prenda extends Model
    {
        protected $table = 'prenda';
        protected $primaryKey = 'id_prenda';
        protected $fillable = ['nombre', 'sexo', 'precio', 'talla_id', 'color_id', 'categoria_id', 'descripcion', 'descuento'];

        //Relacionar con "imagenes"
        public function imagenes()
        {
            return $this->hasMany(Imagen::class, 'prenda_id');
        }

        public function talla()
        {
            return $this->belongsTo(Talla::class, 'talla_id');
        }

        public function color()
        {
            return $this->belongsTo(Color::class, 'color_id');
        }

        public function categoria()
        {
            return $this->belongsTo(Categoria::class, 'categoria_id');
        }
    }