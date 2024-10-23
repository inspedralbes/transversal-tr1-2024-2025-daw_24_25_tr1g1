<?php
    namespace App\Models;

    use Illuminate\Database\Eloquent\Model;
    use Illuminate\Database\Eloquent\Factories\HasFactory;

    class Imagenes extends Model {
        use HasFactory;

        protected $table = 'imagenes';
        protected $primaryKey = 'id_imagen';
        protected $fillable = ['prenda_id', 'url'];

        public function prenda() {
            return $this->belongsTo(Prenda::class, 'prenda_id', 'id_prenda');
        }
    }