<?php
    namespace App\Models;

    use Illuminate\Database\Eloquent\Model;
    use Illuminate\Database\Eloquent\Factories\HasFactory;

    class Talla extends Model
    {
        use HasFactory;

        protected $table = 'talla';
        protected $primaryKey = 'id_talla';
        protected $fillable = ['stockPorPrenda','nombre',];

        public function prendas() // Relacion prenda
        {
            return $this->hasMany(Prenda::class, 'talla_id', 'id_talla');
        }
    }
