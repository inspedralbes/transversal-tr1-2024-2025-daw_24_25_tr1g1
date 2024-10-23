<?php
    namespace App\Models;

    use Illuminate\Database\Eloquent\Model;
    use Illuminate\Database\Eloquent\Factories\HasFactory;

    class Categoria extends Model
    {
        use HasFactory;

        protected $table = 'categoria';
        protected $primaryKey = 'id_categoria';

        public function prendas() {
            return $this->hasMany(Prenda::class, 'categoria_id', 'id_categoria');
        }
    }