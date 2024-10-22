<?php
    namespace App\Models;

    use Illuminate\Database\Eloquent\Model;

    class Imagen extends Model {
        protected $table = 'imagenes';
        protected $primaryKey = 'id_imagen';
        protected $fillable = ['prenda_id', 'url'];
        public function prenda()

        {
            return $this->belongsTo(Prenda::class, 'prenda_id');
        }
    }